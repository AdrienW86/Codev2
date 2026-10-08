import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette } from "../../../src/shared/theme";
import { clamp } from "../../../src/shared/easing";
import { useLayout } from "../lib/context";
import { seeded } from "../lib/geometry";
import { T } from "../lib/timing";

const DOTS = 240;
const CLUSTERS = 8;

/**
 * Le grand espace de recherche : une multitude de points (d'autres pages, d'autres sites)
 * dont certains groupes échangent déjà des signaux. Le site du film n'en reçoit aucun au départ.
 */
export const SearchSpace = () => {
  const frame = useCurrentFrame();
  const { width, height } = useLayout();
  const presence = interpolate(frame, [0, 20, T.structure, T.structureDone, T.outro, T.outro + 16], [0, 1, 1, 0.55, 0.55, 0], clamp);
  const glow = interpolate(frame, [T.outro, T.outro + 14], [1, 0], clamp);

  const dots = Array.from({ length: DOTS }, (_, i) => {
    const x = seeded(i) * width;
    const y = seeded(i + 999) * height * 0.86;
    // Le centre reste plus vide : c'est là que le site va se construire.
    const dc = Math.hypot((x - width / 2) / width, (y - height * 0.42) / height);
    const twinkle = 0.55 + 0.45 * Math.sin(frame / 18 + i * 1.7);
    return { x, y, r: 1.2 + seeded(i + 7) * 1.3, o: (dc < 0.2 ? 0.08 : 0.22) * twinkle };
  });

  const clusters = Array.from({ length: CLUSTERS }, (_, c) => {
    const angle = (c / CLUSTERS) * Math.PI * 2 + 0.4;
    const cx = width / 2 + Math.cos(angle) * width * (0.36 + seeded(c + 40) * 0.08);
    const cy = height * 0.42 + Math.sin(angle) * height * (0.34 + seeded(c + 60) * 0.06);
    const pts = Array.from({ length: 4 }, (_, k) => ({ x: cx + (seeded(c * 10 + k) - 0.5) * 120, y: cy + (seeded(c * 10 + k + 5) - 0.5) * 80 }));
    return { c, pts };
  });

  return (
    <AbsoluteFill style={{ background: palette.dark }}>
      <AbsoluteFill style={{ opacity: glow, background: `radial-gradient(1100px 700px at 50% 38%, ${palette.darkSoft} 0%, rgba(7,17,31,0) 70%)` }} />
      <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: presence }}>
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={palette.mist} opacity={d.o} />)}
        {clusters.map(({ c, pts }) => {
          // Un signal circule dans chaque groupe déjà relié.
          const t = ((frame + c * 23) % 90) / 90;
          const seg = Math.floor(t * 3);
          const k = t * 3 - seg;
          const a = pts[seg];
          const b = pts[seg + 1];
          return (
            <g key={c}>
              <polyline points={pts.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke={palette.line} strokeWidth={1} opacity={0.8} />
              {pts.map((p, k2) => <circle key={k2} cx={p.x} cy={p.y} r={2.6} fill={palette.mist} opacity={0.35} />)}
              <circle cx={a.x + (b.x - a.x) * k} cy={a.y + (b.y - a.y) * k} r={2.4} fill={palette.blue} opacity={0.7} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
