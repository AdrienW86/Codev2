import type { Metadata } from "next";
import Home from "@/components/home/Home";
import { defaultShareImages, jsonLd, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CODE-V — Studio digital, acquisition & automatisation",
  description: "Sites et applications, acquisition, contenu, automatisation et IA : CODE-V construit un système digital cohérent pour votre entreprise.",
  alternates: { canonical: "https://www.code-v.fr" },
  openGraph: { title: "CODE-V — Les systèmes numériques qui font avancer votre entreprise", description: "Construire, attirer, convertir, automatiser et optimiser : une approche digitale cohérente.", url: "https://www.code-v.fr", type: "website", locale: "fr_FR", images: defaultShareImages },
};

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }} />
    <Home />
  </>;
}
