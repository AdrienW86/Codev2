import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
   const year = new Date().getFullYear();

  return (
   <footer  className={styles.footer}>
        <nav 
            className={styles.menu}
            aria-label="Menu principal"
            >
          <ul className={styles.ul}>
            <li className={styles.li}><Link href="/">Accueil</Link></li>
            <li className={styles.li}><Link href="/contact">Contact</Link></li>
            <li className={styles.li}><Link href="/sites">Sites web</Link></li>
            
            <li className={styles.li}><Link href="/mobiles">Référencement</Link></li>
            <li className={styles.li}><Link href="/ads">Campagnes publicitaires</Link></li>
            <li className={styles.li}><Link href="/appli">Qui sommes-nous ?</Link></li>
            
          </ul>
           <p className={styles.p}>Copyright © CODEV 2022 - {year}. Tous droits réservés.</p>
        </nav>
   </footer>
  )
}
