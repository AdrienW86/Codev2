import { Composition } from "remotion";
import { formats } from "../../src/shared/formats";
import { CreationSiteFilm } from "./CreationSiteFilm";
import { FILM } from "./lib/timing";

// 16:9 aujourd'hui. Pour le 9:16 ou le 1:1 : ajouter les états de lib/layout.ts
// pour ce ratio puis une Composition avec formats.portrait / formats.square.
export const CreationSiteCompositions = () => (
  <Composition id="CreationSite" component={CreationSiteFilm} {...formats.landscape} fps={FILM.fps} durationInFrames={FILM.durationInFrames} />
);
