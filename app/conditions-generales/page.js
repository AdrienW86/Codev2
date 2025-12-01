import styles from "./conditions.module.css"

export default function CGV() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Conditions Générales de Vente (CGV)</h1>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>1. Objet</h2>
        <p>
          Les présentes Conditions Générales de Vente définissent les droits et obligations de Codev et de ses clients dans le cadre de la vente de prestations de services de développement web.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>2. Prestations</h2>
        <p>
          Codev propose des prestations de développement de sites web, applications web et services associés. Les détails et caractéristiques des prestations sont définis dans les devis acceptés par le client.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>3. Tarifs et paiement</h2>
        <p>
          Les tarifs sont indiqués sur le devis. Le paiement s’effectue selon les modalités définies dans le devis. Toute prestation commencée implique l’acceptation des présentes CGV.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>4. Délais</h2>
        <p>
          Les délais sont donnés à titre indicatif et peuvent varier en fonction de la complexité du projet et des retours du client. Codev s’engage à informer le client de tout retard.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>5. Responsabilité</h2>
        <p>
          Codev ne peut être tenu responsable des dommages indirects ou de l’utilisation du site ou de l’application développée par le client. La responsabilité de Codev est limitée au montant payé pour la prestation concernée.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>6. Propriété intellectuelle</h2>
        <p>
          Codev conserve la propriété intellectuelle de ses créations jusqu’au paiement intégral de la prestation. Après règlement complet, les droits d’utilisation sont transférés au client selon les termes du devis.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>7. Loi applicable</h2>
        <p>
          Les présentes CGV sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents du siège social de Codev.
        </p>
      </section>
    </div>
  );
}
