import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette } from "../../src/shared/theme";
import { LivingSite } from "./components/LivingSite";
import { WordColumn } from "./components/MotionText";
import { clamp } from "./lib/easing";
import { ConnectedScene } from "./scenes/ConnectedScene";
import { ConversionScene } from "./scenes/ConversionScene";
import { OutroScene } from "./scenes/OutroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { StructureScene } from "./scenes/StructureScene";
import { VisibilityScene } from "./scenes/VisibilityScene";

/**
 * « Un bon site transforme une présence digitale en véritable outil commercial. »
 * Un seul plan continu : l'interface (LivingSite) traverse tout le film ; les scènes
 * ajoutent leurs couches au-dessus selon la chronologie de lib/timing.ts.
 */
export const CreationSiteFilm = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 8], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: palette.background }}>
      <AbsoluteFill style={{ opacity: fadeIn }}>
        <LivingSite underlay={<StructureScene />} />
        <VisibilityScene />
        <ConversionScene />
        <ProblemScene />
        <WordColumn />
        <ConnectedScene />
        <OutroScene />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
