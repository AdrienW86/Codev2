"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./motionVideo.module.css";

type Mode = "feature" | "inline" | "explainer" | "case-study" | "loop";
export type MotionVideoProps = {
  src?: string; poster?: string; title: string; mode: Mode;
  autoplay?: boolean; muted?: boolean; loop?: boolean; controls?: boolean;
  className?: string; aspectRatio?: string; captions?: string; transcript?: string; transcriptLabel?: string;
};

/** No source request before user action, except opt-in muted loops near the viewport. */
export default function MotionVideo({ src, poster, title, mode, autoplay = false, muted = true, loop = false, controls = true, className = "", aspectRatio = "16 / 9", captions, transcript, transcriptLabel = "Lire la transcription" }: MotionVideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const automatic = useRef(false);
  const userPaused = useRef(false);
  const systemPause = useRef(false);
  const mayPlay = useRef(false);

  useEffect(() => {
    if (!src || !autoplay || !muted || mode !== "loop") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const element = frame.current;
    if (!element || !window.IntersectionObserver) return;
    let visible = false;
    const sync = () => {
      automatic.current = !reduced.matches && !connection?.saveData;
      mayPlay.current = visible && !document.hidden && automatic.current && !userPaused.current;
      if (visible && !document.hidden && automatic.current && !userPaused.current) {
        setLoaded(true);
        video.current?.play().catch(() => {});
      } else if (video.current && !video.current.paused) {
        systemPause.current = true;
        video.current.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .25 });
    observer.observe(element);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [src, autoplay, muted, mode]);

  useEffect(() => {
    if (loaded && mayPlay.current && !userPaused.current) {
      if (!automatic.current && controls) video.current?.focus({ preventScroll: true });
      video.current?.play().catch(() => {});
    }
  }, [loaded, controls]);

  return <figure className={`${styles.figure} ${styles[mode] ?? ""} ${className}`}>
    <div ref={frame} className={styles.frame} style={{ aspectRatio }}>
      {src && loaded && !failed ? <video ref={video} src={src} poster={poster} preload="none" playsInline muted={muted} loop={loop} controls={controls}
        tabIndex={controls ? 0 : undefined}
        aria-label={title} onError={() => setFailed(true)} onPlay={() => setPlaying(true)}
        onPause={() => { setPlaying(false); if (systemPause.current) systemPause.current = false; else userPaused.current = true; }}
        onLoadedData={() => { if (mayPlay.current && !userPaused.current) video.current?.play().catch(() => {}); }}>
        {captions && <track kind="captions" src={captions} srcLang="fr" label="Français" default />}
      </video> : <div className={styles.poster}>
        {poster && <img src={poster} alt="" loading="lazy" />}
        {(!poster || failed) && <><span className={styles.grid} aria-hidden="true" />
          <span className={styles.mark} aria-hidden="true">↗</span>
          <span className={styles.placeholder}>{failed ? "Lecture indisponible" : src ? "Voir la démonstration" : "Séquence motion à venir"}</span></>}
      </div>}
      {src && !loaded && !failed && <button className={styles.play} onClick={() => { automatic.current = false; mayPlay.current = true; userPaused.current = false; setLoaded(true); }} aria-label={`Lire : ${title}`}>Lire la vidéo <span aria-hidden="true">▷</span></button>}
      {src && loaded && !failed && !controls && <button className={styles.play} onClick={() => { userPaused.current = playing; if (playing) video.current?.pause(); else video.current?.play().catch(() => {}); }}>{playing ? "Pause" : "Lire"}</button>}
    </div>
    <figcaption><span>{mode === "feature" ? "CODE-V / Motion" : "CODE-V / Démonstration"}</span><strong>{title}</strong></figcaption>
    {transcript && <details className={styles.transcript}><summary>{transcriptLabel}</summary><p>{transcript}</p></details>}
  </figure>;
}
