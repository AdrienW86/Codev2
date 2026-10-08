import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { clamp, easeInOut, easeOut, progress } from "../../../src/shared/easing";
import { useLayout } from "../lib/context";
import { arc, partialPath } from "../lib/geometry";
import { pageById, type IndexRow } from "../lib/layout";
import { cardPose, morphAt, resultSlot, resultY, rowY } from "../lib/state";
import { exploredAt, INDEX_FLIGHT, T } from "../lib/timing";

export const QUERY = "création site professionnel";
export const RESULT = { title: "Création de site professionnel", url: "votre-site.fr/creation-site" };

const landAt = (row: IndexRow) => (row.page ? exploredAt(row.page) + INDEX_FLIGHT.delay + INDEX_FLIGHT.dur : 0);

/** Géométrie d'une ligne à une frame : position d'index, puis de résultat. */
export const rowBox = (layout: ReturnType<typeof useLayout>, row: IndexRow, frame: number) => {
  const morph = row.match ? morphAt(frame) : 0;
  const slot = row.match ? resultSlot(frame, row.match.start, row.match.end) : 0;
  const y = rowY(layout, row.slot) + (resultY(layout, slot) - rowY(layout, row.slot)) * morph;
  const h = layout.index.rowH + (layout.results.rowH - layout.index.rowH) * morph;
  return { x: layout.index.x, y, w: layout.index.width, h, morph };
};

/**
 * L'index (une liste de pages connues, dont celles d'autres sites), puis la requête,
 * la pertinence et une pile de résultats abstraits où le site remonte.
 */
export const IndexPanel = () => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const presence = progress(frame, T.indexIn, T.indexIn + 16, easeOut) * (1 - progress(frame, T.open + 6, T.open + 18));
  if (presence <= 0) return null;
  const { index, query } = layout;
  const results = progress(frame, T.results, T.results + 14, easeOut);
  const typed = Math.round(interpolate(frame, [T.typing, T.typed], [0, QUERY.length], clamp));
  const queryIn = progress(frame, T.query, T.query + 12, easeOut);
  const caret = frame < T.typed + 14 && Math.floor(frame / 8) % 2 === 0;
  const relevance = progress(frame, T.match, T.match + 14, easeOut);
  const relevanceOut = 1 - progress(frame, T.results, T.results + 12);
  const lineY = query.y + 92;
  const label = { fontFamily: fonts.body, fontWeight: 700, fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase" } as const;

  return (
    <AbsoluteFill style={{ opacity: presence }}>
      {/* Requête : une ligne de saisie abstraite, pas une interface de moteur réel. */}
      <div style={{ position: "absolute", left: query.x, top: query.y, width: query.width, opacity: queryIn, transform: `translateY(${(1 - queryIn) * 12}px)` }}>
        <div style={{ ...label, color: palette.cyan }}>Requête</div>
        <div style={{ marginTop: 14, height: 46, fontFamily: fonts.display, fontWeight: 500, fontSize: 34, letterSpacing: "-0.02em", color: palette.white, whiteSpace: "nowrap" }}>
          {QUERY.slice(0, typed)}
          <span style={{ display: "inline-block", width: 3, height: 34, marginLeft: 4, verticalAlign: "-4px", background: palette.cyan, opacity: caret ? 1 : 0 }} />
        </div>
      </div>
      <svg width={layout.width} height={layout.height} style={{ position: "absolute", inset: 0 }}>
        <line x1={query.x} x2={query.x + query.width * queryIn} y1={lineY} y2={lineY} stroke="#3d5570" strokeWidth={1.5} />
        {relevance > 0 && relevanceOut > 0 && layout.rows.filter(r => r.match).map((row, i) => {
          const to = { x: index.x - 4, y: rowY(layout, row.slot) + index.rowH / 2 };
          const from = { x: query.x - 4, y: lineY };
          const pts = arc(from, to, { x: query.x - 70 - i * 9, y: to.y - 12 });
          return <path key={row.id} d={partialPath(pts, progress(frame, T.match + i * 2, T.match + i * 2 + 14, easeOut))} fill="none" stroke={row.page ? palette.cyan : "#8fa3ba"} strokeWidth={row.page ? 2 : 1.4} opacity={relevanceOut * (row.page ? 1 : 0.7)} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: index.x, top: index.top - 40, ...label, color: palette.mist }}>
        <span style={{ opacity: 1 - results }}>Index</span>
        <span style={{ position: "absolute", left: 0, opacity: results, whiteSpace: "nowrap" }}>Résultats</span>
      </div>
      {[...layout.rows].sort((a, b) => Number(a.page === "creation") - Number(b.page === "creation")).map(row => <Row key={row.id} row={row} />)}
      <IndexFlights />
    </AbsoluteFill>
  );
};

const Row = ({ row }: { row: IndexRow }) => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const ours = Boolean(row.page);
  const appear = ours ? progress(frame, landAt(row) - 2, landAt(row) + 8, easeOut) : progress(frame, T.indexIn + 4 + row.slot * 2, T.indexIn + 16 + row.slot * 2, easeOut);
  const dropped = row.match ? 0 : progress(frame, T.match + 4, T.match + 18, easeInOut);
  const matched = row.match ? progress(frame, T.match, T.match + 10, easeOut) : 0;
  const box = rowBox(layout, row, frame);
  const opacity = appear * (1 - dropped);
  if (opacity <= 0) return null;
  const isTarget = row.page === "creation";
  const press = isTarget ? interpolate(frame, [T.click, T.click + 4, T.click + 10], [1, 0.975, 1], clamp) : 1;
  const clicked = isTarget ? progress(frame, T.click, T.click + 8, easeOut) : 0;
  const ripple = isTarget ? progress(frame, T.click, T.click + 22, easeOut) : 0;
  const rel = row.match ? progress(frame, T.results + 10 + row.match.end * 2, T.results + 34 + row.match.end * 2, easeOut) * row.match.relevance : 0;
  const accent = ours ? palette.cyan : "#58748d";
  const pageLabel = row.page ? pageById(layout, row.page).path : "";

  return (
    <div style={{ position: "absolute", left: box.x - dropped * 24, top: box.y, width: box.w, height: box.h, opacity, transform: `scale(${press})`, transformOrigin: "left center" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: ours ? `rgba(80,227,194,${0.06 + 0.08 * clicked})` : "rgba(196,207,221,0.04)", border: `1px solid ${ours ? `rgba(80,227,194,${0.35 + 0.5 * clicked})` : "#24384f"}` }} />
      <div style={{ position: "absolute", left: 0, top: 6, bottom: 6, width: 3, borderRadius: 2, background: accent, opacity: ours ? 1 : 0.4 + matched * 0.6 }} />
      {/* Ligne d'index */}
      <div style={{ opacity: 1 - box.morph }}>
        {ours ? (
          <div style={{ position: "absolute", left: 18, top: 3, fontFamily: fonts.body, fontWeight: 500, fontSize: 17, color: palette.white, whiteSpace: "nowrap" }}>{pageLabel}</div>
        ) : (
          <div style={{ position: "absolute", left: 18, top: 11, height: 6, borderRadius: 3, width: 140 + ((row.slot * 53) % 160), background: "#3d5570" }} />
        )}
      </div>
      {/* Résultat abstrait : titre, adresse, pertinence. Aucun rang ni chiffre. */}
      {row.match && box.morph > 0 && (
        <div style={{ opacity: box.morph }}>
          {ours ? (
            <>
              <div style={{ position: "absolute", left: 22, top: 12, fontFamily: fonts.display, fontWeight: 500, fontSize: 24, letterSpacing: "-0.02em", color: palette.white, whiteSpace: "nowrap" }}>{RESULT.title}</div>
              <div style={{ position: "absolute", left: 22, top: 44, fontFamily: fonts.body, fontWeight: 500, fontSize: 15, color: palette.cyan, whiteSpace: "nowrap" }}>{RESULT.url}</div>
            </>
          ) : (
            <>
              <div style={{ position: "absolute", left: 22, top: 18, height: 9, borderRadius: 5, width: 220 + ((row.slot * 71) % 150), background: "#58748d" }} />
              <div style={{ position: "absolute", left: 22, top: 44, height: 6, borderRadius: 3, width: 130 + ((row.slot * 37) % 70), background: "#33465e" }} />
            </>
          )}
          <div style={{ position: "absolute", right: 18, top: box.h / 2 - 2, width: 70, height: 4, borderRadius: 2, background: "#1b2c41" }}>
            <div style={{ width: 70 * rel, height: 4, borderRadius: 2, background: ours ? palette.cyan : "#8fa3ba" }} />
          </div>
        </div>
      )}
      {ripple > 0 && ripple < 1 && (
        <div style={{ position: "absolute", left: 40 - 90 * ripple, top: box.h / 2 - 90 * ripple, width: 180 * ripple, height: 180 * ripple, borderRadius: "50%", border: `2px solid rgba(80,227,194,${0.8 * (1 - ripple)})` }} />
      )}
    </div>
  );
};

/** Chaque page retenue envoie une empreinte vers sa ligne d'index. */
const IndexFlights = () => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  return (
    <>
      {layout.rows.filter(r => r.page).map(row => {
        const page = pageById(layout, row.page!);
        const start = exploredAt(page.id) + INDEX_FLIGHT.delay;
        const t = progress(frame, start, start + INDEX_FLIGHT.dur, easeInOut);
        if (t <= 0 || t >= 1) return null;
        const from = cardPose(layout, page, layout.pages.indexOf(page), frame);
        const to = { x: layout.index.x + 40, y: rowY(layout, row.slot) + layout.index.rowH / 2 };
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t - Math.sin(Math.PI * t) * 60;
        return <div key={row.id} style={{ position: "absolute", left: x - 30, top: y - 4, width: 60, height: 8, borderRadius: 4, background: palette.cyan, opacity: 0.9, boxShadow: `0 0 18px ${palette.cyan}` }} />;
      })}
    </>
  );
};
