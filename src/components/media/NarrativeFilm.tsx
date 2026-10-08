"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./narrativeFilm.module.css";

export type NarrativeFilmProps = {
  /** Version 1080p (écrans larges). */
  src: string;
  /** Version allégée pour les petits écrans. */
  srcSmall?: string;
  poster: string;
  title: string;
  /** Alternative textuelle lue par les lecteurs d'écran (non affichée). */
  description: string;
  width: number;
  height: number;
  /** Faux pour un film sans piste audio : aucun bouton « Écouter ». */
  audio?: boolean;
  /** Coin des boutons sur la vidéo (desktop), selon la zone que le film laisse libre. */
  controlsAt?: "bottom" | "top";
  className?: string;
};

type Phase = "idle" | "playing" | "paused" | "ended";
type NavigatorConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Film intégré au rythme d'une page : lecture muette automatique quand il est visible
 * (sauf mouvement réduit ou économie de données), son à la demande depuis le début.
 * Aucune requête vidéo avant que le film approche de l'écran ou qu'on le lance.
 */
export default function NarrativeFilm({ src, srcSmall, poster, title, description, width, height, audio = true, controlsAt = "bottom", className = "" }: NarrativeFilmProps) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string>();
  const [phase, setPhase] = useState<Phase>("idle");
  const [sound, setSound] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const visible = useRef(false);
  const userPaused = useRef(false);
  const pendingPlay = useRef(false);
  const soundOn = useRef(false);

  const pickSource = useCallback(() => (srcSmall && window.matchMedia("(max-width: 900px)").matches ? srcSmall : src), [src, srcSmall]);

  const start = useCallback(() => {
    const element = video.current;
    if (!element) {
      // La source n'est pas encore attachée : la lecture partira au chargement.
      pendingPlay.current = true;
      setSource(current => current ?? pickSource());
      return;
    }
    element.muted = !soundOn.current;
    element.play().catch(() => setPhase("paused"));
  }, [pickSource]);

  // Première lecture : la vidéo vient d'être montée, on la lance dès qu'elle existe.
  useEffect(() => {
    if (source && pendingPlay.current) {
      pendingPlay.current = false;
      start();
    }
  }, [source, start]);

  // Lecture automatique muette, seulement si l'utilisateur ne demande pas moins de mouvement ou de données.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorConnection).connection;
    const allowed = () => !reduced.matches && !connection?.saveData;
    setAutoplay(allowed());
    const element = frame.current;
    if (!element || !window.IntersectionObserver) return;

    const sync = () => {
      const auto = allowed();
      setAutoplay(auto);
      const player = video.current;
      if (visible.current && !document.hidden) {
        if (auto && !userPaused.current && (!player || (player.paused && !player.ended))) start();
      } else if (player && !player.paused) {
        player.pause();
      }
    };
    // Précharge la source un peu avant l'arrivée à l'écran, lance à 40 % de visibilité.
    const near = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && allowed()) { setSource(current => current ?? pickSource()); near.disconnect(); } }, { rootMargin: "300px 0px" });
    const seen = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; sync(); }, { threshold: 0.4 });
    near.observe(element);
    seen.observe(element);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { near.disconnect(); seen.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [pickSource, start]);

  const togglePlay = () => {
    const player = video.current;
    if (phase === "playing" && player) {
      userPaused.current = true;
      player.pause();
      return;
    }
    userPaused.current = false;
    if (player && phase === "ended") player.currentTime = 0;
    start();
  };

  // Le son reprend toujours au début du film : jamais au milieu d'une phrase.
  const toggleSound = () => {
    const player = video.current;
    if (sound) {
      soundOn.current = false;
      setSound(false);
      if (player) player.muted = true;
      return;
    }
    soundOn.current = true;
    setSound(true);
    userPaused.current = false;
    if (player) {
      player.muted = false;
      player.volume = 1;
      player.currentTime = 0;
    }
    start();
  };

  const label = phase === "playing" ? "Pause" : phase === "ended" ? "Revoir" : phase === "paused" ? "Reprendre" : autoplay ? "Lecture" : "Lire le film";

  return (
    <figure className={`${styles.film} ${className}`} data-phase={phase}>
      <div ref={frame} className={styles.frame} style={{ aspectRatio: `${width} / ${height}` }}>
        {source && (
          <video
            ref={video}
            className={styles.video}
            src={source}
            width={width}
            height={height}
            muted={!sound}
            playsInline
            preload={autoplay ? "auto" : "none"}
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
            onPlay={() => setPhase("playing")}
            onPause={() => setPhase(current => (video.current?.ended ? "ended" : current === "playing" ? "paused" : current))}
            onEnded={() => { setPhase("ended"); soundOn.current = false; setSound(false); if (video.current) video.current.muted = true; }}
          />
        )}
        <img className={styles.poster} src={poster} alt="" width={width} height={height} loading="lazy" decoding="async" />
      </div>
      <div className={`${styles.controls} ${controlsAt === "top" ? styles.controlsTop : ""}`}>
        <button type="button" className={styles.control} onClick={togglePlay} aria-label={`${phase === "playing" ? "Mettre en pause" : phase === "ended" ? "Revoir" : "Lire"} le film : ${title}`}>
          <span className={styles.icon} aria-hidden="true">{phase === "playing" ? <PauseIcon /> : phase === "ended" ? <ReplayIcon /> : <PlayIcon />}</span>
          {label}
        </button>
        {audio && <button type="button" className={styles.control} onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Couper le son du film" : "Écouter le film avec le son, depuis le début"}>
          <span className={styles.icon} aria-hidden="true">{sound ? <SoundOnIcon /> : <SoundOffIcon />}</span>
          {sound ? "Couper le son" : "Écouter"}
        </button>}
      </div>
      <figcaption className={styles.srOnly}>{title}. {description}</figcaption>
    </figure>
  );
}

const svg = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PlayIcon = () => <svg {...svg}><path d="M5 3.5v9l7-4.5z" fill="currentColor" /></svg>;
const PauseIcon = () => <svg {...svg}><path d="M5.5 3.5v9M10.5 3.5v9" /></svg>;
const ReplayIcon = () => <svg {...svg}><path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v2.8h2.8" /></svg>;
const SoundOffIcon = () => <svg {...svg}><path d="M2.5 6h2.2L8 3.3v9.4L4.7 10H2.5zM11 6.2l3 3.6M14 6.2l-3 3.6" /></svg>;
const SoundOnIcon = () => <svg {...svg}><path d="M2.5 6h2.2L8 3.3v9.4L4.7 10H2.5zM10.6 5.6a3.4 3.4 0 0 1 0 4.8M12.4 3.9a5.8 5.8 0 0 1 0 8.2" /></svg>;
