// app/referencement/page.jsx
import Link from "next/link";
import ReferencementCard from '@/components/ReferencementCard/ReferencementCard'
import styles from "./referencement.module.css";

export const metadata = {
  title: "Référencement — SEO, SEA & Local Services | Votre Agence",
  description:
    "Boostez votre visibilité sur Google : SEO (référencement naturel), SEA (Google Ads) et Local Services (annonces locales). Audit gratuit et accompagnement sur mesure.",
};

export default function Referencement() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            Boostez votre visibilité en ligne grâce à un référencement sur-mesure
          </h1>
          <p className={styles.lead}>
            Attirez plus de visiteurs, obtenez des contacts qualifiés et développez
            votre chiffre d’affaires grâce à des stratégies SEO, SEA et Local Services adaptées à votre activité.
          </p>

          <div className={styles.ctas}>
            <Link href="/rdv" className={styles.primaryBtn}>
              Prendre rendez-vous
            </Link>
            <Link href="#audit" className={styles.ghostBtn}>
              Demander un audit gratuit
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.intro}>
        <h2>Comprendre les différents types de référencement</h2>
        <p>
          Pour être visible sur internet, il existe plusieurs stratégies complémentaires.
          Chaque type de référencement répond à un objectif précis : attirer plus de visiteurs,
          obtenir des contacts qualifiés et augmenter votre chiffre d’affaires.
        </p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h3>🌿 Référencement Naturel (SEO)</h3>
          <p>
            Le SEO (Search Engine Optimization) regroupe toutes les techniques permettant
            d’améliorer votre position dans les résultats naturels de Google.
            Il repose sur l’optimisation technique, la qualité du contenu et l’autorité du site.
          </p>
          <ul>
            <li>Optimisation technique du site (vitesse, indexation)</li>
            <li>Rédaction de contenus optimisés pour les mots-clés</li>
            <li>Amélioration de l’expérience utilisateur</li>
            <li>Stratégie de backlinks et autorité</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> trafic durable, gratuit et qualifié.</p>
        </article>

        <article className={styles.card}>
          <h3>⚡ Référencement Payant (SEA — Google Ads)</h3>
          <p>
            Le SEA vous permet de diffuser des annonces sponsorisées en première page.
            Vous payez au clic et obtenez des résultats immédiats et mesurables.
          </p>
          <ul>
            <li>Apparition instantanée en première page</li>
            <li>Ciblage précis (zones, audiences, horaires)</li>
            <li>Optimisation du budget et suivi des conversions</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> génération rapide de prospects et ventes.</p>
        </article>

        <article className={styles.card}>
          <h3>📍 Local Services Ads (Annonces Locales)</h3>
          <p>
            Format dédié aux entreprises locales (artisans, dépannage, services à domicile).
            Les annonces s’affichent tout en haut de Google avec un badge rassurant.
          </p>
          <ul>
            <li>Paiement à la prise de contact (lead)</li>
            <li>Badge « Garantie Google » (selon éligibilité)</li>
            <li>Visibilité maximale pour les recherches locales</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> prospects locaux hautement qualifiés.</p>
        </article>
      </section>

      <ReferencementCard />

      <section id="audit" className={styles.audit}>
        <div className={styles.auditInner}>
          <h2>Audit gratuit & plan d’action</h2>
          <p>
            Nous réalisons un audit complet de votre site (technique, contenu, concurrence)
            et vous proposons un plan d’action priorisé pour améliorer rapidement votre
            visibilité et vos conversions.
          </p>
          <Link href="/rdv" className={styles.primaryBtn}>
            Demander mon audit gratuit
          </Link>
        </div>
      </section>

      <section className={styles.why}>
        <h2>Pourquoi nous choisir ?</h2>
        <ul className={styles.bullets}>
          <li>Experts certifiés Google & pratiques éprouvées</li>
          <li>Stratégies personnalisées selon votre activité</li>
          <li>Transparence et reporting clair</li>
          <li>Accompagnement sur le long terme</li>
        </ul>
      </section>

      <section className={styles.actions}>
        <p>Prêt à améliorer votre visibilité sur Google ?</p>
        <Link href="/rdv" className={styles.primaryBtnLarge}>
          Réserver une consultation
        </Link>
      </section>    
    </main>
  );
}
