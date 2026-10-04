import type { MetadataRoute } from "next";
import { siteOrigin } from "@/data/public-routes";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${siteOrigin}/sitemap.xml`, host: siteOrigin };
}
