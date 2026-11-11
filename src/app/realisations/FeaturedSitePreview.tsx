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
export default function FeaturedSitePreview({ image, url, fit = "responsive" }: { image: ProjectImage; url: string; fit?: "responsive" | "desktop" }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  // In narrow cards, keep the original desktop viewport and scale the whole
  // website down. Letting the iframe use the card width instead would switch
  // the client's site into its mobile layout and crop the original composition.
  useEffect(() => {
    if (fit !== "desktop") return;
    const element = container.current;
    if (!element) return;
    const updateScale = () => {
      const width = element.getBoundingClientRect().width;
      if (width > 0) {
        element.style.setProperty("--featured-preview-scale", String(width / image.width));
      }
    };
    updateScale();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateScale);
      return () => window.removeEventListener("resize", updateScale);
    }
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);
    return () => observer.disconnect();
  }, [fit, image.width]);

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
    <div ref={container} className={`${styles.featuredSiteFrame} ${fit === "desktop" ? styles.featuredSiteFrameDesktop : ""}`}>
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
        style={fit === "desktop" ? {
          width: image.width,
          height: image.height,
          maxWidth: "none",
          transform: "scale(var(--featured-preview-scale, 1))",
          transformOrigin: "top left",
        } : undefined}
        onLoad={() => setReady(true)}
        onError={() => { setVisible(false); setReady(false); }}
      />}
    </div>
    <figcaption>Aperçu du site Château de Projan — animation originale lorsque disponible.</figcaption>
  </figure>;
}
