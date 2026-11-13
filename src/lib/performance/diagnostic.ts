import type { AuditResult } from "./audit";

/** Diagnostic issu exclusivement des indicateurs PageSpeed. Aucune valeur commerciale n'est inférée. */
export type PerformancePriority = "haute" | "moyenne" | "faible";
export type PerformanceRecommendation = {
  id: string;
  priority: PerformancePriority;
  finding: string;
  evidence: string;
  explanation: string;
  action: string;
  service: { label: string; href: string; contactHref: string };
};
export type PerformanceDiagnostic = {
  summary: string;
  strengths: string[];
  recommendations: PerformanceRecommendation[];
  primaryService: { label: string; href: string; contactHref: string } | null;
  methodology: string[];
};

const solutions = {
  web: { label: "Optimisation et refonte de site", href: "/creation-site", contactHref: "/contact?service=website" },
  maintenance: { label: "Maintenance et optimisation technique", href: "/maintenance-site", contactHref: "/contact?service=website-care" },
  seo: { label: "Référencement naturel et SEO", href: "/referencement", contactHref: "/contact?service=seo" },
  ux: { label: "Expérience utilisateur et conversion", href: "/solutions/web-applications", contactHref: "/contact?service=ux-conversion" },
} as const;

const rank: Record<PerformancePriority, number> = { haute: 0, moyenne: 1, faible: 2 };
type Service = (typeof solutions)[keyof typeof solutions];
type Item = PerformanceRecommendation;
type Rule = { matches: RegExp; explanation: string; action: string; service: Service };
const rules: Rule[] = [
  { matches: /image|modern-image|uses-optimized-images|offscreen|responsive-image/i, explanation: "Des images peuvent retarder l'affichage de la page.", action: "Vérifier les formats, dimensions, compressions et chargements différés des images signalées.", service: solutions.web },
  { matches: /unused-javascript|legacy-javascript|bootup-time|mainthread|script-treemap/i, explanation: "Le JavaScript mobilise le navigateur et peut rendre les interactions plus lentes.", action: "Mesurer les scripts responsables, supprimer le code inutile et différer les composants non essentiels.", service: solutions.maintenance },
  { matches: /unused-css|render-blocking|critical-request|font-display|font/i, explanation: "Des ressources peuvent bloquer l'affichage initial.", action: "Prioriser les styles nécessaires à l'affichage et vérifier le chargement des polices et scripts.", service: solutions.maintenance },
  { matches: /server-response-time|document-request-latency|uses-long-cache-ttl|network-rtt/i, explanation: "La réponse du serveur ou les règles de cache peuvent ralentir le chargement.", action: "Contrôler TTFB, cache HTTP, hébergement et ressources responsables avant de modifier l'infrastructure.", service: solutions.maintenance },
  { matches: /layout-shift|unsized-images|cls/i, explanation: "La page peut se déplacer pendant son chargement.", action: "Réserver l'espace des médias et vérifier les éléments qui changent de taille après l'affichage.", service: solutions.ux },
  { matches: /meta-description|document-title|crawlable-anchors|robots-txt|hreflang|canonical|link-text|structured-data/i, explanation: "Un contrôle SEO technique de Lighthouse mérite une vérification.", action: "Inspecter les balises et liens concernés, puis vérifier l'indexation dans Search Console.", service: solutions.seo },
  { matches: /color-contrast|aria-|label|button-name|image-alt|heading-order|tabindex/i, explanation: "Certains éléments peuvent être moins accessibles au clavier ou aux technologies d'assistance.", action: "Corriger les éléments signalés et compléter par des tests clavier et lecteur d'écran.", service: solutions.ux },
];

export function buildPerformanceDiagnostic(report: AuditResult): PerformanceDiagnostic {
  const recommendations: Item[] = [];
  const push = (item: Item) => { if (!recommendations.some(existing => existing.id === item.id)) recommendations.push(item); };
  const score = report.scores;
  const labLcp = report.lab.lcp.value;
  const labCls = report.lab.cls.value;
  const labTbt = report.lab.tbt.value;
  if (labLcp !== null && labLcp > 2500) push({
    id: "lcp", priority: labLcp > 4000 ? "haute" : "moyenne", finding: "Affichage du contenu principal à améliorer",
    evidence: "LCP de laboratoire : " + (labLcp / 1000).toFixed(2) + " s.",
    explanation: "Un LCP élevé signifie que l'élément principal met du temps à apparaître pendant ce test.",
    action: "Identifier l'élément LCP et contrôler les images, les ressources bloquantes et la réponse serveur.",
    service: solutions.web,
  });
  if (labCls !== null && labCls > 0.1) push({
    id: "cls", priority: labCls > 0.25 ? "haute" : "moyenne", finding: "Stabilité visuelle à améliorer",
    evidence: "CLS de laboratoire : " + labCls.toFixed(3) + ".",
    explanation: "Des éléments risquent de se décaler pendant le chargement.",
    action: "Mesurer les déplacements et réserver la place des images, bannières et composants dynamiques.",
    service: solutions.ux,
  });
  if (labTbt !== null && labTbt > 200) push({
    id: "tbt", priority: labTbt > 600 ? "haute" : "moyenne", finding: "Le navigateur est occupé trop longtemps",
    evidence: "TBT de laboratoire : " + Math.round(labTbt) + " ms.",
    explanation: "Un temps de blocage important peut retarder les interactions pendant le chargement.",
    action: "Profiler l'exécution JavaScript et fractionner les tâches ou composants les plus coûteux.",
    service: solutions.maintenance,
  });
  if (report.field.inpMs !== null && report.field.inpMs > 200) push({
    id: "inp", priority: report.field.inpMs > 500 ? "haute" : "moyenne", finding: "Réactivité à vérifier sur les utilisateurs réels",
    evidence: "INP terrain au 75e percentile (" + (report.field.scope === "url" ? "page" : "domaine") + ") : " + report.field.inpMs + " ms.",
    explanation: "La réactivité perçue peut être insuffisante pour une partie des visites.",
    action: "Analyser les interactions coûteuses sur les pages concernées et contrôler les longs traitements.",
    service: solutions.ux,
  });
  for (const item of report.opportunities.slice(0, 8)) {
    const rule = rules.find(candidate => candidate.matches.test(item.id));
    push({
      id: "psi:" + item.id,
      priority: item.savingsMs !== null && item.savingsMs >= 1000 ? "haute" : "moyenne",
      finding: item.title.slice(0, 150),
      evidence: item.savingsMs !== null ? "Économie indicative Lighthouse : " + (item.savingsMs / 1000).toFixed(2) + " s." : "Signalé par Lighthouse : " + item.id.slice(0, 70) + ".",
      explanation: rule?.explanation ?? "Lighthouse a détecté un point technique à examiner sur cette page.",
      action: rule?.action ?? "Inspecter les ressources signalées, confirmer la cause et tester la correction.",
      service: rule?.service ?? solutions.maintenance,
    });
  }
  for (const [key, label, service, action] of [
    ["seo", "Contrôles SEO à corriger", solutions.seo, "Examiner les audits SEO Lighthouse, les balises, les liens et compléter par Search Console."],
    ["accessibility", "Accessibilité à améliorer", solutions.ux, "Examiner les éléments signalés, puis réaliser des tests clavier et lecteurs d'écran."],
    ["bestPractices", "Bonnes pratiques techniques à vérifier", solutions.maintenance, "Contrôler les audits Lighthouse concernés et valider chaque correctif."],
    ["performance", "Performance globale à améliorer", solutions.maintenance, "Identifier les principales causes dans les métriques et les opportunités ci-dessus."],
  ] as const) {
    const value = score[key];
    if (value !== null && value < 90) push({
      id: "score:" + key,
      priority: value < 50 ? "haute" : "moyenne",
      finding: label,
      evidence: "Score Lighthouse " + label.toLowerCase() + " : " + value + "/100.",
      explanation: "Ce score de laboratoire indique une piste de vérification, pas un diagnostic exhaustif.",
      action, service,
    });
  }
  recommendations.sort((a, b) => rank[a.priority] - rank[b.priority]);
  const strengths = ([
    ["performance", "Performance"], ["seo", "SEO technique"], ["accessibility", "Accessibilité automatisée"], ["bestPractices", "Bonnes pratiques"],
  ] as const).filter(([key]) => score[key] !== null && score[key]! >= 90).map(([key, label]) => label + " : " + score[key] + "/100.");
  const summary = recommendations.length
    ? recommendations.length + " point(s) à vérifier dans cet audit " + (report.strategy === "mobile" ? "mobile" : "ordinateur") + ", dont " + recommendations.filter(r => r.priority === "haute").length + " priorité(s) haute(s)."
    : "Aucun point prioritaire identifié par les indicateurs disponibles dans ce test ; une vérification humaine reste nécessaire.";
  return {
    summary,
    strengths,
    recommendations: recommendations.slice(0, 12),
    primaryService: recommendations[0]?.service ?? null,
    methodology: [
      "Résultats issus d'une mesure Lighthouse ponctuelle ; la variabilité entre tests est normale.",
      report.field.scope === "unavailable" ? "Aucune donnée CrUX terrain disponible ; ne pas assimiler cette absence à un score nul." : "Les données CrUX agrègent les utilisateurs réels et ne sont pas équivalentes au test Lighthouse.",
      "Les offres CODE-V sont proposées selon les catégories d'anomalies, sans garantie de gain de trafic, de ventes ni de positionnement.",
    ],
  };
}
