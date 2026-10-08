import { Composition } from "remotion";
import { formats } from "../../src/shared/formats";
import { LANDSCAPE } from "./lib/layout";
import { FILM } from "./lib/timing";
import { SeoFilm } from "./SeoFilm";

// 16:9 aujourd'hui. Pour le 9:16 : ajouter un objet Layout PORTRAIT dans lib/layout.ts
// (mêmes éléments, autres coordonnées) puis une Composition avec formats.portrait.
export const ReferencementCompositions = () => (
  <Composition id="Referencement" component={SeoFilm} {...formats.landscape} fps={FILM.fps} durationInFrames={FILM.durationInFrames} defaultProps={{ layout: LANDSCAPE }} />
);
