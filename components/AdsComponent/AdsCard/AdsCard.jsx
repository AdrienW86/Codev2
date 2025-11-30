'use client';

import styles from './pack.module.css';
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
  const creationPlans = [
    { name: 'Réseaux sociaux', price: '199 € / mois', features: ['Facebook et Instagram', '3 publications par semaine', 'Facebook Ads', 'Visuel sur mesure'], color: 'blue', link: '#' },
    { name: 'Local Services', price: '399 € / mois', features: ['Gestion des annonces', 'Réponses aux avis clients', 'Certification Google', 'Diffusion prioritaire', "Fiche d'établissement optimisé"], color: 'blue', link: '#',popular: true },
    { name: 'Google Ads', price: '599€ / mois', features: ['Création de la campagne', 'Optimisation des mots clés', 'Suivi et ajustement des enchères', 'Rapport mensuel', "Fiche d'établissement optimisée"], color: 'blue', link: '#' }
  ];

  return (
    <div className={styles.container}>
      <section id="creation" className={`${styles.section} ${styles.creation}`}>
        <h2 className={styles.sectionTitle}>Tarifs</h2>
        <p className={styles.sectionDesc}>Nous créons des sites web sur-mesure, modernes et optimisés pour vos besoins et votre activité.</p>
        <div className={styles.cards}>
          {creationPlans.map((plan, i) => <Card key={plan.name} plan={plan} index={i} />)}
        </div>
      </section>
    </div>
  );
}
