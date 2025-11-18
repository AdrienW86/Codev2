'use client';

import styles from './web.module.css';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Card({ plan, index }) {
  const slideDirection = index % 2 === 0 ? -50 : 50;
  return (
    <motion.div
      className={`${styles.cardRow} ${index % 2 === 1 ? styles.right : ''}`}
      initial={{ opacity: 0, x: slideDirection }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`${styles.card} ${styles[plan.color]}`}>
        {plan.popular && <div className={styles.badge}>Le plus populaire</div>}
        <h3>{plan.name}</h3>
        <p className={styles.price}>{plan.price}</p>
        <ul className={styles.list}>
          {plan.features.map((f) => (
            <li key={f}><FaCheck className={styles.icon}/> {f}</li>
          ))}
        </ul>
        <a href={plan.link} className={styles.button}>
          {plan.name.includes('Suivi') ? 'S’abonner' : 'Commander'}
        </a>
      </div>
    </motion.div>
  );
}

export default function WebComponent() {
  const entretienPlans = [
    {
      name: 'Suivi Essentiel',
      price: '49 € / mois',
      features: ['Corrections de bugs mineurs', 'Mises à jour simples', 'Surveillance du site', 'Assistance email (48h)'],
      color: 'green',
      link: 'https://buy.stripe.com/aFafZh0vN9Wr1RO0SFbMQ03',
    },
    {
      name: 'Suivi PRO',
      price: '99 € / mois',
      features: ['Tout du Suivi Essentiel', 'Mises à jour illimitées', 'Optimisation SEO mensuelle', 'Sauvegardes hebdomadaires', 'Assistance prioritaire (12h)', '30 min d’intervention incluse'],
      color: 'orange',
      link: 'https://buy.stripe.com/8x200j2DVc4zgMIcBnbMQ05',
      popular: true,
    },
    {
      name: 'Suivi Premium',
      price: '199 € / mois',
      features: ['Tout du Suivi PRO', 'Développements personnalisés (2h/mois)', 'Optimisation performances', 'Suivi Google Ads / Analytics', 'Assistance WhatsApp / SMS', 'Intervention prioritaire (2h)'],
      color: 'red',
      link: 'https://buy.stripe.com/28E3cv7Yf7OjeEA1WJbMQ04',
    },
  ];

  const creationPlans = [
    { name: 'Site Vitrine', price: '799 €', features: ['Jusqu’à 5 pages', 'Design responsive', 'Formulaire de contact', 'Optimisation SEO basique'], color: 'blue', link: '#' },
    { name: 'Site PME / Boutique', price: '1499 €', features: ['Jusqu’à 10 pages', 'Design personnalisé', 'Blog ou actualités', 'Optimisation SEO', 'Formation à l’admin'], color: 'blue', link: '#', popular: true },
    { name: 'Site E-commerce', price: '2499 €', features: ['Jusqu’à 20 pages', 'Catalogue produits illimité', 'Paiement en ligne intégré', 'Optimisation SEO avancée', 'Formation & support'], color: 'blue', link: '#' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nos offres de services</h1>

      <section id="entretien" className={`${styles.section} ${styles.entretien}`}>
        <h2 className={styles.sectionTitle}>Entretien et suivi de site web</h2>
        <p className={styles.sectionDesc}>Gardez votre site performant, à jour et sécurisé grâce à nos formules d’abonnement simples et efficaces.</p>
        <div className={styles.cards}>
          {entretienPlans.map((plan, i) => <Card key={plan.name} plan={plan} index={i} />)}
        </div>
      </section>

      <section id="creation" className={`${styles.section} ${styles.creation}`}>
        <h2 className={styles.sectionTitle}>Création de site web</h2>
        <p className={styles.sectionDesc}>Nous créons des sites web sur-mesure, modernes et optimisés pour vos besoins et votre activité.</p>
        <div className={styles.cards}>
          {creationPlans.map((plan, i) => <Card key={plan.name} plan={plan} index={i} />)}
        </div>
      </section>
    </div>
  );
}
