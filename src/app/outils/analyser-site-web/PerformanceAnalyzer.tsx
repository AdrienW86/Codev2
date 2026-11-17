"use client";

import { useState, type FormEvent } from "react";
import type { AuditResult, Strategy } from "@/lib/performance/audit";
import { buildActionPlan, buildInsights } from "@/lib/performance/insights";
import { downloadAuditPdf } from "@/lib/performance/report-pdf";
import styles from "./page.module.css";

const labels = [
  { key: "performance", label: "Performance" }, { key: "seo", label: "SEO" },
  { key: "accessibility", label: "Accessibilité" }, { key: "bestPractices", label: "Bonnes pratiques" },
] as const;
const labLabels = [
  { key: "lcp", label: "LCP", detail: "Contenu principal" }, { key: "fcp", label: "FCP", detail: "Premier affichage" },
  { key: "cls", label: "CLS", detail: "Stabilité visuelle" }, { key: "tbt", label: "TBT", detail: "Blocage du navigateur" },
  { key: "speedIndex", label: "Speed Index", detail: "Vitesse visuelle" },
] as const;

const insightGroups = [
  { key: "seo", title: "Référencement sur la page", summary: "Titres, indexation, liens internes, images et visibilité organique." },
  { key: "geo", title: "GEO et moteurs IA", summary: "Données structurées et visibilité IA : distinguer les mesures des hypothèses." },
  { key: "links", title: "Liens et popularité", summary: "Backlinks, domaines référents et ancres : sources spécialisées nécessaires." },
  { key: "ux", title: "Expérience et convivialité", summary: "Usage mobile, lisibilité et accessibilité." },
  { key: "performance", title: "Performance et ressources", summary: "Ressources critiques, images et temps de chargement." },
] as const;
const statusLabel = { passed: "Validé", failed: "À corriger", manual: "À vérifier manuellement", unavailable: "Non mesuré", notApplicable: "Non applicable" };

function tone(score: number | null) { return score === null ? "unknown" : score >= 90 ? "good" : score >= 50 ? "medium" : "poor"; }

export default function PerformanceAnalyzer() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<Strategy>("mobile");
  const [report, setReport] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setReport(null); setError(""); setLoading(true);
    try {
      const res = await fetch("/api/performance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, strategy }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "L'analyse est indisponible.");
      setReport(data as AuditResult);
    } catch (e) { setError(e instanceof Error ? e.message : "Une erreur s'est produite."); }
    finally { setLoading(false); }
  }
  return <div className={styles.tool}>
    <form onSubmit={submit} className={styles.form}>
      <label htmlFor="audit-url">Adresse de votre site web</label>
      <div className={styles.inputRow}>
        <input id="audit-url" type="url" required maxLength={1600} placeholder="https://www.monsite.fr" autoComplete="url" value={url} onChange={e => setUrl(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Analyse en cours…" : "Analyser mon site"}</button>
      </div>
      <div className={styles.controls} role="group" aria-label="Type d'appareil">
        <button type="button" className={strategy === "mobile" ? styles.selected : ""} aria-pressed={strategy === "mobile"} onClick={() => setStrategy("mobile")}>Mobile</button>
        <button type="button" className={strategy === "desktop" ? styles.selected : ""} aria-pressed={strategy === "desktop"} onClick={() => setStrategy("desktop")}>Ordinateur</button>
        <span>Audit complet gratuit · Données Google PageSpeed Insights et contrôles SEO documentés</span>
      </div>
    </form>
    {loading && <p className={styles.notice} role="status">Lighthouse exécute un test réel. Cela peut prendre plusieurs dizaines de secondes.</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {report && <section className={styles.results} aria-label="Résultats de l'analyse">
      <div className={styles.reportHeader}>
        <div><span className={styles.eyebrow}>RAPPORT TECHNIQUE</span><h2>Résultats de l'analyse</h2><p className={styles.domain}>{report.url} · {report.strategy === "mobile" ? "Mobile" : "Ordinateur"} · {new Date(report.analyzedAt).toLocaleString("fr-FR")}</p></div>
        <button type="button" disabled={exporting} onClick={async () => {
          setExporting(true);
          try { await downloadAuditPdf(report); } catch { setError("Le PDF n’a pas pu être généré. Réessayez."); }
          finally { setExporting(false); }
        }} className={styles.print}>{exporting ? "Préparation…" : "Télécharger le rapport PDF"}</button>
      </div>
      <div className={styles.scores}>{labels.map(({ key, label }) =>
        <div className={styles.score} data-tone={tone(report.scores[key])} key={key}>
          <div className={styles.ring} style={{ "--score": `${report.scores[key] ?? 0}%` } as React.CSSProperties}><strong>{report.scores[key] ?? "—"}</strong></div>
          <span>{label}</span>
        </div>)}</div>
      <div className={styles.executive}>
        <h3>Synthèse de votre audit</h3>
        <p>Les notes proviennent des tests officiels Lighthouse. Le diagnostic complémentaire explique les vérifications SEO, GEO, ergonomie et liens ; les données absentes sont indiquées sans extrapolation.</p>
        <div className={styles.summaryNumbers}>
          <div><strong>{(report.checks ?? []).filter(c => c.status === "failed").length}</strong><span>Contrôles à améliorer</span></div>
          <div><strong>{(report.checks ?? []).filter(c => c.status === "passed").length}</strong><span>Contrôles réussis</span></div>
          <div><strong>{buildActionPlan(report).length}</strong><span>Actions priorisées</span></div>
        </div>
      </div>
      <h3>Plan d'action prioritaire</h3>
      {buildActionPlan(report).length ? <ol className={styles.actionPlan}>{buildActionPlan(report).map(a => <li key={a.id} data-priority={a.priority}>
        <span className={styles.priority}>{a.priority === "high" ? "Priorité élevée" : a.priority === "medium" ? "Priorité moyenne" : "Priorité faible"}</span>
        <strong>{a.title}</strong><p>{a.detail || "Examiner le contrôle détaillé correspondant."}</p>
      </li>)}</ol> : <p className={styles.subtle}>Aucun point prioritaire détecté par Lighthouse sur cette URL. Une vérification SEO manuelle reste utile.</p>}
      <h3>Audit SEO, GEO et expérience — contrôle par contrôle</h3>
      <div className={styles.chapterNav}>{insightGroups.map(group => <a key={group.key} href={`#audit-${group.key}`}>{group.title}</a>)}</div>
      {insightGroups.map(group => {
        const insights = buildInsights(report).filter(i => i.category === group.key);
        return <section id={`audit-${group.key}`} key={group.key} className={styles.chapter}>
          <div className={styles.chapterHeader}><h4>{group.title}</h4><p>{group.summary}</p></div>
          <div className={styles.insightList}>{insights.map(i => <article key={i.id}>
            <span className={styles.findingStatus} data-status={i.status}>{i.status === "good" ? "Validé" : i.status === "warning" ? "À améliorer" : "Non mesuré"}</span>
            <h5>{i.title}</h5><p>{i.evidence}</p><p><strong>Conseil :</strong> {i.recommendation}</p>
          </article>)}</div>
        </section>;
      })}
      <h3>Données de laboratoire</h3>
      <div className={styles.metrics}>{labLabels.map(({ key, label, detail }) =>
        <div key={key}><span>{label} <small>{detail}</small></span><strong>{report.lab[key].display}</strong></div>)}</div>
      <h3>Données utilisateurs réels (CrUX)</h3>
      {report.field.scope === "unavailable"
        ? <p className={styles.subtle}>Pas de données réelles disponibles pour cette page ou ce domaine. Ce résultat ne signifie pas que les indicateurs sont à zéro.</p>
        : <><p className={styles.subtle}>Mesures au 75e percentile, niveau {report.field.scope === "url" ? "page" : "domaine"}.</p><div className={styles.metrics}>
          <div><span>LCP réel</span><strong>{report.field.lcpMs === null ? "—" : (report.field.lcpMs / 1000).toLocaleString("fr-FR") + " s"}</strong></div>
          <div><span>INP réel</span><strong>{report.field.inpMs === null ? "—" : report.field.inpMs + " ms"}</strong></div>
          <div><span>CLS réel</span><strong>{report.field.cls === null ? "—" : report.field.cls.toLocaleString("fr-FR")}</strong></div>
        </div></>}
      <h3>Optimisations identifiées</h3>
      {report.opportunities.length ? <ol className={styles.opportunities}>{report.opportunities.map(item => <li key={item.id}>
        <strong>{item.title}</strong>{item.savingsMs !== null && <span>Gain estimé : {(item.savingsMs / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} s</span>}
        <p>{item.description || item.display}</p></li>)}</ol> : <p className={styles.subtle}>Aucune opportunité prioritaire détectée par cette analyse. D'autres vérifications peuvent rester nécessaires.</p>}
      <h3>Contrôles détaillés et actions à mener</h3>
      <p className={styles.subtle}>Cette analyse porte sur l’URL testée, pas sur l’ensemble du site, ses backlinks ou ses positions Google. Corrigez les échecs, vérifiez les points manuels puis relancez le test. Les descriptions ci-dessous expliquent chaque contrôle.</p>
      {labels.map(({ key, label }) => {
        const checks = (report.checks ?? []).filter(item => item.category === (key === "bestPractices" ? "best-practices" : key));
        return <div key={key}><h3>{label} — {checks.filter(c => c.status === "failed").length} point(s) à corriger</h3>
          {!checks.length && <p>Détails indisponibles pour cette catégorie.</p>}
          {checks.map(item => <details key={item.id} className={styles.check} open={item.status === "failed"}>
            <summary><strong>{statusLabel[item.status]} · {item.title}</strong></summary>
            <p>{item.description}</p>{item.display && <p>{item.display}</p>}
            {item.examples.length > 0 && <><p>Exemples concernés (10 maximum) :</p><ul>{item.examples.map((example, index) => <li key={index}><code>{example}</code></li>)}</ul></>}
          </details>)}
        </div>;
      })}
      <p className={styles.subtle}>Les estimations ne constituent pas une garantie. Ce rapport ne remplace pas un audit approfondi.</p>
      <a href="/contact" className={styles.contact}>Faire optimiser mon site par CODE-V →</a>
    </section>}
  </div>;
}
