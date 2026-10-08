import { palette } from "../../../src/shared/theme";
import type { FrameRect } from "../lib/layout";

/** Détails propres au téléphone, superposés au cadre une fois la morphose engagée. */
export const MobileFrame = ({ rect, mobile }: { rect: FrameRect; mobile: number }) => (
  <div style={{ position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h, opacity: Math.max(0, mobile * 1.6 - 0.6), pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: "50%", top: 14, width: 74, height: 8, marginLeft: -37, borderRadius: 4, background: "rgba(18,32,51,.9)" }} />
    <div style={{ position: "absolute", left: "50%", bottom: 10, width: 96, height: 4, marginLeft: -48, borderRadius: 2, background: "rgba(18,32,51,.35)" }} />
  </div>
);

/** Silhouette du téléphone sur fond sombre : elle se referme en nœud « Site ». */
export const PhoneGhost = ({ rect, glow }: { rect: FrameRect; glow: number }) => (
  <div
    style={{
      position: "absolute",
      left: rect.x,
      top: rect.y,
      width: rect.w,
      height: rect.h,
      borderRadius: rect.r,
      border: `2px solid rgba(80,227,194,${0.35 + glow * 0.65})`,
      background: `rgba(14,28,46,${0.6 + glow * 0.4})`,
      boxShadow: `0 0 ${40 * glow}px rgba(80,227,194,${0.25 * glow})`,
      boxSizing: "border-box",
    }}
  />
);
