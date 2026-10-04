import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import ReviewsSection from "@/components/ReviewsSection";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import { getReviewsByIds } from "@/data/reviews";
import { getServiceById } from "@/data/services";
import styles from "./page.module.css";

const title = "Stratégie digitale : diagnostic & feuille de route | CODE-V";
const description = "Clarifiez vos objectifs et vos priorités digitales avec CODE-V : diagnostic de l’existant, choix des leviers, feuille de route et mesure des actions.";
const canonical = "https://www.code-v.fr/strategie-digitale";
export const metadata: Metadata = { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: "website", locale: "fr_FR" } };
const levers = [
  ["Construire", "Une offre difficile à comprendre ou un parcours qui n’aboutit pas.", "/creation-site", "Création & refonte"],
  ["Être trouvé", "Des services pertinents qui restent difficiles à découvrir.", "/referencement", "Référencement naturel"],
  ["Être présent localement", "Une fiche et un site qui doivent mieux représenter votre activité.", "/referencement-local", "Visibilité locale"],
  ["Attirer", "Une offre ciblée à confronter à une demande et à un budget de diffusion.", "/publicite", "Publicité digitale"],
  ["Relier", "Des outils isolés et des tâches répétées qui occupent l’équipe.", "/solutions/automatisation-ia", "Automatisation & IA"],
  ["Faire durer", "Un site et des usages qui nécessitent un suivi organisé.", "/maintenance-site", "Maintenance & accompagnement"],
];
const questions = [
  ["Faut-il connaître la solution avant de vous contacter ?", "Non. Décrivez l’objectif, ce qui existe et ce qui bloque. Le cadrage sert justement à distinguer un besoin de site, d’acquisition, de contenu ou d’organisation."],
  ["Que contient une feuille de route ?", "Selon le périmètre convenu : constats, actions prioritaires, dépendances, responsabilités et critères de suivi. Les livrables et le niveau de détail sont définis au devis."],
  ["L’exécution est-elle comprise ?", "Le diagnostic et la mise en œuvre sont des périmètres distincts. Les actions retenues peuvent faire l’objet d’un projet ou d’un accompagnement séparé, avec les intervenants concernés."],
  ["Peut-on partir de nos outils actuels ?", "Oui. Le diagnostic examine vos actifs, accès, contraintes et pratiques pour identifier ce qui peut être conservé ou mieux utilisé avant de proposer un changement."],
];
export default function StrategyPage() {
  const service = getServiceById("digital-strategy")!;
  const schema = { "@context": "https://schema.org", "@type": "Service", name: service.name, serviceType: "Stratégie digitale", description, url: canonical, provider: { "@type": "Organization", name: "CODE-V", url: "https://www.code-v.fr" } };
  return <div className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className={styles.hero}><div className="container"><Breadcrumb {...getPageBreadcrumb("/strategie-digitale")} /><div className={styles.heroGrid}><div><p className={styles.eyebrow}>STRATÉGIE DIGITALE / CODE-V</p><h1>Choisir la suite.<br /><em>Avant de multiplier les actions.</em></h1><p>Vous voulez progresser, mais le prochain levier n’est pas évident. Nous relions vos objectifs, vos outils et vos contraintes pour construire un ordre d’action compréhensible.</p><Link href="/contact?service=digital-strategy" className="button button-primary">Faire le point sur vos priorités ↗</Link></div><Reveal className={styles.decision}><p>LE POINT DE DÉPART</p><ol><li>Votre objectif</li><li>Ce qui existe déjà</li><li>Le blocage à résoudre</li></ol><strong>Une décision à éclairer.</strong><span>Pas une accumulation d’outils.</span></Reveal></div></div></section>
    <section className={styles.light}><div className={`container ${styles.split}`}><Reveal><p className={styles.eyebrow}>PARTIR DE VOTRE ENTREPRISE</p><h2>Le contexte<br /><span>avant les canaux.</span></h2></Reveal><div><p>Une demande de prospects, un site à revoir ou une équipe qui ressaisit ses données ne conduisent pas au même projet. Nous cherchons le problème concret, son rôle dans votre activité et les moyens disponibles pour le traiter.</p><dl className={styles.inventory}><div><dt>Objectifs</dt><dd>Quel changement souhaitez-vous observer dans votre activité ?</dd></div><div><dt>Actifs</dt><dd>Site, contenus, fiche Google, campagnes, outils métier et données accessibles.</dd></div><div><dt>Contraintes</dt><dd>Budget, capacité de traitement, accès et responsabilités de l’équipe.</dd></div></dl></div></div></section>
    <section className={styles.priorities}><div className="container"><Reveal><p className={styles.eyebrow}>ARBITRER</p><h2>Le bon levier.<br /><em>Au bon endroit.</em></h2><p>Nous examinons ce qui empêche le parcours d’avancer, puis choisissons des actions compatibles avec votre situation.</p></Reveal><div className={styles.levers}>{levers.map(([name,text,href,label]) => <div key={href}><h3>{name}</h3><p>{text}</p><Link href={href}>{label} <span aria-hidden="true">↗</span></Link></div>)}</div><Link href="/solutions" className={styles.link}>Explorer toutes les solutions ↗</Link></div></section>
    <section className={styles.light}><div className={`container ${styles.split}`}><div><p className={styles.eyebrow}>DE LA DÉCISION À L’ACTION</p><h2>Une feuille de route.<br /><span>Des étapes reliées.</span></h2><Link href="/realisations" className={styles.link}>Voir les réalisations CODE-V ↗</Link></div><ol className={styles.roadmap}>{[["Diagnostiquer", "Examiner l’existant et les parcours utiles."],["Prioriser", "Choisir les actions et leurs dépendances."],["Organiser", "Préciser livrables, responsabilités et moyens."],["Exécuter", "Mettre en œuvre le périmètre convenu."],["Mesurer et ajuster", "Relire les données disponibles et décider de la suite."]].map(([heading,text]) => <li key={heading}><h3>{heading}</h3><p>{text}</p></li>)}</ol></div></section>
    <ReviewsSection reviews={getReviewsByIds(["rene-riviere", "philippe-voisin"])} heading="Une écoute. Des propositions." variant="compact" maxItems={2} compact />
    <section className={styles.light}><div className={`container ${styles.split}`}><div><p className={styles.eyebrow}>AVANCER AVEC DES REPÈRES</p><h2>Des choix à expliquer.<br /><span>Des effets à observer.</span></h2><Link href="/ressources" className={styles.link}>Explorer les ressources ↗</Link><Link href="/ressources/seo-ou-google-ads-prospects" className={styles.link}>SEO ou Google Ads : comment choisir ? ↗</Link></div><div><p>Les indicateurs sont choisis selon les actions : demandes reçues, qualité des contacts, usage d’un parcours ou temps consacré à une tâche. Nous distinguons une interaction, une demande et un client.</p><p>Les objectifs et le suivi s’appuient sur les données accessibles, avec les limites de leur collecte. L’accompagnement permet de réévaluer les priorités lorsque votre contexte change.</p><div className={styles.faq}>{questions.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></div></section>
    <section className={styles.final}><div className="container"><h2>Votre prochaine étape<br /><em>se précise ici.</em></h2><p>Votre activité, votre objectif et ce qui vous freine aujourd’hui : ces éléments suffisent pour commencer l’échange.</p><Link href="/contact?service=digital-strategy" className="button button-primary">Parler de votre stratégie digitale ↗</Link></div></section>
  </div>;
}
