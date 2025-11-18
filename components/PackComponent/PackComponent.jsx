'use client';

import styles from './pack.module.css';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Card({ plan, index }) {
  const slideDirection = index % 2 === 0 ? -50 : 50;
  const rotateDirection = index % 2 === 0 ? -3 : 3;

  return (
    <motion.div
      className={`${styles.cardRow} ${index % 2 === 1 ? styles.right : ''}`}
      initial={{ opacity: 0, x: slideDirection, rotateY: rotateDirection }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`${styles.card} ${styles[plan.color]}`}>
        {plan.popular && <div className={styles.badge}>Le plus populaire</div>}
        <h3>{plan.name}</h3>
        <p className={styles.price}>{plan.price}</p>
        <ul className={styles.list}>
          {plan.features.map((f, i) => (
            <motion.li
              key={f}
              className={styles.listItem}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <FaCheck className={styles.icon} /> {f}
            </motion.li>
          ))}
        </ul>
        <a href={plan.link} className={styles.button}>
          S’abonner
        </a>
      </div>
    </motion.div>
  );
}

export default function PackComponent() {
  const plans = [
    {
      name: 'Essentiel',
      price: '99 € / mois',
      features: [
        'Création + optimisation Google My Business',
        '1 réseau social + 2 posts/mois',
        'Assistance email 48h',
      ],
      color: 'green',
      link: 'TON_LIEN_STRIPE_ESSENTIEL',
    },
    {
      name: 'Pro',
      price: '199 € / mois',
      features: [
        'Tout de l’Essentiel',
        '2 réseaux sociaux + 4 posts/mois',
        'Site vitrine simple (5 pages)',
        'Reporting mensuel',
      ],
      color: 'orange',
      link: 'TON_LIEN_STRIPE_PRO',
      popular: true,
    },
    {
      name: 'Premium',
      price: '399 € / mois',
      features: [
        'Tout du Pro',
        'Gestion complète des posts (5-10/mois)',
        'Campagnes Google Ads / Local Service',
        'Suivi SEO basique',
      ],
      color: 'red',
      link: 'TON_LIEN_STRIPE_PREMIUM',
    },
    {
      name: 'Ultimate',
      price: '599 € / mois',
      features: [
        'Tout du Premium',
        'Campagnes Ads complètes + Local Service',
        'Analyse concurrentielle + recommandations',
        'Assistance prioritaire WhatsApp / SMS',
      ],
      color: 'blue',
      link: 'TON_LIEN_STRIPE_ULTIMATE',
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nos offres de suivi marketing & web</h1>
      <section className={styles.section}>
        <div className={styles.cards}>
          {plans.map((plan, i) => <Card key={plan.name} plan={plan} index={i} />)}
        </div>
      </section>
    </div>
  );
}
