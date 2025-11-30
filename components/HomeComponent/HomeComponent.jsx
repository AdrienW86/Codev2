'use client';

import styles from './home.module.css';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Card({ plan, index }) {
  const slideDirection = index % 2 === 0 ? -50 : 50;
  const rotateDirection = index % 2 === 0 ? -3 : 3;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, x: slideDirection, rotateY: rotateDirection }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    >
      {plan.popular && <div className={styles.badge}>Le plus populaire</div>}
      <h3>{plan.name}</h3>
      <p className={styles.price}>{plan.price}</p>
      <ul className={styles.list}>
        {plan.features.map((f, i) => (
          <motion.li
            key={f}
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
        {plan.name.includes('Suivi') || plan.name.includes('Annonces') ? 'S’abonner' : 'Commander'}
      </a>
    </motion.div>
  );
}

export default function HomeComponent() {
  const services = [
    {
      name: 'Suivi Essentiel',
      price: '49 €/ mois',
      features: [
        'Corrections de bugs mineurs',
        'Mises à jour simples',
        'Surveillance du site',
        'Assistance email (48h)'

      ],
      color: 'green',
      link: 'TON_LIEN_STRIPE_ESSENTIEL',
    },
    {
      name: 'Annonces Local Services',
      price: '399 € / mois',
      features: [
        'Gestion des annonces',
        'Réponses aux avis clients',
        'Certification Google',
        'Diffusion prioritaire',
        "Fiche d'établissement optimisé",
      ],
      color: 'orange',
      link: '#',
      popular: true,
    },
    {
      name: 'Site Vitrine',
      price: '799 €',
      features: [
        'Jusqu’à 5 pages',
        'Design responsive',
        'Formulaire de contact',
        'Optimisation SEO basique',
      ],
      color: 'blue',
      link: '#',     
    },
  ];

  const testimonials = [
    { text: "Super accompagnement, mon site est maintenant impeccable !", author: "Eco Couverture" },
    { text: "Les annonces locale Services ont vraiment boosté mon chiffre d'affaires.", author: "Protection Nuisibles" },
    { text: "Support réactif et site parfaitement optimisé.", author: "Diogène Nettoyage" },
  ];

  return (
    <div className={styles.container}>
      {/* Services */}
      <section id="services" className={styles.section}>
        <h2 className={styles.sectionTitle}>Nos services les plus appréciés</h2>
        <p className={styles.sectionDesc}>Des solutions complètes adaptées à votre activité.</p>
        <div className={styles.cards}>
          {services.map((plan, i) => <Card key={plan.name} plan={plan} index={i} />)}
        </div>
      </section>
      {/* Testimonials */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ils nous font confiance</h2>
        <div className={styles.testimonials}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className={styles.testimonial}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <p>"{t.text}"</p>
              <span>- {t.author}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}