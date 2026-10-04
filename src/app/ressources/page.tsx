import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import MotionVideo from "@/components/media/MotionVideo";
import ChatTrigger from "@/components/RobotAssistant/ChatTrigger";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import { solutionNavigation } from "@/data/navigation";
import { getPublishedResources, resources, resourceHubProject, resourceHubVideo } from "@/data/resources";
import type { ServiceCategory } from "@/data/services";
import styles from "./page.module.css";

const canonical = "https://www.code-v.fr/ressources";
export const metadata: Metadata = {
  title: "Ressources : comprendre et choisir vos leviers digitaux | CODE-V",
  description: "Explorez les thématiques digitales CODE-V, un film explicatif et des réalisations concrètes. Des points de repère pour comprendre les solutions et préparer votre projet.",
  alternates: { canonical },
  openGraph: { title: "Ressources CODE-V", description: "Comprendre les leviers. Observer le travail. Choisir la suite.", url: canonical, type: "website", locale: "fr_FR" },
};
const chapters: { id: string; title: string; description: string; families: ServiceCategory[] }[] = [
  { id: "construire", title: "L’expérience et les outils.", description: "Du site public aux logiciels métier : ce que l’on construit, ce que l’on relie et ce que l’on fait évoluer.", families: ["web", "automation", "software"] },
  { id: "visibilite", title: "Les points de rencontre.", description: "Recherche, publicité et réseaux sociaux : des canaux différents à choisir selon votre audience et votre situation.", families: ["seo", "acquisition", "social"] },
  { id: "continuite", title: "Le fond et la continuité.", description: "Les contenus, les choix de direction et l’entretien des outils donnent un cadre à votre présence dans le temps.", families: ["content", "strategy", "maintenance"] },
];

export default function ResourcesPage() {
  const published = getPublishedResources();
  const briefs = published.length ? [] : resources.filter(resource => resource.status === "draft");
  const project = resourceHubProject;
  const video = resourceHubVideo;
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="resources-title"><div className="container">
      <Breadcrumb {...getPageBreadcrumb("/ressources")} />
      <div className={styles.heroGrid}><div><p className={styles.eyebrow}>LES REPÈRES CODE-V</p><h1 id="resources-title">Comprendre.<br /><em>Puis choisir.</em></h1><p className={styles.lead}>Un projet digital commence souvent par une question. Ici, nous relions les sujets, les solutions et le travail réalisé pour vous aider à préciser la vôtre.</p></div>
      <Reveal className={styles.questionPanel}><p className={styles.eyebrow}>VOTRE POINT DE DÉPART</p><Link href="/solutions/web-applications"><span>01</span>Quel rôle donner à mon site ?<i aria-hidden="true">↗</i></Link><Link href="/referencement"><span>02</span>Comment être trouvé localement ?<i aria-hidden="true">↗</i></Link><Link href="/solutions/automatisation-ia"><span>03</span>Que peut-on automatiser ?<i aria-hidden="true">↗</i></Link><p>Trois questions pour explorer les solutions déjà disponibles.</p></Reveal></div>
      <nav className={styles.chapterNav} aria-label="Dans les ressources"><a href="#en-images">Comprendre en images</a><a href="#thematiques">Explorer les thématiques</a><a href="#edition">Guides & articles</a><a href="#terrain">Voir le travail</a></nav>
    </div></section>

    {video && <section id="en-images" className={styles.filmSection} aria-labelledby="film-title"><div className={`container ${styles.mediaGrid}`}><Reveal><p className={styles.eyebrow}>À DÉCOUVRIR / VIDÉO</p><h2 id="film-title">Des outils isolés.<br /><span>Un parcours à relier.</span></h2><p>Le film de marque CODE-V illustre les connexions entre un site, les emails, un CRM et les tâches du quotidien. Un point de départ visuel pour comprendre l’automatisation.</p><Link href="/solutions/automatisation-ia" className={styles.textLink}>Explorer Automatisation & IA <span aria-hidden="true">↗</span></Link><p className={styles.note}>Démonstration interne. Les compteurs du film ne sont pas des résultats clients.</p></Reveal><Reveal className={styles.cinema}><MotionVideo src={video.src} poster={video.poster} title={video.title} mode="explainer" controls muted={false} aspectRatio="16 / 9" transcript={video.description} transcriptLabel="Lire la description du film" /></Reveal></div></section>}

    <section id="thematiques" className={styles.themes} aria-labelledby="themes-title"><div className="container"><Reveal className={styles.sectionHeading}><p className={styles.eyebrow}>NEUF THÉMATIQUES, DES LIENS ENTRE ELLES</p><h2 id="themes-title">Entrer par le sujet<br /><span>qui vous concerne.</span></h2><p>Chaque thématique ouvre vers une expertise disponible ou un échange de cadrage. Les guides associés seront ajoutés au fil de leur publication.</p></Reveal>
      {chapters.map((chapter, index) => <div key={chapter.id} className={`${styles.themeChapter} ${index === 1 ? styles.darkChapter : ""}`}><Reveal className={styles.chapterStory}><p className={styles.eyebrow}>0{index + 1}</p><h3>{chapter.title}</h3><p>{chapter.description}</p></Reveal><div>{chapter.families.map(id => { const family = solutionNavigation.find(item => item.id === id)!; return <Reveal key={id}><div className={styles.family}><h4>{family.name}</h4><p>{family.description}</p><Link href={family.href}>{family.destinationType === "contact" ? "Échanger sur ce sujet" : "Explorer la solution"}<span className={styles.srOnly}> : {family.name}</span><span aria-hidden="true">↗</span></Link></div></Reveal>; })}</div></div>)}
    </div></section>

    <section id="edition" className={styles.editorial} aria-labelledby="edition-title"><div className="container"><Reveal className={styles.editorialHeading}><div><p className={styles.eyebrow}>GUIDES / ARTICLES / FORMATS PRATIQUES</p><h2 id="edition-title">Des questions précises.<br /><span>{published.length ? "Des choix éclairés." : "Des lectures à venir."}</span></h2></div><p>{published.length ? "Budget d’un site, visibilité sur Google ou première automatisation : des lectures concrètes pour préparer vos décisions et choisir votre prochaine étape." : "Nous préparons une bibliothèque de contenus utiles, publiée progressivement."}</p></Reveal>
      {published.length > 0 && <div className={styles.publishedList}>{published.map(resource => <article key={resource.id}><p className={styles.eyebrow}>RESSOURCE PUBLIÉE</p><h3><Link href={`/ressources/${resource.slug}`}>{resource.title}</Link></h3><p>{resource.description}</p></article>)}</div>}
      <Link href="/articles" className={styles.textLink}>Explorer les articles CODE-V <span aria-hidden="true">↗</span></Link>
      <div className={styles.briefs}>{briefs.map((resource, index) => <Reveal key={resource.id}><div className={styles.brief}><span className={styles.briefNumber}>0{index + 1}</span><div><p className={styles.eyebrow}>EN PRÉPARATION / {resource.format === "guide" ? "GUIDE" : resource.format === "comparison" ? "COMPARATIF" : "CHECKLIST"}</p><h3>{resource.title}</h3><p>{resource.description}</p></div></div></Reveal>)}</div>
    </div></section>

    {project?.coverImage && <section id="terrain" className={styles.proof} aria-labelledby="proof-title"><div className={`container ${styles.proofGrid}`}><Reveal className={styles.proofMedia}><Image src={project.coverImage.src} alt={project.coverImage.alt} width={project.coverImage.width} height={project.coverImage.height} sizes="(max-width: 900px) calc(100vw - 36px), 660px" /><p className={styles.note}>Capture réelle du site {project.name}.</p></Reveal><Reveal><p className={styles.eyebrow}>LE TRAVAIL, CONCRÈTEMENT</p><h2 id="proof-title">Des repères.<br /><span>Et des formes réelles.</span></h2><p>Les réalisations permettent d’observer comment différents métiers prennent place à l’écran. Découvrez {project.name} et les autres sites du portfolio.</p><Link href="/realisations#selection" className={styles.textLink}>Parcourir les réalisations <span aria-hidden="true">↗</span></Link><Link href="/solutions/web-applications" className={styles.textLink}>Comprendre Web & Applications <span aria-hidden="true">↗</span></Link></Reveal></div></section>}

    <section className={styles.guidance} aria-labelledby="guidance-title"><Reveal className={`container ${styles.guidanceGrid}`}><div><p className={styles.eyebrow}>LA SUITE PART DE VOTRE SITUATION</p><h2 id="guidance-title">Une question.<br /><em>Un contexte à préciser.</em></h2></div><div><p>Expliquez votre besoin et ce qui existe déjà. Nous pourrons préciser les points à examiner et la solution à explorer.</p><ChatTrigger intent="strategy" className="button button-primary">Faire le point avec l’assistant</ChatTrigger><Link href="/contact" className={styles.textLink}>Expliquer mon projet à CODE-V <span aria-hidden="true">↗</span></Link></div></Reveal></section>
  </div>;
}

