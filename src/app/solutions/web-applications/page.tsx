import Breadcrumb from "@/components/Breadcrumb";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import MotionVideo from "@/components/media/MotionVideo";
import ChatTrigger from "@/components/RobotAssistant/ChatTrigger";
import ProductCanvas from "@/components/services/ProductCanvas";
import { getServiceById, type ServiceId } from "@/data/services";
import styles from "./page.module.css";
import { defaultShareImages } from "@/lib/seo";

const canonical = "https://www.code-v.fr/solutions/web-applications";
export const metadata: Metadata = {
  title: "Web & Applications : vos produits digitaux | CODE-V",
  description: "Sites, e-commerce, applications web et outils métier : CODE-V conçoit des expériences utiles, performantes et évolutives, du parcours utilisateur à l’architecture.",
  alternates: { canonical },
  openGraph: { title: "Web & Applications — CODE-V", description: "Du premier écran à l’architecture : des produits digitaux pensés pour vos usages.", url: canonical, type: "website", locale: "fr_FR", images: defaultShareImages },
};
const projectIds: readonly ServiceId[] = ["website", "ecommerce", "web-application", "mobile-app", "business-tool"];
const projects = projectIds.map(id => { const service = getServiceById(id); if (!service) throw new Error(`Missing service: ${id}`); return service; });
const specificIds: readonly ServiceId[] = ["landing-page", "ux-conversion", "web-migration"];
const specifics = specificIds.map(id => { const service = getServiceById(id); if (!service) throw new Error(`Missing service: ${id}`); return service; });
const process = [
  ["Comprendre", "Les utilisateurs, votre activité et le rôle attendu du produit."],
  ["Concevoir", "L’arborescence, les parcours et une architecture adaptée."],
  ["Prototyper", "Rendre les écrans et interactions discutables avant de développer."],
  ["Développer", "Construire les fonctions prioritaires et les intégrations convenues."],
  ["Tester", "Vérifier usages, mobile, clavier et contraintes techniques."],
  ["Lancer", "Préparer déploiement, contenus, accès et transmission."],
  ["Faire évoluer", "Organiser corrections, maintenance et prochaines fonctionnalités."],
];

export default function WebApplicationsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="web-title"><div className={`container ${styles.heroGrid}`}><div>
      <Breadcrumb {...getPageBreadcrumb("/solutions/web-applications")} /><p className={styles.eyebrow}>Web & Applications</p>
      <h1 id="web-title">Un écran ne suffit pas.<br /><em>Il faut un produit utile.</em></h1>
      <p className={styles.lead}>Site, boutique ou application : nous concevons l’expérience et l’architecture qui permettent à vos utilisateurs d’agir, à vos équipes de travailler et au produit d’évoluer.</p>
      <div className={styles.actions}><ChatTrigger intent="website" className="button button-primary">Parlons de votre projet <span aria-hidden="true">↗</span></ChatTrigger><a className="button button-ghost" href="#projets">Explorer les projets <span aria-hidden="true">↓</span></a></div>
    </div><ProductCanvas /></div></section>

    <section className={styles.section}><Reveal className={`container ${styles.statement}`}><p className={styles.eyebrow}>Le vrai sujet</p><h2>Un beau site peut encore<br /><span>compliquer la vie de ses utilisateurs.</span></h2><div className={styles.problemCopy}><p>Pages lentes, parcours mobile confus, contenus difficiles à modifier : les frictions ne se voient pas toujours dans une maquette. Une dépendance excessive aux plugins ou un outil interne bricolé peut aussi rendre chaque évolution difficile.</p><p>Nous relions expérience, conversion et maintenabilité. Le bon projet part d’un usage : demander un devis, acheter, consulter un dossier ou piloter une opération, avec les bonnes intégrations.</p></div></Reveal></section>

    <section id="projets" className={`${styles.section} ${styles.projects}`}><div className="container"><Reveal className={styles.sectionHead}><p className={styles.eyebrow}>Ce que nous construisons</p><h2>Le format suit l’usage.<br /><span>Pas l’inverse.</span></h2><p>Les principales portes d’entrée du catalogue. Un SaaS, un extranet ou un portail client relève de l’application web ; un dashboard opérationnel relève de l’outil métier.</p></Reveal><div className={styles.projectList}>{projects.map((service, i) => <article key={service.id}><span className={styles.index}>0{i + 1}</span><div><h3>{service.name}</h3><p>{service.summary}</p></div><Link href={service.id === "website" ? "/creation-site" : service.cta.href} className={styles.projectLink}>{service.id === "website" ? "Découvrir la création de site" : "Cadrer ce projet"}<span aria-hidden="true"> ↗</span></Link></article>)}</div><div className={styles.specifics}><h3>Un besoin plus ciblé ?</h3>{specifics.map(service => <Link key={service.id} href={service.cta.href}>{service.name}<span aria-hidden="true"> ↗</span></Link>)}</div><p className={styles.note}>Livrables, fonctions, contenus, intégrations et support sont précisés au devis. Aucun abonnement, résultat de conversion ou niveau de performance n’est inclus implicitement.</p></div></section>

    <section className={`${styles.section} ${styles.experience}`}><div className={`container ${styles.experienceGrid}`}><Reveal><p className={styles.eyebrow}>Expérience produit</p><h2>Ce qui se voit.<br /><span>Ce qui se comprend.</span><br />Ce qui se fait.</h2><p>UX, UI, navigation et responsive forment un même parcours. Les micro-interactions indiquent un état ou confirment une action ; elles ne doivent pas retarder l’utilisateur.</p><p>Nous travaillons les priorités visuelles, les libellés, les formulaires et l’accès au clavier. L’accessibilité fait partie des décisions de conception.</p></Reveal><Reveal stagger className={styles.interfaceNotes}><div><span>01 / Lecture</span><h3>Une hiérarchie immédiate.</h3><p>Un titre, une information utile, une action prioritaire.</p></div><div><span>02 / Action</span><h3>Des états compréhensibles.</h3><p>Focus, saisie, attente, erreur et confirmation restent lisibles.</p></div><div><span>03 / Adaptation</span><h3>Le même usage, un autre écran.</h3><p>Le mobile réorganise le parcours et les contrôles, au lieu de tout miniaturiser.</p></div></Reveal></div></section>

    <section className={`${styles.section} ${styles.architecture}`}><div className="container"><Reveal className={styles.architectureHeading}><p className={styles.eyebrow}>Sous l’interface</p><h2>Une base claire.<br /><em>Des évolutions possibles.</em></h2><p>Le développement sur mesure n’est pas une accumulation de fonctionnalités. L’architecture doit rendre les responsabilités et les dépendances lisibles.</p></Reveal><dl className={styles.layers}><div><dt>Interface & rendu</dt><dd>Next.js lorsque pertinent : organiser les pages, leur rendu et les interactions nécessaires, en limitant le JavaScript envoyé au navigateur.</dd></div><div><dt>Données & permissions</dt><dd>Modéliser les informations, les rôles et les accès ; définir les besoins de base de données selon les fonctionnalités.</dd></div><div><dt>APIs & métier</dt><dd>Connecter les outils existants, cadrer les échanges de données et prévoir les erreurs plutôt que multiplier les doubles saisies.</dd></div><div><dt>Exploitation & évolution</dt><dd>Documenter, tester et préparer la maintenance. Hébergement, supervision et nouvelles fonctions restent des périmètres à convenir.</dd></div></dl><Link className={styles.darkLink} href="/solutions/automatisation-ia">Un produit connecté à vos processus <span aria-hidden="true">↗</span></Link></div></section>

    <section className={styles.section}><div className={`container ${styles.videoGrid}`}><MotionVideo title="Du composant au parcours : concevoir une interface" mode="feature" aspectRatio="16 / 9" /><Reveal><p className={styles.eyebrow}>Le produit en mouvement</p><h2>Montrer les choix.<br /><span>Pas seulement les écrans.</span></h2><p>Cette future séquence CODE-V montrera une interface qui se construit, ses états, sa navigation et les liens avec son architecture.</p><p className={styles.note}>Emplacement motion réservé. Aucun média ou projet client fictif n’est présenté.</p></Reveal></div></section>

    <section className={`${styles.section} ${styles.scenarios}`}><div className="container"><Reveal className={styles.sectionHead}><p className={styles.eyebrow}>Exemples de projets</p><h2>Un produit se définit<br /><span>par ce qu’il permet.</span></h2><p>Scénarios génériques à adapter, pas réalisations clients.</p></Reveal><div className={styles.scenarioGrid}><article><h3>Un site local, une demande claire.</h3><p>Présenter une activité et une zone d’intervention, puis simplifier le chemin vers le contact. Une landing page peut cibler une offre spécifique.</p></article><article><h3>Une boutique, un parcours d’achat.</h3><p>Relier catalogue, variantes, panier, paiement et commandes. Les stocks, livraisons et outils de gestion sont cadrés selon le besoin.</p></article><article><h3>Un SaaS métier, un espace de travail.</h3><p>Un portail client, des dossiers accessibles selon les rôles et un dashboard adapté aux opérations. Les fonctions prioritaires guident le premier périmètre.</p></article></div></div></section>

    <section className={styles.section}><div className="container"><Reveal className={styles.sectionHead}><p className={styles.eyebrow}>Du besoin au produit</p><h2>Concevoir avec vous.<br /><span>Construire sans précipiter.</span></h2></Reveal><ol className={styles.process}>{process.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

    <section className={`${styles.section} ${styles.quality}`}><div className={`container ${styles.qualityGrid}`}><Reveal><p className={styles.eyebrow}>Qualité vérifiable</p><h2>Rapide, accessible,<br /><span>maintenable : cela se vérifie.</span></h2><p>Nous définissons les contrôles selon le projet. Aucun score, taux de conversion ou classement SEO n’est garanti.</p></Reveal><dl><div><dt>Performance</dt><dd>Mesurer les Core Web Vitals, surveiller le poids des ressources et identifier les interactions coûteuses.</dd></div><div><dt>Responsive & accessibilité</dt><dd>Tester les parcours sur plusieurs largeurs, le clavier, le focus, la lisibilité et le mouvement réduit. Une conformité exhaustive nécessite un périmètre d’audit explicite.</dd></div><div><dt>SEO technique & migration</dt><dd>Préparer structure, metadata et URL ; cadrer la reprise des contenus et redirections en cas de migration. Le référencement continu est distinct.</dd></div><div><dt>Sécurité & maintenance</dt><dd>Définir permissions, gestion des données et mises à jour. La sécurité absolue et un support illimité ne sont pas promis.</dd></div></dl></div></section>

    <section className={`${styles.section} ${styles.final}`}><div className="container"><p className={styles.eyebrow}>Votre prochain produit</p><h2>Que doivent pouvoir faire<br /><em>vos utilisateurs ?</em></h2><p>Partons de cette question pour cadrer l’expérience, les fonctions et les contraintes de votre projet.</p><div className={styles.actions}><ChatTrigger intent="website" className="button button-primary">En parler à l’assistant CODE-V <span aria-hidden="true">↗</span></ChatTrigger><Link href="/contact?service=web-application" className="button button-ghost">Demander un échange</Link></div></div></section>
  </div>;
}

