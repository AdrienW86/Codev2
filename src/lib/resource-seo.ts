import type { Metadata } from "next";
import { isPublishedResource, type Resource } from "../data/resources";

export function getResourceMetadata(resource: Resource): Metadata {
  const publicContent = isPublishedResource(resource);
  const title = resource.seoTitle ?? resource.title;
  const description = resource.seoDescription ?? resource.description;
  return {
    title, description, alternates: { canonical: resource.canonical },
    robots: { index: publicContent && resource.indexable, follow: publicContent },
    openGraph: {
      title, description, url: resource.canonical, locale: "fr_FR",
      type: resource.format === "video" ? "website" : "article",
      ...(resource.coverImage ? { images: [{ url: new URL(resource.coverImage.src, resource.canonical).href, width: resource.coverImage.width, height: resource.coverImage.height, alt: resource.coverImage.alt }] } : {}),
      ...(publicContent && resource.format !== "video" ? { publishedTime: resource.publishedAt!, ...(resource.updatedAt ? { modifiedTime: resource.updatedAt } : {}) } : {}),
    },
  };
}

export function getResourceStructuredData(resource: Resource) {
  if (!isPublishedResource(resource)) return null;
  if (resource.format === "video") {
    const video = resource.video;
    if (!video?.uploadDate || !video.duration || !video.sourceRef || !video.transcript.trim()) return null;
    return { "@context": "https://schema.org", "@type": "VideoObject", name: video.title,
      description: resource.description, thumbnailUrl: new URL(video.poster, resource.canonical).href,
      contentUrl: new URL(video.src, resource.canonical).href, uploadDate: video.uploadDate, duration: video.duration };
  }
  return { "@context": "https://schema.org", "@type": resource.format === "article" ? "BlogPosting" : "Article",
    headline: resource.title, description: resource.description, mainEntityOfPage: resource.canonical,
    datePublished: resource.publishedAt, ...(resource.updatedAt ? { dateModified: resource.updatedAt } : {}),
    author: { "@type": resource.author!.type, name: resource.author!.name, ...(resource.author!.url ? { url: resource.author!.url } : {}) },
    ...(resource.coverImage ? { image: new URL(resource.coverImage.src, resource.canonical).href } : {}),
  };
}
