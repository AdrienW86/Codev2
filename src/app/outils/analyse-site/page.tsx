import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PerformanceAnalyzer from "./PerformanceAnalyzer";
import styles from "./page.module.css";
import { defaultShareImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Test de vitesse et audit SEO gratuit | CODE-V Performance",
  description: "Analysez la vitesse, le SEO et les Core Web Vitals de votre site et recevez un plan d’amélioration détaillé avec les solutions CODE-V adaptées.",
  alternates: { canonical: "https://www.code-v.fr/outils/analyse-site" },
  openGraph: { title: "CODE-V Performance — Audit de site gratuit", description: "Mesurez la vitesse et les points d'amélioration de votre site web.", url: "https://www.code-v.fr/outils/analyse-site", type: "website", images: defaultShareImages },
};

export default function AuditPage() {
  if (process.env.PERFORMANCE_PUBLIC_ENABLED !== "true") notFound();
  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>OUTIL GRATUIT · CODE-V PERFORMANCE</p>
        <h1>Votre site est-il <em>vraiment rapide&nbsp;?</em></h1>
        <p className={styles.lead}>Analysez la vitesse de chargement, le SEO, l'accessibilité et les bonnes pratiques techniques de votre site. Obtenez un rapport priorisé et des solutions CODE-V adaptées aux anomalies mesurées, sans score inventé.</p>
        <PerformanceAnalyzer />
      </div>
    </section>
    <section className={styles.explain}>
      <div className={styles.shell}>
        <h2>Des chiffres utiles, des actions concrètes.</h2>
        <div className={styles.features}>
          <article><strong>01 / Performance</strong><p>Temps de chargement, affichage du contenu principal et stabilité visuelle.</p></article>
          <article><strong>02 / Visibilité</strong><p>Contrôles techniques SEO et bonnes pratiques d'accessibilité.</p></article>
          <article><strong>03 / Priorités</strong><p>Des points à corriger, classés d'après les économies de temps estimées lorsqu'elles sont disponibles.</p></article>
        </div>
        <p className={styles.disclaimer}>Les scores Lighthouse sont des mesures de laboratoire, pas une garantie du comportement de tous les visiteurs. Les données réelles (CrUX) peuvent être absentes ; elles sont affichées séparément lorsqu'elles sont disponibles.</p>
      </div>
    </section>
  </div>;
}
