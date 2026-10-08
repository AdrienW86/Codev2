import { fonts, palette } from "../../../src/shared/theme";
import type { FrameRect } from "../lib/layout";

/**
 * Cadre d'appareil unique : il se dessine autour de la grille (desktop) puis se
 * resserre en téléphone. `mobile` (0 → 1) pilote la morphose ; aucune coupe.
 */
export const BrowserFrame = ({ rect, appear, mobile }: { rect: FrameRect; appear: number; mobile: number }) => {
  const bar = 1 - mobile;
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        borderRadius: rect.r,
        background: palette.white,
        opacity: appear,
        border: `${1.5 + mobile * 6}px solid ${mobile > 0.02 ? `rgba(18,32,51,${0.08 + mobile * 0.9})` : palette.wire}`,
        boxShadow: `0 ${40 * appear}px ${110 * appear}px rgba(34,64,101,${0.14 * appear})`,
        boxSizing: "border-box",
      }}
    >
      {/* Barre d'adresse sobre, sans pastilles de système d'exploitation. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44 * bar, borderBottom: bar > 0.05 ? `1px solid ${palette.border}` : "none", opacity: bar, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 300, height: 26, borderRadius: 13, background: palette.background, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: fonts.body, fontSize: 14, color: palette.muted }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: palette.cyan, display: "inline-block" }} />
          votre-entreprise.fr
        </div>
      </div>
    </div>
  );
};
