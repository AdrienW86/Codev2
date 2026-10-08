// Tokens de src/app/globals.css : les films restent alignés sur le site.
export const palette = {
  background: "#f7f9fc",
  dark: "#07111f",
  darkSoft: "#0e1c2e",
  text: "#122033",
  muted: "#64748b",
  blue: "#4f8cff",
  blueDeep: "#356ee0",
  cyan: "#50e3c2",
  white: "#ffffff",
  border: "#dfe7f1",
  // Dérivés utilisés sur le site (textes secondaires sur fond sombre, filets).
  mist: "#c4cfdd",
  line: "#33465e",
  wire: "#cfd9e6",
} as const;

export const fonts = {
  display: '"Space Grotesk", sans-serif',
  body: '"DM Sans", Arial, sans-serif',
} as const;

// Logos officiels servis depuis public/brand/ (publicDir = ../public).
export const brandAssets = {
  logoOnLight: "brand/code-v-logo-dark.svg",
  logoOnDark: "brand/code-v-logo-white.svg",
} as const;
