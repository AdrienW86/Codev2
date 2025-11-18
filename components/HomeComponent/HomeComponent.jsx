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
        {plan.name.includes('Suivi') || plan.name.includes('Pro') ? 'S’abonner' : 'Commander'}
      </a>
    </motion.div>
  );
}

export default function HomeComponent() {
  const services = [
    {
      name: 'Suivi & Entretien',
      price: 'À partir de 49 €/ mois',
      features: [
        'Mises à jour et sécurité du site',
        'Assistance rapide',
        'Optimisation SEO mensuelle',
      ],
      color: 'green',
      link: 'TON_LIEN_STRIPE_ESSENTIEL',
      popular: true,
    },
    {
      name: 'Création de site web',
      price: 'À partir de 799 €',
      features: [
        'Site vitrine ou boutique',
        'Design responsive et moderne',
        'Optimisation SEO initiale',
      ],
      color: 'blue',
      link: '#',
    },
    {
      name: 'Marketing & Publicité',
      price: 'À partir de 99 € / mois',
      features: [
        'Google My Business',
        'Réseaux sociaux et posts',
        'Campagnes Google Ads / Local Service',
      ],
      color: 'orange',
      link: '#',
    },
  ];

  const testimonials = [
    { text: "Super accompagnement, mon site est maintenant impeccable !", author: "Alice D." },
    { text: "Les campagnes Ads ont vraiment boosté mon chiffre d'affaires.", author: "Marc L." },
    { text: "Support réactif et site parfaitement optimisé.", author: "Sophie R." },
  ];

  return (
    <div className={styles.container}>
      {/* Hero avec vidéo responsive */}
      <div className={styles.box}>
        <section className={styles.heroVideo}>
        <div className={styles.videoContainer}>
          <video
            src="/banner2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
          />
          <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
            <h1 className={styles.h1}>Boostez votre présence en ligne</h1>
            <p className={styles.p}>
                Création de sites web sur-mesure, suivi mensuel et solutions marketing digitales adaptées : SEO, réseaux sociaux et campagnes publicitaires.
            </p>
            <p className={styles.p}>
                Nous aidons les entreprises à attirer de nouveaux clients et développer leur chiffre d’affaires grâce à une présence optimisée sur le web.
            </p>
            <a href="#services" className={styles.button}>Découvrir nos offres</a>
</div>

        </div>
      </section>
      </div>

      {/* Services */}
      <section id="services" className={styles.section}>
        <h2 className={styles.sectionTitle}>Nos services principaux</h2>
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
