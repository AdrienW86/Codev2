import type { AuditResult } from "./audit";

const categories = { performance: "Performance", seo: "SEO technique", accessibility: "Accessibilité", "best-practices": "Bonnes pratiques" };
const statuses = { passed: "Validé", failed: "À corriger", manual: "À vérifier manuellement", unavailable: "Non mesuré", notApplicable: "Non applicable" };

/** Direct PDF export, entirely in the browser; all report content is rendered as text. */
export async function createAuditPdf(report: AuditResult): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  pdf.setTitle("Rapport SEO et performances — CODE-V");
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let page = pdf.addPage([595.28, 841.89]);
  let y = 790;
  const safe = (value: string) => Array.from(value.replace(/\s+/g, " ")).map(c => { try { regular.encodeText(c); return c; } catch { return "?"; } }).join("");
  function line(value: string, heading = false) {
    const size = heading ? 13 : 10;
    const font = heading ? bold : regular;
    let current = "";
    const flush = () => {
      if (y < 60) { page = pdf.addPage([595.28, 841.89]); y = 790; }
      page.drawText(current, { x: 45, y, size, font, color: rgb(.07, .13, .2) });
      y -= size + 5; current = "";
    };
    for (const word of safe(value).split(" ")) {
      const candidate = current ? current + " " + word : word;
      if (font.widthOfTextAtSize(candidate, size) <= 500) { current = candidate; continue; }
      if (current) flush();
      for (const c of word) {
        if (font.widthOfTextAtSize(current + c, size) > 500) flush();
        current += c;
      }
    }
    if (current) flush();
    y -= 6;
  }
  line("CODE-V — Rapport SEO et performances", true);
  line(report.url);
  line(`${report.strategy === "mobile" ? "Mobile" : "Ordinateur"} — ${new Date(report.analyzedAt).toLocaleString("fr-FR")} — ${report.source}`);
  line("Périmètre et méthode", true);
  line("Analyse de l’URL indiquée uniquement. Les contrôles Lighthouse ne couvrent pas toutes les pages, les positions Google, les backlinks ou la qualité éditoriale. Les scores de laboratoire varient selon les conditions du test. Aucune garantie de classement ou de gain commercial.");
  line("Synthèse", true);
  for (const [key, label] of Object.entries(categories)) {
    const scoreKey = key === "best-practices" ? "bestPractices" : key as keyof AuditResult["scores"];
    line(`${label} : ${report.scores[scoreKey] ?? "Non mesuré"}${report.scores[scoreKey] === null ? "" : "/100"}`);
  }
  const checks = report.checks ?? [];
  line(`${checks.filter(c => c.status === "failed").length} contrôles à corriger ; ${checks.filter(c => c.status === "manual").length} vérifications manuelles. Un même contrôle peut concerner plusieurs catégories.`);
  line("Plan d’action", true);
  line("1. Traiter les échecs SEO et les problèmes d’accès au contenu. 2. Examiner les gains de performance ci-dessous. 3. Corriger les autres échecs et réaliser les contrôles manuels. 4. Relancer une analyse sur mobile et ordinateur après correction. Les scores ne constituent pas un audit SEO complet.");
  line("Mesures de laboratoire", true);
  for (const [key, metric] of Object.entries(report.lab)) line(`${key.toUpperCase()} : ${metric.display}`);
  line("Données utilisateurs réels (CrUX)", true);
  if (report.field.scope === "unavailable") line("Données indisponibles : cela ne signifie pas que les indicateurs valent zéro.");
  else {
    line(`75e percentile — périmètre : ${report.field.scope === "url" ? "page" : "domaine"}`);
    line(`LCP : ${report.field.lcpMs === null ? "indisponible" : report.field.lcpMs + " ms"} ; INP : ${report.field.inpMs === null ? "indisponible" : report.field.inpMs + " ms"} ; CLS : ${report.field.cls ?? "indisponible"}`);
  }
  line("Opportunités de performance", true);
  if (!report.opportunities.length) line("Aucune opportunité chiffrée disponible. D’autres corrections peuvent rester nécessaires.");
  for (const item of report.opportunities) {
    line(item.title, true); line(item.description); line(item.display);
    if (item.savingsMs !== null) line(`Gain estimé : ${item.savingsMs} ms (estimations non cumulables et non garanties).`);
  }
  for (const [category, label] of Object.entries(categories)) {
    line(`Contrôles détaillés — ${label}`, true);
    const group = checks.filter(c => c.category === category);
    if (!group.length) line("Détails indisponibles pour cette catégorie.");
    for (const item of group) {
      line(`${statuses[item.status]} — ${item.title}`, true);
      line(item.description); if (item.display) line(item.display);
      if (item.examples.length) { line("Exemples concernés (10 maximum) :"); for (const example of item.examples) line(example); }
    }
  }
  line("Besoin d’aide pour appliquer les corrections ?", true);
  line("CODE-V — https://www.code-v.fr/contact — contact@code-v.fr");
  const pages = pdf.getPages();
  pages.forEach((p, index) => p.drawText(`CODE-V | ${index + 1} / ${pages.length}`, { x: 45, y: 28, size: 9, font: regular }));
  return pdf.save();
}

export async function downloadAuditPdf(report: AuditResult) {
  const bytes = await createAuditPdf(report);
  const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: "application/pdf" }));
  const a = document.createElement("a");
  a.href = url; a.download = `rapport-code-v-${new URL(report.url).hostname}-${report.strategy}.pdf`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
