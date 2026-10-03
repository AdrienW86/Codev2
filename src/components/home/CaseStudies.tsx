import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import styles from "./home.module.css";

export type CaseStudy = { id: string; title: string; sector: string; problem: string; intervention: string; levers: string[]; verifiedResults?: { label: string; value: string; sourceUrl: string }[]; screenshot?: { src: string; alt: string; width: number; height: number }; href?: string; provisional?: boolean };
// Replace these neutral editorial placeholders with sourced client studies.
const studies: CaseStudy[] = [
  { id: "web", title: "Une présence qui convainc", sector: "Site & conversion", problem: "Contexte client à documenter.", intervention: "Présentation du projet et des choix de conception à venir.", levers: ["Site", "Expérience", "Conversion"], provisional: true },
  { id: "system", title: "Des leviers qui se connectent", sector: "Acquisition & automatisation", problem: "Contexte client à documenter.", intervention: "Présentation des outils et du système mis en place à venir.", levers: ["Acquisition", "Workflows", "Données"], provisional: true },
];
export default function CaseStudies({ items = studies }: { items?: CaseStudy[] }) {
  return <section className={`section ${styles.caseSection}`} id="realisations"><Reveal className="container"><div className="section-heading"><div><span className="eyebrow"><i />Réalisations</span><h2>Des systèmes conçus pour <span>des entreprises réelles.</span></h2></div><p>Les études de cas détaillées sont en préparation. Elles présenteront le contexte, nos interventions et les résultats vérifiés.</p></div><div className={styles.caseGrid}>{items.map(item => <article className={styles.caseStudy} key={item.id}>{item.screenshot ? <Image {...item.screenshot} className={styles.screenshot} /> : <div className={styles.casePlaceholder} aria-hidden="true"><img src="/brand/code-v-logo-horizontal-dark.svg" width="520" height="150" alt="" className="brand-logo" /><div /><small>Dossier en préparation</small></div>}<span className="eyebrow">{item.sector}</span><h3>{item.title}</h3>{item.provisional && <span className={styles.provisional}>Aperçu éditorial — aucun résultat client présenté</span>}<dl><dt>Contexte</dt><dd>{item.problem}</dd><dt>Intervention</dt><dd>{item.intervention}</dd></dl><div className={styles.caseTags}>{item.levers.map(label => <span key={label}>{label}</span>)}</div>{item.verifiedResults?.map(result => <p key={result.label}>{result.label} : <strong>{result.value}</strong> <a className="text-link" href={result.sourceUrl}>Source</a></p>)}{item.href && <Link className="text-link" href={item.href}>Voir le projet <span aria-hidden="true">↗</span></Link>}</article>)}</div></Reveal></section>;
}
