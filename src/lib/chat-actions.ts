/** Fixed public destinations only. Never carry conversation content into URLs. */
export const chatActions = {
  website: { href: "/creation-site", label: "Découvrir la création de site" },
  web: { href: "/solutions/web-applications", label: "Explorer Web & Applications" },
  seo: { href: "/referencement", label: "Comprendre le référencement" },
  local: { href: "/referencement-local", label: "Découvrir le référencement local" },
  ads: { href: "/publicite", label: "Découvrir Google Ads" },
  automation: { href: "/solutions/automatisation-ia", label: "Explorer l’automatisation" },
  strategy: { href: "/strategie-digitale", label: "Structurer votre stratégie" },
  maintenance: { href: "/maintenance-site", label: "Découvrir la maintenance" },
  content: { href: "/motion-design", label: "Découvrir le motion design" },
  solutions: { href: "/solutions", label: "Découvrir les solutions" },
  projects: { href: "/realisations", label: "Voir les réalisations" },
  protection: { href: "/realisations/protection-nuisibles", label: "Le cas Protection Nuisibles" },
  toulon: { href: "/realisations/nuisibles-toulon", label: "Le cas Nuisibles Toulon" },
  "contact-website": { href: "/contact?service=website", label: "Parler de votre projet" },
  "contact-local": { href: "/contact?service=local-seo", label: "Parler de votre visibilité locale" },
  "contact-maintenance": { href: "/contact?service=website-care", label: "Parler de votre maintenance" },
  "contact-social": { href: "/contact?service=social-management", label: "Parler de vos réseaux sociaux" },
  "contact-content": { href: "/contact?service=content-production", label: "Parler de vos contenus" },
  "contact-business": { href: "/contact?service=business-tool", label: "Cadrer votre outil métier" },
  "contact-seo": { href: "/contact?service=seo", label: "Faire le point sur votre visibilité" },
  "contact-ads": { href: "/contact?service=ads", label: "Étudier votre acquisition" },
  "contact-automation": { href: "/contact?service=automation", label: "Identifier ce que vous pouvez automatiser" },
  "contact-strategy": { href: "/contact?service=digital-strategy", label: "Parler de votre projet" },
} as const;
export type ChatActionId = keyof typeof chatActions;
export function isChatActionId(value: unknown): value is ChatActionId {
  return typeof value === "string" && Object.hasOwn(chatActions, value);
}
