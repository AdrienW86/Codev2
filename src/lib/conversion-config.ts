import { getPublishedArticles, getRelatedSolutions } from "@/data/resources";
import { serviceIds, type ServiceId } from "@/data/services";
import type { TrackingConfig } from "./analytics";
import { getPublishedProjects } from "@/data/projects";

const moneyPages: Record<string, ServiceId> = {
  "/creation-site": "website", "/referencement": "seo", "/referencement-local": "local-seo",
  "/publicite": "google-ads", "/maintenance-site": "website-care",
  "/solutions/web-applications": "website", "/solutions/automatisation-ia": "business-workflows",
  "/strategie-digitale": "digital-strategy", "/motion-design": "video-motion",
};
/** Server-only call: send identifiers and paths, never article content or the full service catalog. */
export function getTrackingConfig(): TrackingConfig {
  const projects = getPublishedProjects();
  const featured = projects.find(project => project.kind === "client" && project.featured);
  return { serviceIds: [...serviceIds], moneyPages,
    projects: Object.fromEntries(projects.filter(project => project.publicUrl).map(project => [project.publicUrl!, project.slug])),
    projectAnchors: { ...Object.fromEntries(projects.map(project => [project.slug, project.slug])), ...(featured ? { selection: featured.slug } : {}) },
    articles: Object.fromEntries(getPublishedArticles().map(article => {
    const links = article.content!.flatMap(block => block.type === "links" ? block.links.map(link => link.href) : []);
    const paths = [...links, ...getRelatedSolutions(article).map(solution => solution.href)].filter(path => Object.hasOwn(moneyPages, path));
    return [`/ressources/${article.slug}`, [...new Set(paths)]];
  })) };
}
