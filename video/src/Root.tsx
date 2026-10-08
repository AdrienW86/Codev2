import "./shared/fonts";
import { CreationSiteCompositions } from "../creation-site/src/Root";

// Point d'entrée unique : chaque film enregistre ses compositions ici.
export const RemotionRoot = () => (
  <>
    <CreationSiteCompositions />
  </>
);
