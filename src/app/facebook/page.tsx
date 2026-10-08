import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import Breadcrumb from "@/components/Breadcrumb";
import FacebookFeed from "@/components/Facebook";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import { getFacebookFeed } from "@/lib/facebook-feed";
import styles from "./page.module.css";
import { defaultShareImages } from "@/lib/seo";
const canonical = "https://www.code-v.fr/facebook";
export const metadata: Metadata = {
  title: "Publications Facebook & actualités | CODE-V",
  description: "Retrouvez les publications récentes de CODE-V : actualités du studio, projets et repères pour votre activité digitale.",
  alternates: { canonical },
  openGraph: { title: "Les publications CODE-V", url: canonical, type: "website", locale: "fr_FR", images: defaultShareImages },
};
export default async function FacebookPage() {
  await connection();
  const feed = await getFacebookFeed();
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="facebook-title"><div className="container"><Breadcrumb {...getPageBreadcrumb("/facebook")} /><p className={styles.eyebrow}>LE STUDIO / AU FIL DES JOURS</p><h1 id="facebook-title">Les nouvelles<br /><em>de CODE-V.</em></h1><p>Projets, idées et vie du studio : retrouvez nos publications récentes et poursuivez la lecture sur Facebook.</p></div></section>
    <section className={styles.editorial} aria-labelledby="feed-title"><div className="container"><div className={styles.heading}><h2 id="feed-title">Nos dernières publications.</h2><span>Le fil CODE-V</span></div><FacebookFeed feed={feed} /></div></section>
    <section className={styles.more} aria-labelledby="more-title"><div className="container"><p className={styles.eyebrow}>POURSUIVRE LA DÉCOUVERTE</p><h2 id="more-title">Des nouvelles.<br /><span>Et des projets à construire.</span></h2><nav aria-label="Découvrir CODE-V"><Link href="/ressources">Explorer les ressources <span aria-hidden="true">↗</span></Link><Link href="/realisations">Voir les réalisations <span aria-hidden="true">↗</span></Link><Link href="/solutions">Découvrir les solutions <span aria-hidden="true">↗</span></Link></nav><Link href="/contact" className="button button-dark">Parler de votre projet <span aria-hidden="true">↗</span></Link></div></section>
  </div>;
}
