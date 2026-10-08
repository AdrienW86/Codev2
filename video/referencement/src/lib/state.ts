import { interpolate } from "remotion";
import { clamp, easeInOut, easeOut, progress } from "../../../src/shared/easing";
import type { Layout, PageDef, Point } from "./layout";
import { treePoint } from "./layout";
import { T } from "./timing";

// États dérivés de la chronologie, partagés par plusieurs couches.

/** L'arborescence se décale vers la gauche quand l'index apparaît. */
export const shiftAt = (frame: number) => progress(frame, T.shift, T.shift + 32, easeInOut);

/** Présence de l'arborescence : estompée pendant la recherche, ravivée au clic, puis effacée. */
export const treePresence = (frame: number) =>
  interpolate(frame, [T.query, T.query + 22, T.click - 6, T.click + 8, T.open + 4, T.opened], [1, 0.3, 0.3, 0.75, 0.75, 0], clamp);

/** Passage désordre → arborescence, page par page. */
export const structureAt = (frame: number, order: number) => progress(frame, T.structure + order * 5, T.structure + order * 5 + 40, easeInOut);

/** Centre et échelle d'une carte de page à une frame donnée. */
export const cardPose = (layout: Layout, page: PageDef, order: number, frame: number): Point & { s: number } => {
  const k = structureAt(frame, order);
  const shift = shiftAt(frame);
  const p = { x: page.scatter.x + (page.tree.x - page.scatter.x) * k, y: page.scatter.y + (page.tree.y - page.scatter.y) * k };
  const s = page.scatter.s + (1 - page.scatter.s) * k;
  const q = treePoint(layout, p, shift);
  return { ...q, s: s * (1 + (layout.treeShift.scale - 1) * shift) };
};

/** Position d'une ligne d'index (ou de résultat) à une frame donnée. */
export const rowY = (layout: Layout, slot: number) => layout.index.top + slot * (layout.index.rowH + layout.index.gap);
export const resultY = (layout: Layout, slot: number) => layout.results.top + slot * (layout.results.rowH + layout.results.gap);

/** Rang courant d'un résultat pendant la remontée. */
export const resultSlot = (frame: number, start: number, end: number) => start + (end - start) * progress(frame, T.rise, T.riseDone, easeInOut);

/** 0 = ligne d'index, 1 = résultat. */
export const morphAt = (frame: number) => progress(frame, T.results, T.results + 18, easeOut);
