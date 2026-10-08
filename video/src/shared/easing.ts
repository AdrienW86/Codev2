import { Easing, interpolate } from "remotion";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Courbes CODE-V : sorties franches, arrivées amorties, jamais de rebond gadget.
export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.55, 0, 1, 0.45);

/** Progression 0 → 1 entre deux frames, avec easing. */
export const progress = (frame: number, from: number, to: number, easing = easeInOut) =>
  interpolate(frame, [from, to], [0, 1], { ...clamp, easing });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Fenêtre d'apparition / disparition (0 → 1 → 0). */
export const windowed = (frame: number, inFrom: number, inTo: number, outFrom: number, outTo: number) =>
  Math.min(progress(frame, inFrom, inTo, easeOut), 1 - progress(frame, outFrom, outTo, easeIn));
