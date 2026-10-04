import type { BreadcrumbProps } from "@/components/Breadcrumb";

const labels = {
  "/solutions": "Solutions",
  "/realisations": "Réalisations",
  "/ressources": "Ressources",
  "/articles": "Articles",
  "/strategie-digitale": "Stratégie digitale",
  "/motion-design": "Motion design",
  "/solutions/automatisation-ia": "Automatisation & IA",
  "/solutions/web-applications": "Web & Applications",
  "/contact": "Contact",
  "/qui-sommes-nous": "À propos",
  "/referencement": "Référencement naturel",
  "/referencement-local": "Référencement local",
  "/publicite": "Publicité en ligne",
  "/creation-site": "Création de site",
  "/maintenance-site": "Maintenance de site",
  "/facebook": "Publications Facebook",
  "/mentions-legales": "Mentions légales",
  "/politique-confidentialite": "Politique de confidentialité",
} as const;

export function getPageBreadcrumb(path: keyof typeof labels): BreadcrumbProps {
  const ancestors = path.startsWith("/solutions/") ? [{ label: "Solutions", href: "/solutions" }] : [];
  return { currentPath: path, items: [{ label: "Accueil", href: "/" }, ...ancestors, { label: labels[path] }] };
}

export function getResourceBreadcrumb(slug: string, title: string): BreadcrumbProps {
  return { currentPath: `/ressources/${slug}`, items: [
    { label: "Accueil", href: "/" }, { label: "Ressources", href: "/ressources" }, { label: title },
  ] };
}
