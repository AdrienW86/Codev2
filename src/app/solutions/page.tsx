import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import ChatTrigger from "@/components/RobotAssistant/ChatTrigger";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import styles from "./page.module.css";
import { defaultShareImages } from "@/lib/seo";

const canonical = "https://www.code-v.fr/solutions";
export const metadata: Metadata = {
  title: "Sites, acquisition & automatisation pour entreprises | CODE-V",
  description: "Découvrez les trois offres CODE-V : sites et applications, acquisition de clients, automatisation et outils métier. Hébergement, maintenance et motion design en complément.",
  alternates: { canonical },
  openGraph: { title: "Les 3 offres CODE-V", description: "Sites & applications, acquisition de clients, automatisation & outils métier.", url: canonical, type: "website", locale: "fr_FR", images: defaultShareImages },
};

const webServices = [
  ["Site vitrine", "Un site professionnel clair pour présenter votre activité et faciliter la prise de contact.", "/creation-site"],
  ["Site vitrine étendu / blog", "Un site plus riche pour développer vos contenus, vos services et votre référencement.", "/creation-site"],
  ["Application web / espace métier", "Une interface ou un outil conçu autour de vos usages internes ou de vos clients.", "/solutions/web-applications"],
];

const acquisitionServices = [
  ["Acquisition locale / génération de prospects", "Structurer les leviers utiles pour obtenir des demandes dans votre zone.", "/referencement-local"],
  ["Pilotage Google Ads", "Créer, suivre et ajuster des campagnes orientées vers des demandes pertinentes.", "/publicite"],
  ["Google Local Services", "Mettre en place et piloter ce canal lorsqu’il est adapté et disponible pour votre activité.", "/publicite"],
  ["Google Business Profile", "Optimiser votre présence locale et la cohérence de votre fiche Google.", "/referencement-local"],
  ["Réseaux sociaux", "Créer et entretenir une présence cohérente sur les plateformes utiles à votre activité.", "/contact?service=social-management"],
];

const automationServices = [
  ["Agent IA / site web", "Ajouter un assistant capable de répondre, orienter ou préparer une action dans un cadre défini.", "/solutions/automatisation-ia"],
  ["Automatisation d’e-mails", "Déclencher, organiser ou préparer des e-mails sans ressaisie inutile.", "/solutions/automatisation-ia"],
  ["Automatisation Google Ads", "Automatiser certaines tâches de suivi ou de traitement tout en conservant un contrôle humain.", "/solutions/automatisation-ia"],
  ["Documents commerciaux", "Structurer la génération et la préparation de devis, factures ou documents récurrents.", "/contact?service=business-tool"],
  ["Organisation des réponses clients", "Centraliser ou préparer les réponses pour réduire les tâches répétitives.", "/solutions/automatisation-ia"],
  ["Vérifications administratives d’entreprise", "Automatiser la collecte et la vérification de certaines informations publiques utiles.", "/contact?service=business-tool"],
];

function ServiceList({ items }: { items: string[][] }) {
  return <div className={styles.serviceList}>{items.map(([name, description, href]) => <article className={styles.serviceItem} key={name}>
    <div><h3>{name}</h3><p>{description}</p></div>
    <Link href={href}>En savoir plus <span aria-hidden="true">↗</span></Link>
  </article>)}</div>;
}

export default function SolutionsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="solutions-title"><div className="container"><Breadcrumb {...getPageBreadcrumb("/solutions")} /><div className={styles.heroGrid}>
      <div><p className={styles.eyebrow}>LES 3 OFFRES CODE-V</p><h1 id="solutions-title">Sites. Acquisition.<br /><em>Automatisation.</em></h1><p className={styles.lead}>Trois offres simples pour couvrir les besoins les plus fréquents des entreprises : construire leur présence, générer des clients et gagner du temps dans leur fonctionnement.</p><Link href="/contact" className="button button-primary">Parler de mon besoin <span aria-hidden="true">↗</span></Link></div>
      <Reveal className={styles.heroAssembly}><span className={styles.diagramLabel}>UNE OFFRE LISIBLE</span><div className={styles.planeOne}><span>Sites & applications</span><strong>Être présent.<br />Être crédible.</strong><i /><i /></div><div className={styles.planeTwo}><span>Acquisition de clients</span><strong>Être trouvé.<br />Être contacté.</strong></div><div className={styles.planeThree}><span>Automatisation & outils métier</span><strong>Gagner du temps.</strong><i aria-hidden="true" /></div><small>Les prestations détaillées viennent ensuite.</small></Reveal>
    </div><nav className={styles.chapterNav} aria-label="Les trois offres CODE-V"><a href="#sites-applications">Sites & applications <span aria-hidden="true">↓</span></a><a href="#acquisition">Acquisition de clients <span aria-hidden="true">↓</span></a><a href="#automatisation">Automatisation & outils métier <span aria-hidden="true">↓</span></a></nav></div></section>

    <section className={styles.intro} aria-labelledby="combine-title"><Reveal className="container"><div className={styles.introSplit}><span className={styles.eyebrow}>PAS BESOIN DE CONNAÎTRE LE BON OUTIL</span><div><h2 id="combine-title">Commencez par<br /><span>ce que vous voulez obtenir.</span></h2><p>Vous pouvez nous confier une seule prestation ou plusieurs briques complémentaires. Le rôle de CODE-V est de proposer un périmètre compréhensible, pas de vous faire choisir dans un catalogue technique.</p></div></div><div className={styles.leverLine} aria-label="Sites et applications, acquisition, automatisation">{["Sites & applications", "Acquisition de clients", "Automatisation & outils métier"].map(label => <span key={label}>{label}</span>)}</div></Reveal></section>

    <section id="sites-applications" className={`${styles.chapter} ${styles.experiences}`} aria-labelledby="web-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>01 / SITES & APPLICATIONS</p><h2 id="web-title">Créer votre présence<br /><span>et vos outils.</span></h2><p>Pour présenter votre activité, convertir des visiteurs ou créer un espace métier adapté à votre fonctionnement.</p><div className={styles.interface} aria-hidden="true"><div className={styles.windowBar}><i /><i /><i /><span>Votre interface</span></div><strong>Site.<br /><em>Application.</em></strong><div className={styles.interfaceModules}><span>Présenter</span><span>Faire agir</span></div><small>Web / Applications / Espaces métier</small></div></Reveal><ServiceList items={webServices} /></div></section>

    <section id="acquisition" className={`${styles.chapter} ${styles.presence}`} aria-labelledby="acquisition-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>02 / ACQUISITION DE CLIENTS</p><h2 id="acquisition-title">Être visible.<br /><em>Obtenir des demandes.</em></h2><p>Référencement local, publicité et réseaux sociaux sont utilisés selon votre activité, votre zone et le type de prospects recherchés.</p><div className={styles.signal} aria-hidden="true"><i /><i /><i /><strong>Visibilité.<br /><span>Demandes.</span></strong><small>SEO local / Ads / Local Services / Social</small></div></Reveal><ServiceList items={acquisitionServices} /></div></section>

    <section id="automatisation" className={`${styles.chapter} ${styles.operations}`} aria-labelledby="automation-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>03 / AUTOMATISATION & OUTILS MÉTIER</p><h2 id="automation-title">Moins de tâches répétitives.<br /><span>Des outils plus utiles.</span></h2><p>Automatisations, agents IA et outils métier servent à réduire les ressaisies, organiser les informations et accélérer les opérations qui reviennent chaque semaine.</p><div className={styles.connection} aria-hidden="true"><span>Vos demandes</span><i /><strong>Un flux plus simple.</strong><i /><span>Vos outils</span><small>IA / E-mails / Documents / Workflows</small></div></Reveal><ServiceList items={automationServices} /></div></section>

    <section className={styles.complements} aria-labelledby="complements-title"><Reveal className="container"><p className={styles.eyebrow}>SERVICES COMPLÉMENTAIRES</p><h2 id="complements-title">Ce qui permet au dispositif<br /><span>de durer et de mieux se présenter.</span></h2><div className={styles.complementGrid}><article><h3>Hébergement, nom de domaine & maintenance</h3><p>Hébergement, suivi et maintenance du site selon le périmètre convenu.</p><Link href="/maintenance-site">Découvrir la maintenance <span aria-hidden="true">↗</span></Link></article><article><h3>Motion design</h3><p>Présenter une activité, une offre ou un fonctionnement dans un format animé.</p><Link href="/motion-design">Découvrir le motion design <span aria-hidden="true">↗</span></Link></article><article><h3>Stratégie & accompagnement</h3><p>Prioriser les actions lorsque plusieurs sujets doivent être coordonnés.</p><Link href="/strategie-digitale">Découvrir la stratégie <span aria-hidden="true">↗</span></Link></article></div></Reveal></section>

    <section className={styles.guidance} aria-labelledby="guidance-title"><Reveal className={`container ${styles.guidanceGrid}`}><div><p className={styles.eyebrow}>VOUS HÉSITEZ ENTRE PLUSIEURS OFFRES ?</p><h2 id="guidance-title">Décrivez le problème.<br /><em>Nous cadrerons la suite.</em></h2></div><div><p>Un besoin concret suffit : un site à refaire, un manque de prospects, trop de tâches manuelles ou plusieurs sujets à relier.</p><ChatTrigger intent="strategy" className="button button-primary">Expliquer ma situation <span aria-hidden="true">↗</span></ChatTrigger><Link className={styles.contactLink} href="/contact">Préférer un échange direct <span aria-hidden="true">↗</span></Link></div></Reveal></section>
  </div>;
}
