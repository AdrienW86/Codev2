import ReviewsSection from "@/components/ReviewsSection";
import { getReviewsByIds } from "@/data/reviews";
import Link from "next/link";
import Reveal from "../motion/Reveal";
import ChatTrigger from "../RobotAssistant/ChatTrigger";
import SolutionExplorer from "./SolutionExplorer";
import GrowthCard from "./GrowthCard";
import MotionVideo from "@/components/media/MotionVideo";
import { solutionNavigation, quickServiceNavigation } from "@/data/navigation";
import styles from "./home.module.css";

const method = [
  ["Comprendre", "Votre activité et les points de friction. Une direction partagée, avant les outils."],
  ["Concevoir", "L’expérience et l’architecture. Des choix lisibles, un périmètre explicite."],
  ["Construire", "Les interfaces, les campagnes et les connexions utiles. Tester avant de déployer."],
  ["Mesurer", "Les indicateurs pertinents. Distinguer les impressions des faits observables."],
  ["Faire évoluer", "Les retours du terrain. Améliorer le système, plutôt que tout recommencer."],
];

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroAtmosphere} aria-hidden="true" />
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}><span className={styles.kicker}>CODE-V / STUDIO DIGITAL & TECHNOLOGIE</span>
          <h1 id="home-title"><span>Le digital.</span><span>Avec une</span><span><em>direction.</em></span></h1>
          <p>Des interfaces qui servent vos clients. Des leviers qui attirent. Des outils qui travaillent ensemble.</p>
          <div className={styles.heroActions}><Link className="button button-primary" href="/contact">Parler de votre projet <span aria-hidden="true">↗</span></Link><Link className={styles.heroLink} href="/creation-site">Découvrir la création de site <span aria-hidden="true">→</span></Link></div>
        </div>
        <GrowthCard />
      </div>
      <div className={`container ${styles.heroFoot}`}><span>Concevoir. Connecter. Faire évoluer.</span><span>Un studio / Un système cohérent</span></div>
    </section>
    <section className={styles.quickAccess} aria-labelledby="quick-access-title"><div className="container"><div className={styles.quickHeading}><h2 id="quick-access-title">Votre besoin. Le bon point d’entrée.</h2><Link href="/solutions">Voir toutes les solutions <span aria-hidden="true">↗</span></Link></div><nav className={styles.quickRail} aria-label="Accès directs aux solutions">{quickServiceNavigation.map(link => <Link key={link.href} href={link.href}>{link.label}<span aria-hidden="true">↗</span></Link>)}</nav></div></section>
    <section className={styles.motionStage} aria-labelledby="presentation-title"><div className="container">
      <Reveal className={styles.motionHeading}><span className={styles.kicker}>CODE-V / EN MOUVEMENT</span><h2 id="presentation-title">Construire. Attirer.<br /><em>Convertir. Automatiser.</em></h2><p>20 secondes pour voir comment un site, l’acquisition, la conversion et l’automatisation forment un même système.</p></Reveal>
      <div className={styles.cinema}><div className={styles.cinemaBar} aria-hidden="true"><span>LE SYSTÈME CODE-V</span><span>Motion design / 16:9 / 20 s</span></div><MotionVideo src="/videos/code-v-presentation.mp4" poster="/videos/code-v-presentation-poster.webp" title="Présentation CODE-V" mode="explainer" controls aspectRatio="16 / 9" transcriptLabel="Lire la description de la vidéo" transcript="Une ligne relie plusieurs points : « Tout connecter. » Construire : un site et sa version mobile prennent forme (sites, applications, expériences). Attirer : recherche, SEO, local, publicité, réseaux sociaux et contenu mènent vers le site. Convertir : transformer l’attention en action par un clic, un appel, un formulaire ou un chat. Automatiser : le CRM, les notifications, l’IA et les workflows déclenchent une action. Mesurer, optimiser : un tableau de bord illustre l’acquisition, les interactions et la performance. La vidéo se termine sur le logo CODE-V, « Construire. Attirer. Convertir. Automatiser. » et code-v.fr. Vidéo sans son ; les courbes sont illustratives." /></div>
    </div></section>
    <section className={styles.manifesto} aria-labelledby="approach-title">
      <Reveal className={`container ${styles.manifestoInner}`}><span className={styles.kicker}>LE PROBLÈME N’EST PAS TOUJOURS LE SITE.</span><h2 id="approach-title">Les outils s’accumulent.<br /><span>La cohérence se construit.</span></h2><div className={styles.manifestoBottom}><p>Un site sans demandes. Des campagnes sans suivi. Des informations ressaisies d’un outil à l’autre. Chaque pièce peut fonctionner, sans que l’ensemble vous aide vraiment.</p><p>Notre travail : comprendre les points de friction, choisir les bons leviers et leur donner une direction commune.</p></div><div className={styles.bridge} aria-hidden="true"><span /><i /><span /></div></Reveal>
    </section>
    <section className={styles.system} aria-labelledby="system-title"><div className={`container ${styles.systemInner}`}>
      <Reveal className={styles.systemCopy}><span className={styles.kicker}>DE L’INTENTION À L’ACTION</span><h2 id="system-title">Une présence.<br />Puis un <em>système.</em></h2><p>La visibilité ouvre une porte. L’expérience facilite la prise de contact. Les outils permettent de traiter la demande. Les données éclairent la suite.</p><Link className="text-link" href="/solutions/automatisation-ia">Voir comment connecter les outils <span aria-hidden="true">↗</span></Link></Reveal>
      <Reveal className={styles.systemDiagram}><div className={styles.orbit} aria-hidden="true"><i /><i /></div><div className={styles.systemCore}>Votre<br /><strong>activité.</strong></div><span className={styles.systemTop}>Être trouvé</span><span className={styles.systemRight}>Convaincre</span><span className={styles.systemBottom}>Traiter</span><span className={styles.systemLeft}>Apprendre</span><small>Visibilité, expérience et outils reliés.</small></Reveal>
    </div></section>
    <section className={styles.solutions} aria-labelledby="solutions-title"><div className="container"><Reveal className={styles.sectionHeading}><div><span className={styles.kicker}>NEUF UNIVERS / UNE APPROCHE</span><h2 id="solutions-title">Choisir le bon<br /><span>point d’entrée.</span></h2></div><p>Explorez une expertise. Nous en précisons le rôle, puis le périmètre selon votre activité et votre existant.</p></Reveal><SolutionExplorer items={solutionNavigation} /></div></section>
    <section className={styles.proof} aria-labelledby="proof-title"><Reveal className={`container ${styles.proofInner}`}><div className={styles.proofType} aria-hidden="true">Du concret.<br /><span>Pas du décor.</span></div><div><span className={styles.kicker}>LES PREUVES COMPTENT</span><h2 id="proof-title">Un contexte.<br />Des choix. Des faits.</h2><p>Découvrez les sites réalisés par CODE-V : des interfaces, des parcours et des choix de conception adaptés à chaque activité.</p><Link className="text-link" href="/realisations">Voir nos réalisations <span aria-hidden="true">↗</span></Link></div></Reveal></section>
    <ReviewsSection reviews={getReviewsByIds(["gaston-barreau", "pierre-louis", "olivier-garnier"])} heading="Ce qu’ils retiennent de notre travail." variant="featured" maxItems={3} />    <section className={styles.method} aria-labelledby="method-title"><div className={`container ${styles.methodInner}`}><div className={styles.methodHeading}><span className={styles.kicker}>UNE MÉTHODE, PAS UNE RECETTE</span><h2 id="method-title">Une direction claire.<br /><em>À chaque décision.</em></h2><p>Le projet avance par étapes reliées. Ce que nous apprenons à l’une nourrit la suivante.</p></div><div className={styles.timeline}>{method.map(([title,text])=><Reveal className={styles.milestone} key={title}><span className={styles.milestoneDot} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
    <section className={styles.project} aria-labelledby="project-title"><Reveal className={`container ${styles.projectInner}`}><span className={styles.kicker}>COMMENÇONS PAR VOTRE BESOIN</span><h2 id="project-title">La prochaine<br /><span>bonne question.</span></h2><div className={styles.projectChoices}><ChatTrigger intent="website">Construire une expérience <span aria-hidden="true">↗</span></ChatTrigger><ChatTrigger intent="acquisition">Obtenir plus de demandes <span aria-hidden="true">↗</span></ChatTrigger><ChatTrigger intent="automation">Simplifier mon activité <span aria-hidden="true">↗</span></ChatTrigger><ChatTrigger intent="strategy">Choisir une direction <span aria-hidden="true">↗</span></ChatTrigger></div><Link className="button button-dark" href="/contact">Ou parlons directement de votre projet <span aria-hidden="true">↗</span></Link></Reveal></section>
  </div>;
}
