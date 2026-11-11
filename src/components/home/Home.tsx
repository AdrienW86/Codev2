import ReviewsSection from "@/components/ReviewsSection";
import { getReviewsByIds } from "@/data/reviews";
import Link from "next/link";
import Reveal from "../motion/Reveal";
import ChatTrigger from "../RobotAssistant/ChatTrigger";
import GrowthCard from "./GrowthCard";
import MotionVideo from "@/components/media/MotionVideo";
import { commercialOfferNavigation } from "@/data/navigation";
import styles from "./home.module.css";

const method = [
  ["Comprendre", "Votre activité, vos clients et le problème à résoudre avant de choisir les outils."],
  ["Construire", "Le site, la campagne, l’automatisation ou l’outil réellement utile au projet."],
  ["Mesurer", "Les demandes, les usages et les signaux qui permettent de savoir ce qui fonctionne."],
  ["Améliorer", "Faire évoluer ce qui existe à partir des retours du terrain, sans multiplier les outils inutilement."],
];

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroAtmosphere} aria-hidden="true" />
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}><span className={styles.kicker}>CODE-V / PARTENAIRE DIGITAL POUR LES ENTREPRISES</span>
          <h1 id="home-title"><span>Sites web.</span><span>Acquisition.</span><span><em>Automatisation.</em></span></h1>
          <p>CODE-V crée votre site ou votre application, vous aide à générer des prospects et automatise les tâches qui ralentissent votre activité.</p>
          <div className={styles.heroActions}><Link className="button button-primary" href="/contact">Parler de mon besoin <span aria-hidden="true">↗</span></Link><Link className={styles.heroLink} href="#offres">Voir les 3 offres <span aria-hidden="true">↓</span></Link></div>
        </div>
        <GrowthCard />
      </div>
      <div className={`container ${styles.heroFoot}`}><span>Sites & applications / Acquisition de clients / Automatisation & outils métier</span><span>Un seul partenaire</span></div>
    </section>

    <section id="offres" className={styles.offers} aria-labelledby="offers-title"><div className="container">
      <Reveal className={styles.offerHeading}><span className={styles.kicker}>L’OFFRE CODE-V</span><h2 id="offers-title">Trois besoins.<br /><span>Trois offres claires.</span></h2><p>Pas besoin de choisir parmi des dizaines de prestations. Commencez par ce que vous voulez obtenir.</p></Reveal>
      <div className={styles.offerGrid}>{commercialOfferNavigation.map((offer, index) => <Reveal className={styles.offerCard} key={offer.id}>
        <span className={styles.offerNumber}>0{index + 1}</span>
        <span className={styles.offerLabel}>{offer.label}</span>
        <h3>{offer.name}</h3>
        <p>{offer.description}</p>
        <ul>{offer.services.map(service => <li key={service}>{service}</li>)}</ul>
        <Link href={offer.href}>{offer.cta} <span aria-hidden="true">↗</span></Link>
      </Reveal>)}</div>
      <div className={styles.complementary}><span>EN COMPLÉMENT</span><p>Hébergement, nom de domaine & maintenance · Motion design · Stratégie et accompagnement selon le projet.</p></div>
    </div></section>

    <section className={styles.proof} aria-labelledby="proof-title"><Reveal className={`container ${styles.proofInner}`}><div className={styles.proofType} aria-hidden="true">Du concret.<br /><span>Pas du décor.</span></div><div><span className={styles.kicker}>DES PROJETS, PAS JUSTE DES PRESTATIONS</span><h2 id="proof-title">Un besoin.<br />Un dispositif adapté.</h2><p>Site, visibilité, publicité ou automatisation : découvrez comment les solutions sont assemblées autour de l’activité réelle de chaque client.</p><Link className="text-link" href="/realisations">Voir nos réalisations <span aria-hidden="true">↗</span></Link></div></Reveal></section>

    <section className={styles.system} aria-labelledby="system-title"><div className={`container ${styles.systemInner}`}>
      <Reveal className={styles.systemCopy}><span className={styles.kicker}>QUAND LES BESOINS SE REJOIGNENT</span><h2 id="system-title">Un site attire.<br />Les outils <em>prennent le relais.</em></h2><p>Un client peut commencer par un site, ajouter de l’acquisition puis automatiser le traitement des demandes. Les trois offres peuvent fonctionner seules ou se compléter.</p><Link className="text-link" href="/solutions">Voir le détail des solutions <span aria-hidden="true">↗</span></Link></Reveal>
      <Reveal className={styles.systemDiagram}><div className={styles.orbit} aria-hidden="true"><i /><i /></div><div className={styles.systemCore}>Votre<br /><strong>activité.</strong></div><span className={styles.systemTop}>Être visible</span><span className={styles.systemRight}>Recevoir des demandes</span><span className={styles.systemBottom}>Automatiser</span><span className={styles.systemLeft}>Convertir</span><small>Site → acquisition → traitement.</small></Reveal>
    </div></section>

    <section className={styles.motionStage} aria-labelledby="presentation-title"><div className="container">
      <Reveal className={styles.motionHeading}><span className={styles.kicker}>CODE-V / EN 20 SECONDES</span><h2 id="presentation-title">Du site au prospect.<br /><em>Du prospect au traitement.</em></h2><p>Une présentation courte de la manière dont présence, acquisition et automatisation peuvent fonctionner ensemble.</p></Reveal>
      <div className={styles.cinema}><div className={styles.cinemaBar} aria-hidden="true"><span>LE SYSTÈME CODE-V</span><span>Motion design / 16:9 / 20 s</span></div><MotionVideo src="/videos/code-v-presentation.mp4" srcSmall="/videos/code-v-presentation-720.mp4" poster="/videos/code-v-presentation-poster.webp" title="Présentation CODE-V" mode="loop" autoplay muted loop controls={false} aspectRatio="16 / 9" /></div>
    </div></section>

    <section className={styles.method} aria-labelledby="method-title"><div className={`container ${styles.methodInner}`}><div className={styles.methodHeading}><span className={styles.kicker}>NOTRE FAÇON DE TRAVAILLER</span><h2 id="method-title">Un problème concret.<br /><em>Une réponse cadrée.</em></h2><p>Nous ne cherchons pas à vendre tous les leviers. Nous partons de l’objectif et de l’existant.</p></div><div className={styles.timeline}>{method.map(([title,text])=><Reveal className={styles.milestone} key={title}><span className={styles.milestoneDot} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>

    <ReviewsSection reviews={getReviewsByIds(["gaston-barreau", "pierre-louis", "olivier-garnier"])} heading="Ce qu’ils retiennent de notre travail." variant="featured" maxItems={3} />

    <section className={styles.project} aria-labelledby="project-title"><Reveal className={`container ${styles.projectInner}`}><span className={styles.kicker}>PAR QUOI COMMENCER ?</span><h2 id="project-title">Choisissez simplement<br /><span>votre objectif.</span></h2><div className={styles.projectChoices}><ChatTrigger intent="website">Créer un site ou une application <span aria-hidden="true">↗</span></ChatTrigger><ChatTrigger intent="acquisition">Obtenir plus de clients <span aria-hidden="true">↗</span></ChatTrigger><ChatTrigger intent="automation">Automatiser mon activité <span aria-hidden="true">↗</span></ChatTrigger></div><Link className="button button-dark" href="/contact">Parler directement de mon besoin <span aria-hidden="true">↗</span></Link></Reveal></section>
  </div>;
}
