import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { clamp, easeIn, easeInOut, easeOut, progress } from "../../../src/shared/easing";
import { useLayout } from "../lib/context";
import { arc, partialPath, pointAt } from "../lib/geometry";
import { pageById } from "../lib/layout";
import { cardPose } from "../lib/state";
import { T } from "../lib/timing";
import { QUERY, RESULT, rowBox } from "./IndexPanel";

/**
 * Le clic part du résultat et suit une trajectoire jusqu'à la page pertinente,
 * qui s'ouvre : lecture, intérêt, puis action.
 */
export const Visit = () => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  if (frame < T.click || frame > T.outro + 10) return null;
  const page = pageById(layout, "creation");
  const row = layout.rows.find(r => r.page === "creation")!;
  const node = cardPose(layout, page, layout.pages.indexOf(page), frame);
  const box = rowBox(layout, row, frame);
  const from = { x: box.x, y: box.y + box.h / 2 };
  const pts = arc(from, node, { x: (from.x + node.x) / 2, y: Math.min(from.y, node.y) - 260 });
  const travel = progress(frame, T.travel, T.arrive, easeInOut);
  const trail = 1 - progress(frame, T.arrive + 4, T.opened, easeIn);
  const head = pointAt(pts, travel);

  const open = progress(frame, T.open, T.opened, easeInOut);
  // Fermeture : la page se resserre vers l'emplacement du logo (tout converge).
  const close = progress(frame, T.close, T.close + 16, easeInOut);
  const { card, pageView: v } = layout;
  const cw = card.w * node.s;
  const ch = card.h * node.s;
  const w = cw + (v.w - cw) * open;
  const h = ch + (v.h - ch) * open;
  const { outro } = layout;
  const cx = node.x + (v.x - node.x) * open + (outro.logo.x - v.x) * close;
  const cy = node.y + (v.y - node.y) * open + (outro.logo.y - v.y) * close;
  const shrink = 1 - close * (1 - outro.logoSize / v.w);
  // La page repasse au sombre avant de s'effacer : le logo se pose sur un fond uni.
  const darken = progress(frame, T.close, T.close + 10);

  return (
    <AbsoluteFill>
      <svg width={layout.width} height={layout.height} style={{ position: "absolute", inset: 0, opacity: trail }}>
        <path d={partialPath(pts, travel)} fill="none" stroke={palette.cyan} strokeWidth={2.4} strokeLinecap="round" />
        {travel > 0 && travel < 1 && (
          <>
            <circle cx={head.x} cy={head.y} r={16} fill={palette.cyan} opacity={0.2} />
            <circle cx={head.x} cy={head.y} r={6} fill={palette.cyan} />
          </>
        )}
      </svg>
      {frame >= T.open && (
        <div style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, opacity: 1 - progress(frame, T.close + 8, T.close + 18), transform: `scale(${shrink})`, borderRadius: 10 + open * 8, overflow: "hidden", background: interpolateColors(open * (1 - darken), [0, 0.6, 1], [palette.dark, "#dfe7f1", palette.background]), boxShadow: `0 0 0 1.5px ${interpolateColors(open, [0, 1], [palette.cyan, "rgba(80,227,194,0)"])}, 0 50px 120px -30px rgba(0,0,0,${0.6 * open})` }}>
          <div style={{ opacity: 1 - darken }}><PageContent /></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** La page d'arrivée, en clair : elle répond à la requête et mène à une action. */
const PageContent = () => {
  const frame = useCurrentFrame();
  const { pageView: v } = useLayout();
  const show = progress(frame, T.opened - 8, T.opened + 6, easeOut);
  const reading = progress(frame, T.read, T.cta + 4, easeInOut);
  const interest = progress(frame, T.read + 10, T.read + 20, easeOut);
  const cta = progress(frame, T.cta, T.cta + 8, easeOut);
  const press = interpolate(frame, [T.cta + 4, T.cta + 7, T.cta + 11], [1, 0.96, 1], clamp);
  const band = 150 + reading * 320; // bande de lecture qui descend dans la page
  const text = palette.text;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: v.w, height: v.h, opacity: show }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56, borderBottom: `1px solid ${palette.border}`, background: palette.white, display: "flex", alignItems: "center", padding: "0 28px", gap: 12 }}>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: palette.blue }} />
        <span style={{ fontFamily: fonts.body, fontWeight: 500, fontSize: 17, color: palette.muted }}>{RESULT.url}</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, padding: "6px 14px", borderRadius: 999, background: "rgba(80,227,194,0.14)", fontFamily: fonts.body, fontWeight: 500, fontSize: 15, color: "#0f766e" }}>
          <span style={{ width: 7, height: 7, borderRadius: 4, background: "#14b8a6" }} />
          {QUERY}
        </span>
      </div>
      {/* Progression de lecture */}
      <div style={{ position: "absolute", left: 28, top: 90, width: 3, height: 460, borderRadius: 2, background: palette.border }}>
        <div style={{ width: 3, height: 460 * reading, borderRadius: 2, background: palette.blue }} />
      </div>
      <div style={{ position: "absolute", left: 64, right: 64, top: band - 22, height: 44, borderRadius: 8, background: "rgba(79,140,255,0.08)", opacity: reading > 0 && reading < 1 ? 1 : 0 }} />
      <div style={{ position: "absolute", left: 72, top: 84, fontFamily: fonts.display, fontWeight: 500, fontSize: 54, lineHeight: 1.05, letterSpacing: "-0.045em", color: text }}>Création de site professionnel</div>
      {[0.78, 0.7, 0.46].map((l, i) => (
        <div key={i} style={{ position: "absolute", left: 72, top: 172 + i * 22, height: 10, borderRadius: 5, width: (v.w - 144) * l, background: palette.wire }} />
      ))}
      <div style={{ position: "absolute", left: 72, right: 72, top: 260, display: "flex", gap: 20 }}>
        {[0, 1, 2].map(i => {
          const lifted = i === 1 ? interest : 0;
          return (
            <div key={i} style={{ flex: 1, height: 132, borderRadius: 12, background: palette.white, border: `1.5px solid ${lifted > 0 ? `rgba(79,140,255,${0.25 + lifted * 0.75})` : palette.border}`, transform: `translateY(${-8 * lifted}px)`, boxShadow: `0 ${16 * lifted}px ${36 * lifted}px -18px rgba(53,110,224,0.45)`, padding: 20, boxSizing: "border-box" }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: i === 1 ? `rgba(79,140,255,${0.18 + lifted * 0.5})` : "#eef3f9" }} />
              <div style={{ marginTop: 18, height: 9, borderRadius: 5, width: "72%", background: "#b8c6d8" }} />
              <div style={{ marginTop: 10, height: 7, borderRadius: 4, width: "88%", background: palette.border }} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 72, top: 436, display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, height: 60, padding: "0 30px", borderRadius: 999, background: palette.blue, color: palette.white, fontFamily: fonts.body, fontWeight: 700, fontSize: 21, transform: `scale(${press})`, boxShadow: `0 0 0 ${6 * cta}px rgba(79,140,255,0.22)` }}>
          Demander un devis <span>↗</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, width: 180, background: palette.wire }} />
      </div>
    </div>
  );
};
