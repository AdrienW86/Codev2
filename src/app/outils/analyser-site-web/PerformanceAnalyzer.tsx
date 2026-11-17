"use client";

import { useState, type FormEvent } from "react";
import type { AuditResult, Strategy } from "@/lib/performance/audit";
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

function tone(score: number | null) { return score === null ? "unknown" : score >= 90 ? "good" : score >= 50 ? "medium" : "poor"; }

export default function PerformanceAnalyzer() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<Strategy>("mobile");
  const [report, setReport] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
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
        <span>Analyse gratuite · Source : Google PageSpeed Insights</span>
      </div>
    </form>
    {loading && <p className={styles.notice} role="status">Lighthouse exécute un test réel. Cela peut prendre plusieurs dizaines de secondes.</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {report && <section className={styles.results} aria-label="Résultats de l'analyse">
      <div className={styles.reportHeader}>
        <div><span className={styles.eyebrow}>RAPPORT TECHNIQUE</span><h2>Résultats de l'analyse</h2><p className={styles.domain}>{report.url} · {report.strategy === "mobile" ? "Mobile" : "Ordinateur"} · {new Date(report.analyzedAt).toLocaleString("fr-FR")}</p></div>
        <button type="button" onClick={() => window.print()} className={styles.print}>Imprimer / PDF</button>
      </div>
      <div className={styles.scores}>{labels.map(({ key, label }) =>
        <div className={styles.score} data-tone={tone(report.scores[key])} key={key}>
          <strong>{report.scores[key] ?? "—"}<small>{report.scores[key] !== null && "/100"}</small></strong>
          <span>{label}</span>
        </div>)}</div>
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
      <p className={styles.subtle}>Les estimations ne constituent pas une garantie. Ce rapport ne remplace pas un audit approfondi.</p>
      <a href="/contact" className={styles.contact}>Faire optimiser mon site par CODE-V →</a>
    </section>}
  </div>;
}
