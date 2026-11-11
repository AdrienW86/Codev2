import Image from "next/image";
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
    bullets: ["Pensé d’abord pour le mobile", "Parcours simple vers l’appel ou le devis", "Bases techniques et SEO propres"],
    price: "Site vitrine à partir de 799 € HT",
    href: "/creation-site",
    image: "/projects/protection-nuisibles/home.webp",
    alt: "Exemple de site client réalisé par CODE-V, affiché sur ordinateur.",
  },
  {
    id: "google",
    kicker: "VISIBILITÉ GOOGLE",
    title: "Être présent quand vos futurs clients cherchent déjà vos services",
    description: "Pour capter une demande existante et mieux suivre les appels ou formulaires réellement générés.",
    bullets: ["Pilotage Google Ads", "Google Business Profile et acquisition locale", "Suivi des conversions selon le dispositif"],
    price: "Google Ads : 150 € HT/mois",
    href: "/publicite",
    image: "/projects/nuisibles-toulon/google-ads-first-position.webp",
    alt: "Capture réelle d’une campagne client visible dans les résultats sponsorisés Google.",
  },
] as const;

const problems = [
  ["On vous trouve trop peu", "Des prospects cherchent déjà vos services. Si vous n’êtes pas visible au bon moment, ils contactent quelqu’un d’autre."],
  ["Votre site convainc trop peu", "Le visiteur doit comprendre votre offre, vous faire confiance et savoir quoi faire ensuite en quelques secondes."],
  ["Vous perdez trop de temps", "Réponses répétitives, ressaisie et organisation peuvent être simplifiées sans vous faire perdre le contrôle."],
] as const;

const process = [
  ["01", "On échange en visio", "Vous expliquez votre activité, ce qui bloque aujourd’hui et le résultat que vous recherchez."],
  ["02", "Vous validez un périmètre clair", "Le devis précise ce qui sera réalisé, le planning, les validations et les responsabilités."],
  ["03", "On construit, mesure et améliore", "Les demandes, les usages et les résultats utiles servent à décider des prochaines améliorations."],
] as const;

const faq = [
  ["Combien coûte un site ?", "Le site vitrine commence à 799 € HT. Un site étendu avec blog commence à 1 499 € HT et une application web ou un espace métier à 2 999 € HT. Le périmètre exact est détaillé dans le devis."],
  ["Combien coûte l’acquisition sur Google ?", "Le pilotage Google Ads est proposé à 150 € HT/mois. L’acquisition locale est proposée à 300 € HT/mois. Le budget publicitaire payé à Google reste séparé des honoraires CODE-V."],
  ["Combien de temps prend un projet ?", "Le délai dépend du nombre de pages, des contenus disponibles et des fonctionnalités. Un planning clair est défini dans le devis avant le démarrage."],
  ["Et si les résultats ne sont pas immédiats ?", "Aucune agence sérieuse ne peut garantir un nombre précis de ventes. CODE-V travaille les éléments maîtrisables : visibilité, clarté de l’offre, parcours de contact, suivi des conversions et amélioration continue."],
  ["Est-ce que je vais dépendre techniquement de CODE-V ?", "Les accès, l’hébergement, la maintenance, les responsabilités et les conditions de remise sont précisés dans le périmètre du projet. Vous savez ce qui est géré et par qui."],
  ["Suis-je obligé de comprendre la technique ?", "Non. Nous vous expliquons ce qui compte pour votre activité et nous prenons en charge la mise en œuvre technique."],
] as const;

function PrimaryCta({ className = "" }: { className?: string }) {
  return <Link className={`button button-primary ${className}`.trim()} href="#devis">Recevoir mon devis gratuit <span aria-hidden="true">↓</span></Link>;
}

export default function Home() {
  return <div className={styles.home}>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1 id="home-title">Plus de demandes clients, <em>sans vous compliquer avec le digital.</em></h1>
          <p className={styles.lead}>CODE-V vous aide à être trouvé, à convaincre et à gagner du temps avec un site efficace, une acquisition mieux pilotée et des outils utiles.</p>
          <div className={styles.heroActions}>
            <PrimaryCta />
            <a className={styles.secondaryButton} href="tel:+33666672709">Appeler le 06 66 67 27 09</a>
          </div>
          <div className={styles.heroTrust}>
            <div className={styles.stars} aria-label="Avis Google cinq étoiles">★★★★★</div>
            <div><strong>Avis Google vérifiés</strong><span>Interlocuteur identifié · Visio · Suivi clair</span></div>
          </div>
          <p className={styles.reassurance}>Devis gratuit · Sans engagement · Réponse sous 24 h</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.browserFrame}>
            <div className={styles.browserBar} aria-hidden="true"><span/><span/><span/></div>
            <Image src="/projects/protection-nuisibles/home.webp" alt="Exemple de site client conçu par CODE-V." width={1440} height={900} priority sizes="(max-width: 900px) calc(100vw - 32px), 520px" />
          </div>
          <p>Réalisation CODE-V · capture d’un site client</p>
        </div>
      </div>
    </section>

    <section className={styles.proofBand} aria-label="Preuves CODE-V">
      <div className={`container ${styles.proofPanel}`}>
        <div><strong>2</strong><span>demandes de devis confirmées<br />Couverture Catalane</span></div>
        <div><strong>2</strong><span>demandes web confirmées<br />Jrenov</span></div>
        <div><strong>5★</strong><span>avis Google nominatifs<br />publiés sur le site</span></div>
      </div>
    </section>

    <section className={styles.problemSection} aria-labelledby="problem-title">
      <div className="container">
        <Reveal className={styles.sectionHead}><p className={styles.eyebrow}>CE QUI VOUS FREINE</p><h2 id="problem-title">Votre digital doit vous aider à vendre, <em>pas vous compliquer la vie.</em></h2></Reveal>
        <div className={styles.problemGrid}>{problems.map(([title,text]) => <Reveal className={styles.problemItem} key={title}><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
        <div className={styles.sectionCta}><PrimaryCta /></div>
      </div>
    </section>

    <section className={styles.offerSection} aria-labelledby="offers-title">
      <div className="container">
        <Reveal className={styles.sectionHead}><p className={styles.eyebrow}>CE QUE NOUS POUVONS AMÉLIORER</p><h2 id="offers-title">Commencez par <em>ce que vous voulez obtenir.</em></h2><p>Les détails techniques viennent ensuite, seulement lorsqu’ils servent la décision.</p></Reveal>

        <div className={styles.offerGrid}>
          {offers.map(offer => <Reveal className={styles.offerCard} key={offer.id}>
            <div className={styles.offerImage}><Image src={offer.image} alt={offer.alt} width={1200} height={750} sizes="(max-width: 900px) calc(100vw - 48px), 360px" /></div>
            <p className={styles.eyebrow}>{offer.kicker}</p>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <ul>{offer.bullets.map(item => <li key={item}>{item}</li>)}</ul>
            <strong className={styles.price}>{offer.price}</strong>
            <Link className={styles.textLink} href={offer.href}>Voir le détail <span aria-hidden="true">↗</span></Link>
            <PrimaryCta className={styles.offerCta} />
          </Reveal>)}

          <Reveal className={styles.offerCard}>
            <div className={styles.automationVisual} aria-label="Exemple de simplification d’une tâche">
              <div><span>Avant</span><strong>Demande → e-mail → copier → relancer</strong></div>
              <div><span>Après</span><strong>Demande → classement → notification</strong></div>
            </div>
            <p className={styles.eyebrow}>AUTOMATISATION</p>
            <h3>Moins de tâches répétitives chaque semaine</h3>
            <p>Pour réduire les copier-coller, organiser certaines réponses et connecter les tâches qui vous font perdre du temps.</p>
            <ul><li>Assistant web pour les demandes simples</li><li>Automatisation d’e-mails et de tâches récurrentes</li><li>Validation humaine sur les actions importantes</li></ul>
            <strong className={styles.price}>À partir de 149 € HT/mois</strong>
            <Link className={styles.textLink} href="/solutions/automatisation-ia">Voir le détail <span aria-hidden="true">↗</span></Link>
            <PrimaryCta className={styles.offerCta} />
          </Reveal>
        </div>
      </div>
    </section>

    <section className={styles.caseSection} aria-labelledby="cases-title">
      <div className="container">
        <Reveal className={styles.sectionHead}><p className={styles.eyebrow}>CAS CLIENTS</p><h2 id="cases-title">Des situations réelles. <em>Des preuves visibles.</em></h2></Reveal>
        <div className={styles.caseFeature}>
          <Reveal className={styles.caseImage}><Image src="/projects/protection-nuisibles/home.webp" alt="Capture du site Protection Nuisibles réalisé par CODE-V." width={1440} height={900} sizes="(max-width: 900px) calc(100vw - 32px), 620px" /></Reveal>
          <Reveal className={styles.caseCopy}><p className={styles.eyebrow}>PROTECTION NUISIBLES</p><h3>Construire une présence digitale et une acquisition locale.</h3><p>Création du site, fiche Google Business Profile, Local Services et Google Ads. L’accompagnement est documenté dans le cas client publié.</p><Link className={styles.darkLink} href="/realisations/protection-nuisibles">Voir le cas client <span aria-hidden="true">↗</span></Link></Reveal>
        </div>
        <div className={styles.caseResults}>
          <Reveal><span>COUVERTURE CATALANE</span><strong>2 demandes de devis confirmées</strong><p>Site et acquisition orientés vers la prise de contact.</p></Reveal>
          <Reveal><span>JRENOV</span><strong>2 demandes de devis web confirmées</strong><p>Pages locales, Google Ads, tracking et formulaire de rappel simplifié.</p></Reveal>
        </div>
        <div className={styles.sectionCta}><PrimaryCta /></div>
      </div>
    </section>

    <section className={styles.processSection} aria-labelledby="process-title">
      <div className="container">
        <Reveal className={styles.sectionHead}><p className={styles.eyebrow}>UN SUIVI CLAIR, MÊME À DISTANCE</p><h2 id="process-title">Vous savez toujours <em>ce qui se passe ensuite.</em></h2><p>Premier retour sous 24 h, rendez-vous en visio et validations explicites à chaque étape importante.</p></Reveal>
        <ol className={styles.processGrid}>{process.map(([number,title,text]) => <li key={number}><Reveal className={styles.processCard}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal></li>)}</ol>
      </div>
    </section>

    <ReviewsSection reviews={getReviewsByIds(["gaston-barreau","olivier-garnier","pierre-louis"])} heading="Des clients parlent de leur expérience avec CODE-V." variant="featured" maxItems={3} />

    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={`container ${styles.faqGrid}`}>
        <Reveal className={styles.faqIntro}><p className={styles.eyebrow}>AVANT DE VOUS ENGAGER</p><h2 id="faq-title">Les questions que vous devez <em>pouvoir poser sans détour.</em></h2><p>Prix, délais, résultats, propriété et accompagnement : les réponses doivent être compréhensibles avant de signer.</p><PrimaryCta /></Reveal>
        <div className={styles.faqList}>{faq.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
      </div>
    </section>

    <section className={styles.founderSection} aria-labelledby="founder-title">
      <div className={`container ${styles.founderGrid}`}>
        <Reveal className={styles.founderIdentity}>
          <p className={styles.eyebrow}>VOTRE INTERLOCUTEUR</p>
          <strong>Adrien<br />Weissenbacher</strong>
          <span>Fondateur de CODE-V</span>
        </Reveal>
        <Reveal className={styles.founderCopy}><h2 id="founder-title">Vous savez <em>à qui vous parlez.</em></h2><p>J’accompagne des entreprises dans la création de leur site, leur acquisition et l’automatisation de certaines tâches. L’objectif n’est pas d’ajouter de la technologie, mais de choisir ce qui aide réellement l’activité.</p><div className={styles.remoteTrust}><span>Rendez-vous en visio</span><span>Interlocuteur identifié</span><span>Suivi transparent</span></div><Link href="/qui-sommes-nous" className={styles.textLink}>Découvrir l’approche CODE-V <span aria-hidden="true">↗</span></Link></Reveal>
      </div>
    </section>

    <section id="devis" className={styles.finalLead} aria-labelledby="devis-title">
      <div className={`container ${styles.finalGrid}`}>
        <Reveal className={styles.finalCopy}><p className={styles.eyebrow}>PARLONS DE VOTRE BESOIN</p><h2 id="devis-title">Dites-nous ce que vous voulez <em>améliorer.</em></h2><p>Un site à refaire, plus de demandes sur Google ou trop de tâches manuelles : quelques informations suffisent pour commencer.</p><div className={styles.contactProof}><a href="tel:+33666672709">06 66 67 27 09</a><a href="mailto:contact@code-v.fr">contact@code-v.fr</a><small>Devis gratuit · Sans engagement · Réponse sous 24 h</small></div></Reveal>
        <div className={styles.finalForm}><ContactForm compact /></div>
      </div>
    </section>

    <div className={styles.mobileSticky} aria-label="Actions rapides">
      <a href="tel:+33666672709">Appeler</a>
      <a href="#devis">Recevoir mon devis</a>
    </div>
  </div>;
}
