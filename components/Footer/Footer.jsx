import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
   const year = new Date().getFullYear();

  return (
   <footer  className={styles.footer}>
    <div className={styles.container}>
        <Link href="/" className={styles.logoContainer}>
          <Image 
            src="/logo_white.png" 
            alt="Logo Codev - Création de site web" 
            width={90} 
            height={90} />
        </Link>

        <span role="presentation" className={styles.title}>Solutions Numériques</span>

       
      </div>
        <nav 
            className={styles.menu}
            aria-label="Menu principal"
            >
          <ul className={styles.ul}>
            <li className={styles.li}><Link href="/">Accueil</Link></li>
            <li className={styles.li}><Link href="/contact">Contact</Link></li>
            <li className={styles.li}><Link href="/web">Sites web</Link></li>
            
            <li className={styles.li}><Link href="/mobiles">Réseaux sociaux</Link></li>
            <li className={styles.li}><Link href="/appli">Campagnes publicitaires</Link></li>
            <li className={styles.li}><Link href="/appli">Qui sommes-nous ?</Link></li>
            
          </ul>
           <p className={styles.p}>Copyright © CODEV - {year}. Tous droits réservés.</p>
        </nav>
   </footer>
  )
}
