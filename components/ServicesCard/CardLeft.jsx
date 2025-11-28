'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './card.module.css'; 

export default function CardLeft({ title, txt }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const animation = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animation}
    >
      <h2 className={styles.h2}>{title}</h2>
      <p className={styles.p}>{txt}</p>
    </motion.div>
  );
}

