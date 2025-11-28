'use client';

import styles from './services.module.css';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Card({ plan, index }) {
  const slideDirection = index % 2 === 0 ? -50 : 50;
  const rotateDirection = index % 2 === 0 ? -3 : 3;

  return (
    <motion.div
      className={styles.card}
      style={{
        backgroundImage: `url(${plan.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0, x: slideDirection, rotateY: rotateDirection }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    >
      <h3 className={styles.h3}>{plan.name}</h3>
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
        {plan.name.includes('Suivi') || plan.name.includes('Pro') ? 'S’abonner' : 'En savoir plus'}
      </a>
    </motion.div>
  );
}

export default function HomeComponent() {
  const services = [
    {
      name: 'Référencement',
      price: 'Diffuser vos produits ou services à un large publique et gagner de nouveaux clients',
      features: [
        'Référencement Naturel (SEO)',
        'Référencement Payant (SEA)',
        'Annonces Local Services'
      ],
      color: 'green',
      link: 'TON_LIEN_STRIPE_ESSENTIEL',
      popular: true,
      background: "/banner1.png",
    },
    {
      name: 'Création de site web',
      price: "Convertissez vos prospects en valorisant vos services et produits",
      features: [
        'Site vitrine',
        'Site e-commerce',
        'Applications web',        
      ],
      color: 'blue',
      link: '#',
      background: "/development.png",
    },
    {
      name: 'Campagnes publicitaires',
      price: "Définissez votre stratégie de vente et faites décoller votre chiffre d'affaire",
      features: [
        'Google Ads',
        'Local Services',
        'Réseaux sociaux',
      ],
      color: 'orange',
      link: '#',
      background: "/banner4.png",
    },
  ];

  const testimonials = [
    { text: "Super accompagnement, mon site est maintenant impeccable !", author: "Alice D." },
    { text: "Les campagnes Ads ont vraiment boosté mon chiffre d'affaires.", author: "Marc L." },
    { text: "Support réactif et site parfaitement optimisé.", author: "Sophie R." },
  ];

  return (
    <div className={styles.container}>
      
      
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