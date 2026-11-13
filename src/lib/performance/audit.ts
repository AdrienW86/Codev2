export type Strategy = "mobile" | "desktop";
export type ScoreKey = "performance" | "accessibility" | "bestPractices" | "seo";
export type AuditResult = {
  url: string;
  strategy: Strategy;
  analyzedAt: string;
  source: "PageSpeed Insights / Lighthouse";
  scores: Record<ScoreKey, number | null>;
  lab: Record<"lcp" | "fcp" | "cls" | "tbt" | "speedIndex", { value: number | null; display: string }>;
  field: { lcpMs: number | null; inpMs: number | null; cls: number | null; scope: "url" | "origin" | "unavailable" };
  opportunities: { id: string; title: string; description: string; display: string; savingsMs: number | null }[];
};

type PsiAudit = { title?: string; description?: string; displayValue?: string; numericValue?: number; score?: number | null; details?: { type?: string; overallSavingsMs?: number } };
type PsiResult = {
  id?: string;
  lighthouseResult?: {
    requestedUrl?: string;
    fetchTime?: string;
    categories?: Record<string, { score?: number | null }>;
    audits?: Record<string, PsiAudit>;
    runtimeError?: { message?: string };
  };
  loadingExperience?: { metrics?: Record<string, { percentile?: number }> };
  originLoadingExperience?: { metrics?: Record<string, { percentile?: number }> };
};

export function normalizePublicUrl(value: unknown): string {
  if (typeof value !== "string" || !value.trim() || value.length > 1600) throw new Error("Adresse URL invalide.");
  let url: URL;
  try { url = new URL(value.trim()); } catch { throw new Error("Indiquez une URL complète (https://exemple.fr)."); }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("Seules les URL HTTP(S) publiques sont autorisées.");
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("Port non autorisé.");
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!host.includes(".") || host.length > 253 || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".test") || host.endsWith(".invalid") || host.endsWith(".example")) throw new Error("Cette adresse ne correspond pas à un site public.");
  if (host.startsWith("[") || /^(\d{1,3}\.){3}\d{1,3}$/.test(host) || /^[0-9a-f:.]+$/.test(host)) throw new Error("Les adresses IP directes ne sont pas autorisées.");
  if (!/^[a-z0-9.-]+$/.test(host) || host.split(".").some(part => !part || part.length > 63 || part.startsWith("-") || part.endsWith("-"))) throw new Error("Nom de domaine invalide.");
  url.hash = "";
  return url.toString();
}

function score(result: PsiResult, key: string): number | null {
  const n = result.lighthouseResult?.categories?.[key]?.score;
  return typeof n === "number" && Number.isFinite(n) ? Math.round(n * 100) : null;
}

function metric(result: PsiResult, name: string) {
  const a = result.lighthouseResult?.audits?.[name];
  return { value: typeof a?.numericValue === "number" ? a.numericValue : null, display: a?.displayValue ?? "Donnée indisponible" };
}

function percentile(metrics: Record<string, { percentile?: number }> | undefined, keys: string[]) {
  for (const key of keys) {
    const n = metrics?.[key]?.percentile;
    if (typeof n === "number" && Number.isFinite(n)) return n;
  }
  return null;
}

export function extractAudit(data: unknown, url: string, strategy: Strategy): AuditResult {
  const result = data as PsiResult;
  if (!result?.lighthouseResult || result.lighthouseResult.runtimeError) throw new Error("Lighthouse n'a pas pu analyser ce site.");
  const audits = result.lighthouseResult.audits ?? {};
  const fieldSource = result.loadingExperience?.metrics ? result.loadingExperience.metrics : result.originLoadingExperience?.metrics;
  const opportunities = Object.entries(audits).filter(([id, a]) =>
    a?.title && a.score !== null && typeof a.score === "number" && a.score < 0.9 &&
    (a.details?.type === "opportunity" || (typeof a.details?.overallSavingsMs === "number" && a.details.overallSavingsMs > 0)) &&
    !["metrics", "diagnostics"].includes(id)
  ).map(([id, a]) => ({
    id, title: a.title!, description: (a.description ?? "").replace(/\[[^\]]+\]\([^)]+\)/g, "").slice(0, 300),
    display: a.displayValue ?? "", savingsMs: typeof a.details?.overallSavingsMs === "number" ? a.details.overallSavingsMs : null,
  })).sort((a, b) => (b.savingsMs ?? 0) - (a.savingsMs ?? 0)).slice(0, 8);
  const clsField = percentile(fieldSource, ["CUMULATIVE_LAYOUT_SHIFT_SCORE"]);
  return {
    url: result.lighthouseResult.requestedUrl || url,
    strategy,
    analyzedAt: result.lighthouseResult.fetchTime || new Date().toISOString(),
    source: "PageSpeed Insights / Lighthouse",
    scores: {
      performance: score(result, "performance"),
      accessibility: score(result, "accessibility"),
      bestPractices: score(result, "best-practices"),
      seo: score(result, "seo"),
    },
    lab: { lcp: metric(result, "largest-contentful-paint"), fcp: metric(result, "first-contentful-paint"), cls: metric(result, "cumulative-layout-shift"), tbt: metric(result, "total-blocking-time"), speedIndex: metric(result, "speed-index") },
    field: {
      lcpMs: percentile(fieldSource, ["LARGEST_CONTENTFUL_PAINT_MS"]),
      inpMs: percentile(fieldSource, ["INTERACTION_TO_NEXT_PAINT", "INTERACTION_TO_NEXT_PAINT_MS"]),
      cls: clsField === null ? null : clsField / 100,
      scope: result.loadingExperience?.metrics ? "url" : result.originLoadingExperience?.metrics ? "origin" : "unavailable",
    },
    opportunities,
  };
}

export class PageSpeedError extends Error {
  constructor(message: string, public readonly httpStatus: number, public readonly code: string) {
    super(message);
    this.name = "PageSpeedError";
  }
}

/** Conserve uniquement un motif Google documenté, jamais sa réponse complète (clé et URL sensibles). */
export function classifyPageSpeedFailure(status: number, body: unknown, hasKey: boolean): PageSpeedError {
  const error = body && typeof body === "object" && "error" in body
    ? (body as { error?: { status?: unknown; errors?: Array<{ reason?: unknown }>; details?: Array<{ reason?: unknown }> } }).error
    : undefined;
  const reasons = [...(error?.errors ?? []), ...(error?.details ?? [])]
    .map(entry => typeof entry.reason === "string" ? entry.reason.toLowerCase() : "");
  const googleStatus = typeof error?.status === "string" ? error.status.toLowerCase() : "";
  const quota = status === 429 || reasons.some(v => /quota|ratelimit|rate_limit|dailylimit|user_rate_limit/.test(v)) || googleStatus === "resource_exhausted";
  if (quota) return new PageSpeedError("Quota Google PageSpeed atteint. Vérifiez les quotas du projet Google Cloud et réessayez ultérieurement.", 429, "quota");
  const keyInvalid = reasons.some(v => /keyinvalid|api_key_invalid|keyexpired|api_key_expired/.test(v));
  if (keyInvalid) return new PageSpeedError("Clé API PageSpeed invalide ou expirée. Vérifiez PAGESPEED_API_KEY sur le projet Vercel codev.", 503, "invalid_key");
  if (status === 403 || googleStatus === "permission_denied") {
    return hasKey
      ? new PageSpeedError("Google refuse la clé PageSpeed. Vérifiez l'activation de l'API et les restrictions de la clé dans Google Cloud.", 503, "permission")
      : new PageSpeedError("Google PageSpeed refuse l'analyse sans clé API. Ajoutez PAGESPEED_API_KEY dans les variables serveur Vercel du projet codev.", 503, "missing_key");
  }
  if (status === 400) return new PageSpeedError("Google PageSpeed n'a pas pu analyser cette page (HTTP 400). Vérifiez que son URL est accessible publiquement.", 422, "unavailable_page");
  return new PageSpeedError("Google PageSpeed est momentanément indisponible (HTTP " + status + ").", 502, "upstream");
}

export async function runAudit(url: string, strategy: Strategy): Promise<AuditResult> {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.set("locale", "fr");
  for (const category of ["performance", "accessibility", "best-practices", "seo"]) endpoint.searchParams.append("category", category);
  if (process.env.PAGESPEED_API_KEY) endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  const response = await fetch(endpoint, { cache: "no-store", signal: AbortSignal.timeout(55000) });
  if (!response.ok) {
    const details: unknown = await response.json().catch(() => null);
    throw classifyPageSpeedFailure(response.status, details, Boolean(process.env.PAGESPEED_API_KEY));
  }
  return extractAudit(await response.json(), url, strategy);
}
