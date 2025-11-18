'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import Image from 'next/image';
import CardLeft from '../CardLeft/CardLeft';
import CardRight from '../CardRight/CardRight';
import styles from './description.module.css';

export default function Description() {
 
  // Animations
  const leftAnimation = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const rightAnimation = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // InView hooks
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [btnRef, btnInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className={styles.container}>
      
      <section className={styles.cardContainer}>
         <CardLeft
            title = "Création de sites web sur mesure et optimisés SEO"
            txt = "Sites web modernes, rapides et responsive, conçus sur mesure pour améliorer la visibilité en ligne, booster le référencement naturel et maximiser les performances digitales." 
        />
         <CardRight
            title = "Applications web performantes & évolutives"
            txt = "Applications web robustes, évolutives et sécurisées, développées pour répondre aux besoins métier, automatiser les tâches et accélérer la transformation digitale." 
        />
        </section>
      <section className={styles.cardContainer2}>
        <CardLeft
            title = "Gestion de réseaux sociaux pour professionnels"
            txt = "Stratégies digitales sur mesure pour booster votre visibilité, créer une communauté engagée et renforcer votre image sur les réseaux sociaux les plus influents." 
        />
         <CardRight
            title = "Publicité digitale pour plus de visibilité"
            txt = "Boostez votre activité grâce à des campagnes de publicité en ligne efficaces, ciblées et optimisées pour atteindre vos clients au bon moment, sur les bons canaux." 
        />
      </section>
        <motion.div 
            ref={btnRef}
            className={styles.content}>
            <h3 className={styles.h5}>  Pourquoi la présence en ligne est essentielle pour les professionnels aujourd’hui</h3>
                <p className={styles.p}>
                    À l’ère du numérique, être présent sur internet n’est plus une option,
                    mais une nécessité absolue pour toute entreprise, artisan, commerçant 
                    ou professionnel indépendant. Que vous soyez un restaurateur, un prestataire
                    de services ou un créateur, le web est désormais la première vitrine de votre activité.
                </p>
        </motion.div>   
             <div className={styles.container}>       
        <section className={styles.bannervideo}>       
          
          <video
            src="/banner.mp4" 
            autoPlay
            loop
            muted
            className={styles.backgroundvideo}
            type="video/mp4" 
          />
        </section> 
        </div>  
            <motion.div className={styles.content}>
            <h3 className={styles.h5}>Une visibilité accessible 24h/24 et 7j/7 </h3>
                <p className={styles.p}> 
                    Contrairement à une boutique physique, un site internet professionnel
                    est visible en permanence. Il permet à vos clients de vous trouver à tout 
                    moment, de découvrir vos services, de consulter vos horaires ou de vous 
                    contacter facilement. En optimisant votre référencement naturel (SEO), 
                    vous améliorez votre position sur Google et augmentez vos chances d’attirer 
                    de nouveaux clients sans dépenser en publicité.
                </p>
            </motion.div>
            <div className={styles.banner}>       
            <Image 
                src='/banner1.png'
                fill
                priority       
                alt='banner'
                className={styles.background2}
            />                  
        </div> 
         <div className={styles.content}>
            <h3 className={styles.h5}>Le site internet : un levier puissant de crédibilité</h3>
                <p className={styles.p}>
                    Un site web bien conçu inspire confiance. Il valorise votre image de marque, 
                    rassure vos prospects et vous différencie de la concurrence. En intégrant des 
                    témoignages clients, un portfolio ou des avis, vous renforcez votre crédibilité 
                    en ligne et donnez envie de faire appel à vous.
                </p>
            </div>
            <div className={styles.banner}>       
            <Image 
                src='/banner2.png'
                fill
                priority       
                alt='banner'
                className={styles.background2}
            />                  
        </div> 
        <div className={styles.content}>
            <h3 className={styles.h5}>Les réseaux sociaux et Google My Business : des alliés indispensables</h3>
                <p className={styles.p}>
                    En complément d’un site vitrine, une stratégie de présence sur 
                    les réseaux sociaux (Facebook, Instagram, LinkedIn) et une fiche Google My Business 
                    bien optimisée vous permettent de capter une audience locale et engagée. Cela favorise 
                    la proximité avec vos clients et améliore considérablement votre visibilité locale.
                </p>
            </div>
            <div className={styles.banner}>       
            <Image 
                src='/banner3.png'
                fill
                priority       
                alt='banner'
                className={styles.background2}
            />                  
        </div> 
        <div className={styles.content}>
            <h3 className={styles.h5}>Le digital, moteur de croissance</h3>
                <p className={styles.p}>
                    Un professionnel visible en ligne génère plus de contacts, plus de devis, 
                    et donc plus de chiffre d’affaires. Avec des outils comme la publicité Google 
                    Ads, les campagnes emailing ou le référencement local, vous pouvez atteindre 
                    précisément vos cibles et mesurer vos retours sur investissement.
                </p>
        </div>  
         <div className={styles.banner}>       
            <Image 
                src='/banner4.png'
                fill
                priority       
                alt='banner'
                className={styles.background2}
            />                  
        </div>                                                      
    </section>
  )
}