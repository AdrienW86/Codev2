import { palette } from "../../../src/shared/theme";

export type Point = { x: number; y: number };
type Segment = [Point, Point, Point, Point];

// Courbe douce passant par une suite de points (Catmull-Rom converti en Bézier).
const segments = (points: readonly Point[]): Segment[] =>
  points.slice(0, -1).map((p1, i) => {
    const p0 = points[Math.max(0, i - 1)], p2 = points[i + 1], p3 = points[Math.min(points.length - 1, i + 2)];
    return [p1, { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }, { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }, p2];
  });

export const smoothPath = (points: readonly Point[]) =>
  segments(points).reduce((d, [, c1, c2, p2]) => `${d} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`, `M ${points[0].x} ${points[0].y}`);

/** Position sur la courbe ; t = 0 → premier point, t = 1 → dernier (un segment par intervalle). */
export const pointOnPath = (points: readonly Point[], t: number): Point => {
  const segs = segments(points);
  const scaled = Math.min(0.99999, Math.max(0, t)) * segs.length;
  const [a, b, c, d] = segs[Math.floor(scaled)];
  const u = scaled - Math.floor(scaled), v = 1 - u;
  return {
    x: v * v * v * a.x + 3 * v * v * u * b.x + 3 * v * u * u * c.x + u * u * u * d.x,
    y: v * v * v * a.y + 3 * v * v * u * b.y + 3 * v * u * u * c.y + u * u * u * d.y,
  };
};

/** Ligne de flux qui se dessine (`draw` 0 → 1), sur un rail discret. */
export const FlowLine = ({ d, draw, color = palette.cyan, width = 2.5, opacity = 1, rail = 0.16 }: { d: string; draw: number; color?: string; width?: number; opacity?: number; rail?: number }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", opacity }}>
    <path d={d} stroke={color} strokeOpacity={rail * Math.min(1, draw * 3)} strokeWidth={width} fill="none" />
    <path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} strokeOpacity={draw > 0 ? 1 : 0} />
  </svg>
);
