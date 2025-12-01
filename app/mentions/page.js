import React from 'react'
import styles from './mentions.module.css'

export default function page() {
   return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mentions légales</h1>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Éditeur du site</h2>
        <p>Le site <strong>code-v.fr</strong> est édité par :</p>
        <ul className={styles.list}>
          <li><strong>Nom de l'entreprise :</strong> Codev</li>
          <li><strong>Statut :</strong> Entrepreneur individuel</li>
          <li><strong>Adresse :</strong> 42 avenue Emile Roudayre, 66000 Perpignan</li>
          <li><strong>SIRET :</strong> 912 773 447 00020</li>
          <li><strong>Email :</strong> codev66000@gmail.com</li>
          <li><strong>Téléphone :</strong> 06 66 67 27 09</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Directeur de la publication</h2>
        <p>Weissenbacher Adrien, en qualité de dirigeant de Codev.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Hébergement</h2>
        <p>
          Le site est hébergé par <strong>Vercel</strong> :{" "}
          <a href="https://vercel.com" target="_blank" className={styles.link}>https://vercel.com</a>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Propriété intellectuelle</h2>
        <p>
          L’ensemble du contenu présent sur ce site (textes, images, vidéos, logos, icônes, etc.) est la propriété exclusive de Codev ou de ses partenaires. Toute reproduction, représentation, modification, publication ou redistribution, totale ou partielle, sans autorisation expresse est interdite.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Données personnelles</h2>
        <p>
          Les informations recueillies via le site (formulaires, newsletter, etc.) sont destinées à Codev et utilisées uniquement pour répondre à vos demandes.  
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données personnelles.  
          Pour exercer ce droit : <a href="mailto:codev66000@gmail.com" className={styles.link}>codev66000@gmail.com</a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Cookies</h2>
        <p>
          Le site peut utiliser des cookies pour améliorer l’expérience utilisateur et analyser la fréquentation. Vous pouvez configurer votre navigateur pour refuser les cookies.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Responsabilité</h2>
        <p>
          Codev s’efforce de fournir des informations exactes et à jour, mais ne peut être tenu responsable des erreurs, omissions ou interruptions du service.
        </p>
      </section>
    </div>
  );
}
