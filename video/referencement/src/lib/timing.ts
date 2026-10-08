// Chronologie du film /referencement (30 i/s). Les composants ne contiennent aucun temps en dur.
export const FILM = { fps: 30, durationInFrames: 600 } as const;

export const T = {
  // 0–3 s : invisible
  statementIn: 8,
  statementOut: 78,
  // 3–7 s : structurer (arborescence, titres, contenus, liens internes)
  structure: 88,
  structureDone: 150,
  content: 140,
  contentDone: 196,
  mesh: 168, // liens transversaux (maillage)
  // 7–11 s : être compris (exploration puis indexation)
  shift: 208, // l'arborescence laisse la place à l'index
  crawl: 222,
  crawlDone: 290,
  indexIn: 232,
  indexDone: 322,
  // 11–15 s : être trouvé (requête, pertinence, résultats)
  query: 334,
  typing: 342,
  typed: 372,
  match: 376,
  results: 392,
  rise: 410,
  riseDone: 438,
  // 15–18 s : attirer (clic, trajectoire, visite sur la bonne page)
  click: 452,
  travel: 460,
  arrive: 484,
  open: 482,
  opened: 504,
  read: 506,
  cta: 524,
  close: 532,
  // 18–20 s : convergence vers CODE-V
  outro: 540,
  logo: 546,
  tagline: 554,
  url: 564,
  loopFade: 588, // fondu au noir de fin : le film boucle sans coupure
} as const;

/** Mots de chapitre : chacun se pose au-dessus de son tronçon de la trajectoire. */
export const CHAPTERS = [
  { id: "structurer", from: 94, to: 202, lines: ["STRUCTURER"], group: 0 },
  { id: "compris", from: 212, to: 324, lines: ["ÊTRE COMPRIS"], group: 1 },
  { id: "trouve", from: 334, to: 444, lines: ["ÊTRE TROUVÉ"], group: 2 },
  { id: "attirer", from: 454, to: 534, lines: ["ATTIRER"], group: 3 },
] as const;

/** Les huit étapes de la trajectoire, allumées l'une après l'autre. */
export const STEPS = [
  { label: "Structure", at: 100 },
  { label: "Contenu", at: 150 },
  { label: "Exploration", at: 222 },
  { label: "Indexation", at: 270 },
  { label: "Pertinence", at: 376 },
  { label: "Visibilité", at: 412 },
  { label: "Clic", at: 452 },
  { label: "Visite", at: 486 },
] as const;

/** Exploration : chaque lien parcouru (départ, durée en frames). Une page est explorée à l'arrivée. */
export const CRAWL = [
  { from: "home", to: "services", at: 222, dur: 14 },
  { from: "home", to: "realisations", at: 225, dur: 14 },
  { from: "home", to: "ressources", at: 228, dur: 14 },
  { from: "services", to: "creation", at: 238, dur: 14 },
  { from: "services", to: "seo", at: 241, dur: 14 },
  { from: "realisations", to: "etude", at: 243, dur: 14 },
  { from: "ressources", to: "guide", at: 246, dur: 14 },
  { from: "ressources", to: "archive", at: 249, dur: 14 },
  { from: "creation", to: "etude", at: 262, dur: 16, mesh: true },
  { from: "seo", to: "guide", at: 266, dur: 16, mesh: true },
] as const;

export const exploredAt = (id: string) => (id === "home" ? T.crawl : Math.min(...CRAWL.filter(e => e.to === id && !("mesh" in e)).map(e => e.at + e.dur)));
/** Une page explorée et retenue rejoint l'index (vol de 20 frames). */
export const INDEX_FLIGHT = { delay: 8, dur: 20 } as const;
