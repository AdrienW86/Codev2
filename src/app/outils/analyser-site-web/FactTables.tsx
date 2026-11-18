import { factStatusLabels, type FactSection } from "@/lib/performance/facts";
import styles from "./page.module.css";
import { memo } from "react";

/** The same complete rows are printed in the PDF; collapsing never removes data. */
export default memo(function FactTables({ sections, expanded = false }: { sections: FactSection[]; expanded?: boolean }) {
  return <div className={styles.factSections}>{sections.map(section => <details key={section.id} className={styles.factSection} data-status={section.status} open={expanded || section.id === "serp" || section.status === "critical"}>
    <summary><span><strong>{section.title}</strong><small>{section.rows.length} {section.rows.length === 1 ? "élément" : "éléments"}</small></span><span className={styles.findingStatus} data-status={section.status}>{factStatusLabels[section.status]}</span></summary>
    <p className={styles.subtle}>{section.note}</p>
    {!section.rows.length ? <p className={styles.subtle}>Aucun élément détecté dans le périmètre de ce contrôle.</p> : <div className={styles.factTableWrap}><table className={styles.factTable}>
      <caption>{section.title} - inventaire complet collecté</caption>
      <thead><tr>{section.columns.map((column,index) => <th key={index} scope="col">{column}</th>)}</tr></thead>
      <tbody>{section.rows.map((row,index) => <tr key={index}>{row.map((cell,i) => <td key={i}>{cell || "—"}</td>)}</tr>)}</tbody>
    </table></div>}
  </details>)}</div>;
});
