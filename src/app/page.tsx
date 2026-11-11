import type { Metadata } from "next";
import Home from "@/components/home/Home";
import { defaultShareImages, jsonLd, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Agence digitale à Perpignan | Sites, Google & automatisation | CODE-V",
  description: "CODE-V aide les TPE et PME de Perpignan et des Pyrénées-Orientales à obtenir plus de demandes grâce à un site efficace, une meilleure visibilité Google et des automatisations utiles.",
  alternates: { canonical: "https://www.code-v.fr" },
  openGraph: {
    title: "CODE-V — Plus de demandes clients, sans vous compliquer avec le digital",
    description: "Sites web, visibilité Google et automatisation pour les entreprises de Perpignan et des Pyrénées-Orientales.",
    url: "https://www.code-v.fr",
    type: "website",
    locale: "fr_FR",
    images: defaultShareImages,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Combien coûte un site ?", acceptedAnswer: { "@type": "Answer", text: "Le site vitrine commence à 799 € HT. Un site étendu avec blog commence à 1 499 € HT et une application web ou un espace métier à 2 999 € HT. Le périmètre exact est détaillé dans le devis." } },
    { "@type": "Question", name: "Combien coûte l’acquisition sur Google ?", acceptedAnswer: { "@type": "Answer", text: "Le pilotage Google Ads est proposé à 150 € HT par mois. L’acquisition locale est proposée à 300 € HT par mois. Le budget publicitaire payé à Google reste séparé des honoraires CODE-V." } },
    { "@type": "Question", name: "Combien de temps prend un projet ?", acceptedAnswer: { "@type": "Answer", text: "Le délai dépend du nombre de pages, des contenus disponibles et des fonctionnalités. Un planning est défini dans le devis avant le démarrage." } },
    { "@type": "Question", name: "Est-ce que je dois comprendre la technique ?", acceptedAnswer: { "@type": "Answer", text: "Non. CODE-V explique ce qui compte pour l’activité et prend en charge la mise en œuvre technique selon le périmètre convenu." } },
  ],
};

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
    <Home />
  </>;
}
