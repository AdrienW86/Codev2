import type { AuditResult } from "./audit";

/** Synthèse éditoriale du rapport : aucune statistique de liens ou de position n'est extrapolée. */
export type Insight = {
  id: string;
  category: "seo" | "geo" | "links" | "ux" | "performance";
  title: string;
  status: "good" | "warning" | "unknown";
  evidence: string;
  recommendation: string;
};
export type Action = { id: string; title: string; detail: string; priority: "high" | "medium" | "low"; category: string };

const rules: { id: string; category: Insight["category"]; title: string; checks: string[]; advice: string }[] = [
  { id: "title", category: "seo", title: "Balise Title", checks: ["document-title"], advice: "Rédiger un titre unique, descriptif et pertinent pour la page." },
  { id: "description", category: "seo", title: "Méta description", checks: ["meta-description"], advice: "Présenter clairement le bénéfice pour le visiteur et éviter les descriptions dupliquées." },
  { id: "headings", category: "seo", title: "Hiérarchie des titres", checks: ["heading-order", "h1"], advice: "Conserver un H1 descriptif et une hiérarchie logique des sections." },
  { id: "indexation", category: "seo", title: "Indexation et exploration", checks: ["is-crawlable", "robots-txt"], advice: "Vérifier les directives robots/noindex et l'accessibilité pour les moteurs." },
  { id: "canonical", category: "seo", title: "URL canonique", checks: ["canonical"], advice: "Contrôler la canonical et les éventuelles redirections sur l'URL finale." },
  { id: "links", category: "seo", title: "Libellés des liens", checks: ["link-text"], advice: "Remplacer les libellés vagues par des ancres qui décrivent la destination." },
  { id: "images", category: "seo", title: "Attributs alternatifs des images", checks: ["image-alt"], advice: "Décrire les images utiles et laisser les images décoratives avec alt vide." },
  { id: "structured", category: "geo", title: "Données structurées", checks: ["structured-data"], advice: "Valider le JSON-LD et les informations d'entreprise avec un outil dédié." },
  { id: "mobile", category: "ux", title: "Utilisabilité mobile", checks: ["viewport", "tap-targets"], advice: "Contrôler l'affichage mobile et la taille des zones tactiles." },
  { id: "contrast", category: "ux", title: "Lisibilité et contraste", checks: ["color-contrast"], advice: "Renforcer les contrastes insuffisants et vérifier le rendu réel." },
  { id: "render", category: "performance", title: "Ressources qui bloquent l'affichage", checks: ["render-blocking-resources", "render-blocking-insight"], advice: "Prioriser les ressources critiques et différer les ressources secondaires." },
  { id: "imagespeed", category: "performance", title: "Optimisation du chargement des images", checks: ["uses-optimized-images", "modern-image-formats", "image-delivery-insight"], advice: "Adapter dimensions, formats et priorités des images visibles." },
];

const statusOf = (status: AuditResult["checks"][number]["status"]): Insight["status"] =>
  status === "passed" ? "good" : status === "failed" ? "warning" : "unknown";

export function buildInsights(report: AuditResult): Insight[] {
  const checks = report.checks ?? [];
  const measured = rules.map(rule => {
    const found = rule.checks.map(id => checks.find(c => c.id === id)).filter((v): v is NonNullable<typeof v> => Boolean(v));
    const failures = found.filter(c => c.status === "failed");
    const status = failures.length ? "warning" : found.some(c => c.status === "passed") ? "good" : "unknown";
    const evidence = failures.length
      ? failures.map(c => c.title + (c.display ? " : " + c.display : "")).join(" ; ")
      : status === "good" ? "Contrôle Lighthouse validé sur l'URL analysée."
      : "Non vérifié par ce rapport ; contrôle manuel nécessaire.";
    return { id: rule.id, category: rule.category, title: rule.title, status: status as Insight["status"], evidence, recommendation: rule.advice };
  });
  return [
    ...measured,
    { id: "backlinks", category: "links", title: "Backlinks et domaines référents", status: "unknown", evidence: "PageSpeed Insights ne fournit aucun inventaire de backlinks.", recommendation: "Consulter Google Search Console > Liens ou une source de backlinks dédiée ; ne pas inventer de nombre de liens ni de score d'autorité." },
    { id: "anchors", category: "links", title: "Ancres des liens entrants", status: "unknown", evidence: "Non mesuré par Lighthouse.", recommendation: "Examiner les ancres et les domaines référents dans Search Console avant toute décision de désaveu." },
    { id: "positions", category: "seo", title: "Classements et mots-clés Google", status: "unknown", evidence: "Les impressions et positions ne sont pas disponibles dans cet audit public.", recommendation: "Connecter la propriété Search Console pour analyser les requêtes et pages." },
    { id: "ai", category: "geo", title: "Visibilité dans les réponses des IA", status: "unknown", evidence: "La présence d'un schéma ou d'un fichier llms.txt ne prouve pas une citation par une IA.", recommendation: "Vérifier la visibilité sur un panel de requêtes pertinent avec une méthode et des sources explicites." },
  ];
}

export function buildActionPlan(report: AuditResult): Action[] {
  const failed = (report.checks ?? []).filter(c => c.status === "failed");
  const actions: Action[] = [];
  const seen = new Set<string>();
  for (const check of failed) {
    if (seen.has(check.id)) continue;
    seen.add(check.id);
    const criticalSeo = check.category === "seo" && /crawlable|robots|document-title|meta-description|canonical/i.test(check.id);
    actions.push({
      id: check.id,
      title: check.title,
      detail: check.description.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").slice(0, 300),
      priority: criticalSeo ? "high" : check.category === "seo" || check.category === "accessibility" ? "medium" : "low",
      category: check.category,
    });
  }
  for (const item of report.opportunities) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    actions.push({
      id: item.id, title: item.title,
      detail: [item.description, item.savingsMs !== null ? "Gain Lighthouse estimé : " + Math.round(item.savingsMs) + " ms." : ""].filter(Boolean).join(" "),
      priority: item.savingsMs !== null && item.savingsMs >= 500 ? "high" : item.savingsMs !== null && item.savingsMs >= 150 ? "medium" : "low",
      category: "performance",
    });
  }
  for (const finding of report.crawl?.issues ?? []) {
    if (finding.code === "fetch") continue;
    const key = "crawl:" + finding.code + ":" + finding.url;
    if (seen.has(key)) continue;
    seen.add(key);
    actions.push({
      id: key,
      title: finding.message,
      detail: "Page concernée : " + finding.url + ". Vérifier la cause, puis relancer l'exploration SEO.",
      priority: finding.severity,
      category: "seo",
    });
  }
  const rank = { high: 0, medium: 1, low: 2 };
  return actions.sort((a,b) => rank[a.priority] - rank[b.priority]).slice(0, 12);
}
