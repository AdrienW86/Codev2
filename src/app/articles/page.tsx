import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import { getPublishedArticles, getRelatedSolutions, type Resource } from "@/data/resources";
import { serviceFamilies } from "@/data/services";
import styles from "./page.module.css";

const canonical = "https://www.code-v.fr/articles";
export const revalidate = 300;
export function generateMetadata(): Metadata {
  return {
    title: "Articles web, SEO, publicité & IA | CODE-V",
    description: "Conseils, analyses et guides CODE-V sur le web, le SEO, la publicité, l’automatisation et les outils digitaux pour les entreprises.",
    alternates: { canonical },
    openGraph: { title: "Articles web, SEO, publicité & IA | CODE-V", description: "Des lectures concrètes pour préparer vos décisions digitales.", url: canonical, type: "website", locale: "fr_FR" },
    robots: { index: getPublishedArticles().some(article => article.indexable), follow: true },
  };
}

function ArticleEntry({ article, featured = false }: { article: Resource; featured?: boolean }) {
  const href = `/ressources/${article.slug}`;
  const theme = serviceFamilies.find(family => family.id === article.topic)?.name;
  const image = article.coverImage;
  return <article className={`${styles.entry} ${featured ? styles.featured : ""}`}>
    {image && <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true"><Image src={image.src} alt="" width={image.width} height={image.height} sizes="(max-width: 768px) calc(100vw - 36px), 60vw" /></Link>}
    <div className={styles.story}>
      <div className={styles.meta}>{theme && <span>{theme}</span>}{article.publishedAt && <time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" }).format(new Date(article.publishedAt))}</time>}{article.readingTime != null && article.readingTime > 0 && <span>{article.readingTime} min de lecture</span>}</div>
      <h2><Link href={href}>{article.title}</Link></h2><p>{article.description}</p>
      <Link href={href} className={styles.link}>Lire l’article <span aria-hidden="true">↗</span></Link>
      {getRelatedSolutions(article).length > 0 && <nav className={styles.related} aria-label={`Solutions liées à ${article.title}`}>{getRelatedSolutions(article).map(solution => <Link key={solution.id} href={solution.href}>{solution.destinationType === "contact" ? "Échanger sur " : "Explorer "}{solution.name}</Link>)}</nav>}
    </div>
  </article>;
}

export default function ArticlesPage() {
  const articles = getPublishedArticles();
  const featured = articles.find(article => article.featured) ?? articles[0];
  return <div className={styles.page}>
    <section className={styles.hero}><div className="container"><Breadcrumb {...getPageBreadcrumb("/articles")} /><div className={styles.heroLayout}><div><p className={styles.eyebrow}>LE REGARD CODE-V</p><h1>Le digital,<br /><em>avec du recul.</em></h1></div><div className={styles.intro}><p>Comprendre les choix derrière un site, une campagne ou une automatisation. Des lectures pour relier les outils aux besoins de votre entreprise.</p><Link href="/ressources" className={styles.link}>Explorer toutes les ressources <span aria-hidden="true">↗</span></Link></div></div></div></section>
    {featured ? <section className={styles.feed} aria-label="Articles publiés"><div className="container"><Reveal><ArticleEntry article={featured} featured /></Reveal>{articles.filter(article => article.id !== featured.id).map(article => <Reveal key={article.id}><ArticleEntry article={article} /></Reveal>)}</div></section> : <section className={styles.empty}><div className={`container ${styles.emptyLayout}`}><div><p className={styles.eyebrow}>POUR POURSUIVRE VOTRE EXPLORATION</p><h2>Une question.<br /><span>Plusieurs perspectives.</span></h2></div><div><p>Les prochains articles trouveront leur place ici. En attendant, explorez les leviers digitaux et les projets CODE-V pour éclairer vos choix.</p><Link href="/ressources" className={styles.link}>Trouver des repères <span aria-hidden="true">↗</span></Link><Link href="/realisations" className={styles.link}>Découvrir les réalisations <span aria-hidden="true">↗</span></Link></div></div></section>}
    <section className={styles.closing}><div className={`container ${styles.closingLayout}`}><h2>Et dans votre<br /><em>entreprise ?</em></h2><div><p>Un besoin précis, des outils déjà en place, une décision à préparer : parlons de votre contexte.</p><Link href="/contact" className={styles.link}>Parler de votre projet <span aria-hidden="true">↗</span></Link></div></div></section>
  </div>;
}
