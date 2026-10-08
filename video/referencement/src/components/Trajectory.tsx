import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { clamp, easeIn, easeInOut, easeOut, progress } from "../../../src/shared/easing";
import { useLayout } from "../lib/context";
import { railX } from "../lib/layout";
import { CHAPTERS, STEPS, T } from "../lib/timing";

/**
 * Texte révélé par un curseur d'indexation : une barre turquoise balaie la ligne de gauche à droite.
 * Sortie : la ligne s'efface en glissant légèrement vers la droite (le sens de la trajectoire).
 */
export const SweepText = ({ children, enter, exit, duration = 16, style }: { children: React.ReactNode; enter: number; exit: number; duration?: number; style?: React.CSSProperties }) => {
  const frame = useCurrentFrame();
  const reveal = progress(frame, enter, enter + duration, easeOut);
  const out = progress(frame, exit, exit + 12, easeIn);
  if (reveal <= 0 || out >= 1) return null;
  return (
    <div style={{ position: "relative", display: "inline-block", opacity: 1 - out, transform: `translateX(${out * 40}px)`, ...style }}>
      <div style={{ clipPath: `inset(-10% ${(1 - reveal) * 100}% -10% 0)`, whiteSpace: "nowrap" }}>{children}</div>
      {reveal < 1 && <div style={{ position: "absolute", top: "8%", bottom: "8%", left: `${reveal * 100}%`, width: 4, marginLeft: 4, background: palette.cyan, boxShadow: `0 0 16px ${palette.cyan}` }} />}
    </div>
  );
};

/** La trajectoire du SEO : huit étapes sur une ligne, et le mot du chapitre au-dessus de son tronçon. */
export const Trajectory = () => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const { rail, chapter } = layout;
  const base = progress(frame, T.structure - 6, T.structure + 24, easeInOut);
  // Outro : la ligne se resserre sous la signature.
  const converge = progress(frame, T.outro, T.outro + 22, easeInOut);
  const labels = 1 - progress(frame, T.outro, T.outro + 10);
  const lit = STEPS.filter(s => frame >= s.at).length;
  const reach = interpolate(frame, STEPS.map(s => s.at), STEPS.map((_, i) => railX(layout, i)), clamp);
  const half = 180;
  const x0 = rail.x0 + (layout.width / 2 - half - rail.x0) * converge;
  const x1 = rail.x0 + (rail.x1 - rail.x0) * base + (layout.width / 2 + half - rail.x1) * converge;
  const y = rail.y + (layout.outro.rule - rail.y) * converge;
  const at = (i: number) => railX(layout, i) + (layout.width / 2 - half + (2 * half * i) / 7 - railX(layout, i)) * converge;
  const progressEnd = reach + (x1 - reach) * converge;
  const statementSize = chapter.size * 0.9;

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: rail.x0, top: chapter.y + (chapter.size - statementSize) / 2 }}>
        <SweepText enter={T.statementIn} exit={T.statementOut} duration={22} style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: statementSize, lineHeight: 1, letterSpacing: "-0.045em", color: palette.white }}>
          Être en ligne <span style={{ color: palette.mist }}>ne suffit pas.</span>
        </SweepText>
      </div>
      {CHAPTERS.map(c => {
        const right = c.group >= 2;
        const anchor = railX(layout, right ? c.group * 2 + 1 : c.group * 2);
        return (
          <div key={c.id} style={{ position: "absolute", top: chapter.y, ...(right ? { right: layout.width - anchor } : { left: anchor }) }}>
            <SweepText enter={c.from} exit={c.to} style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: chapter.size, lineHeight: 1, letterSpacing: "-0.045em", color: palette.white }}>
              {c.lines[0]}
            </SweepText>
          </div>
        );
      })}
      {base > 0 && (
        <svg width={layout.width} height={layout.height} style={{ position: "absolute", inset: 0 }}>
          <line x1={x0} x2={x1} y1={y} y2={y} stroke={palette.line} strokeWidth={2} />
          {frame >= STEPS[0].at && <line x1={x0} x2={progressEnd} y1={y} y2={y} stroke={palette.cyan} strokeWidth={2} />}
          {STEPS.map((s, i) => {
            const on = progress(frame, s.at, s.at + 8, easeOut);
            const visible = progress(frame, T.structure + i * 3, T.structure + 14 + i * 3, easeOut);
            return (
              <g key={s.label} opacity={visible}>
                <circle cx={at(i)} cy={y} r={7} fill={palette.dark} stroke={on > 0 ? palette.cyan : "#58748d"} strokeWidth={2} />
                <circle cx={at(i)} cy={y} r={3.5 * on} fill={palette.cyan} />
              </g>
            );
          })}
        </svg>
      )}
      {base > 0 && labels > 0 && STEPS.map((s, i) => {
        const on = i < lit;
        const visible = progress(frame, T.structure + i * 3, T.structure + 14 + i * 3, easeOut);
        const align = i === 0 ? "left" : i === 7 ? "right" : "center";
        const left = at(i) - (align === "left" ? 0 : align === "right" ? 200 : 100);
        return (
          <div key={s.label} style={{ position: "absolute", left, width: 200, top: y + 22, textAlign: align, opacity: visible * labels, fontFamily: fonts.body, fontWeight: 500, fontSize: 17, letterSpacing: "0.14em", textTransform: "uppercase", color: on ? palette.white : "#8fa3ba" }}>
            {s.label}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
