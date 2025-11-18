// components/Intro.jsx
import React from 'react'
import styles from './intro.module.css'

export default function Intro() {
  return (
    <section className={styles.intro}>
      <h1>Développeur web à Perpignan – Création de sites internet, réseaux sociaux & campagnes publicitaires</h1>

      <p>
        Chez <strong>CODEV</strong>, vous bénéficiez d’un accompagnement complet pour développer votre visibilité en ligne.
        Basé à <strong>Perpignan</strong>, nous vous aidons à créer une présence digitale forte, performante et adaptée à vos objectifs.
      </p>

      <h2>Nos services</h2>
      <ul>
        <li>
          <strong>Création de sites web</strong> professionnels (vitrine ou e-commerce), modernes, responsives et optimisés pour le <strong>référencement naturel (SEO)</strong>
        </li>
        <li>
          <strong>Développement sur-mesure</strong> avec des technologies récentes et performantes (Next.js, React, etc.)
        </li>
        <li>
          <strong>Gestion de vos réseaux sociaux</strong> : animation de vos pages Facebook, Instagram, LinkedIn, création de contenu régulier et engageant
        </li>
        <li>
          <strong>Campagnes publicitaires ciblées</strong> (Google Ads, Facebook Ads) pour générer du trafic et attirer de nouveaux clients
        </li>
        <li>
          <strong>Maintenance et suivi personnalisé</strong> pour faire évoluer votre site selon les besoins de votre activité
        </li>
      </ul>

      <p>
        Que vous soyez une entreprise locale, un artisan, un commerçant ou un indépendant, nous vous aidons à transformer votre présence en ligne en véritable outil de croissance.
      </p>

      <p>
        📍 <strong>Intervention à Perpignan et dans toute la région Occitanie</strong>, avec possibilité d’accompagnement à distance dans toute la France.
      </p>

      <p>
        🎯 <strong>Objectif</strong> : vous faire gagner en visibilité, professionnaliser votre image en ligne et développer votre clientèle.
      </p>

      <p>
        👉 <strong>Contactez-nous dès maintenant</strong> pour échanger autour de votre projet digital et obtenir un devis personnalisé.
      </p>
    </section>
  )
}
