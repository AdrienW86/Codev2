import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import PerformanceAnalyzer from "./PerformanceAnalyzer";
import styles from "./page.module.css";
import { defaultShareImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Audit SEO, GEO et PageSpeed gratuit | CODE-V",
  description: "Analyse gratuite de site web : Google PageSpeed, Core Web Vitals, SEO technique, GEO, liens, accessibilité, plan d'action et rapport PDF détaillé.",
  alternates: { canonical: "https://www.code-v.fr/outils/analyser-site-web" },
  openGraph: { title: "CODE-V — Audit SEO et PageSpeed complet", description: "Analysez la performance, le SEO, les contrôles GEO et téléchargez un rapport complet.", url: "https://www.code-v.fr/outils/analyser-site-web", type: "website", images: defaultShareImages },
};

export default function AuditPage() {

  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.shell}>
        <Breadcrumb {...getPageBreadcrumb("/outils/analyser-site-web")} />
        <p className={styles.eyebrow}>OUTIL GRATUIT · CODE-V PERFORMANCE</p>
        <h1>Votre site est-il <em>vraiment optimisé&nbsp;?</em></h1>
        <p className={styles.lead}>Le meilleur de PageSpeed Insights et d'un audit SEO détaillé : vitesse réelle, performances mobiles, SEO, visibilité IA, accessibilité, liens et recommandations priorisées. Rapport PDF gratuit, sans score inventé.</p>
        {process.env.PERFORMANCE_PUBLIC_ENABLED === "true" ? <PerformanceAnalyzer /> : <p className={styles.notice}>L’analyse est momentanément indisponible. Vous pouvez <Link href="/contact">contacter CODE-V</Link> ou <Link href="/outils">découvrir nos autres outils</Link>.</p>}
      </div>
    </section>
    <section className={styles.explain}>
      <div className={styles.shell}>
        <h2>Un rapport technique et SEO, prêt à exploiter.</h2>
        <div className={styles.features}>
          <article><strong>01 / Performance</strong><p>Temps de chargement, affichage du contenu principal et stabilité visuelle.</p></article>
          <article><strong>02 / Visibilité</strong><p>Contrôles techniques SEO et bonnes pratiques d'accessibilité.</p></article>
          <article><strong>03 / Rapport détaillé</strong><p>Synthèse, plan d'action hiérarchisé, chapitres SEO / GEO / liens et téléchargement PDF.</p></article>
        </div>
        <p className={styles.disclaimer}>Les scores et mesures proviennent de Google PageSpeed Insights / Lighthouse ; CrUX mesure séparément les utilisateurs réels lorsque les données existent. Les backlinks, positions et citations IA nécessitent d'autres sources et ne sont pas inventés.</p>
      </div>
    </section>
  </div>;
}
