import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ReviewsSection from "@/components/ReviewsSection";
import Reveal from "../motion/Reveal";
import GrowthCard from "./GrowthCard";
import { getReviewsByIds } from "@/data/reviews";
import styles from "./home.module.css";

const problems = [
  ["On vous trouve trop peu", "Des prospects cherchent déjà vos services. Si vous n’êtes pas visible au bon moment, ils contactent quelqu’un d’autre."],
  ["Votre site convainc trop peu", "Le visiteur doit comprendre votre offre, vous faire confiance et savoir quoi faire ensuite en quelques secondes."],
  ["Vous perdez trop de temps", "Réponses répétitives, ressaisie et organisation peuvent être simplifiées sans vous faire perdre le contrôle."],
] as const;

const offers = [
  {
    label: "SITE WEB",
    title: "Un site qui transforme davantage de visiteurs en demandes",
    description: "Pour présenter votre activité clairement, rassurer vite et faciliter l’appel ou la demande de devis.",
    bullets: ["Pensé d’abord pour le mobile", "Parcours simple vers l’appel ou le devis", "Bases techniques et SEO propres"],
    price: "Site vitrine à partir de 799 € HT",
    href: "/creation-site",
  },
  {
    label: "VISIBILITÉ GOOGLE",
    title: "Être présent quand vos futurs clients cherchent déjà vos services",
    description: "Pour capter une demande existante et mieux suivre les appels ou formulaires réellement générés.",
    bullets: ["Pilotage Google Ads", "Google Business Profile et acquisition locale", "Suivi des conversions selon le dispositif"],
    price: "Google Ads : 150 € HT/mois",
    href: "/publicite",
  },
  {
    label: "AUTOMATISATION",
    title: "Moins de tâches répétitives chaque semaine",
    description: "Pour réduire les copier-coller, organiser certaines réponses et connecter les tâches qui vous font perdre du temps.",
    bullets: ["Assistant web pour les demandes simples", "Automatisation d’e-mails et de tâches récurrentes", "Validation humaine sur les actions importantes"],
    price: "À partir de 149 € HT/mois",
    href: "/solutions/automatisation-ia",
  },
] as const;

const process = [
  ["Comprendre", "Vous expliquez votre activité, ce qui bloque aujourd’hui et le résultat que vous recherchez."],
  ["Cadrer", "Le devis précise ce qui sera réalisé, le planning, les validations et les responsabilités."],
  ["Construire", "Le site, la campagne ou l’automatisation est mis en place dans le périmètre convenu."],
  ["Améliorer", "Les demandes et les usages utiles servent ensuite à décider des prochaines évolutions."],
] as const;

const faq = [
  ["Combien coûte un site ?", "Le site vitrine commence à 799 € HT. Un site étendu avec blog commence à 1 499 € HT et une application web ou un espace métier à 2 999 € HT. Le périmètre exact est détaillé dans le devis."],
  ["Combien coûte l’acquisition sur Google ?", "Le pilotage Google Ads est proposé à 150 € HT/mois. L’acquisition locale est proposée à 300 € HT/mois. Le budget publicitaire payé à Google reste séparé des honoraires CODE-V."],
  ["Combien de temps prend un projet ?", "Le délai dépend du nombre de pages, des contenus disponibles et des fonctionnalités. Un planning clair est défini dans le devis avant le démarrage."],
  ["Et si les résultats ne sont pas immédiats ?", "Aucune agence sérieuse ne peut garantir un nombre précis de ventes. CODE-V travaille les éléments maîtrisables : visibilité, clarté de l’offre, parcours de contact, suivi des conversions et amélioration continue."],
  ["Est-ce que je vais dépendre techniquement de CODE-V ?", "Les accès, l’hébergement, la maintenance, les responsabilités et les conditions de remise sont précisés dans le périmètre du projet."],
  ["Suis-je obligé de comprendre la technique ?", "Non. Nous vous expliquons ce qui compte pour votre activité et nous prenons en charge la mise en œuvre technique."],
] as const;

function PrimaryCta({ className = "" }: { className?: string }) {
  return <Link className={`button button-primary ${className}`.trim()} href="#devis">Recevoir mon devis gratuit <span aria-hidden="true">↗</span></Link>;
}

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroAtmosphere} aria-hidden="true" />
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>CODE-V / PARTENAIRE DIGITAL POUR LES ENTREPRISES</span>
          <h1 id="home-title"><span>Plus de demandes.</span><span><em>Moins de complexité.</em></span></h1>
          <p>CODE-V vous aide à être trouvé, à convaincre et à gagner du temps avec un site efficace, une acquisition mieux pilotée et des outils utiles.</p>
          <div className={styles.heroActions}>
            <PrimaryCta />
            <a className={styles.heroLink} href="tel:+33666672709">Appeler le 06 66 67 27 09 <span aria-hidden="true">↗</span></a>
          </div>
          <div className={styles.heroTrust}><span>★★★★★ Avis Google vérifiés</span><span>Visio · Suivi clair · Réponse sous 24 h</span></div>
        </div>
        <GrowthCard />
      </div>
      <div className={`container ${styles.heroFoot}`}><span>Devis gratuit · Sans engagement</span><span>Un interlocuteur identifié du début à la suite du projet</span></div>
    </section>

    <section className={styles.proof} aria-labelledby="proof-title">
      <div className="container">
        <Reveal className={styles.proofHeading}><span className={styles.kicker}>DES FAITS, PAS DES PROMESSES VAGUES</span><h2 id="proof-title">Des résultats suivis.<br /><span>Des projets réels.</span></h2></Reveal>
        <div className={styles.proofGrid}>
          <Reveal><strong>2</strong><span>Demandes de devis confirmées</span><small>Couverture Catalane</small></Reveal>
          <Reveal><strong>2</strong><span>Demandes de devis web confirmées</span><small>Jrenov</small></Reveal>
          <Reveal><strong>5★</strong><span>Avis Google nominatifs</span><small>Publiés sur le site</small></Reveal>
        </div>
      </div>
    </section>

    <section className={styles.problems} aria-labelledby="problems-title">
      <div className="container">
        <Reveal className={styles.sectionHeading}><div><span className={styles.kicker}>CE QUI VOUS FREINE</span><h2 id="problems-title">Votre digital doit vous aider à vendre.<br /><span>Pas vous compliquer la vie.</span></h2></div><p>Nous partons de problèmes d’entreprise simples, puis nous choisissons les outils qui peuvent réellement les résoudre.</p></Reveal>
        <div className={styles.problemGrid}>{problems.map(([title,text], index) => <Reveal className={styles.problemCard} key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
        <div className={styles.centerCta}><PrimaryCta /></div>
      </div>
    </section>

    <section id="offres" className={styles.offers} aria-labelledby="offers-title">
      <div className="container">
        <Reveal className={styles.offerHeading}><span className={styles.kicker}>LES OFFRES CODE-V</span><h2 id="offers-title">Commencez par<br /><span>ce que vous voulez obtenir.</span></h2><p>Les détails techniques viennent ensuite, uniquement lorsqu’ils servent votre objectif.</p></Reveal>
        <div className={styles.offerGrid}>{offers.map((offer,index)=><Reveal className={styles.offerCard} key={offer.label}>
          <span className={styles.offerNumber}>0{index+1}</span><span className={styles.offerLabel}>{offer.label}</span>
          <h3>{offer.title}</h3><p>{offer.description}</p>
          <ul>{offer.bullets.map(item=><li key={item}>{item}</li>)}</ul>
          <strong className={styles.offerPrice}>{offer.price}</strong>
          <Link href={offer.href}>Voir le détail <span aria-hidden="true">↗</span></Link>
        </Reveal>)}</div>
        <div className={styles.centerCta}><PrimaryCta /></div>
        <div className={styles.pricingLink}><Link href="/tarifs">Voir tous les tarifs & le fonctionnement <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>

    <section className={styles.cases} aria-labelledby="cases-title"><div className="container">
      <Reveal className={styles.casesHeading}><span className={styles.kicker}>CAS CLIENTS</span><h2 id="cases-title">Le travail,<br /><em>dans son contexte.</em></h2><p>Site, acquisition et suivi : voici des situations concrètes où CODE-V a accompagné une entreprise.</p></Reveal>
      <div className={styles.caseGrid}>
        <Reveal className={styles.caseCard}><span>PROTECTION NUISIBLES</span><h3>Construire une présence digitale et une acquisition locale.</h3><p>Création du site, fiche Google Business Profile, Local Services et Google Ads.</p><Link href="/realisations/protection-nuisibles">Voir le cas client <span aria-hidden="true">↗</span></Link></Reveal>
        <Reveal className={styles.caseResult}><span>COUVERTURE CATALANE</span><strong>2</strong><h3>demandes de devis confirmées</h3><p>Site et acquisition orientés vers la prise de contact.</p></Reveal>
        <Reveal className={styles.caseResult}><span>JRENOV</span><strong>2</strong><h3>demandes de devis web confirmées</h3><p>Pages locales, Google Ads, tracking et formulaire de rappel simplifié.</p></Reveal>
      </div>
      <div className={styles.centerCta}><PrimaryCta /></div>
    </div></section>

    <section className={styles.method} aria-labelledby="method-title"><div className={`container ${styles.methodInner}`}>
      <div className={styles.methodHeading}><span className={styles.kicker}>UN SUIVI CLAIR, MÊME À DISTANCE</span><h2 id="method-title">Vous savez toujours<br /><em>ce qui se passe ensuite.</em></h2><p>Premier retour sous 24 h, rendez-vous en visio et validations explicites à chaque étape importante.</p></div>
      <div className={styles.timeline}>{process.map(([title,text])=><Reveal className={styles.milestone} key={title}><span className={styles.milestoneDot} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
    </div></section>

    <ReviewsSection reviews={getReviewsByIds(["gaston-barreau","pierre-louis","olivier-garnier"])} heading="Ce qu’ils retiennent de notre travail." variant="featured" maxItems={3} />

    <section className={styles.faq} aria-labelledby="faq-title"><div className={`container ${styles.faqGrid}`}>
      <Reveal className={styles.faqIntro}><span className={styles.kicker}>AVANT DE VOUS ENGAGER</span><h2 id="faq-title">Les questions à poser<br /><span>sans détour.</span></h2><p>Prix, délais, résultats, propriété et accompagnement : les réponses doivent être comprises avant de signer.</p><PrimaryCta /></Reveal>
      <div className={styles.faqList}>{faq.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </div></section>

    <section className={styles.founder} aria-labelledby="founder-title"><Reveal className={`container ${styles.founderInner}`}>
      <div className={styles.founderMark}><span>CODE-V</span><strong>AW</strong><small>Visio · suivi clair · interlocuteur identifié</small></div>
      <div><span className={styles.kicker}>VOTRE INTERLOCUTEUR</span><h2 id="founder-title">Vous savez<br /><span>à qui vous parlez.</span></h2><p>Je suis <strong>Adrien Weissenbacher</strong>, fondateur de CODE-V. J’accompagne des entreprises dans la création de leur site, leur acquisition et l’automatisation de certaines tâches.</p><p>L’objectif n’est pas d’ajouter de la technologie. Il est de choisir ce qui aide réellement votre activité.</p><Link className="text-link" href="/qui-sommes-nous">Découvrir l’approche CODE-V <span aria-hidden="true">↗</span></Link></div>
    </Reveal></section>

    <section id="devis" className={styles.contact} aria-labelledby="devis-title"><div className={`container ${styles.contactInner}`}>
      <Reveal className={styles.contactCopy}><span className={styles.kicker}>PARLONS DE VOTRE BESOIN</span><h2 id="devis-title">Dites-nous ce que vous voulez<br /><em>améliorer.</em></h2><p>Un site à refaire, plus de demandes sur Google ou trop de tâches manuelles : quelques informations suffisent pour commencer.</p><div className={styles.contactLinks}><a href="tel:+33666672709">06 66 67 27 09</a><a href="mailto:contact@code-v.fr">contact@code-v.fr</a><small>Devis gratuit · Sans engagement · Réponse sous 24 h</small></div></Reveal>
      <div className={styles.contactForm}><ContactForm compact /></div>
    </div></section>

    <div className={styles.mobileSticky}><a href="tel:+33666672709">Appeler</a><a href="#devis">Recevoir mon devis</a></div>
  </div>;
}
