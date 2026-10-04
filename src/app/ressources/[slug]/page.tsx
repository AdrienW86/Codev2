import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import MotionVideo from "@/components/media/MotionVideo";
import ResourceAction from "@/components/resources/ResourceAction";
import { getResourceBreadcrumb } from "@/data/breadcrumbs";
import { getPublishedResourceBySlug, getPublishedResources, getRelatedResources, getRelatedSolutions, getRelatedProjects } from "@/data/resources";
import { getResourceMetadata, getResourceStructuredData } from "@/lib/resource-seo";
import styles from "../page.module.css";

type Props = { params: Promise<{ slug: string }> };
function getResource(slug: string) {
  const resource = getPublishedResourceBySlug(slug);
  if (!resource) notFound();
  return resource;
}
export function generateStaticParams() { return getPublishedResources().map(resource => ({ slug: resource.slug })); }
export async function generateMetadata({ params }: Props) { return getResourceMetadata(getResource((await params).slug)); }

export default async function ResourcePage({ params }: Props) {
  const resource = getResource((await params).slug);
  const structuredData = getResourceStructuredData(resource);
  const related = getRelatedResources(resource);
  const solutions = getRelatedSolutions(resource);
  const projects = getRelatedProjects(resource);
  const date = (value: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" }).format(new Date(value));
  return <div className={styles.page}>
    {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />}
    <header className={styles.articleHero}><div className="container"><Breadcrumb {...getResourceBreadcrumb(resource.slug, resource.title)} /><h1>{resource.title}</h1><p>{resource.description}</p><p>Par {resource.author!.name} · Publié le <time dateTime={resource.publishedAt!}>{date(resource.publishedAt!)}</time>{resource.updatedAt && <> · Mis à jour le <time dateTime={resource.updatedAt}>{date(resource.updatedAt)}</time></>}{resource.readingTime && <> · {resource.readingTime} min de lecture</>}</p></div></header>
    <article className={styles.articleBody}><div className="container"><div className={styles.reading}>
      <nav className={styles.readingLinks} aria-label="Sommaire de l’article"><p>Dans cet article</p><ol>{resource.content!.map((block, index) => block.type === "heading" && block.level !== 3 ? <li key={index}><a href={`#section-${index}`}>{block.text}</a></li> : null)}</ol></nav>
      {resource.coverImage && <Image src={resource.coverImage.src} alt={resource.coverImage.alt} width={resource.coverImage.width} height={resource.coverImage.height} sizes="(max-width: 800px) calc(100vw - 36px), 760px" />}
      {resource.content!.map((block, index) => {
        if (block.type === "heading") return block.level === 3 ? <h3 key={index} id={`section-${index}`}>{block.text}</h3> : <h2 key={index} id={`section-${index}`}>{block.text}</h2>;
        if (block.type === "list") return <ul key={index}>{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
        if (block.type === "links") return <nav key={index} className={styles.readingLinks} aria-label={block.label}><p>{block.label}</p><ul>{block.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>;
        if (block.type === "table") return <div key={index} className={styles.tableScroll} role="region" aria-label={block.caption} tabIndex={0}><table><caption>{block.caption}</caption><thead><tr>{block.headers.map((header, i) => <th key={i} scope="col">{header}</th>)}</tr></thead><tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
        return <p key={index}>{block.text}</p>;
      })}
      {resource.video && <div className={styles.cinema}><MotionVideo src={resource.video.src} poster={resource.video.poster} title={resource.video.title} mode="explainer" controls muted={false} transcript={resource.video.transcript} /></div>}
      <div className={styles.articleCta}><ResourceAction cta={resource.cta} /></div>
    </div></div></article>
    {(related.length > 0 || solutions.length > 0 || projects.length > 0) && <aside className={styles.related} aria-label="Pour prolonger la lecture"><div className="container">
      {related.length > 0 && <div><h2>Continuer la lecture</h2>{related.map(other => <Link key={other.id} href={`/ressources/${other.slug}`}>{other.title}</Link>)}</div>}
      {solutions.length > 0 && <div><h2>Les solutions associées</h2>{solutions.map(solution => <Link key={solution.id} href={solution.href}>{solution.name}{solution.destinationType === "contact" ? " — échange de cadrage" : ""}</Link>)}</div>}
      {projects.length > 0 && <div><h2>Des réalisations à parcourir</h2>{projects.map(project => <Link key={project.id} href={`/realisations#${project.kind === "internal" ? "laboratoire" : project.featured ? "selection" : project.slug}`}>{project.name}</Link>)}</div>}
    </div></aside>}
  </div>;
}
