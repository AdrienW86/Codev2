import { interpolate, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { clamp, easeInOut, easeOut, progress, windowed } from "../lib/easing";
import { JOURNEY, T } from "../lib/timing";

const RAIL_X = 1450, RAIL_Y = 330, STEP = 78;

// Trajet du doigt : glisser (défilement), toucher le CTA, remplir, envoyer.
const TOUCH: { at: number; x: number; y: number }[] = [
  { at: T.scroll - 2, x: 1250, y: 780 },
  { at: T.scrollDone - 4, x: 1250, y: 470 },
  { at: T.tap - 6, x: 1188, y: 852 },
  { at: T.fieldName, x: 1200, y: 566 },
  { at: T.fieldNeed, x: 1220, y: 690 },
  { at: T.submit, x: 1180, y: 838 },
];
const TAPS = [T.tap, T.fieldName, T.fieldNeed, T.submit];

// 11–15 s : visite → compréhension → preuve → action → demande, sur le téléphone.
export const ConversionScene = () => {
  const frame = useCurrentFrame();
  if (frame < T.scroll - 10 || frame > T.dark + 20) return null;
  const rail = windowed(frame, T.scroll, T.scroll + 14, T.dark - 4, T.dark + 8);
  const at = TOUCH.map(p => p.at);
  const touchAt = (f: number) => ({ x: interpolate(f, at, TOUCH.map(p => p.x), { ...clamp, easing: easeInOut }), y: interpolate(f, at, TOUCH.map(p => p.y), { ...clamp, easing: easeInOut }) });
  const { x: tx, y: ty } = touchAt(frame);
  const touchVisible = windowed(frame, T.scroll - 6, T.scroll, T.submit + 4, T.submit + 10) * (1 - windowed(frame, T.scrollDone - 2, T.scrollDone + 4, T.tap - 14, T.tap - 8) * 0.7);
  const pressing = TAPS.reduce((acc, t) => Math.max(acc, interpolate(frame, [t - 3, t, t + 5], [0, 1, 0], clamp)), 0);
  const active = JOURNEY.reduce((acc, step, i) => (frame >= step.at ? i : acc), -1);
  const fill = interpolate(frame, JOURNEY.map(s => s.at), JOURNEY.map((_, i) => i / (JOURNEY.length - 1)), clamp);
  return (
    <>
      {/* Rail du parcours : reste discret, se lit d'un coup d'œil. */}
      <div style={{ position: "absolute", left: RAIL_X, top: RAIL_Y, opacity: rail }}>
        <div style={{ position: "absolute", left: 8, top: 8, width: 2, height: STEP * (JOURNEY.length - 1), background: palette.border }} />
        <div style={{ position: "absolute", left: 8, top: 8, width: 2, height: STEP * (JOURNEY.length - 1) * fill, background: palette.blue }} />
        {JOURNEY.map((step, i) => {
          const on = progress(frame, step.at, step.at + 8, easeOut);
          const current = i === active;
          return (
            <div key={step.label} style={{ position: "absolute", left: 0, top: i * STEP, display: "flex", alignItems: "center", gap: 22, whiteSpace: "nowrap" }}>
              <span style={{ width: 18, height: 18, borderRadius: 9, boxSizing: "border-box", border: `2px solid ${on > 0 ? palette.blue : palette.wire}`, background: current ? palette.cyan : on > 0 ? palette.blue : palette.background, boxShadow: current ? "0 0 0 7px rgba(80,227,194,.22)" : "none" }} />
              <span style={{ fontFamily: fonts.body, fontWeight: current ? 700 : 500, fontSize: 25, color: on > 0 ? palette.text : palette.muted, opacity: 0.55 + on * 0.45 }}>{step.label}</span>
            </div>
          );
        })}
      </div>
      {/* Doigt : un disque sobre, un anneau à chaque toucher. */}
      <div style={{ position: "absolute", left: tx - 24, top: ty - 24, width: 48, height: 48, borderRadius: 24, background: "rgba(255,255,255,.55)", border: "2px solid rgba(53,110,224,.75)", boxShadow: "0 8px 22px rgba(7,17,31,.18)", opacity: touchVisible, transform: `scale(${1 - pressing * 0.18})` }} />
      {TAPS.map(t => {
        const p = progress(frame, t, t + 14, easeOut);
        if (p <= 0 || p >= 1) return null;
        const point = touchAt(t);
        return <div key={t} style={{ position: "absolute", left: point.x - 24 - 30 * p, top: point.y - 24 - 30 * p, width: 48 + 60 * p, height: 48 + 60 * p, borderRadius: "50%", border: `2px solid rgba(80,227,194,${1 - p})` }} />;
      })}
    </>
  );
};
