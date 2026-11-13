import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { normalizePublicUrl, runAudit, PageSpeedError, type Strategy } from "@/lib/performance/audit";
import { buildPerformanceDiagnostic } from "@/lib/performance/diagnostic";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };
function response(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers });
}
function internalRequest(request: NextRequest) {
  const configured = process.env.CODEV_PERFORMANCE_SERVICE_KEY;
  const supplied = request.headers.get("x-codev-service-key") ?? "";
  if (!configured || configured.length < 24 || supplied.length !== configured.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(configured));
}

// Limitation distribuée obligatoire pour les analyses publiques : fail closed si Redis n'est pas configuré.
async function publicQuota(request: NextRequest): Promise<boolean> {
  const base = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!base || !token || process.env.PERFORMANCE_PUBLIC_ENABLED !== "true") return false;
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "";
  if (!ip) return false;
  const digest = createHash("sha256").update(ip).digest("hex");
  const key = "codev:perf:" + digest + ":" + Math.floor(Date.now() / 3600000);
  try {
    const r = await fetch(base.replace(/\/$/, "") + "/pipeline", {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", key], ["EXPIRE", key, 3700]]),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!r.ok) return false;
    const body = await r.json() as { result?: number }[];
    return typeof body[0]?.result === "number" && body[0].result <= 5;
  } catch { return false; }
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 2500) return response("Requête trop volumineuse.", 413);
  const trusted = internalRequest(request);
  if (!trusted && process.env.PERFORMANCE_PUBLIC_ENABLED !== "true") return response("Service public en cours de configuration.", 503);
  if (!trusted && !(await publicQuota(request))) return response("Limite d'analyses atteinte ou protection anti-abus indisponible.", 429);
  let input: { url?: unknown; strategy?: unknown };
  try { input = await request.json(); } catch { return response("JSON invalide.", 400); }
  if (!input || typeof input !== "object") return response("JSON invalide.", 400);
  let url: string;
  try { url = normalizePublicUrl(input.url); } catch (e) { return response(e instanceof Error ? e.message : "URL invalide.", 400); }
  const strategy: Strategy = input.strategy === "desktop" ? "desktop" : "mobile";
  try {
    const audit = await runAudit(url, strategy);
    return NextResponse.json({ ...audit, diagnostic: buildPerformanceDiagnostic(audit) }, { headers });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Analyse indisponible.";
    if (e instanceof PageSpeedError) {
      console.warn("[performance] PageSpeed refusal", { upstreamCode: e.code, status: e.httpStatus, keyConfigured: Boolean(process.env.PAGESPEED_API_KEY) });
      return response(e.message, e.httpStatus);
    }
    return response("Analyse indisponible : " + message, e instanceof Error && e.name === "TimeoutError" ? 504 : 502);
  }
}
