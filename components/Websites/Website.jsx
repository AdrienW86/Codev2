// app/creation-site/page.jsx
import Link from "next/link";
import WebComponent from "../WebComponent/WebComponent";
import styles from "./website.module.css";

export const metadata = {
  title: "Création de site web — Vitrine, E-commerce & Applications | Votre Agence",
  description:
    "Nous créons des sites web sur-mesure : site vitrine, site e-commerce et applications web. Transformez vos visiteurs en clients.",
};

export default function Website() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            Transformez votre présence en ligne avec un site web sur-mesure
          </h1>
          <p className={styles.lead}>
            Site vitrine, site e-commerce ou application web : nous concevons des solutions adaptées à votre activité pour attirer plus de clients et développer votre chiffre d’affaires.
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
        <h2>Découvrez nos types de sites web</h2>
        <p>
          Chaque projet a ses besoins spécifiques. Choisissez le type de site le plus adapté à votre activité pour maximiser vos résultats en ligne.
        </p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h3>🌐 Site Vitrine</h3>
          <p>
            Présentez votre entreprise et vos services sur un site simple, élégant et optimisé pour le SEO. Idéal pour attirer de nouveaux clients et valoriser votre image.
          </p>
          <ul>
            <li>Design professionnel et moderne</li>
            <li>Pages adaptatives (responsive)</li>
            <li>Contenu optimisé pour le référencement</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> visibilité professionnelle et crédibilité immédiate.</p>
        </article>

        <article className={styles.card}>
          <h3>🛒 Site E-commerce</h3>
          <p>
            Vendez vos produits en ligne avec un site sécurisé, facile à gérer et optimisé pour la conversion. Idéal pour développer vos ventes rapidement.
          </p>
          <ul>
            <li>Catalogue de produits complet</li>
            <li>Système de paiement intégré</li>
            <li>Gestion des commandes et suivi client</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> vente en ligne facile et croissance rapide.</p>
        </article>

        <article className={styles.card}>
          <h3>📱 Applications Web</h3>
          <p>
            Développez des applications web personnalisées pour répondre à vos besoins spécifiques. Idéal pour automatiser des processus, gérer des clients ou offrir de nouveaux services.
          </p>
          <ul>
            <li>Fonctionnalités sur-mesure</li>
            <li>Interface utilisateur intuitive</li>
            <li>Compatible sur tous les appareils</li>
          </ul>
          <p className={styles.benefit}><strong>Avantage :</strong> solution personnalisée et performante pour votre activité.</p>
        </article>
      </section>
      <WebComponent />
    </main>
  );
}
