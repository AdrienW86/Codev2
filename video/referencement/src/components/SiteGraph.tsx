import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { clamp, easeOut, progress } from "../../../src/shared/easing";
import { useLayout } from "../lib/context";
import { partialPath, pointAt } from "../lib/geometry";
import { meshEdge, pageById, treeEdge, treePoint, type PageDef, type Point } from "../lib/layout";
import { cardPose, shiftAt, structureAt, treePresence } from "../lib/state";
import { CRAWL, exploredAt, T } from "../lib/timing";

const toPath = (pts: Point[]) => pts.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");

/**
 * Le site : neuf pages d'abord dispersées et presque invisibles, qui se rangent en arborescence,
 * se remplissent, se relient, puis sont parcourues par l'exploration.
 */
export const SiteGraph = () => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const shift = shiftAt(frame);
  const presence = treePresence(frame);
  if (presence <= 0) return null;
  const move = (p: Point) => treePoint(layout, p, shift);

  // Liens hiérarchiques : apparaissent une fois les pages en place.
  const edges = layout.pages.filter(p => p.parent).map((page, i) => {
    const parent = pageById(layout, page.parent!);
    const pts = treeEdge(layout, parent.tree, page.tree).map(move);
    return { id: page.id, pts, draw: progress(frame, T.structure + 34 + i * 4, T.structure + 60 + i * 4, easeOut) };
  });
  const mesh = layout.mesh.map(([a, b], i) => ({
    id: `${a}-${b}`,
    pts: meshEdge(layout, pageById(layout, a).tree, pageById(layout, b).tree).map(move),
    draw: progress(frame, T.mesh + i * 8, T.mesh + i * 8 + 26, easeOut),
  }));
  // Avant la structure : deux fragments de liens, rompus.
  const broken = interpolate(frame, [10, 30, T.structure, T.structure + 20], [0, 1, 1, 0], clamp);
  const sc = (id: PageDef["id"]) => pageById(layout, id).scatter;

  return (
    <AbsoluteFill style={{ opacity: presence }}>
      <svg width={layout.width} height={layout.height} style={{ position: "absolute", inset: 0 }}>
        {broken > 0 && (
          <g opacity={broken * 0.5} stroke={palette.line} strokeWidth={1.5} strokeDasharray="6 10" fill="none">
            <path d={`M ${sc("home").x} ${sc("home").y} L ${(sc("home").x + sc("services").x) / 2} ${(sc("home").y + sc("services").y) / 2 + 10}`} />
            <path d={`M ${sc("creation").x} ${sc("creation").y} L ${(sc("creation").x + sc("guide").x) / 2 + 6} ${(sc("creation").y + sc("guide").y) / 2}`} />
          </g>
        )}
        {edges.map(e => <path key={e.id} d={partialPath(e.pts, e.draw)} fill="none" stroke="#3d5570" strokeWidth={1.6} />)}
        {mesh.map(m => <path key={m.id} d={partialPath(m.pts, m.draw)} fill="none" stroke={palette.blue} strokeWidth={1.6} strokeDasharray="2 7" strokeLinecap="round" opacity={0.85} />)}
        {CRAWL.map(c => {
          const t = progress(frame, c.at, c.at + c.dur, easeOut);
          if (t <= 0) return null;
          const a = pageById(layout, c.from);
          const b = pageById(layout, c.to);
          const pts = ("mesh" in c ? meshEdge(layout, a.tree, b.tree) : treeEdge(layout, a.tree, b.tree)).map(move);
          const head = pointAt(pts, t);
          const fade = interpolate(frame, [c.at + c.dur, c.at + c.dur + 40], [1, 0.45], clamp);
          return (
            <g key={`${c.from}-${c.to}`}>
              <path d={partialPath(pts, t)} fill="none" stroke={palette.cyan} strokeWidth={2} opacity={0.75 * fade} />
              {t < 1 && <circle cx={head.x} cy={head.y} r={11} fill={palette.cyan} opacity={0.18} />}
              {t < 1 && <circle cx={head.x} cy={head.y} r={4.5} fill={palette.cyan} />}
            </g>
          );
        })}
      </svg>
      {layout.pages.map((page, i) => <PageCard key={page.id} page={page} order={i} />)}
      <div style={{ position: "absolute", left: layout.siteLabel.x - 200, width: 400, top: layout.siteLabel.y - 12, textAlign: "center", fontFamily: fonts.body, fontWeight: 500, fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: "#a9b8cb", opacity: interpolate(frame, [14, 34, T.structure - 4, T.structure + 12], [0, 0.9, 0.9, 0], clamp) }}>votre-site.fr</div>
    </AbsoluteFill>
  );
};

const PageCard = ({ page, order }: { page: PageDef; order: number }) => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const { w, h } = layout.card;
  const k = structureAt(frame, order);
  const base = cardPose(layout, page, order, frame);
  // Dans le désordre, les pages dérivent lentement, sans lien entre elles.
  const drift = 1 - k;
  const pose = { ...base, x: base.x + Math.sin(frame / 40 + order * 2.1) * 10 * drift, y: base.y + Math.cos(frame / 46 + order * 1.3) * 8 * drift };
  const label = progress(frame, T.structure + 40 + order * 3, T.structure + 58 + order * 3, easeOut);
  const content = progress(frame, T.content + order * 5, T.content + order * 5 + 18, easeOut);
  const seen = exploredAt(page.id);
  const explored = frame >= seen;
  const scan = progress(frame, seen, seen + 12);
  const understood = progress(frame, seen + 6, seen + 16, easeOut);
  const excluded = !page.indexed ? progress(frame, seen + 10, seen + 22, easeOut) : 0;
  // Pendant la visite, la page « Création de site » reste nette : c'est la destination.
  const focus = page.id === "creation" ? interpolate(frame, [T.click - 6, T.click + 8], [0, 1], clamp) : 0;
  const hidden = page.id === "creation" && frame >= T.open;
  if (hidden) return null;

  const border = interpolateColors(understood, [0, 1], [k > 0.9 ? "#3d5570" : "#4a6382", palette.cyan]);
  const opacity = (0.62 + 0.38 * k) * (1 - excluded * 0.55);
  const lines = [0.86, 0.64, 0.74];

  return (
    <div style={{ position: "absolute", left: pose.x - w / 2, top: pose.y - h / 2, width: w, height: h, transform: `scale(${pose.s * (1 + focus * 0.06)})`, opacity: Math.max(opacity, focus) }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: palette.darkSoft, border: `1.5px ${excluded > 0.5 ? "dashed" : "solid"} ${excluded > 0.5 ? "#58748d" : border}`, boxShadow: explored && page.indexed ? `0 0 ${24 * understood + focus * 30}px rgba(80,227,194,${0.18 * understood + focus * 0.25})` : "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 14, top: 12, fontFamily: fonts.body, fontWeight: 500, fontSize: 17, color: palette.mist, opacity: label, whiteSpace: "nowrap" }}>{page.label}</div>
        <div style={{ position: "absolute", left: 14, top: 44, height: 7, borderRadius: 4, width: (w - 28) * 0.7 * content, background: interpolateColors(understood * (page.indexed ? 1 : 0), [0, 1], ["#8fa3ba", palette.cyan]) }} />
        {lines.map((l, j) => (
          <div key={j} style={{ position: "absolute", left: 14, top: 62 + j * 12, height: 4, borderRadius: 2, width: (w - 28) * l * progress(frame, T.content + order * 5 + 6 + j * 3, T.content + order * 5 + 22 + j * 3, easeOut), background: "#3d5570" }} />
        ))}
        {scan > 0 && scan < 1 && <div style={{ position: "absolute", left: 0, right: 0, top: scan * h - 1, height: 2, background: palette.cyan, boxShadow: `0 0 14px ${palette.cyan}` }} />}
      </div>
      {excluded > 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: h + 10, textAlign: "center", fontFamily: fonts.body, fontWeight: 500, fontSize: 15, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8fa3ba", opacity: excluded }}>non indexée</div>
      )}
    </div>
  );
};
