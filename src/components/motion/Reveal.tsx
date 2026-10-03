"use client";
import { useEffect, useRef, type ReactNode } from "react";
import styles from "./motion.module.css";
export default function Reveal({ children, className = "", stagger = false }: { children: ReactNode; className?: string; stagger?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || !window.IntersectionObserver || reduced.matches) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { element.classList.add(styles.entered); element.dataset.revealed = "true"; observer.disconnect(); } }, { threshold: .1 });
    observer.observe(element);
    const stop = () => { if (reduced.matches) { observer.disconnect(); element.classList.remove(styles.entered); delete element.dataset.revealed; } };
    reduced.addEventListener("change", stop);
    return () => { observer.disconnect(); reduced.removeEventListener("change", stop); };
  }, []);
  return <div ref={ref} className={`${styles.reveal} ${stagger ? styles.stagger : ""} ${className}`}>{children}</div>;
}
