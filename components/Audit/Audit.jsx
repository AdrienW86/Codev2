import React from 'react'
import Link from 'next/link'
import styles from './audit.module.css'

export default function Audit() {
  return (
    <>
      <section id="audit" className={styles.audit}>
        <div className={styles.auditInner}>
          <h2>Audit gratuit & plan d’action</h2>
          <p>
            Nous analysons vos campagnes existantes et vos besoins pour créer un plan d’action personnalisé,
            afin d’améliorer vos performances et maximiser votre retour sur investissement.
          </p>
          <Link href="/contact" className={styles.primaryBtn}>
            Demander mon audit gratuit
          </Link>
        </div>
      </section>

      <section className={styles.why}>
        <h2>Pourquoi nous choisir ?</h2>
        <ul className={styles.bullets}>
          <li>Experts certifiés Google Ads & Facebook Ads</li>
          <li>Campagnes personnalisées selon votre activité</li>
          <li>Transparence et reporting clair</li>
          <li>Accompagnement sur le long terme</li>
        </ul>
      </section>

      <section className={styles.actions}>
        <p>Prêt à lancer vos campagnes et booster vos ventes ?</p>
        <Link href="/contact" className={styles.primaryBtnLarge}>
          Réserver votre rendez-vous gratuit
        </Link>
      </section>    
    </>
  )
}
