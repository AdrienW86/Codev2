import { getPageBreadcrumb } from "@/data/breadcrumbs";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Qui sommes-nous — Codev",
  description: "Codev rend le digital plus clair et plus utile, avec un accompagnement simple, humain et personnalisé.",
  alternates: { canonical: "https://www.code-v.fr/qui-sommes-nous" },
  openGraph: { title: "À propos — CODE-V", description: "Un accompagnement digital simple, humain et personnalisé.", url: "https://www.code-v.fr/qui-sommes-nous", type: "website", locale: "fr_FR" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero breadcrumb={getPageBreadcrumb("/qui-sommes-nous")} eyebrow="Le studio" title={<>Rendre le digital<br /><span>plus clair.</span></>} text="Codev est un studio digital indépendant qui accompagne les entreprises avec une approche simple, humaine et résolument tournée vers l’action." />
      <section className="section about-statement"><div className="container"><span className="eyebrow"><i />Notre mission</span><h2>Le digital est un moyen.<br /><span>Pas une fin.</span></h2><div className="statement-bottom"><p>Nous croyons qu’une bonne stratégie digitale commence par une conversation. Comprendre avant de proposer, clarifier avant de créer, mesurer avant de promettre.</p><p>Parce que derrière chaque projet, il y a une activité, une équipe et une ambition qui mérite d’être bien racontée.</p></div></div></section>
      <section className="values-section"><div className="container values-grid"><article><span className="value-icon">◒</span><h3>Simple</h3><p>Des explications claires et des choix qui ont du sens, sans complexité ajoutée.</p></article><article><span className="value-icon">✳</span><h3>Humain</h3><p>Une relation directe, attentive et construite autour de vos réalités.</p></article><article><span className="value-icon">↗</span><h3>Utile</h3><p>Des idées qui se transforment en résultats concrets pour votre activité.</p></article></div></section>
      <section className="section about-cta"><div className="container centered-cta light-cta"><span className="eyebrow"><i />Une première conversation</span><h2>Parlons de ce qui<br /><span>vous fait avancer.</span></h2><Link className="button button-dark" href="/contact">Nous contacter <span>↗</span></Link></div></section>
    </>
  );
}
