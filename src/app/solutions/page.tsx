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
  title: "Solutions digitales : les expertises CODE-V",
  description: "Explorez les neuf familles CODE-V : web, acquisition, visibilité, contenu, automatisation et accompagnement. Trouvez le point d’entrée adapté à votre activité.",
  alternates: { canonical },
  openGraph: { title: "Les solutions CODE-V", description: "Des expertises complémentaires, assemblées selon votre besoin.", url: canonical, type: "website", locale: "fr_FR", images: defaultShareImages },
};

function Family({ id }: { id: ServiceCategory }) {
  const family = solutionNavigation.find(item => item.id === id)!;
  const action = family.destinationType === "family" ? "Explorer la famille" : family.destinationType === "service" ? (id === "seo" ? "Découvrir le référencement" : "Découvrir la publicité") : "Échanger sur ce besoin";
  return <article className={styles.family} data-family={id}>
    <div><span className={styles.availability}>{family.destinationType === "family" ? "PAGE FAMILLE" : family.destinationType === "service" ? "EXPERTISE DÉJÀ DISPONIBLE" : "ÉCHANGE DE CADRAGE"}</span><h3>{family.name}</h3><p>{family.description}</p></div>
    <Link href={family.href} className={styles.familyLink}>{action}<span aria-hidden="true">↗</span></Link>
    {id === "web" && <Link href="/creation-site" className={styles.familyLink}>Découvrir la création de site<span aria-hidden="true">↗</span></Link>}
    {id === "seo" && <Link href="/referencement-local" className={styles.familyLink}>Découvrir le référencement local<span aria-hidden="true">↗</span></Link>}
  </article>;
}

export default function SolutionsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="solutions-title"><div className="container"><Breadcrumb {...getPageBreadcrumb("/solutions")} /><div className={styles.heroGrid}>
      <div><p className={styles.eyebrow}>LE CHAMP DES POSSIBLES CODE-V</p><h1 id="solutions-title">Des leviers différents.<br /><em>Un ensemble cohérent.</em></h1><p className={styles.lead}>Votre besoin ne tient pas toujours dans une seule prestation. Nous combinons la conception, la visibilité et les outils pour relier ce que vos clients voient à ce que votre équipe fait.</p><Link href="/contact" className="button button-primary">Trouver mon point d’entrée <span aria-hidden="true">↗</span></Link></div>
      <Reveal className={styles.heroAssembly}><span className={styles.diagramLabel}>UNE LECTURE DE L’OFFRE</span><div className={styles.planeOne}><span>Créer l’expérience</span><strong>Une interface.<br />Une intention.</strong><i /><i /></div><div className={styles.planeTwo}><span>Développer la présence</span><strong>Être trouvé.<br />Être compris.</strong></div><div className={styles.planeThree}><span>Relier les opérations</span><strong>Moins de friction.</strong><i aria-hidden="true" /></div><small>Les leviers d’un parcours digital.</small></Reveal>
    </div><nav className={styles.chapterNav} aria-label="Parcours de solutions"><a href="#experiences">Créer une expérience <span aria-hidden="true">↓</span></a><a href="#presence">Développer sa présence <span aria-hidden="true">↓</span></a><a href="#operations">Relier ses opérations <span aria-hidden="true">↓</span></a></nav></div></section>

    <section className={styles.intro} aria-labelledby="combine-title"><Reveal className="container"><div className={styles.introSplit}><span className={styles.eyebrow}>COMPLÉMENTAIRES PAR CONCEPTION</span><div><h2 id="combine-title">Le bon assemblage<br /><span>commence par votre besoin.</span></h2><p>Construire le support, attirer les bonnes personnes et faciliter la conversion. Puis automatiser ce qui peut l’être, mesurer ce qui compte et optimiser à partir des faits. Tous les leviers ne sont pas nécessaires à chaque projet : leur rôle se décide ensemble.</p></div></div><div className={styles.leverLine} aria-label="Construire, attirer, convertir, automatiser, mesurer, optimiser">{["Construire", "Attirer", "Convertir", "Automatiser", "Mesurer", "Optimiser"].map(label => <span key={label}>{label}</span>)}</div></Reveal></section>

    <section id="experiences" className={`${styles.chapter} ${styles.experiences}`} aria-labelledby="experience-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>L’EXPÉRIENCE</p><h2 id="experience-title">Donner forme<br /><span>à votre activité.</span></h2><p>Une vitrine, une application, une interface métier ou un contenu : le premier rôle du digital est de rendre votre proposition compréhensible et utilisable.</p><div className={styles.interface} aria-hidden="true"><div className={styles.windowBar}><i /><i /><i /><span>Votre expérience</span></div><strong>Ce qui compte.<br /><em>Au premier plan.</em></strong><div className={styles.interfaceModules}><span>Comprendre</span><span>Agir</span></div><small>Parcours / Contenu / Outils</small></div></Reveal><div className={styles.families}><Reveal><Family id="web" /></Reveal><Reveal><Family id="software" /></Reveal><Reveal><Family id="content" /></Reveal></div></div></section>

    <section id="presence" className={`${styles.chapter} ${styles.presence}`} aria-labelledby="presence-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>LA RENCONTRE</p><h2 id="presence-title">Vous avez quelque<br />chose à proposer.<br /><em>Rendons-le visible.</em></h2><p>La recherche, les campagnes et les réseaux sociaux ont des rôles différents. Nous choisissons les points de rencontre pertinents pour votre audience, votre zone et vos moyens.</p><div className={styles.signal} aria-hidden="true"><i /><i /><i /><strong>Le bon contexte.<br /><span>Votre présence.</span></strong><small>Recherche / Campagnes / Social</small></div></Reveal><div className={styles.families}><Reveal><Family id="acquisition" /></Reveal><Reveal><Family id="seo" /></Reveal><Reveal><Family id="social" /></Reveal></div></div></section>

    <section id="operations" className={`${styles.chapter} ${styles.operations}`} aria-labelledby="operations-title"><div className={`container ${styles.chapterGrid}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>LA CONTINUITÉ</p><h2 id="operations-title">Relier aujourd’hui.<br /><span>Préparer la suite.</span></h2><p>Des processus plus lisibles, des priorités partagées et des outils entretenus. Le système doit pouvoir évoluer avec votre organisation, selon un périmètre et des responsabilités définis.</p><div className={styles.connection} aria-hidden="true"><span>Votre équipe</span><i /><strong>Un cadre commun.</strong><i /><span>Vos outils</span><small>Décider / Connecter / Faire évoluer</small></div></Reveal><div className={styles.families}><Reveal><Family id="automation" /></Reveal><Reveal><Family id="strategy" /></Reveal><Reveal><Family id="maintenance" /></Reveal></div></div></section>

    <section className={styles.guidance} aria-labelledby="guidance-title"><Reveal className={`container ${styles.guidanceGrid}`}><div><p className={styles.eyebrow}>VOUS N’AVEZ PAS À TOUT CHOISIR.</p><h2 id="guidance-title">Décrivez la situation.<br /><em>Nous cadrerons la suite.</em></h2></div><div><p>Un problème concret suffit pour commencer. Nous précisons votre besoin, l’existant et les contraintes avant de proposer des leviers et un périmètre sur devis.</p><ChatTrigger intent="strategy" className="button button-primary">Faire le point avec l’assistant <span aria-hidden="true">↗</span></ChatTrigger><Link className={styles.contactLink} href="/contact">Préférer un échange direct <span aria-hidden="true">↗</span></Link><p className={styles.note}>Découvrez les expertises ou échangez avec CODE-V pour préciser votre besoin.</p></div></Reveal></section>
  </div>;
}
