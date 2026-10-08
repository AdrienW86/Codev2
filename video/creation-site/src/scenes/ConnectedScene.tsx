import { AbsoluteFill, Easing, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { FlowLine, pointOnPath, smoothPath } from "../components/FlowLine";
import { Icon, type IconName } from "../components/Icons";
import { PhoneGhost } from "../components/MobileFrame";
import { WordColumn } from "../components/MotionText";
import { clamp, easeIn, easeInOut, easeOut, lerp, progress } from "../lib/easing";
import { CENTER, NODES, NODE_RADIUS, PHONE_FRAME, SUBMIT_POINT, mixRect } from "../lib/layout";
import { T } from "../lib/timing";

const PATH = smoothPath(NODES);
const SITE = NODES[0];
const siteRect = { x: SITE.x - NODE_RADIUS, y: SITE.y - NODE_RADIUS, w: NODE_RADIUS * 2, h: NODE_RADIUS * 2, r: NODE_RADIUS };

// 15–18 s : la demande devient une donnée et rejoint contact, CRM, suivi, automatisation.
export const ConnectedScene = () => {
  const frame = useCurrentFrame();
  if (frame < T.dark) return null;
  const reveal = interpolate(frame, [T.dark, T.dark + 30], [0, 2400], { ...clamp, easing: Easing.bezier(0.5, 0, 0.3, 1) });
  const converge = progress(frame, T.outro, T.logo + 4, easeIn);
  const ghost = mixRect(PHONE_FRAME, siteRect, progress(frame, T.dark + 8, T.travel));
  const draw = progress(frame, T.toSite + 4, T.travel + 12, easeOut);
  const travel = progress(frame, T.travel, T.travelDone, easeInOut);
  const toCenter = (x: number, y: number) => ({ x: lerp(x, CENTER.x, converge), y: lerp(y, CENTER.y, converge) });

  // Paquet « demande » : le bouton envoyé se détache, devient un point et parcourt le système.
  const lift = progress(frame, T.packet, T.nodes, easeOut);
  const swap = progress(frame, T.packet + 6, T.packet + 14);
  const shrink = progress(frame, T.toSite, T.travel, easeInOut);
  const arrive = progress(frame, T.travelDone - 4, T.travelDone + 6);
  const start = { x: lerp(SUBMIT_POINT.x, 1180, lift), y: lerp(SUBMIT_POINT.y, 640, lift) };
  const chipCenter = travel > 0 ? pointOnPath(NODES, travel) : { x: lerp(start.x, SITE.x, shrink), y: lerp(start.y, SITE.y, shrink) };
  const size = progress(frame, T.toSite, T.toSite + 10, easeOut);
  const chipW = lerp(lerp(264, 280, lift), 26, size);
  const chipH = lerp(lerp(48, 58, lift), 26, size);
  const chipColor = size > 0 ? interpolateColors(size, [0, 1], [palette.blue, palette.cyan]) : interpolateColors(swap, [0, 1], [palette.cyan, palette.blue]);
  const packet = toCenter(chipCenter.x, chipCenter.y);
  const label = 1 - progress(frame, T.toSite, T.toSite + 4);

  return (
    <>
    <AbsoluteFill style={{ clipPath: `circle(${reveal}px at ${SUBMIT_POINT.x}px ${SUBMIT_POINT.y}px)`, background: palette.dark }}>
      <div style={{ position: "absolute", left: -380, bottom: -520, width: 1100, height: 1100, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,140,255,.13), transparent 62%)", opacity: 1 - converge }} />
      <div style={{ opacity: 1 - converge }}>
        <FlowLine d={PATH} draw={draw} color={palette.cyan} width={3} rail={0.18} />
        <PhoneGhost rect={ghost} glow={progress(frame, T.nodes + 10, T.nodes + 24)} />
        {NODES.map((node, i) => {
          const appear = i === 0 ? progress(frame, T.nodes + 16, T.nodes + 26) : progress(frame, T.nodes + i * 5, T.nodes + i * 5 + 14, easeOut);
          const lit = i === 0 ? 1 : progress(frame, T.travel + (i / (NODES.length - 1)) * (T.travelDone - T.travel) - 3, T.travel + (i / (NODES.length - 1)) * (T.travelDone - T.travel) + 5);
          const p = toCenter(node.x, node.y);
          return (
            <div key={node.id} style={{ position: "absolute", left: p.x - NODE_RADIUS, top: p.y - NODE_RADIUS, width: NODE_RADIUS * 2, height: NODE_RADIUS * 2, opacity: appear, transform: `scale(${(0.7 + appear * 0.3) * (1 - converge * 0.8)})` }}>
              {i > 0 && <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxSizing: "border-box", border: `2px solid ${lit > 0.5 ? palette.cyan : "rgba(196,207,221,.45)"}`, background: palette.darkSoft, boxShadow: `0 0 ${36 * lit}px rgba(80,227,194,${0.35 * lit})` }} />}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={node.id as IconName} size={38} color={lit > 0.5 ? palette.cyan : palette.mist} />
              </div>
              <div style={{ position: "absolute", top: NODE_RADIUS * 2 + 18, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: fonts.body, fontWeight: 500, fontSize: 26, color: lit > 0.5 ? palette.white : palette.mist, opacity: 1 - converge }}>{node.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{ opacity: 1 - progress(frame, T.outro - 6, T.outro + 8, easeIn) }}>
        <WordColumn dark />
      </div>
    </AbsoluteFill>
    {reveal > 0 && reveal < 2400 && (
      <div style={{ position: "absolute", left: SUBMIT_POINT.x - reveal, top: SUBMIT_POINT.y - reveal, width: reveal * 2, height: reveal * 2, borderRadius: "50%", border: `2px solid rgba(80,227,194,${0.7 * (1 - reveal / 2400)})`, boxSizing: "border-box" }} />
    )}
    {/* La demande, au-dessus du fond qui s'ouvre. */}
    {frame >= T.packet && arrive < 1 && (
      <div style={{ position: "absolute", left: packet.x - chipW / 2, top: packet.y - chipH / 2, width: chipW, height: chipH, borderRadius: chipH / 2, background: chipColor, boxShadow: `0 0 ${30 + 20 * shrink}px rgba(80,227,194,${0.35 + 0.3 * shrink})`, opacity: 1 - arrive, transform: `scale(${1 + arrive * 0.6})`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", whiteSpace: "nowrap", fontFamily: fonts.body, fontWeight: 500, fontSize: 17 }}>
        {label > 0 && <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 10, opacity: label * (1 - progress(frame, T.packet + 2, T.packet + 6)), color: palette.dark }}><Icon name="check" size={20} color={palette.dark} /> Demande envoyée</div>}
        {label > 0 && <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 10, opacity: label * progress(frame, T.packet + 7, T.packet + 12), color: palette.white, fontSize: 19 }}><Icon name="mail" size={22} color={palette.white} /> Nouvelle demande</div>}
      </div>
    )}
    </>
  );
};
