import { interpolate, useCurrentFrame } from "remotion";
import { fonts, palette } from "../../../src/shared/theme";
import { clamp, easeOut, progress } from "../lib/easing";
import { FORM_SHEET, STICKY_CTA, mixRect } from "../lib/layout";
import { T } from "../lib/timing";
import { Icon } from "./Icons";

const Field = ({ label, height, fill, lines, focus }: { label: string; height: number; fill: number; lines: number; focus: number }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <span style={{ fontFamily: fonts.body, fontWeight: 500, fontSize: 15, color: palette.muted }}>{label}</span>
    <div style={{ height, borderRadius: 12, border: `1.5px solid ${focus > 0 ? `rgba(79,140,255,${0.4 + focus * 0.6})` : palette.border}`, background: palette.background, padding: "14px 14px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10 }}>
      {Array.from({ length: lines }, (_, i) => {
        const p = interpolate(fill * lines - i, [0, 1], [0, 1], clamp);
        return <span key={i} style={{ width: `${(i === lines - 1 ? 58 : 88) * p}%`, height: 9, borderRadius: 5, background: palette.text, opacity: 0.85 }} />;
      })}
    </div>
  </div>
);

/** Le CTA s'ouvre en formulaire court, se remplit, puis la demande part. */
export const FormInteraction = ({ offset }: { offset: { x: number; y: number } }) => {
  const frame = useCurrentFrame();
  if (frame < T.formIn || frame > T.dark + 30) return null;
  const open = progress(frame, T.formIn, T.formIn + 16);
  const rect = mixRect({ ...STICKY_CTA }, FORM_SHEET, open);
  const content = progress(frame, T.formIn + 8, T.formIn + 20, easeOut);
  const name = progress(frame, T.fieldName + 2, T.fieldName + 12);
  const need = progress(frame, T.fieldNeed + 2, T.fieldNeed + 18);
  const press = interpolate(frame, [T.submit - 2, T.submit + 2, T.submit + 6], [1, 0.95, 1], clamp);
  const sent = progress(frame, T.sent, T.sent + 8, easeOut);
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x - offset.x,
        top: rect.y - offset.y,
        width: rect.w,
        height: rect.h,
        borderRadius: rect.r,
        background: open < 0.3 ? palette.blue : palette.white,
        boxShadow: `0 -18px 50px rgba(7,17,31,${0.18 * open})`,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: "22px 18px 18px", display: "flex", flexDirection: "column", gap: 18, opacity: content }}>
        <div style={{ width: 44, height: 4, borderRadius: 2, background: palette.border, alignSelf: "center", marginTop: -8 }} />
        <span style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 25, letterSpacing: "-0.03em", color: palette.text }}>Votre projet</span>
        <Field label="Nom" height={44} fill={name} lines={1} focus={progress(frame, T.fieldName - 4, T.fieldName) - progress(frame, T.fieldNeed - 4, T.fieldNeed)} />
        <Field label="Votre besoin" height={112} fill={need} lines={3} focus={progress(frame, T.fieldNeed - 4, T.fieldNeed) - progress(frame, T.submit - 6, T.submit - 2)} />
        <div style={{ marginTop: "auto", height: 48, borderRadius: 24, background: sent > 0 ? palette.cyan : palette.blue, transform: `scale(${press})`, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: fonts.body, fontWeight: 500, fontSize: 16, color: sent > 0 ? palette.dark : palette.white }}>
          {sent > 0 ? <><Icon name="check" size={20} color={palette.dark} /> Demande envoyée</> : "Envoyer la demande"}
        </div>
      </div>
    </div>
  );
};
