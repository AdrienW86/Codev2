import { siteOrigin } from "../data/public-routes";

/**
 * Default share image: 1200×630 crop of the official CODE-V Home capture (public/projects/code-v-home.webp).
 * Next.js replaces a parent's openGraph object instead of merging it, so pages repeat it explicitly.
 */
export const defaultShareImages = [{ url: "/og/code-v-share.jpg", width: 1200, height: 630, alt: "CODE-V — Le digital. Avec une direction." }];

const organizationId = `${siteOrigin}/#organization`;

/** Only facts already published on the site (mentions légales, brand assets). No phone: it is not centralised in the code. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: "CODE-V",
  legalName: "WEISSENBACHER ADRIEN",
  url: siteOrigin,
  logo: `${siteOrigin}/brand/code-v-icon-512.png`,
  email: "contact@code-v.fr",
  address: { "@type": "PostalAddress", streetAddress: "142 rue de Rivoli", postalCode: "75001", addressLocality: "Paris", addressCountry: "FR" },
};

/** No SearchAction: the site has no internal search. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteOrigin}/#website`,
  name: "CODE-V",
  url: siteOrigin,
  inLanguage: "fr-FR",
  publisher: { "@id": organizationId },
};

type FilmSchemaInput = { name: string; description: string; poster: string; src: string; uploadDate: string; duration: string };

/** VideoObject for a film actually played on the page; uploadDate is the merge date of the film on master. */
export function getFilmSchema({ name, description, poster, src, uploadDate, duration }: FilmSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: new URL(poster, siteOrigin).href,
    contentUrl: new URL(src, siteOrigin).href,
    uploadDate,
    duration,
    publisher: { "@type": "Organization", "@id": organizationId, name: "CODE-V", logo: { "@type": "ImageObject", url: `${siteOrigin}/brand/code-v-icon-512.png` } },
  };
}

/** Serialises JSON-LD for a <script> tag without allowing "</script>" injection. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
