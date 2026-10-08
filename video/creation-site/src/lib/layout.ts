import { interpolateColors } from "remotion";
import { palette } from "../../../src/shared/theme";
import { lerp } from "./easing";

// Mise en page 16:9. Une déclinaison 9:16 ou 1:1 fournira ses propres états
// (mêmes blocs, autres coordonnées) sans toucher aux scènes.

export type Box = { x: number; y: number; w: number; h: number; r: number; rot: number; fill: string; op: number };

export const mixBox = (a: Box, b: Box, t: number): Box => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
  r: lerp(a.r, b.r, t),
  rot: lerp(a.rot, b.rot, t),
  fill: interpolateColors(t, [0, 1], [a.fill, b.fill]),
  op: lerp(a.op, b.op, t),
});

export type BlockId =
  | "navLogo" | "navLinks" | "navCta"
  | "title1" | "title2" | "text1" | "text2" | "cta" | "visual"
  | "svc1" | "svc2" | "svc3" | "proof";

export const BLOCKS: BlockId[] = ["navLogo", "navLinks", "navCta", "title1", "title2", "text1", "text2", "cta", "visual", "svc1", "svc2", "svc3", "proof"];

const b = (x: number, y: number, w: number, h: number, r: number, fill: string, rot = 0, op = 1): Box => ({ x, y, w, h, r, rot, fill, op });
const grey = "#dfe7f1";
const greyDeep = "#cdd8e6";

// 0–3 s : des éléments présents mais sans hiérarchie ni direction.
export const CHAOS: Record<BlockId, Box> = {
  navLogo: b(1520, 868, 150, 34, 8, greyDeep, -4),
  navLinks: b(790, 150, 300, 14, 7, grey, 3),
  navCta: b(1730, 186, 92, 26, 13, grey, 8),
  title1: b(1190, 712, 380, 40, 8, greyDeep, -2),
  title2: b(930, 448, 250, 40, 8, grey, 5),
  text1: b(1330, 120, 420, 12, 6, grey, -6),
  text2: b(820, 950, 360, 12, 6, greyDeep, 2),
  cta: b(1630, 612, 132, 38, 19, greyDeep, -9),
  visual: b(1270, 300, 300, 220, 16, grey, 4),
  svc1: b(860, 640, 220, 150, 14, grey, -5),
  svc2: b(1600, 378, 240, 150, 14, grey, 6),
  svc3: b(1090, 872, 200, 120, 14, grey, 3),
  proof: b(990, 196, 320, 80, 14, greyDeep, -3),
};

// Écran desktop : x 790 → 1790, y 244 → 850 ; contenu 834 → 1746.
export const DESKTOP: Record<BlockId, Box> = {
  navLogo: b(834, 262, 104, 24, 7, palette.dark),
  navLinks: b(1372, 269, 236, 10, 5, palette.wire),
  navCta: b(1636, 258, 110, 32, 16, palette.blueDeep),
  title1: b(834, 330, 440, 38, 8, palette.text),
  title2: b(834, 378, 330, 38, 8, palette.blue),
  text1: b(834, 438, 400, 10, 5, palette.wire),
  text2: b(834, 456, 320, 10, 5, palette.wire),
  cta: b(834, 490, 214, 48, 24, palette.blue),
  visual: b(1330, 322, 416, 216, 16, palette.blue),
  svc1: b(834, 568, 288, 140, 14, palette.white),
  svc2: b(1146, 568, 288, 140, 14, palette.white),
  svc3: b(1458, 568, 288, 140, 14, palette.white),
  proof: b(834, 730, 912, 98, 14, "#eef3fb"),
};

// Écran mobile : x 1022 → 1338, y 216 → 888 ; contenu 1040 → 1320.
export const MOBILE: Record<BlockId, Box> = {
  navLogo: b(1040, 232, 74, 18, 6, palette.dark),
  navLinks: b(1294, 234, 26, 14, 3, palette.wire),
  navCta: b(1294, 234, 26, 14, 7, palette.blueDeep, 0, 0),
  title1: b(1040, 278, 252, 28, 7, palette.text),
  title2: b(1040, 312, 184, 28, 7, palette.blue),
  text1: b(1040, 354, 270, 8, 4, palette.wire),
  text2: b(1040, 368, 216, 8, 4, palette.wire),
  cta: b(1040, 392, 280, 46, 23, palette.blue),
  visual: b(1040, 454, 280, 128, 14, palette.blue),
  svc1: b(1040, 598, 280, 84, 12, palette.white),
  svc2: b(1040, 694, 280, 84, 12, palette.white),
  svc3: b(1040, 790, 280, 84, 12, palette.white),
  proof: b(1040, 886, 280, 128, 12, "#eef3fb"),
};

// Le CTA devient une barre d'action fixe pendant le défilement.
export const STICKY_CTA: Box = b(1040, 826, 280, 48, 24, palette.blue);
export const MOBILE_SCROLL = 300;

export type FrameRect = { x: number; y: number; w: number; h: number; r: number };
export const DESKTOP_FRAME: FrameRect = { x: 790, y: 200, w: 1000, h: 650, r: 18 };
export const DESKTOP_SCREEN: FrameRect = { x: 790, y: 244, w: 1000, h: 606, r: 0 };
export const PHONE_FRAME: FrameRect = { x: 1010, y: 180, w: 340, h: 720, r: 46 };
export const PHONE_SCREEN: FrameRect = { x: 1022, y: 216, w: 316, h: 672, r: 34 };
export const FULL: FrameRect = { x: -60, y: -60, w: 2040, h: 1200, r: 0 };

export const mixRect = (a: FrameRect, b: FrameRect, t: number): FrameRect => ({
  x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), w: lerp(a.w, b.w, t), h: lerp(a.h, b.h, t), r: lerp(a.r, b.r, t),
});

// Formulaire (feuille qui monte depuis le CTA) et système connecté.
export const FORM_SHEET: FrameRect = { x: 1030, y: 452, w: 300, h: 428, r: 24 };
export const SUBMIT_POINT = { x: 1180, y: 836 };

export const NODES = [
  { id: "site", label: "Site", x: 860, y: 560 },
  { id: "contact", label: "Contact", x: 1080, y: 420 },
  { id: "crm", label: "CRM", x: 1300, y: 560 },
  { id: "suivi", label: "Suivi", x: 1520, y: 420 },
  { id: "auto", label: "Automatisation", x: 1740, y: 560 },
] as const;
export const NODE_RADIUS = 46;
export const CENTER = { x: 960, y: 470 };
