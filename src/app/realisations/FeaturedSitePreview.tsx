"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import styles from "./page.module.css";

/**
 * Shows the original website (and its native hero animation) rather than
 * replacing a real client project with an invented video.
 * The existing screenshot remains available on slow connections or when
 * the visitor requests reduced motion.
 */
export default function FeaturedSitePreview({ image, url }: { image: ProjectImage; url: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element || !window.IntersectionObserver) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let inView = false;
    const sync = () => {
      const allow = inView && !reduced.matches && !connection?.saveData;
      setVisible(allow);
      if (!allow) setReady(false);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { rootMargin: "160px 0px", threshold: 0.01 });
    observer.observe(element);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return <figure>
    <div ref={container} className={styles.featuredSiteFrame}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 1260px) calc(100vw - 40px), 1122px"
        className={styles.featuredSitePoster}
      />
      {visible && url && <iframe
        src={url}
        title="Aperçu animé du site Château de Projan"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        allow="autoplay"
        tabIndex={-1}
        aria-hidden="true"
        referrerPolicy="strict-origin-when-cross-origin"
        className={ready ? styles.featuredSiteLiveReady : styles.featuredSiteLive}
        onLoad={() => setReady(true)}
        onError={() => { setVisible(false); setReady(false); }}
      />}
    </div>
    <figcaption>Aperçu du site Château de Projan — animation originale lorsque disponible.</figcaption>
  </figure>;
}
