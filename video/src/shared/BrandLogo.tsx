import { Img, staticFile } from "remotion";
import { brandAssets } from "./theme";

// Le logo est toujours le fichier officiel de public/brand/, jamais recomposé.
export const BrandLogo = ({ variant, size, style }: { variant: "onLight" | "onDark"; size: number; style?: React.CSSProperties }) => (
  <Img
    src={staticFile(variant === "onDark" ? brandAssets.logoOnDark : brandAssets.logoOnLight)}
    width={size}
    height={size}
    style={{ display: "block", ...style }}
  />
);
