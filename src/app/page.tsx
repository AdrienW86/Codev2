import type { Metadata } from "next";
import Home from "@/components/home/Home";
import { defaultShareImages, jsonLd, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CODE-V — Sites, acquisition, automatisation & outils métier",
  description: "CODE-V construit et relie les leviers digitaux de votre entreprise : sites et applications, acquisition, automatisation, IA et pilotage.",
  alternates: { canonical: "https://www.code-v.fr" },
  openGraph: { title: "CODE-V — Construire, attirer, automatiser et piloter", description: "Sites et applications, acquisition, automatisation et pilotage : un même partenaire pour relier votre système digital.", url: "https://www.code-v.fr", type: "website", locale: "fr_FR", images: defaultShareImages },
};

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }} />
    <Home />
  </>;
}
