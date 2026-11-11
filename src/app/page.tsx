import type { Metadata } from "next";
import Home from "@/components/home/Home";
import { defaultShareImages, jsonLd, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CODE-V — Sites, acquisition, automatisation & outils métier",
  description: "CODE-V crée des sites et applications, développe l’acquisition de clients et automatise les tâches et outils des entreprises.",
  alternates: { canonical: "https://www.code-v.fr" },
  openGraph: { title: "CODE-V — Sites web, acquisition et automatisation", description: "Sites et applications, acquisition de clients, automatisation et outils métier : trois offres claires pour les entreprises.", url: "https://www.code-v.fr", type: "website", locale: "fr_FR", images: defaultShareImages },
};

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }} />
    <Home />
  </>;
}
