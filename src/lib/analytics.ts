import { track, type BeforeSendEvent } from "@vercel/analytics";
import { publicRoutes } from "@/data/public-routes";

export const conversionEvents = ["contact_form_submit", "contact_cta_click", "phone_click", "email_click", "chatbot_open", "chatbot_intent_selected", "realization_click", "article_to_service_click", "external_project_click"] as const;
export type ConversionEvent = (typeof conversionEvents)[number];
export type ConversionProperties = { source_path: string; service?: string; location?: string; intent?: string; destination_path?: string; cta_source_path?: string; cta_location?: string; cta_label?: string; article_slug?: string; project_slug?: string; destination_service?: string; form_variant?: string };
export type AnalyticsAdapter = (event: ConversionEvent, properties: ConversionProperties) => void;
export type TrackingConfig = {
  serviceIds: string[];
  moneyPages: Record<string, string>;
  articles: Record<string, string[]>;
  projects?: Record<string, string>;
  projectAnchors?: Record<string, string>;
};
let config: TrackingConfig = { serviceIds: [], moneyPages: {}, articles: {} };
let adapter: AnalyticsAdapter = (event, properties) => track(event, { ...properties });
let lastContactCta: ConversionProperties | undefined;
const locations = ["header", "footer", "hero", "content", "final", "article", "form", "assistant"];
const intents = ["website", "acquisition", "automation", "strategy", "general"];
const aliases: Record<string, string> = { ads: "google-ads", automation: "business-workflows", "seo-local": "local-seo" };
const ctaLabels = ["Parler de votre projet", "Parler de votre visibilité", "Parler de votre acquisition", "Étudier une campagne", "Faire le point sur votre site", "Identifier ce que vous pouvez automatiser", "Faire le point sur votre dispositif", "Trouver mon point d’entrée", "Préciser le périmètre de mon site", "Parler de votre visibilité locale", "Choisir votre stratégie d’acquisition", "Parler de votre fiche Google"];
export function knownCtaLabel(text: string) {
  const label = text.replace(/\s+/g, " ").trim();
  return ctaLabels.find(value => label.startsWith(value));
}

export function configureTracking(value: TrackingConfig) { config = value; }
/** Future providers receive exactly the same sanitized schema. No GA4 provider installed. */
export function setAnalyticsAdapter(value: AnalyticsAdapter) { adapter = value; }
export function knownPath(value: string): string | undefined {
  try {
    const path = new URL(value, "https://www.code-v.fr").pathname;
    return (publicRoutes as readonly string[]).includes(path) || path === "/mentions-legales" || Object.hasOwn(config.articles, path) ? path : undefined;
  } catch { return undefined; }
}
export function knownService(value: string | null | undefined) {
  const id = value ? aliases[value] ?? value : undefined;
  return id && config.serviceIds.includes(id) ? id : undefined;
}

export function trackConversion(event: ConversionEvent, input: ConversionProperties) {
  if (typeof window === "undefined" || !conversionEvents.includes(event)) return;
  const source = knownPath(input.source_path);
  if (!source) return;
  const properties: ConversionProperties = { source_path: source };
  const service = knownService(input.service);
  if (service) properties.service = service;
  if (input.location && locations.includes(input.location)) properties.location = input.location;
  if (input.intent && intents.includes(input.intent)) properties.intent = input.intent;
  const destination = input.destination_path && knownPath(input.destination_path);
  if (destination) properties.destination_path = destination;
  if (input.cta_label && ctaLabels.includes(input.cta_label)) properties.cta_label = input.cta_label;
  if (input.article_slug && Object.hasOwn(config.articles, `/ressources/${input.article_slug}`)) properties.article_slug = input.article_slug;
  if (input.project_slug && [...Object.values(config.projects ?? {}), ...Object.values(config.projectAnchors ?? {})].includes(input.project_slug)) properties.project_slug = input.project_slug;
  const destinationService = knownService(input.destination_service);
  if (destinationService) properties.destination_service = destinationService;
  if (event === "contact_form_submit") {
    if (input.form_variant === "contact_main") properties.form_variant = input.form_variant;
    const ctaSource = input.cta_source_path && knownPath(input.cta_source_path);
    if (ctaSource) properties.cta_source_path = ctaSource;
    if (input.cta_location && locations.includes(input.cta_location)) properties.cta_location = input.cta_location;
  }
  // Measurement must never prevent navigation, a successful contact, or opening the assistant.
  try { adapter(event, properties); } catch { /* Non-critical measurement failure. */ }
}
export function trackContactCta(input: ConversionProperties) {
  const source = knownPath(input.source_path);
  if (source) lastContactCta = { source_path: source, service: knownService(input.service), location: input.location && locations.includes(input.location) ? input.location : undefined };
  trackConversion("contact_cta_click", input);
}
export function trackContactSuccess(service: string) {
  const cta = lastContactCta?.service === knownService(service) ? lastContactCta : undefined;
  trackConversion("contact_form_submit", { source_path: window.location.pathname, service, location: "form", form_variant: "contact_main", cta_source_path: cta?.source_path, cta_location: cta?.location });
  lastContactCta = undefined;
}
export function trackChatOpen(intent: string) {
  trackConversion("chatbot_open", { source_path: window.location.pathname, intent, location: "assistant" });
}
export function trackChatIntent(intent: string) {
  if (intent !== "general" && intents.includes(intent)) trackConversion("chatbot_intent_selected", { source_path: window.location.pathname, intent, location: "assistant" });
}
/** Also protect SDK pageview/custom-event URLs, beyond our custom properties. */
export function sanitizeAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  const path = knownPath(event.url);
  if (!path) return null;
  return { ...event, url: `https://www.code-v.fr${path}` };
}
