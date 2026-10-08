import { Config } from "@remotion/cli/config";

// Les assets de marque viennent du site : public/brand/ est la seule source du logo.
Config.setPublicDir("../public");
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setCodec("h264");
Config.setCrf(16); // master haute qualité ; la compression web est faite par scripts/export.sh
Config.setPixelFormat("yuv420p");
Config.setOverwriteOutput(true);
// Navigateur local optionnel (CI, conteneur sans téléchargement).
if (process.env.REMOTION_BROWSER) Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
