// app/campagnes/page.jsx
import Link from "next/link";
import AdsCard from "./AdsCard/AdsCard"
import styles from "./ads.module.css";

export const metadata = {
  title: "Campagnes Publicitaires — Google Ads, Social Ads & Local Services | Votre Agence",
  description:
    "Augmentez votre visibilité et vos ventes grâce à des campagnes publicitaires performantes : Google Ads, Facebook Ads, Instagram Ads et Local Services. Audit gratuit et accompagnement sur mesure.",
};

export default function AdsComponent() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            Boostez vos ventes grâce à des campagnes publicitaires ciblées
          </h1>
          <p className={styles.lead}>
            Atteignez vos clients là où ils se trouvent : Google, Facebook, Instagram, ou via Local Services.
            Nous créons et optimisons vos campagnes pour maximiser vos conversions et votre retour sur investissement.
          </p>

          <div className={styles.ctas}>
            <Link href="/contact" className={styles.primaryBtn}>
              Prendre rendez-vous
            </Link>
            <Link href="/contact" className={styles.ghostBtn}>
              Demander un audit gratuit
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.intro}>
        <h2>Comprendre les différents types de campagnes publicitaires</h2>
        <p>
          Chaque canal publicitaire a ses forces et ses objectifs spécifiques : générer des ventes, attirer des prospects qualifiés ou augmenter la notoriété de votre marque.
        </p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h3>⚡ Google Ads</h3>
          <p>
            Les campagnes Google Ads permettent d’apparaître en première page de Google grâce à des annonces ciblées. Vous payez uniquement lorsque quelqu’un clique sur votre annonce.
          </p>
          <ul>
            <li>Apparition immédiate sur les mots-clés stratégiques</li>
            <li>Suivi précis des conversions et ROI</li>
            <li>Optimisation du budget et ciblage géographique</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> visibilité rapide et prospects qualifiés.</p>
        </article>

        <article className={styles.card}>
          <h3>📱 Réseaux sociaux (Facebook Ads, Instagram Ads)</h3>
          <p>
            Les publicités sur les réseaux sociaux permettent de toucher votre audience avec des visuels attractifs et des messages adaptés.
          </p>
          <ul>
            <li>Ciblage précis selon centres d’intérêt, âge, localisation</li>
            <li>Formats variés : stories, carrousels, vidéos</li>
            <li>Analyse détaillée des performances et ajustements rapides</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> engagement fort et notoriété accrue.</p>
        </article>

        <article className={styles.card}>
          <h3>📍 Local Services Ads</h3>
          <p>
            Les annonces Local Services sont dédiées aux entreprises locales (artisans, services à domicile) et s’affichent en haut des résultats Google avec un badge de confiance.
          </p>
          <ul>
            <li>Paiement à la prise de contact (lead)</li>
            <li>Badge « Garantie Google » selon éligibilité</li>
            <li>Visibilité maximale pour les recherches locales</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> prospects locaux hautement qualifiés.</p>
        </article>
      </section>

      <AdsCard />

    </main>
  );
}
