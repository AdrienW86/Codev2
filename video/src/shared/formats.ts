// Déclinaisons prévues. Seul le 16:9 est composé aujourd'hui ; un film ajoute
// un format en fournissant sa propre mise en page pour ce ratio.
export type FilmFormat = "landscape" | "portrait" | "square";

export const formats: Record<FilmFormat, { width: number; height: number }> = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
};

export const FPS = 30;
