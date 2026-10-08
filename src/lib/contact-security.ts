// Server-side anti-spam checks for /api/contact. Pure functions plus small in-memory state.
import { elapsedField, minimumFillMs, projectOptions, trapField } from "@/lib/contact-form";

export type SpamCode =
  | "spam_honeypot"
  | "spam_rate_limit"
  | "spam_too_fast"
  | "spam_invalid_payload"
  | "spam_invalid_email"
  | "spam_links"
  | "spam_content"
  | "spam_duplicate"
  | "spam_origin";

/** Security log: a code only, never the e-mail, phone or message. */
export function logSpam(code: SpamCode) {
  console.warn(`[contact] ${code}`);
}

export const maxBodyBytes = 32 * 1024;
const allowedHosts = ["www.code-v.fr", "code-v.fr"];

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  project?: string;
  service?: string;
  source?: string;
  trap: string;
  elapsed: number;
};

const limits = { name: 150, email: 254, message: 15000, company: 200, phone: 40, project: 200, service: 100, source: 500, [trapField]: 200 } as const;
const allowedKeys = new Set<string>([...Object.keys(limits), elapsedField]);
// Control characters other than tab / line breaks never come from a real form.
const controlChars = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

/** Strict shape and type validation. Returns undefined for any malformed or absurd payload. */
export function parseContactPayload(value: unknown): ContactInput | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const body = value as Record<string, unknown>;
  const keys = Object.keys(body);
  if (keys.length > allowedKeys.size || keys.some(key => !allowedKeys.has(key))) return undefined;
  for (const [key, max] of Object.entries(limits)) {
    const field = body[key];
    if (field === undefined) continue;
    if (typeof field !== "string" || field.length > max || controlChars.test(field)) return undefined;
  }
  const elapsed = body[elapsedField];
  if (typeof elapsed !== "number" || !Number.isFinite(elapsed) || elapsed < 0) return undefined;
  const text = (key: keyof typeof limits) => ((body[key] as string | undefined) ?? "").trim();
  const name = text("name"), email = text("email"), message = text("message");
  // Name: one line, at least one letter, not an e-mail or a link.
  if (!name || /[\r\n]/.test(name) || !/[a-z\u00c0-\u024f\u0370-\uffff]/i.test(name) || name.includes("@") || hasLink(name)) return undefined;
  if (!email || /\s/.test(email)) return undefined;
  if (message.length < 2) return undefined;
  const project = text("project");
  if (project && !(projectOptions as readonly string[]).includes(project)) return undefined;
  const phone = text("phone");
  if (phone && (!/^[+0-9 ().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 6 || phone.replace(/\D/g, "").length > 15)) return undefined;
  const company = text("company");
  if (/[\r\n]/.test(company)) return undefined;
  return {
    name, email, message,
    company: company || undefined,
    phone: phone || undefined,
    project: project || undefined,
    service: text("service") || undefined,
    source: text("source") || undefined,
    trap: (body[trapField] as string | undefined) ?? "",
    elapsed,
  };
}

/**
 * Syntax check only (RFC 5321 lengths, dot-atom local part, hostname labels, alphabetic TLD).
 * It does not and cannot tell whether the mailbox exists; rare but valid domains are accepted.
 */
export function isValidEmail(value: string) {
  if (value.length > 254) return false;
  const at = value.lastIndexOf("@");
  if (at < 1 || at !== value.indexOf("@")) return false;
  const local = value.slice(0, at), domain = value.slice(at + 1).toLowerCase();
  if (local.length > 64 || !/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/.test(local)) return false;
  const labels = domain.split(".");
  if (labels.length < 2 || domain.length > 253) return false;
  if (!labels.every(label => /^[a-z0-9-]{1,63}$/.test(label) && !label.startsWith("-") && !label.endsWith("-"))) return false;
  const tld = labels[labels.length - 1];
  return /^[a-z]{2,63}$/.test(tld) || /^xn--[a-z0-9-]{2,59}$/.test(tld);
}

function hasLink(value: string) {
  return /(?:https?:\/\/|www\.)\S/i.test(value);
}

/** Basic, deliberately lenient content checks. A message with one or a few links stays valid. */
export function detectSpamContent(input: ContactInput): SpamCode | undefined {
  const all = [input.message, input.company ?? ""].join("\n");
  if ((all.match(/(?:https?:\/\/|www\.)\S+/gi) ?? []).length >= 4) return "spam_links";
  if (input.company && hasLink(input.company) && hasLink(input.message)) return "spam_links";
  // Forum spam markup, never typed in a contact form.
  if (/\[url=|\[\/url\]|<a\s+href=/i.test(all)) return "spam_content";
  // A message made of links and nothing else.
  if (input.message.replace(/(?:https?:\/\/|www\.)\S+/gi, "").replace(/[\s.,;:!?'"()\[\]{}<>\/\\_*-]/g, "").length < 2) return "spam_content";
  return undefined;
}

export function isTooFast(input: ContactInput) {
  return input.elapsed < minimumFillMs;
}

/**
 * Origin / Referer check. Same-host requests (production, Vercel previews, localhost) and the
 * code-v.fr domains are accepted; a missing header is tolerated because some browsers omit it.
 */
export function isAllowedOrigin(headers: Headers) {
  const requestHost = (headers.get("x-forwarded-host") ?? headers.get("host") ?? "").split(",")[0].trim().toLowerCase();
  const origin = headers.get("origin");
  const candidate = origin && origin !== "null" ? origin : headers.get("referer");
  if (!candidate) return true;
  try {
    const host = new URL(candidate).host.toLowerCase();
    return host === requestHost || allowedHosts.includes(host);
  } catch {
    return false;
  }
}

export function isJsonContentType(headers: Headers) {
  return /^application\/json\s*(?:;|$)/i.test(headers.get("content-type") ?? "");
}

export function clientIp(headers: Headers) {
  return (headers.get("x-forwarded-for")?.split(",")[0] ?? headers.get("x-real-ip") ?? "").trim() || "unknown";
}

// --- In-memory state -------------------------------------------------------------------------
// Serverless instances are reused (Vercel Fluid compute) so this catches bursts hitting the same
// instance, but it is NOT shared between instances or regions. It complements the other layers;
// a guaranteed global limit needs a Vercel WAF rate-limit rule or a shared store.

const windows = [
  { ms: 60_000, max: 5 },
  { ms: 60 * 60_000, max: 20 },
];
const maxTrackedKeys = 5000;
const hits = new Map<string, number[]>();
const deliveries = new Map<string, number>();
const duplicateWindowMs = 24 * 60 * 60_000;

function prune<T>(map: Map<string, T>) {
  if (map.size <= maxTrackedKeys) return;
  for (const key of map.keys()) {
    map.delete(key);
    if (map.size <= maxTrackedKeys / 2) break;
  }
}

/** Records an attempt and reports whether this client exceeded a window. */
export function isRateLimited(key: string, now = Date.now()) {
  const longest = windows[windows.length - 1].ms;
  const recent = (hits.get(key) ?? []).filter(time => now - time < longest);
  recent.push(now);
  hits.delete(key);
  hits.set(key, recent);
  prune(hits);
  return windows.some(({ ms, max }) => recent.filter(time => now - time < ms).length > max);
}

function fingerprint(input: ContactInput) {
  const text = `${input.email.toLowerCase()}\n${input.message.toLowerCase().replace(/\s+/g, " ")}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 0x01000193);
  return (hash >>> 0).toString(36) + ":" + text.length;
}

/** Same sender, same message, already delivered recently. */
export function isDuplicate(input: ContactInput, now = Date.now()) {
  const at = deliveries.get(fingerprint(input));
  return at !== undefined && now - at < duplicateWindowMs;
}

export function rememberDelivery(input: ContactInput, now = Date.now()) {
  deliveries.set(fingerprint(input), now);
  prune(deliveries);
}

/** Test helper. */
export function resetContactSecurityState() {
  hits.clear();
  deliveries.clear();
}
