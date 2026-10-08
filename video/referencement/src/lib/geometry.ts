import type { Point } from "./layout";

const segLength = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);

export const polyLength = (pts: Point[]) => pts.slice(1).reduce((sum, p, i) => sum + segLength(pts[i], p), 0);

/** Point situé à la fraction t (0 → 1) d'une polyligne. */
export const pointAt = (pts: Point[], t: number): Point => {
  let rest = polyLength(pts) * Math.min(Math.max(t, 0), 1);
  for (let i = 1; i < pts.length; i++) {
    const len = segLength(pts[i - 1], pts[i]);
    if (rest <= len || i === pts.length - 1) {
      const k = len === 0 ? 0 : Math.min(rest / len, 1);
      return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * k, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * k };
    }
    rest -= len;
  }
  return pts[pts.length - 1];
};

/** Chemin SVG de la portion [0, t] d'une polyligne (tracé qui se dessine). */
export const partialPath = (pts: Point[], t: number) => {
  if (t <= 0) return "";
  let rest = polyLength(pts) * Math.min(t, 1);
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const len = segLength(pts[i - 1], pts[i]);
    if (rest >= len) {
      d += ` L ${pts[i].x} ${pts[i].y}`;
      rest -= len;
    } else {
      const k = len === 0 ? 0 : rest / len;
      d += ` L ${pts[i - 1].x + (pts[i].x - pts[i - 1].x) * k} ${pts[i - 1].y + (pts[i].y - pts[i - 1].y) * k}`;
      break;
    }
  }
  return d;
};

/** Courbe de Bézier quadratique échantillonnée (trajectoires de requête et de clic). */
export const arc = (a: Point, b: Point, bend: Point, steps = 32): Point[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    return { x: u * u * a.x + 2 * u * t * bend.x + t * t * b.x, y: u * u * a.y + 2 * u * t * bend.y + t * t * b.y };
  });

/** Nombre pseudo-aléatoire stable (le rendu doit être identique d'une frame à l'autre). */
export const seeded = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
