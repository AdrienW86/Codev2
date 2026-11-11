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

  // Preserve the full desktop layout without downscaling an unnecessarily
  // large 1440px iframe in the smaller portfolio cards. The website is live;
  // it is not a video file that can be re-encoded here.
  useEffect(() => {
    if (fit !== "desktop") return;
    const element = container.current;
    if (!element) return;

    const updateViewport = () => {
      const width = element.getBoundingClientRect().width;
      if (!width) return;
      // Keep the original desktop navigation (> 1024px) but use the smallest
      // possible iframe to preserve legibility and avoid excessive scaling.
      const viewportWidth = Math.max(1120, Math.ceil(width));
      const viewportHeight = Math.round(viewportWidth * image.height / image.width);
      element.style.setProperty("--featured-preview-width", `${viewportWidth}px`);
      element.style.setProperty("--featured-preview-height", `${viewportHeight}px`);
      element.style.setProperty("--featured-preview-scale", String(width / viewportWidth));
    };

    updateViewport();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateViewport);
      return () => window.removeEventListener("resize", updateViewport);
    }
    const observer = new ResizeObserver(updateViewport);
    observer.observe(element);
    return () => observer.disconnect();
  }, [fit, image.width, image.height]);

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
        quality={90}
        sizes={fit === "desktop" ? "(max-width: 900px) calc(100vw - 36px), (max-width: 1260px) 56vw, 670px" : "(max-width: 1260px) calc(100vw - 40px), 1122px"}
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
          width: "var(--featured-preview-width, 1120px)",
          height: "var(--featured-preview-height, 778px)",
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
