// Toute la chronologie du film (30 i/s). Les scènes ne contiennent aucun nombre magique de temps.
export const FILM = { fps: 30, durationInFrames: 600 } as const;

export const T = {
  // 0–3 s : le problème
  statementIn: 6,
  statementOut: 66,
  // 3–7 s : la grille devient une interface
  gridIn: 62,
  structure: 72, // les blocs rejoignent la grille (décalés)
  structureDone: 160,
  gridOut: 150,
  // 7–11 s : passage mobile puis visibilité
  mobile: 200,
  mobileDone: 250,
  speed: 248,
  tags: 256,
  search: 262,
  typing: 268,
  results: 292,
  rise: 302,
  link: 310,
  searchOut: 318,
  // 11–15 s : visite → compréhension → preuve → action → demande
  scroll: 334,
  scrollDone: 368,
  proof: 356,
  ctaFocus: 372,
  tap: 388,
  formIn: 394,
  fieldName: 404,
  fieldNeed: 416,
  submit: 436,
  sent: 442,
  // 15–18 s : la demande devient une donnée
  packet: 446,
  dark: 446,
  nodes: 462,
  toSite: 466,
  travel: 482,
  travelDone: 532,
  // 18–20 s : convergence vers CODE-V
  outro: 540,
  logo: 552,
  tagline: 566,
  url: 576,
} as const;

/** Mots-clés de la colonne éditoriale (un seul système typographique continu). */
export const WORDS = [
  { id: "clarifier", from: 84, to: 196, index: "01", eyebrow: "Structure", lines: ["CLARIFIER"] },
  { id: "trouve", from: 210, to: 318, index: "02", eyebrow: "Visibilité", lines: ["ÊTRE", "TROUVÉ"] },
  { id: "convaincre", from: 334, to: 384, index: "03", eyebrow: "Confiance", lines: ["CONVAINCRE"] },
  { id: "convertir", from: 398, to: 446, index: "04", eyebrow: "Action", lines: ["CONVERTIR"] },
  { id: "relier", from: 470, to: 532, index: "05", eyebrow: "Système", lines: ["RELIER"], onDark: true },
] as const;

/** Étapes du parcours visiteur (11–15 s). */
export const JOURNEY = [
  { label: "Visite", at: 340 },
  { label: "Compréhension", at: 350 },
  { label: "Preuve", at: 358 },
  { label: "Action", at: 380 },
  { label: "Demande", at: 404 },
] as const;
