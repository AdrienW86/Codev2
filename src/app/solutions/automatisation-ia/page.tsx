import ResourceReadings from "@/components/resources/ResourceReadings";
﻿import Breadcrumb from "@/components/Breadcrumb";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import ChatTrigger from "@/components/RobotAssistant/ChatTrigger";
import Reveal from "@/components/motion/Reveal";
import MotionVideo from "@/components/media/MotionVideo";
import SystemFlow from "@/components/services/SystemFlow";
import { getServiceById } from "@/data/services";
import styles from "./page.module.css";
import { defaultShareImages } from "@/lib/seo";

const url = "https://www.code-v.fr/solutions/automatisation-ia";
export const metadata: Metadata = {
  title: "Automatisation & IA pour entreprise | CODE-V",
  description: "Connectez vos outils, automatisez vos processus et concevez des agents IA spécialisés avec CODE-V. Workflows, API, Airtable et supervision humaine.",
  alternates: { canonical: url },
  openGraph: { title: "Automatisation & IA — CODE-V", description: "Des outils connectés, des processus lisibles et une IA encadrée pour votre activité.", url, type: "website", locale: "fr_FR", images: defaultShareImages },
};

const offers = ["business-workflows", "airtable-workspace", "api-integrations", "ai-agents", "automated-reporting", "automation-supervision"].map(id => {
  const service = getServiceById(id);
  if (!service) throw new Error(`Missing catalog service: ${id}`);
  return service;
});
const steps = [
  { title: "Une demande entre", detail: "Un prospect transmet des informations depuis le site ou un formulaire." },
  { title: "Les données se structurent", detail: "Le CRM ou Airtable reçoit une fiche cohérente, avec contrôle des doublons." },
  { title: "Une logique oriente", detail: "Des règles ou un agent proposent une qualification selon vos critères." },
  { title: "Une personne valide", detail: "Les actions sensibles et les réponses engageantes restent soumises à votre accord.", human: true },
  { title: "Une action se prépare", detail: "Une notification, un email ou un document est préparé selon le mandat défini." },
  { title: "Le suivi devient visible", detail: "Un rapport rassemble les étapes exécutées, les exceptions et les actions à reprendre." },
];
const distinctions = [
  ["Workflow automatisé", "Une suite d’étapes définies à l’avance : un événement déclenche des règles, des échanges de données et des actions. L’IA n’est pas obligatoire."],
  ["Chatbot", "Une interface de conversation. Elle peut guider une demande ou répondre à partir de sources, sans nécessairement agir dans vos outils."],
  ["Assistant IA", "Un outil qui aide une personne à rédiger, retrouver, résumer ou analyser une information. L’utilisateur garde la décision et déclenche les actions."],
  ["Agent IA", "Un système qui peut choisir des étapes et utiliser des outils dans un périmètre autorisé. Ses permissions, critères d’arrêt et validations doivent être explicites."],
];
const method = [
  ["Analyser", "Identifier le processus, ses irritants, ses volumes et la personne qui en est responsable."],
  ["Cartographier", "Définir sources, étapes, règles, exceptions et moments de validation."],
  ["Automatiser", "Construire les connexions et les scénarios utiles, puis tester sur des exemples représentatifs."],
  ["Sécuriser", "Limiter les permissions, vérifier les données et organiser la reprise après erreur."],
  ["Mesurer", "Suivre les exécutions, les exceptions et les indicateurs choisis ensemble."],
  ["Améliorer", "Ajuster le système à partir des retours, des incidents et de l’évolution de vos outils."],
];

export default function AutomationPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="automation-title"><div className={`container ${styles.heroGrid}`}>
      <div><Breadcrumb {...getPageBreadcrumb("/solutions/automatisation-ia")} /><p className={styles.eyebrow}>Automatisation & IA</p>
        <h1 id="automation-title">Moins de tâches répétées.<br /><em>Des outils qui travaillent ensemble.</em></h1>
        <p className={styles.lead}>Connecter vos outils, faire circuler les données et construire une IA qui aide votre équipe : nous concevons des systèmes adaptés à vos processus, avec des limites claires.</p>
        <div className={styles.actions}><ChatTrigger intent="automation" className="button button-primary">Expliquer mon processus <span aria-hidden="true">↗</span></ChatTrigger><a className="button button-ghost" href="#systeme">Comprendre le parcours <span aria-hidden="true">↓</span></a></div>
        <p className={styles.heroNote}>Workflows · APIs · Airtable · Agents IA</p>
      </div>
      <div className={styles.heroVisual}><span className={styles.eyebrow}>D’une demande à une action</span><SystemFlow compact steps={[steps[0], steps[2], steps[3]]} /><div className={styles.visualFooter}><span>Connecter</span><span>Contrôler</span><span>Améliorer</span></div></div>
    </div></section>

    <section className={styles.section}><Reveal className={`container ${styles.problem}`}><div><p className={styles.eyebrow}>Le point de départ</p><h2>Vos outils fonctionnent.<br /><span>Mais travaillent-ils ensemble ?</span></h2></div><div><p className={styles.large}>Une information copiée trois fois. Une demande oubliée. Un rapport assemblé à la main. Le problème se trouve souvent entre les outils.</p><p>Quand les tâches répétitives, les doubles saisies et les outils isolés s’accumulent, le suivi commercial devient irrégulier et certaines informations se perdent. Nous partons de ces situations concrètes pour déterminer ce qui mérite d’être automatisé.</p></div></Reveal></section>

    <section id="systeme" className={`${styles.section} ${styles.dark}`}><div className="container"><Reveal className={styles.sectionHead}><p className={styles.eyebrow}>Un système, étape par étape</p><h2>Une demande circule.<br /><em>Vous gardez la main.</em></h2><p>Voici un scénario générique de suivi de prospect. Les outils et les règles seraient adaptés à votre organisation ; ce schéma ne représente pas un projet client réalisé.</p></Reveal><SystemFlow steps={steps} /></div></section>

    <section className={styles.section}><div className="container"><Reveal className={styles.sectionHead}><p className={styles.eyebrow}>Les leviers du catalogue</p><h2>Automatiser le bon usage.<br /><span>Pas tout, à tout prix.</span></h2><p>Qualification de leads, opérations commerciales, marketing, contenus, synchronisation ou assistants internes : chaque besoin combine seulement les briques pertinentes.</p></Reveal><div className={styles.offerList}>{offers.map((service, index) => <Reveal key={service.id}><article className={styles.offer}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><div><h3>{service.name}</h3><p>{service.summary}</p><details><summary>Prérequis et limites à cadrer</summary><ul>{service.prerequisites.map(item => <li key={item}>{item}</li>)}</ul><ul>{service.excluded.map(item => <li key={item}>{item}</li>)}</ul></details></div><Link className={styles.offerLink} href={service.cta.href}>{service.cta.label}<span aria-hidden="true"> ↗</span></Link></article></Reveal>)}</div></div></section>

    <section className={`${styles.section} ${styles.soft}`}><div className="container"><Reveal className={styles.agentHeading}><div><p className={styles.eyebrow}>Agents & assistants IA</p><h2>Une conversation n’est pas<br /><span>une autonomie totale.</span></h2><p>Ces termes décrivent des rôles différents. Un chatbot peut donner accès à un assistant ; un agent peut participer à un workflow. Le choix dépend de la tâche et du niveau de contrôle nécessaire.</p></div><img src="/brand/code-v-robot.svg" width="875" height="660" alt="" /></Reveal><div className={styles.distinctions}>{distinctions.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><p className={styles.caution}>Une IA peut produire une information inexacte. Nous prévoyons des sources autorisées, des évaluations et des validations humaines adaptées à l’enjeu, sans promettre une exactitude ou une autonomie totale.</p></div></section>

    <section className={styles.section}><div className="container"><Reveal className={styles.sectionHead}><p className={styles.eyebrow}>Exemples de fonctionnement</p><h2>Des usages concrets.<br /><span>Des scénarios à adapter.</span></h2><p>Exemples génériques, et non réalisations clients ou résultats garantis.</p></Reveal><div className={styles.examples}><article><span className={styles.number}>01 / Suivi commercial</span><h3>Une demande, un suivi cohérent.</h3><p>Le formulaire alimente une fiche CRM. Une qualification est proposée, l’équipe reçoit une notification et une relance est préparée pour validation. Le rapport suit les étapes traitées et celles à reprendre.</p><span className={styles.exampleBoundary}>Envoi d’une réponse engageante : validation humaine.</span></article><article><span className={styles.number}>02 / Reporting & information</span><h3>Des sources dispersées, une synthèse utile.</h3><p>Des données accessibles sont consolidées. Un assistant prépare une synthèse et un document ; les incohérences sont signalées avant diffusion. L’équipe vérifie les éléments qui fondent ses décisions.</p><span className={styles.exampleBoundary}>Données manquantes ou incorrectes : aucune reconstitution garantie.</span></article></div></div></section>

    <section className={`${styles.section} ${styles.videoSection}`} aria-labelledby="automation-video-title"><div className={`container ${styles.videoGrid}`}><Reveal className={styles.videoCopy}><p className={styles.eyebrow}>CODE-V / En mouvement</p><h2 id="automation-video-title">Des outils isolés.<br />{" "}<span>Un système connecté.</span></h2><p>Cette séquence montre comment un site, les emails, un CRM et les automatisations peuvent former un environnement cohérent, puis illustre le parcours d’une demande.</p><p>Dans votre projet, les règles, les permissions et les validations humaines sont définies selon vos processus. Les compteurs du film sont des données de démonstration, sans résultat client ni engagement de performance.</p><p className={styles.videoNote}>26 secondes pour visualiser les connexions. Lecture à votre initiative.</p></Reveal><div className={styles.videoStage}><div className={styles.videoLabel}><span>LE SYSTÈME CODE-V</span><span>Motion design / 16:9</span></div><MotionVideo src="/videos/automatisation.mp4" poster="/videos/automatisation-poster.webp" title="Automatisation & intelligence artificielle" mode="explainer" controls muted={false} aspectRatio="16 / 9" className={styles.videoPlayer} transcriptLabel="Lire la description de la vidéo" transcript="La séquence part d’outils isolés : site web, emails, CRM, réseaux sociaux, facturation et automatisations. CODE-V les relie dans un même environnement, puis présente les rôles du web, de l’automatisation, de l’intelligence artificielle et de l’acquisition. Un parcours prospect → site web → automatisation → client illustre la circulation des informations et le suivi. Les compteurs affichés sont des données de démonstration, pas des résultats clients. Dans un projet réel, les actions et validations sont à définir selon le périmètre autorisé." /></div></div></section>

    <section className={styles.section}><div className="container"><Reveal className={styles.sectionHead}><p className={styles.eyebrow}>Technologies & connexions</p><h2>Les outils servent le processus.<br /><span>Pas l’inverse.</span></h2></Reveal><dl className={styles.technologies}><div><dt>Make & workflows</dt><dd>Orchestrer des étapes, déclencher des actions et traiter les exceptions prévues.</dd></div><div><dt>Airtable & données</dt><dd>Structurer les informations et créer une base exploitable par les équipes.</dd></div><div><dt>APIs & webhooks</dt><dd>Connecter des outils métier et synchroniser les données accessibles.</dd></div><div><dt>IA & interfaces web</dt><dd>Assister une tâche précise et donner aux utilisateurs un point de contrôle lisible.</dd></div></dl><p className={styles.related}>Une interface spécifique est nécessaire ? <Link href="/solutions/web-applications">Découvrir nos applications web</Link>. Plusieurs leviers sont à coordonner ? <ChatTrigger intent="strategy" className={styles.textButton}>Parlons de votre stratégie digitale</ChatTrigger>.</p></div></section>

    <section className={`${styles.section} ${styles.dark}`}><div className="container"><Reveal className={styles.sectionHead}><p className={styles.eyebrow}>Notre méthode</p><h2>Comprendre d’abord.<br /><em>Construire avec méthode.</em></h2></Reveal><ol className={styles.method}>{method.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

    <section className={styles.section}><div className={`container ${styles.safety}`}><Reveal><p className={styles.eyebrow}>Limites, sécurité & supervision</p><h2>Un système utile doit aussi<br /><span>être maîtrisable.</span></h2><p>La sécurité et le suivi ne sont pas des promesses absolues. Leur périmètre est défini avec vos contraintes, les accès disponibles et les responsabilités de chacun.</p><Link className="text-link" href="/contact?service=automation-supervision">Étudier la supervision de mon système <span aria-hidden="true">↗</span></Link></Reveal><dl><div><dt>Permissions proportionnées</dt><dd>Limiter les outils accessibles et les actions autorisées ; définir qui peut déclencher, modifier ou valider.</dd></div><div><dt>Données et sources</dt><dd>Identifier les données autorisées, leur qualité, les destinataires et les conditions de conservation à convenir.</dd></div><div><dt>Validation humaine</dt><dd>Garder un accord explicite pour les actions sensibles : messages engageants, changements importants ou décisions à enjeu.</dd></div><div><dt>Journalisation et reprise</dt><dd>Prévoir des traces utiles, des alertes, le traitement des exceptions et un chemin de reprise après erreur.</dd></div><div><dt>Supervision dans la durée</dt><dd>Définir fréquence, seuils et responsables. Maintenance, licences et consommations des outils et modèles sont à distinguer de la mise en place.</dd></div></dl></div></section>

    <ResourceReadings services={["business-workflows","ai-agents"]} heading="Choisir votre premier usage" />
    <section className={`${styles.section} ${styles.final}`}><div className="container"><p className={styles.eyebrow}>Partons d’un processus</p><h2>Quelle tâche aimeriez-vous<br /><em>cesser de répéter ?</em></h2><p>Expliquez-nous comment elle fonctionne aujourd’hui. Nous pourrons cadrer le besoin, les outils concernés et les points de contrôle avant de proposer un périmètre sur devis.</p><div className={styles.actions}><ChatTrigger intent="automation" className="button button-primary">En parler à l’assistant CODE-V <span aria-hidden="true">↗</span></ChatTrigger><Link href="/contact?service=business-workflows" className="button button-ghost">Demander un échange</Link></div></div></section>
  </div>;
}


