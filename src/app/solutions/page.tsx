import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import ChatTrigger from "@/components/RobotAssistant/ChatTrigger";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import { solutionNavigation } from "@/data/navigation";
import type { ServiceCategory } from "@/data/services";
import styles from "./page.module.css";
import { defaultShareImages } from "@/lib/seo";

const canonical = "https://www.code-v.fr/solutions";
export const metadata: Metadata = {
  title: "Solutions digitales : construire, attirer, automatiser, piloter | CODE-V",
  description: "CODE-V structure son offre autour de quatre besoins : construire votre présence, générer des demandes, automatiser votre activité et mieux piloter votre digital.",
  alternates: { canonical },
  openGraph: { title: "Les offres CODE-V", description: "Un partenaire pour construire, attirer, automatiser et piloter.", url: canonical, type: "website", locale: "fr_FR", images: defaultShareImages },
};

function Family({ id }: { id: ServiceCategory }) {
  const family = solutionNavigation.find(item => item.id === id)!;
  return <article className={styles.family} data-family={id}>
    <div><span className={styles.availability}>{family.destinationType === "family" ? "PAGE FAMILLE" : family.destinationType === "service" ? "EXPERTISE DISPONIBLE" : "ÉCHANGE DE CADRAGE"}</span><h3>{family.name}</h3><p>{family.description}</p></div>
    <Link href={family.href} className={styles.familyLink}>{family.cta}<span aria-hidden="true">↗</span></Link>
    {id === "web" && <Link href="/creation-site" className={styles.familyLink}>Découvrir la création de site<span aria-hidden="true">↗</span></Link>}
    {id === "seo" && <Link href="/referencement-local" className={styles.familyLink}>Découvrir le référencement local<span aria-hidden="true">↗</span></Link>}
  </article>;
}

export default function SolutionsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="solutions-title"><div className="container"><Breadcrumb {...getPageBreadcrumb("/solutions")} /><div className={styles.heroGrid}>
      <div><p className={styles.eyebrow}>LES OFFRES CODE-V</p><h1 id="solutions-title">Un seul partenaire.<br /><em>Quatre façons d’avancer.</em></h1><p className={styles.lead}>Construire votre présence, générer des demandes, automatiser ce qui vous ralentit ou mieux piloter votre digital. Nous partons de votre objectif avant de parler d’outils.</p><Link href="/contact" className="button button-primary">Parler de mon besoin <span aria-hidden="true">↗</span></Link></div>
      <Reveal className={styles.heroAssembly}><span className={styles.diagramLabel}>UNE LECTURE SIMPLE DE L’OFFRE</span><div className={styles.planeOne}><span>Construire</span><strong>Sites. Applications.<br />Outils métier.</strong><i /><i /></div><div className={styles.planeTwo}><span>Attirer</span><strong>Visibilité.<br />Demandes.</strong></div><div className={styles.planeThree}><span>Automatiser & piloter</span><strong>Moins de friction.</strong><i aria-hidden="true" /></div><small>Les expertises viennent au service de l’objectif.</small></Reveal>
    </div><nav className={styles.chapterNav} aria-label="Les quatre offres CODE-V"><a href="#construire">Construire <span aria-hidden="true">↓</span></a><a href="#attirer">Attirer <span aria-hidden="true">↓</span></a><a href="#automatiser">Automatiser <span aria-hidden="true">↓</span></a><a href="#piloter">Piloter <span aria-hidden="true">↓</span></a></nav></div></section>

    <section className={styles.intro} aria-labelledby="combine-title"><Reveal className="container"><div className={styles.introSplit}><span className={styles.eyebrow}>UNE OFFRE LISIBLE AVANT LE CATALOGUE</span><div><h2 id="combine-title">Quatre objectifs.<br /><span>Des expertises derrière.</span></h2><p>Un site, une campagne ou une automatisation n’est pas une fin en soi. CODE-V assemble les compétences utiles selon le problème à résoudre, sans vous demander de choisir seul parmi des dizaines de prestations.</p></div></div><div className={styles.leverLine} aria-label="Construire, attirer, automatiser, piloter">{["Construire", "Attirer", "Automatiser", "Piloter"].map(label => <span key={label}>{label}</span>)}</div></Reveal></section>

    <section id="construire" className={`${styles.chapter} ${styles.experiences}`} aria-labelledby="build-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>01 / CONSTRUIRE</p><h2 id="build-title">Donner à votre activité<br /><span>un socle solide.</span></h2><p>Site vitrine, site étendu avec contenu, application web, espace métier ou support visuel : nous concevons les interfaces qui présentent votre activité et facilitent l’action.</p><div className={styles.interface} aria-hidden="true"><div className={styles.windowBar}><i /><i /><i /><span>Votre présence</span></div><strong>Comprendre.<br /><em>Agir.</em></strong><div className={styles.interfaceModules}><span>Site / App</span><span>Parcours / Contenu</span></div><small>Une base conçue pour évoluer.</small></div></Reveal><div className={styles.families}><Reveal><Family id="web" /></Reveal><Reveal><Family id="software" /></Reveal><Reveal><Family id="content" /></Reveal></div></div></section>

    <section id="attirer" className={`${styles.chapter} ${styles.presence}`} aria-labelledby="attract-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>02 / ATTIRER</p><h2 id="attract-title">Être visible.<br /><em>Obtenir des demandes.</em></h2><p>Référencement, visibilité locale, Google Ads, Local Services et réseaux sociaux ont des rôles différents. Nous choisissons les leviers adaptés à votre activité, votre zone et vos moyens.</p><div className={styles.signal} aria-hidden="true"><i /><i /><i /><strong>Le bon contexte.<br /><span>La bonne demande.</span></strong><small>SEO / Ads / Local / Social</small></div></Reveal><div className={styles.families}><Reveal><Family id="acquisition" /></Reveal><Reveal><Family id="seo" /></Reveal><Reveal><Family id="social" /></Reveal></div></div></section>

    <section id="automatiser" className={`${styles.chapter} ${styles.operations}`} aria-labelledby="automate-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>03 / AUTOMATISER</p><h2 id="automate-title">Moins de ressaisie.<br /><span>Plus de continuité.</span></h2><p>Agents IA, automatisation des e-mails, workflows et connexions entre outils permettent de réduire les tâches répétitives. L’objectif n’est pas d’automatiser pour automatiser, mais de fluidifier le travail réel.</p><div className={styles.connection} aria-hidden="true"><span>Vos demandes</span><i /><strong>Un flux plus simple.</strong><i /><span>Vos outils</span><small>Déclencher / Relier / Contrôler</small></div></Reveal><div className={styles.families}><Reveal><Family id="automation" /></Reveal></div></div></section>

    <section id="piloter" className={`${styles.chapter} ${styles.experiences}`} aria-labelledby="pilot-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>04 / PILOTER</p><h2 id="pilot-title">Garder un système<br /><span>lisible dans la durée.</span></h2><p>Documents commerciaux, organisation des réponses clients, vérifications administratives, hébergement, maintenance et accompagnement : nous pouvons aussi structurer ce qui se passe après la mise en ligne et l’acquisition.</p><div className={styles.interface} aria-hidden="true"><div className={styles.windowBar}><i /><i /><i /><span>Votre activité</span></div><strong>Suivre.<br /><em>Décider.</em></strong><div className={styles.interfaceModules}><span>Maintenance</span><span>Organisation</span></div><small>Un cadre clair pour la suite.</small></div></Reveal><div className={styles.families}><Reveal><Family id="strategy" /></Reveal><Reveal><Family id="maintenance" /></Reveal></div></div></section>

    <section className={styles.guidance} aria-labelledby="guidance-title"><Reveal className={`container ${styles.guidanceGrid}`}><div><p className={styles.eyebrow}>VOUS N’AVEZ PAS À CONNAÎTRE LA PRESTATION.</p><h2 id="guidance-title">Décrivez le problème.<br /><em>Nous cadrerons la suite.</em></h2></div><div><p>Un besoin concret suffit pour commencer. Nous précisons l’existant, les contraintes et l’objectif avant de proposer le bon périmètre.</p><ChatTrigger intent="strategy" className="button button-primary">Cadrer mon besoin avec l’assistant <span aria-hidden="true">↗</span></ChatTrigger><Link className={styles.contactLink} href="/contact">Préférer un échange direct <span aria-hidden="true">↗</span></Link><p className={styles.note}>Les prestations détaillées restent accessibles dans chaque expertise.</p></div></Reveal></section>
  </div>;
}
