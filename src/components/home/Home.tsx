import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ReviewsSection from "@/components/ReviewsSection";
import Reveal from "../motion/Reveal";
import { getReviewsByIds } from "@/data/reviews";
import styles from "./home.module.css";

const offers = [
  {
    id: "site",
    kicker: "SITE WEB",
    title: "Un site qui transforme davantage de visiteurs en demandes",
    description: "Pour présenter votre activité clairement, rassurer vite et faciliter l’appel ou la demande de devis.",
    bullets: ["Pensé d’abord pour le mobile", "Parcours simple vers l’appel ou le devis", "Structure prête pour le référencement local"],
    price: "Site vitrine à partir de 799 € HT",
    href: "/creation-site",
  },
  {
    id: "google",
    kicker: "VISIBILITÉ GOOGLE",
    title: "Plus de demandes auprès de personnes qui cherchent déjà vos services",
    description: "Pour être visible au bon moment sur Google et suivre les demandes réellement générées.",
    bullets: ["Pilotage Google Ads", "Acquisition locale et Google Business Profile", "Suivi des appels et formulaires lorsque le dispositif le permet"],
    price: "Google Ads : 150 € HT/mois · Acquisition locale : 300 € HT/mois",
    href: "/publicite",
  },
  {
    id: "automation",
    kicker: "AUTOMATISATION",
    title: "Moins de tâches répétitives dans votre quotidien",
    description: "Pour réduire les copier-coller, organiser certaines réponses et connecter les tâches qui vous font perdre du temps.",
    bullets: ["Assistant web pour répondre aux demandes simples", "Automatisation d’e-mails et de tâches récurrentes", "Validation humaine conservée sur les actions importantes"],
    price: "À partir de 149 € HT/mois",
    href: "/solutions/automatisation-ia",
  },
] as const;

const problems = [
  ["On vous trouve trop peu sur Google", "Des prospects cherchent déjà votre service. Si vous n’apparaissez pas au bon moment, ils contactent un concurrent."],
  ["Votre site reçoit des visites, mais peu de demandes", "Le visiteur doit comprendre votre offre, vous faire confiance et savoir quoi faire ensuite en quelques secondes."],
  ["Vous perdez du temps sur des tâches répétitives", "Relances, réponses, organisation ou ressaisie peuvent être simplifiées sans vous faire perdre le contrôle."],
] as const;

const cases = [
  {
    name: "Protection Nuisibles",
    context: "Création d’une présence digitale locale à Perpignan.",
    action: "Site, fiche Google Business Profile, Local Services et Google Ads mis en place par CODE-V.",
    result: "Accompagnement suivi dans la durée, sans résultat commercial chiffré revendiqué.",
    href: "/realisations/protection-nuisibles",
  },
  {
    name: "Couverture Catalane",
    context: "Entreprise de couverture autour de Perpignan.",
    action: "Site et acquisition locale orientés vers la prise de contact.",
    result: "2 demandes de devis confirmées dans les résultats suivis.",
    href: "/realisations",
  },
  {
    name: "Jrenov",
    context: "Parcours de contact simplifié pour une entreprise de couverture.",
    action: "Pages locales, Google Ads, suivi des conversions et formulaire de rappel simplifié.",
    result: "2 demandes de devis envoyées depuis le site confirmées.",
    href: "/realisations",
  },
] as const;

const process = [
  ["1", "On parle de votre activité", "Vous nous expliquez votre métier, ce qui bloque aujourd’hui et ce que vous voulez obtenir."],
  ["2", "On construit la solution utile", "Site, visibilité ou automatisation : le périmètre et le planning sont précisés avant de démarrer."],
  ["3", "On regarde ce qui fonctionne", "Les appels, formulaires et usages utiles servent ensuite à décider des améliorations."],
] as const;

const faq = [
  ["Combien coûte un site ?", "Le site vitrine commence à 799 € HT. Un site étendu avec blog commence à 1 499 € HT et une application web ou un espace métier à 2 999 € HT. Le périmètre exact est détaillé dans le devis."],
  ["Combien coûte l’acquisition sur Google ?", "Le pilotage Google Ads est proposé à 150 € HT/mois. L’acquisition locale est proposée à 300 € HT/mois. Le budget publicitaire payé à Google reste séparé des honoraires CODE-V."],
  ["Combien de temps prend un projet ?", "Le délai dépend du nombre de pages, des contenus disponibles et des fonctionnalités. Un planning clair est défini dans le devis avant le démarrage."],
  ["Et si les résultats ne sont pas immédiats ?", "Aucune agence sérieuse ne peut garantir un nombre précis de ventes. CODE-V travaille les éléments maîtrisables : visibilité, clarté de l’offre, parcours de contact, suivi des conversions et amélioration continue."],
  ["Est-ce que je vais dépendre techniquement de CODE-V ?", "Les accès, l’hébergement, la maintenance, les responsabilités et les conditions de remise sont précisés dans le périmètre du projet. L’objectif est que vous sachiez ce qui est géré et par qui."],
  ["Suis-je obligé de comprendre la technique ?", "Non. Nous vous expliquons ce qui compte pour votre activité et nous prenons en charge la mise en œuvre technique."],
] as const;

function PrimaryCta({ className = "" }: { className?: string }) {
  return <Link className={`button button-primary ${className}`.trim()} href="#devis">Recevoir mon devis gratuit <span aria-hidden="true">↓</span></Link>;
}

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.croHero} aria-labelledby="home-title">
      <div className={styles.heroAtmosphere} aria-hidden="true" />
      <div className={`container ${styles.croHeroGrid}`}>
        <div className={styles.croHeroCopy}>
          <span className={styles.kicker}>AGENCE DIGITALE · PERPIGNAN & PYRÉNÉES-ORIENTALES</span>
          <h1 id="home-title">Plus de demandes clients pour votre entreprise, <em>sans vous compliquer avec le digital.</em></h1>
          <p>Site web, visibilité Google et automatisations utiles : CODE-V vous aide à être trouvé, à convaincre et à gagner du temps.</p>
          <div className={styles.croHeroActions}>
            <PrimaryCta />
            <a className={styles.callLink} href="tel:+33666672709">Appeler le 06 66 67 27 09 <span aria-hidden="true">↗</span></a>
          </div>
          <p className={styles.reassurance}>Devis gratuit · Sans engagement · Réponse personnalisée</p>
          <div className={styles.reviewSignal} aria-label="Avis clients Google cinq étoiles"><span aria-hidden="true">★★★★★</span><strong>Avis Google nominatifs</strong></div>
        </div>
        <aside className={styles.heroOutcome} aria-label="Ce que CODE-V aide à obtenir">
          <span>VOTRE OBJECTIF</span>
          <strong>Être trouvé.<br />Être choisi.<br /><em>Gagner du temps.</em></strong>
          <p>Un seul interlocuteur pour relier le site, l’acquisition et les outils utiles à votre activité.</p>
        </aside>
      </div>
    </section>

    <section className={styles.proofBand} aria-label="Résultats et preuves">
      <div className="container">
        <div><strong>2</strong><span>demandes de devis confirmées<br />Couverture Catalane</span></div>
        <div><strong>2</strong><span>demandes de devis web confirmées<br />Jrenov</span></div>
        <div><strong>5★</strong><span>avis Google nominatifs<br />publiés sur le site</span></div>
      </div>
    </section>

    <section className={styles.problemSection} aria-labelledby="problem-title">
      <div className="container">
        <Reveal className={styles.croSectionHeading}><span className={styles.kicker}>LE PROBLÈME N’EST PAS “LE DIGITAL”</span><h2 id="problem-title">Vous voulez surtout <span>plus de clients et moins de friction.</span></h2><p>Nous traduisons les outils en résultats compréhensibles pour votre activité.</p></Reveal>
        <div className={styles.problemGrid}>{problems.map(([title,text], index) => <Reveal className={styles.problemCard} key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
        <div className={styles.centerCta}><PrimaryCta /></div>
      </div>
    </section>

    <section className={styles.offerSection} aria-labelledby="offers-title">
      <div className="container">
        <Reveal className={styles.croSectionHeading}><span className={styles.kicker}>TROIS OFFRES, PAS UN CATALOGUE</span><h2 id="offers-title">Commencez par <span>le résultat que vous cherchez.</span></h2><p>Les détails techniques viennent ensuite, seulement s’ils sont utiles.</p></Reveal>
        <div className={styles.croOfferGrid}>{offers.map((offer,index) => <Reveal className={styles.croOfferCard} key={offer.id}>
          <div className={styles.offerTop}><span>0{index+1}</span><small>{offer.kicker}</small></div>
          <h3>{offer.title}</h3>
          <p>{offer.description}</p>
          <ul>{offer.bullets.map(item => <li key={item}>{item}</li>)}</ul>
          <strong className={styles.price}>{offer.price}</strong>
          <Link className={styles.secondaryLink} href={offer.href}>Voir le détail <span aria-hidden="true">↗</span></Link>
          <PrimaryCta className={styles.offerCta} />
        </Reveal>)}</div>
      </div>
    </section>

    <section className={styles.caseSection} aria-labelledby="cases-title">
      <div className="container">
        <Reveal className={styles.croSectionHeading}><span className={styles.kicker}>CAS CLIENTS</span><h2 id="cases-title">Des situations réelles. <span>Des résultats que l’on peut vérifier.</span></h2><p>Nous ne publions pas de promesse de chiffre d’affaires. Seulement des faits confirmés ou un périmètre de travail documenté.</p></Reveal>
        <div className={styles.caseGrid}>{cases.map(item => <Reveal className={styles.caseCard} key={item.name}>
          <h3>{item.name}</h3>
          <dl><div><dt>Situation</dt><dd>{item.context}</dd></div><div><dt>Ce que nous avons fait</dt><dd>{item.action}</dd></div><div><dt>Résultat suivi</dt><dd>{item.result}</dd></div></dl>
          <Link href={item.href}>Découvrir nos réalisations <span aria-hidden="true">↗</span></Link>
        </Reveal>)}</div>
        <div className={styles.centerCta}><PrimaryCta /></div>
      </div>
    </section>

    <section className={styles.processSection} aria-labelledby="process-title">
      <div className="container">
        <Reveal className={styles.croSectionHeading}><span className={styles.kicker}>COMMENT ÇA SE PASSE</span><h2 id="process-title">Trois étapes. <span>Vous savez où vous allez.</span></h2></Reveal>
        <ol className={styles.processGrid}>{process.map(([number,title,text]) => <Reveal as="li" className={styles.processCard} key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</ol>
      </div>
    </section>

    <ReviewsSection reviews={getReviewsByIds(["gaston-barreau","olivier-garnier","pierre-louis"])} heading="Des clients parlent de leur expérience avec CODE-V." variant="featured" maxItems={3} />

    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className="container">
        <Reveal className={styles.croSectionHeading}><span className={styles.kicker}>AVANT DE VOUS ENGAGER</span><h2 id="faq-title">Les questions que vous devez <span>pouvoir poser sans détour.</span></h2></Reveal>
        <div className={styles.faqList}>{faq.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
        <div className={styles.centerCta}><PrimaryCta /></div>
      </div>
    </section>

    <section className={styles.founderSection} aria-labelledby="founder-title">
      <div className={`container ${styles.founderGrid}`}>
        <Reveal className={styles.founderMark} aria-hidden="true"><span>CODE-V</span><strong>AW</strong><small>Perpignan · Pyrénées-Orientales</small></Reveal>
        <Reveal className={styles.founderCopy}><span className={styles.kicker}>QUI PORTE CODE-V</span><h2 id="founder-title">Vous savez <span>à qui vous parlez.</span></h2><p>Je suis <strong>Adrien Weissenbacher</strong>, fondateur de CODE-V. J’accompagne des entreprises dans la création de leur site, leur visibilité sur Google et l’automatisation de certaines tâches.</p><p>Le but n’est pas de vous vendre davantage de technologie. Le but est de choisir ce qui peut réellement vous aider à obtenir plus de demandes et à travailler plus simplement.</p><Link href="/qui-sommes-nous" className={styles.secondaryLink}>Découvrir l’approche CODE-V <span aria-hidden="true">↗</span></Link></Reveal>
      </div>
    </section>

    <section id="devis" className={styles.finalLead} aria-labelledby="devis-title">
      <div className={`container ${styles.finalLeadGrid}`}>
        <Reveal className={styles.finalLeadCopy}><span className={styles.kicker}>PARLONS DE VOTRE BESOIN</span><h2 id="devis-title">Dites-nous ce que vous voulez <span>améliorer.</span></h2><p>Un site à refaire, plus de demandes sur Google ou trop de tâches manuelles : quelques informations suffisent pour commencer.</p>
          <div className={styles.contactProof}><a href="tel:+33666672709">06 66 67 27 09</a><a href="mailto:contact@code-v.fr">contact@code-v.fr</a><small>Devis gratuit · Sans engagement</small></div>
        </Reveal>
        <div className={styles.finalForm}><ContactForm compact /></div>
      </div>
    </section>

    <div className={styles.mobileSticky} aria-label="Actions rapides">
      <a href="tel:+33666672709">Appeler</a>
      <a href="#devis">Recevoir mon devis</a>
    </div>
  </div>;
}
