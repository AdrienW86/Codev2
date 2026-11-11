import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import { defaultShareImages } from "@/lib/seo";
import styles from "./page.module.css";

const canonical = "https://www.code-v.fr/tarifs";

export const metadata: Metadata = {
  title: "Tarifs & fonctionnement | Sites, acquisition, automatisation | CODE-V",
  description: "Consultez les tarifs de départ CODE-V, ce qui est inclus et le fonctionnement d’un projet : site web, acquisition Google et automatisation.",
  alternates: { canonical },
  openGraph: {
    title: "Tarifs & fonctionnement — CODE-V",
    description: "Des prix de départ clairs, un périmètre défini avant engagement et un suivi à distance.",
    url: canonical,
    type: "website",
    locale: "fr_FR",
    images: defaultShareImages,
  },
};

const offers = [
  {
    label: "SITE WEB",
    title: "Site vitrine",
    price: "799 € HT",
    unit: "à partir de",
    description: "Pour présenter clairement votre activité et faciliter la prise de contact.",
    includes: ["Structure et parcours mobile", "Pages et contenus cadrés au devis", "Bases techniques et SEO", "Formulaire de contact"],
    href: "/creation-site",
  },
  {
    label: "SITE ÉTENDU",
    title: "Site vitrine + blog",
    price: "1 499 € HT",
    unit: "à partir de",
    description: "Pour développer davantage de contenus, de services et de visibilité organique.",
    includes: ["Architecture plus riche", "Blog / ressources", "Maillage interne", "Parcours de conversion"],
    href: "/creation-site",
  },
  {
    label: "APPLICATION",
    title: "Application web / espace métier",
    price: "2 999 € HT",
    unit: "à partir de",
    description: "Pour créer un outil ou un espace adapté à un usage métier précis.",
    includes: ["Cadrage fonctionnel", "Interface web", "Accès et rôles selon besoin", "Développement sur mesure"],
    href: "/solutions/web-applications",
  },
  {
    label: "ACQUISITION",
    title: "Pilotage Google Ads",
    price: "150 € HT / mois",
    unit: "",
    description: "Pour piloter une campagne et suivre les demandes utiles.",
    includes: ["Structure et réglages", "Suivi des requêtes", "Ajustements documentés", "Lecture des conversions"],
    href: "/publicite",
  },
  {
    label: "ACQUISITION LOCALE",
    title: "Génération de prospects locale",
    price: "300 € HT / mois",
    unit: "",
    description: "Pour travailler plusieurs leviers locaux selon le contexte de l’entreprise.",
    includes: ["Priorités locales", "Présence Google", "Acquisition", "Suivi du dispositif"],
    href: "/referencement-local",
  },
  {
    label: "AUTOMATISATION",
    title: "Assistant / agent pour site web",
    price: "149 € HT / mois",
    unit: "à partir de",
    description: "Pour répondre à certaines demandes simples ou assister une tâche définie.",
    includes: ["Périmètre d’usage", "Assistant intégré", "Sources et limites", "Contrôle humain selon l’enjeu"],
    href: "/solutions/automatisation-ia",
  },
] as const;

const process = [
  ["01", "Vous expliquez le besoin", "Un échange court suffit pour comprendre votre activité, l’existant et le résultat recherché."],
  ["02", "Vous recevez un périmètre clair", "Le devis précise ce qui est inclus, ce qui ne l’est pas, le planning et les responsabilités."],
  ["03", "Vous validez avant démarrage", "Aucun ajout implicite : prix, étapes et validations sont connus avant la mise en œuvre."],
] as const;

const faq = [
  ["Les prix affichés sont-ils définitifs ?", "Ce sont des prix de départ pour les prestations indiquées. Le devis final dépend du périmètre, des contenus, des intégrations et des responsabilités convenues."],
  ["Le budget Google Ads est-il inclus dans les 150 € ?", "Non. Les 150 € HT/mois correspondent au pilotage CODE-V. Le budget média payé à Google est séparé."],
  ["L’hébergement et la maintenance sont-ils inclus dans le prix d’un site ?", "Ils sont cadrés séparément. L’hébergement, le nom de domaine, la maintenance et les évolutions ne sont pas ajoutés implicitement à la création."],
  ["Y a-t-il un engagement ?", "La durée et les conditions dépendent de la prestation. Elles sont indiquées dans le devis avant validation."],
  ["Pouvez-vous garantir un nombre de clients ?", "Non. CODE-V peut améliorer la visibilité, le parcours, la mesure et le pilotage, mais ne garantit pas un volume de ventes."],
] as const;

export default function PricingPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><div className="container">
      <Breadcrumb {...getPageBreadcrumb("/tarifs")} />
      <div className={styles.heroGrid}>
        <div><p className={styles.eyebrow}>TARIFS & FONCTIONNEMENT</p><h1>Des prix de départ.<br /><em>Un périmètre clair.</em></h1><p className={styles.lead}>Vous savez ce que coûte le point de départ, puis le devis précise exactement ce qui sera réalisé. Pas de supplément caché dans un intitulé vague.</p><Link href="/contact" className="button button-primary">Recevoir mon devis gratuit <span aria-hidden="true">↗</span></Link></div>
        <Reveal className={styles.heroNote}><span>CODE-V</span><strong>Prix visible.<br />Périmètre écrit.<br /><em>Validation avant démarrage.</em></strong><small>Rendez-vous en visio · Réponse sous 24 h</small></Reveal>
      </div>
    </div></section>

    <section className={styles.pricing} aria-labelledby="pricing-title"><div className="container">
      <Reveal className={styles.sectionHead}><p className={styles.eyebrow}>LES PRINCIPAUX POINTS D’ENTRÉE</p><h2 id="pricing-title">Choisissez d’abord<br /><span>le résultat recherché.</span></h2></Reveal>
      <div className={styles.grid}>{offers.map(offer => <Reveal key={offer.title}><article className={styles.card}><p className={styles.eyebrow}>{offer.label}</p><h3>{offer.title}</h3><p>{offer.description}</p><div className={styles.price}>{offer.unit && <small>{offer.unit}</small>}<strong>{offer.price}</strong></div><ul>{offer.includes.map(item => <li key={item}>{item}</li>)}</ul><Link href={offer.href}>Voir le détail <span aria-hidden="true">↗</span></Link></article></Reveal>)}</div>
    </div></section>

    <section className={styles.process} aria-labelledby="process-title"><div className="container">
      <Reveal className={styles.sectionHead}><p className={styles.eyebrow}>AVANT DE SIGNER</p><h2 id="process-title">Trois étapes.<br /><em>Aucune zone grise.</em></h2></Reveal>
      <ol>{process.map(([number,title,text]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </div></section>

    <section className={styles.faq} aria-labelledby="faq-title"><div className={`container ${styles.faqGrid}`}>
      <Reveal><p className={styles.eyebrow}>QUESTIONS FRÉQUENTES</p><h2 id="faq-title">Ce qui doit être clair<br /><span>avant l’engagement.</span></h2><Link href="/contact" className="button button-primary">Recevoir mon devis gratuit <span aria-hidden="true">↗</span></Link></Reveal>
      <div>{faq.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
    </div></section>
  </div>;
}
