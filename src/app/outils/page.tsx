import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getPageBreadcrumb } from '@/data/breadcrumbs';
import { toolsCatalog } from '@/data/tools';
import { defaultShareImages } from '@/lib/seo';
import styles from './page.module.css';
export const metadata: Metadata = {
  title: 'Outils gratuits en ligne : PDF et analyse de site web | CODE-V',
  description: 'Les outils gratuits CODE-V, sans inscription : complétez et signez vos PDF, analysez les performances et le SEO technique de votre site web.',
  alternates: { canonical: 'https://www.code-v.fr/outils' },
  openGraph: { title: 'Les outils gratuits CODE-V', description: 'Moins de tâches compliquées, plus de temps pour votre activité. PDF et analyse de site, sans inscription.', url: 'https://www.code-v.fr/outils', type: 'website', images: defaultShareImages },
};
export default function ToolsPage() {
  return <div className={styles.page}>
    <header className={styles.hero}><div className={styles.shell}>
      <Breadcrumb {...getPageBreadcrumb('/outils')} />
      <p className={styles.eyebrow}>LA BOÎTE À OUTILS CODE-V</p>
      <h1>Des outils utiles.<br /><em>Du temps en plus.</em></h1>
      <p className={styles.lead}>Compléter vos documents, comprendre votre site web : choisissez votre outil et passez à l’action.</p>
      <div className={styles.pills}><span>Gratuits</span><span>Sans inscription</span><span>Directement dans votre navigateur</span></div>
    </div></header>
    <section className={`${styles.shell} ${styles.catalog}`} aria-labelledby="tools-title">
      <div className={styles.sectionTitle}><h2 id="tools-title">De quoi avez-vous besoin ?</h2><span>2 outils à découvrir</span></div>
      <div className={styles.grid}>{toolsCatalog.map(tool => <article className={styles.card} key={tool.id}>
        <div className={styles.cardTop}><span>{tool.number} / {tool.category}</span><span className={styles.icon} aria-hidden="true">{tool.id === 'pdf' ? <svg viewBox="0 0 32 32" fill="none"><path d="M8 3h11l6 6v20H8zM19 3v7h6M12 15h9M12 20h9M12 25h6" /></svg> : <svg viewBox="0 0 32 32" fill="none"><rect x="3" y="4" width="26" height="23" rx="3"/><path d="M3 10h26M8 22l5-5 5 3 6-6"/><circle cx="7" cy="7" r=".5"/></svg>}</span></div>
        <h3>{tool.title}</h3><p>{tool.description}</p>
        <ul>{tool.features.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
        <Link className={styles.toolLink} href={tool.href}>{tool.cta}<span aria-hidden="true">↗</span></Link>
      </article>)}</div>
    </section>
    <section className={`${styles.shell} ${styles.explain}`}><div><p className={styles.eyebrow}>SIMPLE, DÈS LE DÉPART</p><h2>Ouvrez. Utilisez.<br />Avancez.</h2></div><div><p>Pas de compte à créer ni de logiciel à installer. Chaque outil répond à un besoin précis, avec un résultat que vous pouvez utiliser immédiatement.</p><p>Les PDF restent sur votre appareil. L’analyse de site interroge Google PageSpeed Insights à partir de l’adresse publique que vous indiquez.</p><Link href="/politique-confidentialite">Comment vos données sont traitées →</Link></div></section>
    <section className={styles.cta}><div className={styles.shell}><div><p className={styles.eyebrow}>ET POUR ALLER PLUS LOIN</p><h2>Un besoin propre à votre activité ?</h2><p>CODE-V conçoit aussi des sites, des applications et des automatisations adaptés à votre entreprise.</p></div><Link href="/contact">Parlons de votre projet ↗</Link></div></section>
  </div>;
}
