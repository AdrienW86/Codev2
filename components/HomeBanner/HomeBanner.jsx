'use client';

import styles from './home.module.css';
import Image from 'next/image';

export default function HomeBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <section className={styles.heroVideo}>
          <div className={styles.videoContainer}>
            <Image 
            src="/test.png"
            alt="Hero Image"
            fill
            style={{ objectFit: 'cover' }} 
            priority
            className={styles.img}
          />          
            <div className={styles.overlay}></div>
            <div className={styles.heroContent}>
              <h1 className={styles.h1}>
                Transformez vos <span className={styles.span}> visiteurs </span> en <span className={styles.span}> clients </span> 
              </h1>            
              <p className={styles.p}>
                  Attirez de nouveaux clients
              </p>        
                <a href="#services" className={styles.button}>Prendre rendez-vous</a>                     
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}