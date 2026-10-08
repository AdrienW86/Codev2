import { interpolate, useCurrentFrame } from "remotion";
import { clamp, easeInOut, progress } from "../lib/easing";
import { BLOCKS, CHAOS, DESKTOP, DESKTOP_FRAME, DESKTOP_SCREEN, FULL, MOBILE, MOBILE_SCROLL, PHONE_FRAME, PHONE_SCREEN, STICKY_CTA, mixBox, mixRect, type BlockId, type Box } from "../lib/layout";
import { T } from "../lib/timing";
import { BrowserFrame } from "./BrowserFrame";
import { FormInteraction } from "./FormInteraction";
import { MobileFrame } from "./MobileFrame";
import { SiteBlock } from "./SiteBlock";

// Ordre d'arrivée dans la grille : navigation, promesse, action, offre, preuve.
const ORDER: Record<BlockId, number> = { navLogo: 0, navLinks: 1, navCta: 2, title1: 3, title2: 4, text1: 5, text2: 6, cta: 7, visual: 6, svc1: 9, svc2: 10, svc3: 11, proof: 12 };

/** Position d'un bloc à une frame donnée : désordre → grille desktop → mobile → défilement. */
export const blockAt = (id: BlockId, frame: number): { box: Box; detail: number; mobile: number } => {
  const i = ORDER[id];
  const drift = 1 - progress(frame, T.structure, T.structure + 30);
  const chaos = CHAOS[id];
  const floating: Box = { ...chaos, x: chaos.x + Math.sin(frame / 28 + i * 1.7) * 10 * drift, y: chaos.y + Math.cos(frame / 34 + i) * 8 * drift, rot: chaos.rot + Math.sin(frame / 40 + i) * 1.2 * drift };
  const s = progress(frame, T.structure + i * 4, T.structure + i * 4 + 46);
  const m = progress(frame, T.mobile + i * 2, T.mobile + i * 2 + 36);
  let box = mixBox(mixBox(floating, DESKTOP[id], s), MOBILE[id], m);
  const scroll = progress(frame, T.scroll, T.scrollDone, easeInOut);
  if (id === "cta") box = mixBox(box, STICKY_CTA, progress(frame, T.scroll + 4, T.scrollDone - 6));
  else box = { ...box, y: box.y - scroll * MOBILE_SCROLL };
  const detail = progress(frame, T.structure + i * 4 + 24, T.structure + i * 4 + 52);
  return { box, detail, mobile: m };
};

/** Le site fictif qui évolue du début à la demande : une seule interface, aucune coupe. */
export const LivingSite = ({ underlay }: { underlay?: React.ReactNode }) => {
  const frame = useCurrentFrame();
  const framed = progress(frame, T.structure + 22, T.structureDone - 10);
  const mobile = progress(frame, T.mobile, T.mobile + 44);
  const frameRect = mixRect(DESKTOP_FRAME, PHONE_FRAME, mobile);
  const screen = mixRect(mixRect(FULL, DESKTOP_SCREEN, framed), PHONE_SCREEN, mobile);
  const ctaGlow = interpolate(frame, [T.ctaFocus, T.ctaFocus + 8, T.tap - 2, T.tap + 4], [0, 1, 0.75, 0], clamp) * (0.85 + 0.15 * Math.sin(frame / 3));
  const proofLight = interpolate(frame, [T.proof, T.proof + 8, T.ctaFocus + 6, T.ctaFocus + 14], [0, 1, 1, 0], clamp);
  const scrim = progress(frame, T.formIn, T.formIn + 14);
  if (frame > T.dark + 40) return null;
  return (
    <>
      <BrowserFrame rect={frameRect} appear={framed} mobile={mobile} />
      {underlay}
      <div style={{ position: "absolute", left: screen.x, top: screen.y, width: screen.w, height: screen.h, borderRadius: screen.r, overflow: "hidden" }}>
        {BLOCKS.map(id => {
          const { box, detail, mobile: m } = blockAt(id, frame);
          return (
            <SiteBlock key={id} id={id} box={box} detail={detail} mobile={m} offset={{ x: screen.x, y: screen.y }}
              glow={id === "cta" ? ctaGlow : 0} highlight={id === "proof" ? proofLight : 0} />
          );
        })}
        <div style={{ position: "absolute", inset: 0, background: `rgba(7,17,31,${0.32 * scrim})` }} />
        <FormInteraction offset={{ x: screen.x, y: screen.y }} />
      </div>
      <MobileFrame rect={frameRect} mobile={mobile} />
    </>
  );
};
