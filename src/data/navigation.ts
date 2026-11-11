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
    id: "build",
    label: "CONSTRUIRE",
    name: "Construire votre présence",
    intent: "website" as const,
    href: "/creation-site",
    description: "Sites vitrines, sites étendus, applications web et espaces métier : construire un socle clair, utile et évolutif.",
    cta: "Découvrir la création de site",
  },
  {
    id: "attract",
    label: "ATTIRER",
    name: "Générer des demandes",
    intent: "acquisition" as const,
    href: "/publicite",
    description: "SEO local, Google Ads, Local Services et réseaux sociaux : rendre votre entreprise visible là où vos prospects cherchent.",
    cta: "Découvrir l’acquisition",
  },
  {
    id: "automate",
    label: "AUTOMATISER",
    name: "Automatiser votre activité",
    intent: "automation" as const,
    href: "/solutions/automatisation-ia",
    description: "Agents IA, e-mails, workflows et automatisations : réduire les tâches répétitives et mieux faire circuler l’information.",
    cta: "Découvrir l’automatisation",
  },
  {
    id: "pilot",
    label: "PILOTER",
    name: "Piloter plus simplement",
    intent: "strategy" as const,
    href: "/strategie-digitale",
    description: "Documents commerciaux, organisation des e-mails, hébergement, maintenance et accompagnement : garder un cadre lisible au quotidien.",
    cta: "Découvrir l’accompagnement",
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
export const primarySolutionNeeds = [
  { id: "web", label: "CRÉER" },
  { id: "seo", label: "ÊTRE TROUVÉ" },
  { id: "acquisition", label: "ACQUÉRIR" },
  { id: "automation", label: "AUTOMATISER" },
];
export const siteNavigation = [
  { href: "/realisations", label: "Réalisations", description: "Découvrir les réalisations documentées de CODE-V" },
  { href: "/ressources", label: "Ressources", description: "Repères, guides et médias pour vos décisions digitales" },
  { href: "/qui-sommes-nous", label: "À propos", description: "Découvrir le studio CODE-V" },
  { href: "/contact", label: "Contact", description: "Contacter CODE-V" },
];
