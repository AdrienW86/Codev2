// Mise en page 16:9 du film /referencement. Toutes les coordonnées vivent ici :
// une déclinaison 9:16 fournira un autre objet Layout, la chronologie et les composants restent communs.
export type Point = { x: number; y: number };
export type PageId = "home" | "services" | "realisations" | "ressources" | "creation" | "seo" | "etude" | "guide" | "archive";

export type PageDef = {
  id: PageId;
  label: string;
  path: string;
  parent?: PageId;
  scatter: Point & { s: number };
  tree: Point;
  indexed: boolean;
};

export type IndexRow = { id: string; page?: PageId; slot: number; match?: { start: number; end: number; relevance: number } };

export type Layout = {
  width: number;
  height: number;
  card: { w: number; h: number };
  pages: PageDef[];
  mesh: [PageId, PageId][];
  /** Nom du site, visible tant que ses pages sont dispersées. */
  siteLabel: Point;
  /** Arborescence décalée quand l'index apparaît (origine, translation, échelle). */
  treeShift: { origin: Point; dx: number; dy: number; scale: number };
  index: { x: number; top: number; width: number; rowH: number; gap: number };
  rows: IndexRow[];
  results: { top: number; rowH: number; gap: number };
  query: { x: number; y: number; width: number };
  pageView: { x: number; y: number; w: number; h: number };
  rail: { x0: number; x1: number; y: number };
  chapter: { y: number; size: number };
  outro: { logo: Point; logoSize: number; tagline: number; rule: number; url: number };
};

const W = 1920;
const H = 1080;

export const LANDSCAPE: Layout = {
  width: W,
  height: H,
  card: { w: 176, h: 108 },
  pages: [
    { id: "home", label: "Accueil", path: "/", scatter: { x: 1010, y: 300, s: 0.6 }, tree: { x: 960, y: 196 }, indexed: true },
    { id: "services", label: "Services", path: "/services", parent: "home", scatter: { x: 720, y: 470, s: 0.55 }, tree: { x: 560, y: 400 }, indexed: true },
    { id: "realisations", label: "Réalisations", path: "/realisations", parent: "home", scatter: { x: 1230, y: 520, s: 0.5 }, tree: { x: 960, y: 400 }, indexed: true },
    { id: "ressources", label: "Ressources", path: "/ressources", parent: "home", scatter: { x: 860, y: 640, s: 0.52 }, tree: { x: 1360, y: 400 }, indexed: true },
    { id: "creation", label: "Création de site", path: "/creation-site", parent: "services", scatter: { x: 1120, y: 410, s: 0.5 }, tree: { x: 440, y: 612 }, indexed: true },
    { id: "seo", label: "Référencement", path: "/referencement", parent: "services", scatter: { x: 640, y: 330, s: 0.48 }, tree: { x: 680, y: 612 }, indexed: true },
    { id: "etude", label: "Étude de cas", path: "/etude-de-cas", parent: "realisations", scatter: { x: 1040, y: 690, s: 0.5 }, tree: { x: 960, y: 612 }, indexed: true },
    { id: "guide", label: "Guide", path: "/guide", parent: "ressources", scatter: { x: 1300, y: 340, s: 0.46 }, tree: { x: 1240, y: 612 }, indexed: true },
    { id: "archive", label: "Archive", path: "/archive", parent: "ressources", scatter: { x: 760, y: 610, s: 0.44 }, tree: { x: 1480, y: 612 }, indexed: false },
  ],
  mesh: [["creation", "etude"], ["seo", "guide"]],
  siteLabel: { x: 960, y: 520 },
  treeShift: { origin: { x: 960, y: 404 }, dx: -340, dy: 26, scale: 0.78 },
  index: { x: 1236, top: 262, width: 520, rowH: 28, gap: 8 },
  // Ordre de l'index : nos pages s'intercalent parmi celles d'autres sites (rangs sans texte).
  // match : rang dans les résultats avant et après la remontée, et pertinence relative (0–1).
  rows: [
    { id: "o1", slot: 0, match: { start: 0, end: 0, relevance: 0.92 } },
    { id: "home", page: "home", slot: 1 },
    { id: "o2", slot: 2 },
    { id: "services", page: "services", slot: 3 },
    { id: "creation", page: "creation", slot: 4, match: { start: 4, end: 1, relevance: 0.86 } },
    { id: "o3", slot: 5, match: { start: 1, end: 2, relevance: 0.7 } },
    { id: "seo", page: "seo", slot: 6 },
    { id: "o4", slot: 7, match: { start: 2, end: 3, relevance: 0.6 } },
    { id: "realisations", page: "realisations", slot: 8 },
    { id: "o5", slot: 9, match: { start: 3, end: 4, relevance: 0.48 } },
    { id: "etude", page: "etude", slot: 10 },
    { id: "ressources", page: "ressources", slot: 11 },
    { id: "o6", slot: 12, match: { start: 5, end: 5, relevance: 0.36 } },
    { id: "guide", page: "guide", slot: 13 },
  ],
  results: { top: 262, rowH: 72, gap: 14 },
  query: { x: 1236, y: 92, width: 520 },
  pageView: { x: 960, y: 450, w: 1100, h: 620 },
  rail: { x0: 160, x1: 1760, y: 1000 },
  chapter: { y: 872, size: 80 },
  outro: { logo: { x: 960, y: 400 }, logoSize: 300, tagline: 612, rule: 732, url: 764 },
};

export const pageById = (layout: Layout, id: PageId) => layout.pages.find(p => p.id === id)!;

/** Position d'une page dans l'arborescence, décalée de `shift` (0 → 1). */
export const treePoint = (layout: Layout, p: Point, shift: number): Point => {
  const { origin, dx, dy, scale } = layout.treeShift;
  const s = 1 + (scale - 1) * shift;
  return { x: origin.x + (p.x - origin.x) * s + dx * shift, y: origin.y + (p.y - origin.y) * s + dy * shift };
};

/** Tracé « arborescence » parent → enfant : descente, palier, descente. */
export const treeEdge = (layout: Layout, from: Point, to: Point): Point[] => {
  const h = layout.card.h / 2;
  const mid = (from.y + h + to.y - h) / 2;
  return [{ x: from.x, y: from.y + h }, { x: from.x, y: mid }, { x: to.x, y: mid }, { x: to.x, y: to.y - h }];
};

/** Lien de maillage entre deux pages d'un même niveau : courbe passant sous les cartes. */
export const meshEdge = (layout: Layout, a: Point, b: Point): Point[] => {
  const y = a.y + layout.card.h / 2;
  const depth = 46 + Math.abs(b.x - a.x) * 0.08;
  const pts: Point[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const x = a.x + (b.x - a.x) * t;
    pts.push({ x, y: y + Math.sin(Math.PI * t) * depth });
  }
  return pts;
};

export const railX = (layout: Layout, i: number) => layout.rail.x0 + ((layout.rail.x1 - layout.rail.x0) * i) / 7;
