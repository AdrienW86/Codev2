import type { ChatIntent } from "@/components/RobotAssistant/chat";
import { serviceFamilies, type ServiceCategory, type ServiceId } from "./services";
import { solutionNavigation } from "./navigation";
import { getPublishedProjects, projects, type ProjectImage } from "./projects";

export type ResourceFormat = "article" | "guide" | "comparison" | "checklist" | "tutorial" | "analysis" | "video" | "case-study";
export type SearchIntent = "informational" | "commercial" | "transactional" | "navigational";
export type FunnelStage = "discovery" | "consideration" | "decision";
export type ResourceAuthor = { name: string; type: "Person" | "Organization"; url: string | null };
export type ResourceVideo = {
  src: string; poster: string; title: string; transcript: string;
  /** Supply only from a documented publication record; otherwise no VideoObject. */
  uploadDate: string | null; duration: string | null; sourceRef: string | null;
};
export type ResourceBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: readonly string[] };
export type ResourceCta =
  | { type: "solution"; family: ServiceCategory; label: string }
  | { type: "project"; projectId: string; label: string }
  | { type: "audit"; service: ServiceId; label: string }
  | { type: "explain-project" | "contact"; label: string }
  | { type: "chat"; intent: ChatIntent; label: string };

export type Resource = {
  id: string; slug: string; title: string; description: string;
  format: ResourceFormat; status: "draft" | "published";
  publishedAt: string | null; updatedAt: string | null; author: ResourceAuthor | null;
  topic: ServiceCategory; serviceFamilies: readonly ServiceCategory[];
  relatedServices: readonly ServiceId[]; relatedProjects: readonly string[];
  relatedResources: readonly string[]; keywords: readonly string[];
  searchIntent: SearchIntent; funnelStage: FunnelStage; featured: boolean;
  coverImage: ProjectImage | null; video: ResourceVideo | null; readingTime: number | null;
  seoTitle: string | null; seoDescription: string | null; canonical: string;
  indexable: boolean; content: readonly ResourceBlock[] | null;
  cta: ResourceCta; sourceRefs: readonly string[];
};

/** The clusters reuse the commercial families, without a competing taxonomy. */
export const resourceClusters = serviceFamilies.map(family => ({ id: family.id, name: family.name }));
const origin = "https://www.code-v.fr";

function draft(data: Pick<Resource, "id" | "slug" | "title" | "description" | "format" | "topic" | "relatedServices" | "relatedProjects" | "relatedResources" | "keywords" | "searchIntent" | "funnelStage" | "cta">): Resource {
  return { ...data, status: "draft", publishedAt: null, updatedAt: null, author: null,
    serviceFamilies: [data.topic], featured: false, coverImage: null, video: null,
    readingTime: null, seoTitle: null, seoDescription: null,
    canonical: `${origin}/ressources/${data.slug}`, indexable: false, content: null, sourceRefs: [],
  };
}

/** Editorial briefs, not articles. No dates, authors or body text are fabricated. */
export const resources: readonly Resource[] = [
  draft({ id: "website-brief", slug: "preparer-refonte-site", title: "Préparer une refonte de site", description: "Guide prévu : préciser le besoin, les contenus et les contraintes avant de choisir une solution.",
    format: "guide", topic: "web", relatedServices: ["website", "ux-conversion"], relatedProjects: [], relatedResources: ["local-visibility-brief"], keywords: ["préparer refonte site"], searchIntent: "commercial", funnelStage: "consideration", cta: { type: "solution", family: "web", label: "Explorer Web & Applications" } }),
  draft({ id: "local-visibility-brief", slug: "site-ou-fiche-google", title: "Site web ou fiche Google : quel rôle pour chacun ?", description: "Comparatif prévu : distinguer la présentation de l’activité et sa présence dans les recherches locales.",
    format: "comparison", topic: "seo", relatedServices: ["website", "local-seo", "gbp-management"], relatedProjects: [], relatedResources: ["website-brief"], keywords: ["site web fiche Google"], searchIntent: "informational", funnelStage: "discovery", cta: { type: "solution", family: "seo", label: "Comprendre la visibilité locale" } }),
  draft({ id: "automation-brief", slug: "choisir-premiere-automatisation", title: "Choisir sa première automatisation", description: "Checklist prévue : repérer une tâche répétitive et vérifier les données, outils et responsabilités nécessaires.",
    format: "checklist", topic: "automation", relatedServices: ["business-workflows", "api-integrations"], relatedProjects: ["code-v-motion"], relatedResources: [], keywords: ["première automatisation entreprise"], searchIntent: "commercial", funnelStage: "consideration", cta: { type: "chat", intent: "automation", label: "Décrire la tâche à automatiser" } }),
];

export function isPublishedResource(resource: Resource): boolean {
  return resource.status === "published" && Boolean(
    resource.content?.length && resource.content.every(block => block.type === "list" ? block.items.length > 0 && block.items.every(item => item.trim()) : block.text.trim()) &&
    resource.publishedAt && /^\d{4}-\d{2}-\d{2}/.test(resource.publishedAt) && Number.isFinite(Date.parse(resource.publishedAt)) &&
    (!resource.updatedAt || Number.isFinite(Date.parse(resource.updatedAt)) && Date.parse(resource.updatedAt) >= Date.parse(resource.publishedAt)) &&
    resource.author?.name.trim() && resource.sourceRefs.length && resource.sourceRefs.every(source => source.trim())
  );
}
export function getPublishedResources() { return resources.filter(isPublishedResource); }
/** Public lookup deliberately excludes drafts, even when a slug is known. */
export function getPublishedResourceBySlug(slug: string) { return getPublishedResources().find(resource => resource.slug === slug); }
export function getResourcesByServiceFamily(family: ServiceCategory) { return getPublishedResources().filter(resource => resource.serviceFamilies.includes(family)); }
export function getResourcesByProject(projectId: string) { return getPublishedResources().filter(resource => resource.relatedProjects.includes(projectId)); }
export function getResourcesByService(service: ServiceId) { return getPublishedResources().filter(resource => resource.relatedServices.includes(service)); }
export function getRelatedResources(resource: Resource) { return getPublishedResources().filter(other => resource.relatedResources.includes(other.id)); }
export function getRelatedSolutions(resource: Resource) { return solutionNavigation.filter(solution => resource.serviceFamilies.includes(solution.id)); }
export function getRelatedProjects(resource: Resource) { return projects.filter(project => resource.relatedProjects.includes(project.id) && project.status === "published"); }

export function getResourceCtaHref(cta: ResourceCta): string | null {
  switch (cta.type) {
    case "solution": return solutionNavigation.find(solution => solution.id === cta.family)?.href ?? null;
    case "project": {
      const project = projects.find(item => item.id === cta.projectId);
      if (!project || project.status !== "published") return null;
      return `/realisations#${project.kind === "internal" ? "laboratoire" : project.featured ? "selection" : project.slug}`;
    }
    case "audit": return `/contact?service=${encodeURIComponent(cta.service)}`;
    case "explain-project": case "contact": return "/contact";
    case "chat": return null;
  }
}

/** Existing proof/media for the hub, independent of unpublished editorial briefs. */
export const resourceHubProject = getPublishedProjects().find(project => project.slug === "chateau-de-projan");
export const resourceHubVideo = getPublishedProjects().find(project => project.slug === "code-v-motion")?.video ?? null;
