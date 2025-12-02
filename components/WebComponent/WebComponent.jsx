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
  const creationPlans = [
    { name: 'Site Vitrine', price: '799 €', features: ['Jusqu’à 5 pages', 'Design responsive', 'Formulaire de contact', 'Optimisation SEO basique'], color: 'blue', link: 'https://buy.stripe.com/aFacN55Q72tZaokeJvbMQ06' },
    { name: 'Site E-commerce', price: '1499 €', features: ['Jusqu’à 20 pages', 'Catalogue produits illimité', 'Paiement en ligne intégré', 'Optimisation SEO avancée', 'Formation & support'], color: 'blue', link: 'https://buy.stripe.com/eVqaEX6Ub0lR3ZWdFrbMQ07',popular: true },
    { name: 'Application Web', price: 'à partir de 2499 €', features: ['Jusqu’à 30 pages', 'Design personnalisé', 'Blog ou actualités', 'Optimisation SEO', 'Formation à l’admin'], color: 'blue', link: 'https://buy.stripe.com/4gM6oH2DVb0v54030NbMQ08' }
  ];

  return (
    <div className={styles.container}>
      <section id="tarif" className={`${styles.section} ${styles.creation}`}>
        <h2 className={styles.sectionTitle}>Tarifs</h2>
        <p className={styles.sectionDesc}>Nous créons des sites web sur-mesure, modernes et optimisés pour vos besoins et votre activité.</p>
        <div className={styles.cards}>
          {creationPlans.map((plan, i) => <Card key={plan.name} plan={plan} index={i} />)}
        </div>
      </section>
    </div>
  );
}
