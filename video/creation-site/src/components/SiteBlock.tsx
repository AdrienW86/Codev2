import { fonts, palette } from "../../../src/shared/theme";
import type { BlockId, Box } from "../lib/layout";

type Props = { id: BlockId; box: Box; detail: number; mobile: number; offset: { x: number; y: number }; glow?: number; highlight?: number };

const line = (width: string, height: number, color: string, extra?: React.CSSProperties): React.CSSProperties => ({ width, height, borderRadius: height / 2, background: color, ...extra });

/**
 * Un bloc de l'interface fictive « votre-entreprise.fr » (jamais le site CODE-V).
 * `detail` révèle le contenu interne quand le bloc trouve sa place dans la grille.
 */
export const SiteBlock = ({ id, box, detail, mobile, offset, glow = 0, highlight = 0 }: Props) => {
  const card = id.startsWith("svc");
  const bare = id === "navLogo" || id === "navLinks";
  return (
    <div
      style={{
        position: "absolute",
        left: box.x - offset.x,
        top: box.y - offset.y,
        width: box.w,
        height: box.h,
        borderRadius: box.r,
        background: bare ? `color-mix(in srgb, ${box.fill} ${(1 - detail) * 100}%, transparent)` : box.fill,
        opacity: box.op,
        transform: `rotate(${box.rot}deg)`,
        boxSizing: "border-box",
        border: card ? `1px solid color-mix(in srgb, ${palette.border} ${detail * 100}%, transparent)` : undefined,
        boxShadow: [
          card ? `0 ${12 * detail}px ${28 * detail}px rgba(34,64,101,${0.07 * detail})` : "",
          glow ? `0 0 0 ${10 * glow}px rgba(80,227,194,${0.28 * glow}), 0 ${14 * glow}px ${34 * glow}px rgba(79,140,255,${0.4 * glow})` : "",
          highlight ? `0 0 0 3px rgba(80,227,194,${highlight})` : "",
        ].filter(Boolean).join(", ") || undefined,
        overflow: id === "visual" ? "hidden" : "visible",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: detail }}>{inner(id, box, mobile)}</div>
      {highlight > 0 && (
        <div style={{ position: "absolute", right: -12, top: -12, width: 30, height: 30, borderRadius: 15, background: palette.cyan, transform: `scale(${highlight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={palette.dark} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
        </div>
      )}
    </div>
  );
};

const inner = (id: BlockId, box: Box, mobile: number) => {
  switch (id) {
    case "navLogo":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: box.h * 0.3, height: "100%" }}>
          <span style={{ width: box.h, height: box.h, borderRadius: box.h / 2, background: palette.blue, flexShrink: 0 }} />
          <span style={line(`${box.w - box.h * 1.3}px`, box.h * 0.42, palette.text)} />
        </div>
      );
    case "navLinks":
      return mobile > 0.5 ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          {[0, 1, 2].map(i => <span key={i} style={line("100%", 2.4, palette.text)} />)}
        </div>
      ) : (
        <div style={{ display: "flex", gap: box.w * 0.07, height: "100%" }}>
          {[0, 1, 2, 3].map(i => <span key={i} style={line("100%", box.h, palette.wire)} />)}
        </div>
      );
    case "navCta":
      return <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.body, fontWeight: 500, fontSize: box.h * 0.42, color: palette.white, whiteSpace: "nowrap" }}>Contact</div>;
    case "cta":
      return (
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: fonts.body, fontWeight: 500, fontSize: box.h * 0.33, color: palette.white, whiteSpace: "nowrap" }}>
          Parler de votre projet <span style={{ color: palette.white, opacity: 0.8 }}>↗</span>
        </div>
      );
    case "visual":
      return (
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${palette.blue} 0%, ${palette.blueDeep} 45%, ${palette.cyan} 140%)` }}>
          <div style={{ position: "absolute", width: box.h * 1.4, height: box.h * 1.4, right: -box.h * 0.35, bottom: -box.h * 0.75, borderRadius: "50%", border: "2px solid rgba(255,255,255,.35)", boxShadow: "0 0 0 34px rgba(255,255,255,.06)" }} />
          <div style={{ position: "absolute", left: box.h * 0.16, bottom: box.h * 0.16, width: box.w * 0.34, height: box.h * 0.2, borderRadius: box.h * 0.1, background: "rgba(255,255,255,.9)" }} />
        </div>
      );
    case "svc1":
    case "svc2":
    case "svc3": {
      const pad = Math.min(18, box.h * 0.16);
      const icon = Math.min(34, box.h * 0.28);
      return (
        <div style={{ position: "absolute", inset: pad, display: "flex", flexDirection: mobile > 0.5 ? "row" : "column", alignItems: mobile > 0.5 ? "center" : "flex-start", justifyContent: "space-between", gap: 12 }}>
          <span style={{ width: icon, height: icon, borderRadius: icon / 2, background: "#e6efff", border: `2px solid ${palette.blue}`, boxSizing: "border-box", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: mobile > 0.5 ? "70%" : "100%" }}>
            <span style={line("72%", Math.max(8, box.h * 0.085), palette.text)} />
            <span style={line("90%", 7, palette.border)} />
            <span style={line("60%", 7, palette.border)} />
          </div>
        </div>
      );
    }
    case "proof": {
      const narrow = box.w < 500;
      const thumb = narrow ? 42 : Math.min(58, box.h * 0.58);
      return (
        <>
          <span style={{ position: "absolute", left: 18, top: narrow ? 4 : box.h / 2 - 34, fontFamily: fonts.display, fontWeight: 700, fontSize: 56, color: palette.blue, lineHeight: 1 }}>“</span>
          <div style={{ position: "absolute", left: 60, top: narrow ? 22 : box.h / 2 - 12, width: narrow ? "68%" : "46%", display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={line("100%", 9, palette.text)} />
            <span style={line("70%", 8, palette.wire)} />
          </div>
          <div style={{ position: "absolute", display: "flex", gap: 8, ...(narrow ? { left: 18, bottom: 16 } : { right: 20, top: box.h / 2 - thumb / 2 }) }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: thumb * 1.3, height: thumb, borderRadius: 8, background: i === 1 ? "#cfe0ff" : "#dfe9f7" }} />)}
          </div>
        </>
      );
    }
    default:
      return null;
  }
};
