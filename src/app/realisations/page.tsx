import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import MotionVideo from "@/components/media/MotionVideo";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import { getPublishedProjects, type Project } from "@/data/projects";
import styles from "./page.module.css";

const canonical = "https://www.code-v.fr/realisations";
export const metadata: Metadata = {
  title: "Réalisations web & motion design | CODE-V",
  description: "Découvrez les sites réalisés par CODE-V pour l’hébergement, la restauration, les antiquités et les services locaux, ainsi que son laboratoire interne.",
  alternates: { canonical },
  openGraph: { title: "Réalisations CODE-V", description: "Des sites réels, des univers différents. Explorez une sélection de réalisations web CODE-V.", url: canonical, type: "website", locale: "fr_FR" },
};

function VisitSite({ project }: { project: Project }) {
  if (!project.publicUrl) return null;
  return <a href={project.publicUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>Voir le site<span className={styles.srOnly}> {project.name} — nouvel onglet</span><span aria-hidden="true">↗</span></a>;
}

function ClientProject({ project, index }: { project: Project; index: number }) {
  const image = project.coverImage;
  return <section id={project.slug} className={`${styles.clientSection} ${index % 3 === 1 ? styles.darkProject : ""} ${index % 2 === 1 ? styles.reverse : ""}`} aria-labelledby={`${project.slug}-title`}>
    <div className={`container ${styles.clientGrid}`}>
      <Reveal className={styles.clientCopy}>
        <p className={styles.eyebrow}>0{index + 1} / RÉALISATION WEB</p>
        <h2 id={`${project.slug}-title`}>{project.name}</h2>
        <p>{project.summary}</p>
        {project.location && <p className={styles.location}>{project.location}</p>}
        <VisitSite project={project} />
      </Reveal>
      <Reveal className={styles.clientMedia}>
        {image ? <figure><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 900px) calc(100vw - 36px), (max-width: 1260px) 56vw, 670px" /><figcaption>{image.caption}</figcaption></figure> : <div className={styles.projectDetails}><p className={styles.detailLabel}>À découvrir sur le site</p><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><p className={styles.observation}>Éléments visibles sur le site public. Aucun résultat commercial n’est revendiqué.</p></div>}
      </Reveal>
    </div>
  </section>;
}

export default function ProjectsPage() {
  const published = getPublishedProjects();
  const clients = published.filter(project => project.kind === "client");
  const featured = clients.find(project => project.featured) ?? clients[0];
  const others = clients.filter(project => project.id !== featured?.id);
  const site = published.find(project => project.id === "code-v-site");
  const film = published.find(project => project.id === "code-v-motion");
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="projects-title"><div className="container">
      <Breadcrumb {...getPageBreadcrumb("/realisations")} />
      <Reveal className={styles.heroGrid}><div><p className={styles.eyebrow}>RÉALISATIONS CODE-V</p><h1 id="projects-title">Des métiers.<br /><em>Des univers.</em></h1></div><div className={styles.heroContext}><p>Un domaine à découvrir, une table à réserver, un savoir-faire à présenter. Chaque site ouvre une porte sur une activité et lui donne une présence singulière.</p><a href="#selection" className={styles.jump}>Parcourir les réalisations <span aria-hidden="true">↓</span></a></div></Reveal>
      <nav aria-label="Parcourir les secteurs" className={styles.chapterNav}><a href="#selection">Hébergement & tourisme</a><a href="#buffalo-snack">Restauration</a><a href="#antiquite-canetoise">Antiquités</a><a href="#peinture-occitane">Artisans & services locaux</a><a href="#laboratoire">Laboratoire CODE-V</a></nav>
    </div></section>

    {featured && <section id="selection" className={styles.feature} aria-labelledby="featured-title"><div className="container">
      <Reveal className={styles.featuredHeading}><div><p className={styles.eyebrow}>À LA UNE / HÉBERGEMENT</p><h2 id="featured-title">{featured.name}</h2></div><div><p>{featured.summary}</p><VisitSite project={featured} /></div></Reveal>
      {featured.coverImage && <Reveal className={`${styles.largeMedia} ${styles.featuredMedia}`}><figure><Image src={featured.coverImage.src} alt={featured.coverImage.alt} width={featured.coverImage.width} height={featured.coverImage.height} sizes="(max-width: 1260px) calc(100vw - 40px), 1122px" /><figcaption>{featured.coverImage.caption}</figcaption></figure>{featured.screenshots[1] && <figure className={styles.mobilePreview}><Image src={featured.screenshots[1].src} alt={featured.screenshots[1].alt} width={featured.screenshots[1].width} height={featured.screenshots[1].height} sizes="(max-width: 600px) 120px, 190px" /></figure>}</Reveal>}
      <Reveal className={styles.featuredDetails}><p className={styles.featuredStatement}>Un lieu.<br /><span>Plusieurs expériences.</span></p><div><p>Le site présente les chambres, la table et le domaine. Sa navigation propose de découvrir les espaces et de préparer un séjour.</p><p className={styles.location}>{featured.location}</p><ul>{featured.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div></Reveal>
    </div></section>}

    {others.map((project, index) => <ClientProject key={project.id} project={project} index={index + 1} />)}

    <section id="laboratoire" className={styles.lab} aria-labelledby="lab-title"><div className="container">
      <Reveal className={styles.labHeading}><p className={styles.eyebrow}>DÉMONSTRATIONS INTERNES</p><h2 id="lab-title">Laboratoire CODE-V</h2><p>Notre propre site et notre film de marque permettent d’explorer d’autres formats. Ces deux projets internes sont distincts des références clients présentées plus haut.</p></Reveal>
      <div className={styles.labGrid}>
        {site && <Reveal><h3>Une présence, plusieurs expériences.</h3>{site.coverImage && <Image src={site.coverImage.src} alt={site.coverImage.alt} width={site.coverImage.width} height={site.coverImage.height} sizes="(max-width: 900px) 100vw, 45vw" />}<p>{site.context}</p><Link href="/solutions" className={styles.textLink}>Explorer les solutions <span aria-hidden="true">↗</span></Link></Reveal>}
        {film?.video && <Reveal><h3>Les connexions, rendues visibles.</h3><MotionVideo src={film.video.src} poster={film.video.poster} title={film.video.title} mode="case-study" controls muted={false} aspectRatio="16 / 9" transcript={film.video.description} transcriptLabel="Lire la description du film" /><p className={styles.observation}>Film de marque interne. Les compteurs sont des données de démonstration.</p><Link href="/motion-design" className={styles.textLink}>Explorer le motion design <span aria-hidden="true">↗</span></Link></Reveal>}
      </div>
    </div></section>
    <section className={styles.final} aria-labelledby="next-project-title"><Reveal className="container"><p className={styles.eyebrow}>VOTRE PROCHAIN PROJET</p><h2 id="next-project-title">Un univers à vous.<br /><em>Une présence à construire.</em></h2><p>Parlons de votre activité, de votre public et du rôle que votre site doit jouer.</p><Link href="/contact" className="button button-primary">Parler de votre projet <span aria-hidden="true">↗</span></Link></Reveal></section>
  </div>;
}

