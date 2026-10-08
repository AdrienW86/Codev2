import { useCurrentFrame } from "remotion";
import { palette } from "../../../src/shared/theme";
import { easeOut, progress } from "../lib/easing";
import { DESKTOP_SCREEN } from "../lib/layout";
import { T } from "../lib/timing";

const LEFT = 834, WIDTH = 912, GUTTER = 24, COLS = 12;
const COL = (WIDTH - GUTTER * (COLS - 1)) / COLS;
const TOP = DESKTOP_SCREEN.y, HEIGHT = DESKTOP_SCREEN.h;
const ROWS = [262, 330, 490, 568, 730, 828];

// 3–7 s : une grille de 12 colonnes se pose ; les blocs (LivingSite) viennent s'y aligner.
// Rendue sous les blocs et au-dessus du fond du cadre : la grille devient l'interface.
export const StructureScene = () => {
  const frame = useCurrentFrame();
  const fadeOut = 1 - progress(frame, T.gridOut, T.gridOut + 26);
  if (frame < T.gridIn || fadeOut <= 0) return null;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, opacity: fadeOut }}>
      {Array.from({ length: COLS }, (_, i) => {
        const p = progress(frame, T.gridIn + i * 1.5, T.gridIn + i * 1.5 + 26, easeOut);
        const x = LEFT + i * (COL + GUTTER);
        return <rect key={i} x={x} y={TOP + (1 - p) * HEIGHT * 0.5} width={COL} height={HEIGHT * p} fill={palette.blue} fillOpacity={0.05} stroke={palette.blue} strokeOpacity={0.22} strokeWidth={1} />;
      })}
      {ROWS.map((y, i) => {
        const p = progress(frame, T.gridIn + 10 + i * 3, T.gridIn + 40 + i * 3, easeOut);
        return <line key={y} x1={LEFT - 30} x2={LEFT - 30 + (WIDTH + 60) * p} y1={y} y2={y} stroke={palette.blueDeep} strokeOpacity={0.28} strokeDasharray="6 8" />;
      })}
    </svg>
  );
};
