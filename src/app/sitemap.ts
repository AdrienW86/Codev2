import type { MetadataRoute } from "next";
import { getPublishedResources } from "@/data/resources";
import { publicRoutes, siteOrigin } from "@/data/public-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const resources = getPublishedResources().filter(resource => resource.indexable);
  const hasArticles = resources.some(resource => resource.format === "article");
  return [
    { url: `${siteOrigin}/realisations/protection-nuisibles` },
    { url: `${siteOrigin}/realisations/nuisibles-toulon` },
    ...publicRoutes.filter(route => route !== "/articles" || hasArticles).map(route => ({ url: `${siteOrigin}${route === "/" ? "" : route}` })),
    ...resources.map(resource => ({ url: resource.canonical, lastModified: resource.updatedAt ?? resource.publishedAt! })),
  ];
}
