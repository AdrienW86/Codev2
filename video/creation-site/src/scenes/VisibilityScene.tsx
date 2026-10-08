import { interpolate, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { FlowLine, smoothPath } from "../components/FlowLine";
import { Icon } from "../components/Icons";
import { clamp, easeOut, progress, windowed } from "../lib/easing";
import { T } from "../lib/timing";

const QUERY = "créer un site professionnel";
const COL_X = 1440, COL_W = 340;
const ROW_Y = [388, 458, 528];
// Repères de structure accrochés aux contenus du téléphone.
const TAGS = [
  { label: "H1", y: 292 },
  { label: "ALT", y: 518 },
  { label: "H2", y: 640 },
];

// 7–11 s : contenu structuré, vitesse, recherche abstraite ; le site remonte et capte la demande.
export const VisibilityScene = () => {
  const frame = useCurrentFrame();
  if (frame < T.speed - 2 || frame > T.searchOut + 24) return null;
  const out = 1 - progress(frame, T.searchOut, T.searchOut + 16);
  const speed = progress(frame, T.speed, T.speed + 14, easeOut);
  const speedFade = 1 - progress(frame, T.speed + 18, T.speed + 30);
  const search = progress(frame, T.search, T.search + 14, easeOut);
  const typed = Math.round(interpolate(frame, [T.typing, T.results - 4], [0, QUERY.length], clamp));
  const rise = progress(frame, T.rise, T.rise + 14);
  const link = progress(frame, T.link, T.link + 16, easeOut);
  const winnerY = interpolate(rise, [0, 1], [ROW_Y[2], ROW_Y[0]]);
  const path = smoothPath([{ x: COL_X - 4, y: winnerY + 28 }, { x: 1384, y: winnerY + 20 }, { x: 1342, y: 300 }]);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      {/* Vitesse : chargement net en haut de l'écran mobile. */}
      <div style={{ position: "absolute", left: 1022, top: 216, width: 316 * speed, height: 4, background: palette.cyan, opacity: speedFade, borderRadius: 2 }} />
      {/* Ondes de visibilité autour du téléphone. */}
      {[0, 22].map(delay => {
        const p = progress(frame, T.search + delay, T.search + delay + 50, easeOut);
        return <div key={delay} style={{ position: "absolute", left: 1180 - 200 - 220 * p, top: 540 - 200 - 220 * p, width: 400 + 440 * p, height: 400 + 440 * p, borderRadius: "50%", border: `1.5px solid rgba(79,140,255,${0.32 * (1 - p)})` }} />;
      })}
      {TAGS.map((tag, i) => {
        const p = windowed(frame, T.tags + i * 5, T.tags + i * 5 + 12, T.searchOut - 6, T.searchOut + 6);
        return (
          <div key={tag.label} style={{ position: "absolute", left: 924 + (1 - p) * 20, top: tag.y - 16, display: "flex", alignItems: "center", opacity: p }}>
            <span style={{ minWidth: 54, height: 32, padding: "0 10px", boxSizing: "border-box", borderRadius: 8, border: `1.5px solid ${palette.blue}`, background: palette.white, color: palette.blueDeep, fontFamily: fonts.display, fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "center" }}>{tag.label}</span>
            <span style={{ width: 1022 - 978 - 10, height: 1.5, background: palette.blue, opacity: 0.6 }} />
          </div>
        );
      })}
      {/* Recherche abstraite : un champ, trois résultats, le site qui remonte. */}
      <div style={{ position: "absolute", left: COL_X, top: 300 - (1 - search) * 20, width: COL_W, height: 60, borderRadius: 30, background: palette.white, border: `1.5px solid ${palette.border}`, boxShadow: "0 18px 40px rgba(34,64,101,.10)", opacity: search, display: "flex", alignItems: "center", gap: 12, padding: "0 22px", boxSizing: "border-box", fontFamily: fonts.body, fontSize: 19, color: palette.text, whiteSpace: "nowrap", overflow: "hidden" }}>
        <Icon name="search" size={22} color={palette.blueDeep} />
        <span>{QUERY.slice(0, typed)}<span style={{ opacity: frame % 16 < 8 ? 1 : 0, color: palette.blue }}>|</span></span>
      </div>
      {ROW_Y.map((y, i) => {
        const appear = progress(frame, T.results + i * 3, T.results + i * 3 + 12, easeOut);
        const winner = i === 2;
        const top = winner ? winnerY : y + (i < 2 ? rise * 70 : 0);
        return (
          <div key={i} style={{ position: "absolute", left: COL_X, top, width: COL_W, height: 56, borderRadius: 14, background: palette.white, border: `1.5px solid ${winner ? `rgba(80,227,194,${0.3 + rise * 0.7})` : palette.border}`, boxShadow: winner ? `0 16px 36px rgba(80,227,194,${0.22 * rise})` : "none", opacity: appear * (winner ? 1 : 1 - rise * 0.25), transform: `translateY(${(1 - appear) * 16}px)`, display: "flex", alignItems: "center", gap: 14, padding: "0 18px", boxSizing: "border-box" }}>
            <span style={{ width: 22, height: 22, borderRadius: 11, background: winner ? palette.cyan : palette.border, flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
              <span style={{ width: winner ? "74%" : `${62 - i * 8}%`, height: 8, borderRadius: 4, background: winner ? palette.text : palette.wire }} />
              <span style={{ width: "88%", height: 6, borderRadius: 3, background: palette.border }} />
            </div>
          </div>
        );
      })}
      <FlowLine d={path} draw={link} color={palette.cyan} width={3} rail={0} />
    </div>
  );
};
