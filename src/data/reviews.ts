export type ReviewCategory = "web" | "seo" | "ads" | "maintenance" | "strategy";
export type Review = {
  readonly id: string;
  readonly author: string;
  readonly rating: number;
  readonly text: string;
  readonly source: "Google";
  /** Month of visit supplied by the user; not a publication date. */
  readonly visitedAt?: string;
  readonly category: readonly ReviewCategory[];
  readonly featured?: boolean;
};

// Exact testimonials supplied by the user. No inferred client/project association.
export const reviews: readonly Review[] = [
  { id: "gaston-barreau", author: "Gaston Barreau", rating: 5, text: "Notre nouveau site est facile à utiliser et très esthétique. Merci pour le travail accompli !", source: "Google", visitedAt: "2025-06", category: ["web"], featured: true },
  { id: "jeremie-lagrange", author: "Jérémie Lagrange", rating: 5, text: "L’équipe a livré un site magnifique, responsive, dans les délais et le budget prévu!! Merci..", source: "Google", visitedAt: "2025-06", category: ["web"] },
  { id: "pierre-louis", author: "Pierre Louis", rating: 5, text: "Excellentes compétences techniques et support convivial. Nous retravaillerons avec eux sans hésiter.", source: "Google", visitedAt: "2025-06", category: ["web", "maintenance"] },
  { id: "rene-riviere", author: "René Rivière", rating: 5, text: "Service complet : site, communication et suivi client.", source: "Google", visitedAt: "2025-07", category: ["web", "strategy"] },
  { id: "andre-picard", author: "André Picard", rating: 5, text: "Le suivi après mise en ligne est vraiment appréciable...", source: "Google", visitedAt: "2025-07", category: ["maintenance"] },
  { id: "olivier-garnier", author: "Olivier Garnier", rating: 5, text: "Gestion de nos pubs Google Ads efficace et rentable.", source: "Google", visitedAt: "2025-07", category: ["ads"] },
  { id: "stephane-sivan", author: "Stéphane Sivan", rating: 5, text: "Résultat professionnel, site rapide et bien référencé.", source: "Google", visitedAt: "2025-07", category: ["web", "seo"] },
  { id: "philippe-voisin", author: "Philippe Voisin", rating: 5, text: "Équipe créative, à l’écoute et force de proposition.", source: "Google", visitedAt: "2025-07", category: ["strategy"] },
];

export function getReviewsByIds(ids: readonly string[]): Review[] {
  return ids.flatMap(id => { const review = reviews.find(item => item.id === id); return review ? [review] : []; });
}
export function getReviewsByCategory(category: ReviewCategory): Review[] {
  return reviews.filter(review => review.category.includes(category));
}
