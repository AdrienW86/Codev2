import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
  return (
   <footer  className={styles.footer}>
    <div className={styles.container}>
        <Link href="/" className={styles.logoContainer}>
          <Image 
            src="/logo_orangered.png" 
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
          <ul>
            <li className={styles.li}><Link href="/">Accueil</Link></li>
            <li className={styles.li}><Link href="/contact">Contact</Link></li>
            <li className={styles.li}><Link href="/web">Sites web</Link></li>
            <li className={styles.li}><Link href="/appli">Applis web</Link></li>
            <li className={styles.li}><Link href="/mobiles">Applis mobiles</Link></li>
            
          </ul>
        </nav>
   </footer>
  )
}
