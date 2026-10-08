// Rend les frames de contrôle dans out/referencement/stills/ (inspection visuelle).
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const frames = process.argv.slice(2).map(Number);
const list = frames.length ? frames : [60, 150, 270, 390, 510, 570];
mkdirSync("out/referencement/stills", { recursive: true });
for (const frame of list) {
  execFileSync("npx", ["remotion", "still", "src/index.ts", "Referencement", `out/referencement/stills/f${String(frame).padStart(3, "0")}.png`, `--frame=${frame}`, "--log=error"], { stdio: "inherit" });
}
