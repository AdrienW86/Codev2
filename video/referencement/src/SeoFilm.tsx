import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { clamp } from "../../src/shared/easing";
import { palette } from "../../src/shared/theme";
import { IndexPanel } from "./components/IndexPanel";
import { Outro } from "./components/Outro";
import { SearchSpace } from "./components/SearchSpace";
import { SiteGraph } from "./components/SiteGraph";
import { Trajectory } from "./components/Trajectory";
import { Visit } from "./components/Visit";
import { LayoutContext } from "./lib/context";
import type { Layout } from "./lib/layout";
import { T } from "./lib/timing";

/**
 * « Le SEO. Un système à construire. »
 * Un site presque invisible dans un grand espace de recherche se structure, est exploré,
 * indexé, relié à une requête pertinente, puis reçoit une visite sur la bonne page.
 * Langage : index, arborescence, recherche, trajectoire. Aucune interface de moteur réelle.
 */
export const SeoFilm = ({ layout }: { layout: Layout }) => {
  const frame = useCurrentFrame();
  // Très légère poussée de caméra sur le monde (le texte reste fixe).
  const push = interpolate(frame, [0, 540], [1, 1.03], clamp);
  return (
    <LayoutContext.Provider value={layout}>
      {/* Ouverture et fermeture sur le même fond uni : le raccord de boucle est invisible. */}
      <AbsoluteFill style={{ background: palette.dark }} />
      <AbsoluteFill style={{ opacity: interpolate(frame, [0, 8, T.loopFade, 599], [0, 1, 1, 0], clamp) }}>
        <SearchSpace />
        <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "50% 42%" }}>
          <SiteGraph />
          <IndexPanel />
          <Visit />
        </AbsoluteFill>
        <Trajectory />
        <Outro />
      </AbsoluteFill>
    </LayoutContext.Provider>
  );
};
