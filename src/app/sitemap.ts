import type { MetadataRoute } from "next";
import { getPublishedResources } from "@/data/resources";
import { publicRoutes, siteOrigin } from "@/data/public-routes";
import { getOsArticles } from "@/lib/os-blog";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const local = getPublishedResources(), slugs = new Set(local.map(resource => resource.slug));
  const resources = [...local, ...(await getOsArticles()).filter(resource => !slugs.has(resource.slug))].filter(resource => resource.indexable);
  const hasArticles = resources.some(resource => resource.format === "article");
  return [
    { url: `${siteOrigin}/realisations/protection-nuisibles` },
    { url: `${siteOrigin}/realisations/nuisibles-toulon` },
    ...publicRoutes.filter(route => (route !== "/articles" || hasArticles) && (route !== "/outils/analyse-site" || process.env.PERFORMANCE_PUBLIC_ENABLED === "true")).map(route => ({ url: `${siteOrigin}${route === "/" ? "" : route}` })),
    ...resources.map(resource => ({ url: resource.canonical, lastModified: resource.updatedAt ?? resource.publishedAt! })),
  ];
}
