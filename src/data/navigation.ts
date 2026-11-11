import { serviceFamilies } from "./services";

// Only published destinations. Contact is explicit when a family has no page yet.
const destinations = {
  web: ["/solutions/web-applications", "Interfaces utiles, sites et applications sur mesure.", "Explorer cette solution"],
  acquisition: ["/publicite", "Des campagnes pensées pour les demandes pertinentes.", "Explorer cette solution"],
  seo: ["/referencement", "Être trouvé dans les recherches qui comptent.", "Explorer cette solution"],
  social: ["/contact?service=social-management", "Une présence sociale cohérente et entretenue.", "Échanger sur ce besoin"],
  content: ["/contact?service=content-production", "Des contenus qui donnent du relief à votre marque.", "Échanger sur ce besoin"],
  automation: ["/solutions/automatisation-ia", "Connecter les outils et alléger les tâches répétitives.", "Explorer cette solution"],
  software: ["/contact?service=business-tool", "Des outils qui suivent votre façon de travailler.", "Échanger sur ce besoin"],
  strategy: ["/strategie-digitale", "Choisir une direction avant de multiplier les actions.", "Explorer cette solution"],
  maintenance: ["/maintenance-site", "Hébergement, maintenance et accompagnement pour garder votre environnement digital fiable.", "Découvrir la maintenance"],
} as const;

export const solutionNavigation = serviceFamilies.map(family => ({
  id: family.id, name: family.name, intent: family.defaultChatIntent,
  href: destinations[family.id][0], description: destinations[family.id][1], cta: destinations[family.id][2],
  // Promote a family to "family" only once its dedicated route is published.
  destinationType: (family.id === "web" || family.id === "automation" ? "family" : family.id === "acquisition" || family.id === "seo" || family.id === "strategy" || family.id === "maintenance" ? "service" : "contact") as "family" | "service" | "contact",
}));
export type SolutionNavigation = (typeof solutionNavigation)[number];

export const commercialOfferNavigation = [
  {
    id: "web",
    label: "SITES & APPLICATIONS",
    name: "Sites & applications",
    intent: "website" as const,
    href: "/creation-site",
    description: "Créer ou refondre votre site, développer une application web ou un espace métier utile à votre activité.",
    services: ["Site vitrine", "Site étendu / blog", "Application web / espace métier"],
    cta: "Voir les solutions web",
  },
  {
    id: "acquisition",
    label: "ACQUISITION DE CLIENTS",
    name: "Acquisition de clients",
    intent: "acquisition" as const,
    href: "/publicite",
    description: "Développer votre visibilité et obtenir davantage de demandes grâce au SEO local, à la publicité et aux réseaux sociaux.",
    services: ["Acquisition locale", "Google Ads", "Google Local Services", "Google Business Profile", "Réseaux sociaux"],
    cta: "Développer mon acquisition",
  },
  {
    id: "automation",
    label: "AUTOMATISATION & OUTILS MÉTIER",
    name: "Automatisation & outils métier",
    intent: "automation" as const,
    href: "/solutions/automatisation-ia",
    description: "Automatiser les tâches répétitives et structurer vos opérations avec l’IA, les workflows et des outils adaptés.",
    services: ["Agent IA", "Automatisation des e-mails", "Automatisation Google Ads", "Documents commerciaux", "Organisation des réponses clients"],
    cta: "Automatiser mon activité",
  },
] as const;

export type CommercialOfferNavigation = (typeof commercialOfferNavigation)[number];
// Shared, published entry points for the home, mobile menu and footer.
export const quickServiceNavigation = [
  { href: "/creation-site", label: "Création de site" },
  { href: "/referencement", label: "Référencement SEO" },
  { href: "/publicite", label: "Publicité" },
  { href: "/solutions/automatisation-ia", label: "Automatisation & IA" },
  { href: "/contact?service=social-management", label: "Réseaux sociaux" },
];
export const siteNavigation = [
  { href: "/realisations", label: "Réalisations", description: "Découvrir les réalisations documentées de CODE-V" },
  { href: "/ressources", label: "Ressources", description: "Repères, guides et médias pour vos décisions digitales" },
  { href: "/qui-sommes-nous", label: "À propos", description: "Découvrir l’approche CODE-V" },
  { href: "/contact", label: "Contact", description: "Contacter CODE-V" },
];
