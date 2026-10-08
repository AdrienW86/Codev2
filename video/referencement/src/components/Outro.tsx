import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BrandLogo } from "../../../src/shared/BrandLogo";
import { fonts, palette } from "../../../src/shared/theme";
import { easeOut, progress } from "../../../src/shared/easing";
import { useLayout } from "../lib/context";
import { T } from "../lib/timing";
import { SweepText } from "./Trajectory";

// 18–20 s : la trajectoire s'est resserrée ; le logo officiel puis la signature se posent au-dessus.
export const Outro = () => {
  const frame = useCurrentFrame();
  const { width, outro } = useLayout();
  if (frame < T.outro) return null;
  const logo = progress(frame, T.logo, T.logo + 20, easeOut);
  const url = progress(frame, T.url, T.url + 14, easeOut);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: outro.logo.x - outro.logoSize / 2, top: outro.logo.y - outro.logoSize / 2, opacity: logo, transform: `translateY(${(1 - logo) * 16}px)` }}>
        <BrandLogo variant="onDark" size={outro.logoSize} />
      </div>
      <div style={{ position: "absolute", left: 0, width, top: outro.tagline, display: "flex", justifyContent: "center" }}>
        <SweepText enter={T.tagline} exit={9999} duration={18} style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 60, lineHeight: 1, letterSpacing: "-0.045em", color: palette.white }}>
          Le SEO. <span style={{ color: palette.cyan }}>Un système à construire.</span>
        </SweepText>
      </div>
      <div style={{ position: "absolute", left: 0, width, top: outro.url, textAlign: "center", opacity: url, transform: `translateY(${(1 - url) * 10}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 30, letterSpacing: "-0.01em", color: palette.mist }}>
        code-v.fr
      </div>
    </AbsoluteFill>
  );
};
