'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import Image from 'next/image';
import styles from './banner.module.css';

export default function Banner() {
  const fullText = "Développez votre visibilité sur le web";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [index, fullText]);

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
      <div className={styles.banner}>
        <h1 className={`${styles.h1} ${!done ? styles.typewriter : ''}`}>
          {displayedText}
        </h1>
        <Image
          src='/development.png'
          fill
          priority
          alt='banner'
          className={styles.background}
        />
        <motion.button
          ref={btnRef}
          className={styles.btn}
          variants={leftAnimation}
          initial="hidden"
          animate={btnInView ? 'visible' : 'hidden'}
        >
          Nos services
        </motion.button>
        <motion.button
          className={styles.btn2}
          variants={rightAnimation}
          initial="hidden"
          animate={btnInView ? 'visible' : 'hidden'}
        >
          Contact
        </motion.button>
      </div>                                              
    </section>
  )
}