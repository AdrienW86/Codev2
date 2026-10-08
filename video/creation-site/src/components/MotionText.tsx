import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { clamp, easeIn, easeOut } from "../lib/easing";
import { WORDS } from "../lib/timing";

const COLUMN_X = 150;

/** Ligne qui monte dans un masque puis sort par le haut. */
export const MaskedLine = ({ children, enter, exit, delay = 0, style }: { children: React.ReactNode; enter: number; exit: number; delay?: number; style?: React.CSSProperties }) => {
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [enter + delay, enter + delay + 16], [0, 1], { ...clamp, easing: easeOut });
  const outP = interpolate(frame, [exit + delay * 0.5, exit + delay * 0.5 + 12], [0, 1], { ...clamp, easing: easeIn });
  const y = (1 - inP) * 105 - outP * 105;
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
      <div style={{ transform: `translateY(${y}%)`, ...style }}>{children}</div>
    </div>
  );
};

/** Phrase d'ouverture : le constat, sur deux lignes. */
export const Statement = ({ from, to }: { from: number; to: number }) => (
  <AbsoluteFill style={{ left: COLUMN_X, top: 404, width: 820, height: 260 }}>
    <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 76, lineHeight: 1.06, letterSpacing: "-0.045em", color: palette.text }}>
      <MaskedLine enter={from} exit={to}>Un site ne doit pas</MaskedLine>
      <MaskedLine enter={from} exit={to} delay={6} style={{ color: palette.muted }}>seulement exister.</MaskedLine>
    </div>
  </AbsoluteFill>
);

/** Colonne éditoriale : un repère numéroté et un mot fort, qui se relaient sans coupe. */
export const WordColumn = ({ dark = false }: { dark?: boolean }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ left: COLUMN_X, top: 420, width: 720, height: 360 }}>
      {WORDS.filter(w => Boolean("onDark" in w && w.onDark) === dark).map(word => {
        if (frame < word.from - 2 || frame > word.to + 24) return null;
        const rule = interpolate(frame, [word.from, word.from + 18, word.to, word.to + 12], [0, 1, 1, 0], { ...clamp, easing: easeOut });
        return (
          <div key={word.id} style={{ position: "absolute", left: 0, top: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: fonts.body, fontWeight: 700, fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: dark ? palette.cyan : palette.blueDeep }}>
              <MaskedLine enter={word.from} exit={word.to}>{word.index}</MaskedLine>
              <span style={{ width: 56 * rule, height: 2, background: dark ? palette.cyan : palette.blueDeep, display: "inline-block" }} />
              <MaskedLine enter={word.from} exit={word.to} delay={3}>{word.eyebrow}</MaskedLine>
            </div>
            <div style={{ marginTop: 22, fontFamily: fonts.display, fontWeight: 500, fontSize: 108, lineHeight: 0.98, letterSpacing: "-0.05em", color: dark ? palette.white : palette.text }}>
              {word.lines.map((line, i) => (
                <MaskedLine key={line} enter={word.from + 2} exit={word.to} delay={i * 5}>{line}</MaskedLine>
              ))}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
