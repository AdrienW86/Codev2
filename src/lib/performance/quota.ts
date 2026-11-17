import { createHash, createHmac, randomUUID } from "node:crypto";
import type { AuditResult, Strategy } from "./audit";

// One Redis script reserves all counters together: concurrent requests cannot exceed a cap.
export const reserveScript = `
local personal = tonumber(redis.call('GET', KEYS[1]) or '0')
if ARGV[1] == 'public' and personal >= 2 then return {'personal'} end
local cached = redis.call('GET', KEYS[4])
if cached then
  if ARGV[1] == 'public' then redis.call('INCR', KEYS[1]); redis.call('EXPIRE', KEYS[1], 90000) end
  return {'cached', cached}
end
if redis.call('EXISTS', KEYS[5]) == 1 then return {'busy'} end
if tonumber(redis.call('GET', KEYS[2]) or '0') >= 50 then return {'daily'} end
if tonumber(redis.call('GET', KEYS[3]) or '0') >= 500 then return {'monthly'} end
if ARGV[1] == 'public' then redis.call('INCR', KEYS[1]); redis.call('EXPIRE', KEYS[1], 90000) end
redis.call('INCR', KEYS[2]); redis.call('EXPIRE', KEYS[2], 90000)
redis.call('INCR', KEYS[3]); redis.call('EXPIRE', KEYS[3], 2764800)
redis.call('SET', KEYS[5], ARGV[2], 'EX', 70)
return {'allowed'}
`;
const finishScript = `
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
if ARGV[2] ~= '' then redis.call('SET', KEYS[2], ARGV[2], 'EX', 86400) end
redis.call('DEL', KEYS[1])
return 1
`;

export class QuotaError extends Error {
  constructor(message: string, public readonly status = 429) { super(message); }
}
export function quotaKeys(url: string, strategy: Strategy, ip: string, secret: string, now = new Date()) {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const person = createHmac("sha256", secret).update(day + ":" + ip).digest("hex");
  const report = createHash("sha256").update(strategy + ":" + url).digest("hex");
  const prefix = "codev:perf:v2:";
  return [prefix + "ip:" + person, prefix + "day:" + day, prefix + "month:" + day.slice(0, 7), prefix + "report:" + report, prefix + "lock:" + report];
}
async function command(args: (string | number)[]) {
  const base = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!base || !token) throw new QuotaError("La protection des analyses est indisponible. Réessayez plus tard.", 503);
  try {
    const response = await fetch(base.replace(/\/$/, ""), { method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify(args), cache: "no-store", signal: AbortSignal.timeout(3000) });
    if (!response.ok) throw new Error("Redis unavailable");
    const data = await response.json() as { result?: unknown; error?: unknown };
    if (data.error || data.result === undefined) throw new Error("Redis error");
    return data.result;
  } catch { throw new QuotaError("La protection des analyses est indisponible. Réessayez plus tard.", 503); }
}
export async function reserveAudit(url: string, strategy: Strategy, ip: string, trusted: boolean) {
  const secret = process.env.PERFORMANCE_QUOTA_SECRET || process.env.CODEV_PERFORMANCE_SERVICE_KEY;
  if (!secret || secret.length < 24 || (!trusted && !ip)) throw new QuotaError("La protection des analyses est indisponible. Réessayez plus tard.", 503);
  const keys = quotaKeys(url, strategy, ip, secret);
  const owner = randomUUID();
  const result = await command(["EVAL", reserveScript, keys.length, ...keys, trusted ? "internal" : "public", owner]);
  if (!Array.isArray(result)) throw new QuotaError("Protection indisponible.", 503);
  const [status, cached] = result;
  const messages: Record<string, string> = {
    personal: "Vous avez atteint la limite de 2 analyses par jour pour votre connexion Internet. Réessayez demain (heure de Paris).",
    daily: "Le quota quotidien de l’outil est atteint. Réessayez demain (heure de Paris).",
    monthly: "Le quota mensuel de l’outil est atteint. Les nouvelles analyses reprendront le mois prochain.",
    busy: "Cette page est déjà en cours d’analyse. Réessayez dans une minute.",
  };
  if (messages[status]) throw new QuotaError(messages[status]);
  if (status === "cached") {
    try {
      const report = JSON.parse(cached) as AuditResult;
      if (report.url !== url || report.strategy !== strategy || !Array.isArray(report.checks)) throw new Error("Invalid cache");
      return { cached: report, finish: async () => {} };
    } catch { throw new QuotaError("Le résultat conservé est indisponible. Réessayez plus tard.", 503); }
  }
  if (status !== "allowed") throw new QuotaError("Protection indisponible.", 503);
  return { cached: null, finish: async (report?: AuditResult) => {
    // Do not retain reports whose requested URL contains query parameters.
    const value = report && !new URL(url).search ? JSON.stringify(report) : "";
    await command(["EVAL", finishScript, 2, keys[4], keys[3], owner, value.length <= 300000 ? value : ""]);
  } };
}
