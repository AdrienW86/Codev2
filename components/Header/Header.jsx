"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer}>
          <Image 
            src="/logo_white.png" 
            alt="Logo Codev - Création de site web" 
            width={90} 
            height={90} />
        </Link>

        <span role="presentation" className={styles.title}>Solutions Numériques</span>

        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
          onClick={toggleMenu} 
          aria-label="Ouvrir le menu"
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>
      </div>

      {isMenuOpen && (
        <nav 
            className={styles.menu}
            aria-label="Menu principal"
            >
          <ul>
            <li className={styles.li}><Link href="/" onClick={toggleMenu}>Accueil</Link></li>
            <li className={styles.li}><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
            <li className={styles.li}><Link href="/web" onClick={toggleMenu}>Sites web</Link></li>
            <li className={styles.li}><Link href="/appli" onClick={toggleMenu}>Applis web</Link></li>
            <li className={styles.li}><Link href="/mobiles" onClick={toggleMenu}>Applis mobiles</Link></li>
            <li className={styles.li}><Link href="/mobiles" onClick={toggleMenu}>Réseaux sociaux</Link></li>
            <li className={styles.li}><Link href="/appli" onClick={toggleMenu}>Campagnes publicitaires</Link></li>
                      <li className={styles.li}><Link href="/appli" onClick={toggleMenu}>Qui sommes-nous ?</Link></li>
            
          </ul>
        </nav>
      )}
    </header>
  );
}
