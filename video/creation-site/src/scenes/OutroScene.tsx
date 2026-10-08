import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BrandLogo } from "../../../src/shared/BrandLogo";
import { fonts, palette } from "../../../src/shared/theme";
import { MaskedLine } from "../components/MotionText";
import { easeOut, progress } from "../lib/easing";
import { CENTER } from "../lib/layout";
import { T } from "../lib/timing";

const LOGO = 420;

// 18–20 s : tout converge vers le logo officiel CODE-V, puis la signature.
export const OutroScene = () => {
  const frame = useCurrentFrame();
  if (frame < T.outro) return null;
  const pulse = progress(frame, T.logo - 8, T.logo + 26, easeOut);
  const logo = progress(frame, T.logo, T.logo + 22, easeOut);
  const url = progress(frame, T.url, T.url + 16, easeOut);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: CENTER.x - LOGO / 2, top: CENTER.y - LOGO / 2 - 30, opacity: logo, transform: `scale(${0.9 + logo * 0.1})` }}>
        <BrandLogo variant="onDark" size={LOGO} />
      </div>
      {pulse > 0 && pulse < 1 && (
        <div style={{ position: "absolute", left: CENTER.x - 40 - 520 * pulse, top: CENTER.y - 40 - 520 * pulse, width: 80 + 1040 * pulse, height: 80 + 1040 * pulse, borderRadius: "50%", border: `2px solid rgba(80,227,194,${0.6 * (1 - pulse)})` }} />
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 58, letterSpacing: "-0.045em", color: palette.white }}>
          <MaskedLine enter={T.tagline} exit={9999}>Des sites pensés pour agir.</MaskedLine>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: url, transform: `translateY(${(1 - url) * 14}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 32, letterSpacing: "-0.01em", color: palette.mist }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: palette.cyan, display: "inline-block" }} />
          code-v.fr
        </div>
      </div>
    </AbsoluteFill>
  );
};
