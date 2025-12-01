import styles from './qui.module.css'

export default function QuiSommesNous() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Qui sommes-nous ?</h1>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Notre mission</h2>
        <p>
          Chez <strong>Codev</strong>, notre mission est d’accompagner les entreprises et entrepreneurs dans le développement de leur présence en ligne et l’optimisation de leurs performances digitales. Nous proposons des solutions sur-mesure pour créer, améliorer et promouvoir leurs sites et applications web.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Notre histoire</h2>
        <p>
          Codev a été fondé en tant qu’entreprise individuelle pour offrir un service personnalisé et de qualité à ses clients. Depuis sa création, nous avons accompagné de nombreux projets, allant du site vitrine aux applications web complexes, toujours avec professionnalisme et souci de résultats concrets.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Nos compétences</h2>
        <p>
          Nous maîtrisons les technologies web modernes telles que <strong>Next.js, React, Node.js, MongoDB, MySQL</strong>, ainsi que les outils de gestion de projets et de déploiement.  
          Nous créons des sites web, des applications web et des Progressive Web Apps (PWA) performantes et évolutives.  
          Nous proposons également une expertise complète en <strong>SEO (référencement naturel)</strong> pour améliorer la visibilité des sites sur Google, ainsi que la gestion de <strong>campagnes Google Ads et Local Services</strong> pour générer une audience ciblée et des prospects qualifiés.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Notre engagement envers les entreprises locales</h2>
        <p>
          Nous aidons spécifiquement les entreprises locales à développer leur activité en ligne. Grâce à nos stratégies SEO et publicitaires, nous garantissons une visibilité accrue et une génération significative de prospects qualifiés, permettant à nos clients de toucher plus efficacement leur marché local.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Nos valeurs</h2>
        <ul className={styles.list}>
          <li>Transparence et communication claire avec nos clients</li>
          <li>Qualité et rigueur dans chaque projet</li>
          <li>Respect des délais et engagement sur les résultats</li>
          <li>Approche personnalisée adaptée aux besoins de chacun</li>
          <li>Orientation résultats pour maximiser la visibilité et les prospects</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Contactez-nous</h2>
        <p>
          Vous souhaitez développer votre présence en ligne et attirer davantage de clients locaux ? Contactez-nous pour en discuter et obtenir un devis personnalisé : 
          <a href="mailto:codev66000@gmail.com" className={styles.link}> codev66000@gmail.com</a> ou par téléphone au <strong>06 66 67 27 09</strong>.
        </p>
      </section>
    </div>
  );
}