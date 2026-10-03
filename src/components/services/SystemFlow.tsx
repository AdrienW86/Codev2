import Reveal from "../motion/Reveal";
import styles from "./systemFlow.module.css";

export type FlowStep = { title: string; detail: string; human?: boolean };

/** A semantic sequence remains readable without animation or JavaScript. */
export default function SystemFlow({ steps, compact = false }: { steps: readonly FlowStep[]; compact?: boolean }) {
  return <Reveal stagger className={`${styles.flow} ${compact ? styles.compact : ""}`}>
    <ol>{steps.map((step, index) => <li key={step.title}>
      <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div><strong>{step.title}</strong><p>{step.detail}</p>{step.human && <span className={styles.human}>Validation humaine</span>}</div>
      <span className={styles.connector} aria-hidden="true" />
    </li>)}</ol>
    <span className={styles.caption}>Schéma de principe · ni données en direct, ni résultat client</span>
  </Reveal>;
}
