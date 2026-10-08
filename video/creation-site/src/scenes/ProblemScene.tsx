import { useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { Statement } from "../components/MotionText";
import { easeInOut, lerp, progress } from "../lib/easing";
import { T } from "../lib/timing";

// Informations dispersées : elles rejoindront la navigation quand la grille se pose.
const FRAGMENTS = [
  { text: "Nos services", x: 1580, y: 560, rot: -5 },
  { text: "À propos", x: 880, y: 330, rot: 4 },
  { text: "Tarifs ?", x: 1700, y: 760, rot: 7 },
  { text: "Contact", x: 1330, y: 1000, rot: -3 },
];
const NAV = { x: 1372, y: 266, step: 64 };

// 0–3 s : les éléments du site flottent sans hiérarchie (voir LivingSite) ; le constat s'affiche.
export const ProblemScene = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {FRAGMENTS.map((f, i) => {
        const gather = progress(frame, T.structure + i * 3, T.structure + i * 3 + 34, easeInOut);
        if (gather >= 1) return null;
        const drift = Math.sin(frame / 30 + i * 2) * 8 * (1 - gather);
        return (
          <div key={f.text} style={{ position: "absolute", left: lerp(f.x, NAV.x + i * NAV.step, gather), top: lerp(f.y + drift, NAV.y, gather), transform: `rotate(${f.rot * (1 - gather)}deg) scale(${1 - gather * 0.55})`, transformOrigin: "left center", opacity: 1 - progress(frame, T.structure + 20 + i * 3, T.structure + 36 + i * 3), fontFamily: fonts.body, fontWeight: 500, fontSize: 24, color: "#93a3b8", whiteSpace: "nowrap" }}>
            {f.text}
          </div>
        );
      })}
      <Statement from={T.statementIn} to={T.statementOut} />
    </>
  );
};
