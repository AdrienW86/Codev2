import React from 'react'
import Image from 'next/image'
import styles from './banner.module.css'

export default function Banner() {
  return (
    <section className={styles.container}>  
        <div className={styles.banner}>       
          <h1 className={styles.h1}> Boostez votre présence en ligne ! </h1>
            <Image 
                src='/development.png'
                fill
                priority       
                alt='banner'
                className={styles.background}
            />                  
        </div> 
        <div className={styles.intro}>
            <h2 className={styles.h2}>   Création de sites web sur mesure et optimisés SEO</h2>
                <p className={styles.p}>
                    Sites web modernes, rapides et responsive, conçus sur mesure pour améliorer 
                    la visibilité en ligne, booster le référencement naturel et maximiser les 
                    performances digitales.
                </p>
        </div>
        <div className={styles.intro2}>
            <h2 className={styles.h3}>  Applications web performantes & évolutives</h2>
                <p className={styles.p}>
                    Applications web robustes, évolutives et sécurisées, développées pour
                    répondre aux besoins métier, automatiser les tâches et accélérer la 
                    transformation digitale. 
                </p>
        </div>
        <div className={styles.intro3}>
            <h2 className={styles.h2}> Gestion de réseaux sociaux pour professionnels</h2>
                <p className={styles.p}>
                    Stratégies digitales sur mesure pour booster votre visibilité, créer une communauté 
                    engagée et renforcer votre image sur les réseaux sociaux les plus influents.
                </p>
        </div>
        <div className={styles.intro4}>
            <h2 className={styles.h3}>  Publicité digitale pour plus de visibilité</h2>
                <p className={styles.p}>
                    Boostez votre activité grâce à des campagnes de publicité en ligne efficaces, ciblées
                    et optimisées pour atteindre vos clients au bon moment, sur les bons canaux.
                </p>
        </div>
        <div className={styles.content}>
            <h3 className={styles.h5}>  Pourquoi la présence en ligne est essentielle pour les professionnels aujourd’hui</h3>
                <p className={styles.p}>
                    À l’ère du numérique, être présent sur internet n’est plus une option,
                    mais une nécessité absolue pour toute entreprise, artisan, commerçant 
                    ou professionnel indépendant. Que vous soyez un restaurateur, un prestataire
                    de services ou un créateur, le web est désormais la première vitrine de votre activité.
                </p>
        </div>   
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
         <div className={styles.content}>
            <h3 className={styles.h5}>Une visibilité accessible 24h/24 et 7j/7 </h3>
                <p className={styles.p}> 
                    Contrairement à une boutique physique, un site internet professionnel
                    est visible en permanence. Il permet à vos clients de vous trouver à tout 
                    moment, de découvrir vos services, de consulter vos horaires ou de vous 
                    contacter facilement. En optimisant votre référencement naturel (SEO), 
                    vous améliorez votre position sur Google et augmentez vos chances d’attirer 
                    de nouveaux clients sans dépenser en publicité.
                </p>
            </div>
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