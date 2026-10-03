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
  strategy: ["/contact?service=digital-strategy", "Choisir une direction avant de multiplier les actions.", "Échanger sur ce besoin"],
  maintenance: ["/contact?service=website-care", "Entretenir et faire évoluer votre environnement digital.", "Échanger sur ce besoin"],
} as const;

export const solutionNavigation = serviceFamilies.map(family => ({
  id: family.id, name: family.name, intent: family.defaultChatIntent,
  href: destinations[family.id][0], description: destinations[family.id][1], cta: destinations[family.id][2],
  // Promote a family to "family" only once its dedicated route is published.
  destinationType: (family.id === "web" || family.id === "automation" ? "family" : family.id === "acquisition" || family.id === "seo" ? "service" : "contact") as "family" | "service" | "contact",
}));
export type SolutionNavigation = (typeof solutionNavigation)[number];
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
