import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import { continueRender, delayRender } from "remotion";

// Polices embarquées (aucun appel réseau) ; le rendu attend leur chargement.
const handle = delayRender("Chargement des polices CODE-V");
Promise.all([
  document.fonts.load('500 40px "Space Grotesk"'),
  document.fonts.load('700 40px "Space Grotesk"'),
  document.fonts.load('400 20px "DM Sans"'),
  document.fonts.load('500 20px "DM Sans"'),
  document.fonts.load('700 20px "DM Sans"'),
]).then(() => continueRender(handle), () => continueRender(handle));
