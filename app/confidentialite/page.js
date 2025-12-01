import styles from './confidentialite.module.css'

export default function PolitiqueConfidentialite() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Politique de confidentialité</h1>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>1. Collecte des données</h2>
        <p>
          Codev collecte uniquement les données personnelles nécessaires pour répondre aux demandes des utilisateurs via les formulaires de contact ou la newsletter.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>2. Utilisation des données</h2>
        <p>
          Les informations recueillies sont utilisées uniquement pour répondre aux demandes, envoyer des informations sur les services ou gérer la relation client.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>3. Partage des données</h2>
        <p>
          Codev ne vend, ne loue ni ne communique vos données personnelles à des tiers, sauf obligation légale.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>4. Durée de conservation</h2>
        <p>
          Les données sont conservées pendant la durée nécessaire à la gestion des demandes et relations clients, puis supprimées conformément aux obligations légales.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>5. Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ce droit en contactant : <a href="mailto:codev66000@gmail.com" className={styles.link}>codev66000@gmail.com</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>6. Sécurité</h2>
        <p>
          Codev met en place des mesures techniques et organisationnelles pour protéger vos données contre toute perte, altération ou accès non autorisé.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>7. Modifications</h2>
        <p>
          Codev se réserve le droit de modifier la présente politique de confidentialité. Toute modification sera publiée sur le site.
        </p>
      </section>
    </div>
  );
}
