import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { normalizePublicUrl, runAudit, PageSpeedError, type Strategy } from "@/lib/performance/audit";

import { QuotaError, reserveAudit } from "@/lib/performance/quota";

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

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 2500) return response("Requête trop volumineuse.", 413);
  const trusted = internalRequest(request);
  if (!trusted && request.headers.get("sec-fetch-site") === "cross-site") return response("Requête non autorisée.", 403);
  if (!trusted && process.env.PERFORMANCE_PUBLIC_ENABLED !== "true") return response("Service public en cours de configuration.", 503);
  let input: { url?: unknown; strategy?: unknown };
  try {
    if (!request.body) return response("JSON invalide.", 400);
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2500) { await reader.cancel(); return response("Requête trop volumineuse.", 413); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return response("JSON invalide.", 400); }
  if (!input || typeof input !== "object") return response("JSON invalide.", 400);
  let url: string;
  try { url = normalizePublicUrl(input.url); } catch (e) { return response(e instanceof Error ? e.message : "URL invalide.", 400); }
  const strategy: Strategy = input.strategy === "desktop" ? "desktop" : "mobile";
  let reservation: Awaited<ReturnType<typeof reserveAudit>> | undefined;
  try {
    if (trusted) return NextResponse.json(await runAudit(url, strategy), { headers });
    const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "";
    reservation = await reserveAudit(url, strategy, ip, trusted);
    if (reservation.cached) return NextResponse.json(reservation.cached, { headers });
    const report = await runAudit(url, strategy);
    await reservation.finish(report).catch(() => {});
    return NextResponse.json(report, { headers });
  } catch (e) {
    if (reservation) await reservation.finish().catch(() => {});
    if (e instanceof QuotaError) return response(e.message, e.status);
    const message = e instanceof Error ? e.message : "Analyse indisponible.";
    if (e instanceof PageSpeedError) {
      console.warn("[performance] PageSpeed refusal", { upstreamCode: e.code, status: e.httpStatus, keyConfigured: Boolean(process.env.PAGESPEED_API_KEY) });
      return response(e.message, e.httpStatus);
    }
    return response("Analyse indisponible : " + message, e instanceof Error && e.name === "TimeoutError" ? 504 : 502);
  }
}
