"use client";

import { useState } from "react";
import Link from "next/link";
import type { SolutionNavigation } from "@/data/navigation";
import styles from "./home.module.css";

export default function SolutionExplorer({ items }: { items: SolutionNavigation[] }) {
  const [active, setActive] = useState(items[0].id);
  const selected = items.find(item => item.id === active)!;
  return <div className={styles.explorer}>
    <div className={styles.universeNav} role="group" aria-label="Choisir un univers CODE-V">
      {items.map(item => <button key={item.id} type="button" aria-pressed={active === item.id} aria-controls="universe-preview" onClick={() => setActive(item.id)}>{item.name}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div id="universe-preview" className={styles.universePreview}>
      <div key={active} className={styles.universeContent}>
        <div className={`${styles.universeArt} ${styles[selected.intent]}`} aria-hidden="true">
          <span className={styles.artLabel}>CODE-V / {selected.id.toUpperCase()}</span>
          {selected.intent === "website" ? <div className={styles.interfaceArt}><i /><i /><i /><strong>Une intention.<br />Une interface.</strong><div /><div /><span>Expérience / Architecture</span></div> : selected.intent === "acquisition" ? <div className={styles.signalArt}><i /><i /><i /><strong>Être trouvé.<br />Au bon moment.</strong><span>Visibilité → Demande</span></div> : selected.intent === "automation" ? <div className={styles.connectionArt}><span>Vos outils</span><i /><strong>Moins de friction.</strong><i /><span>Votre activité</span></div> : <div className={styles.editorialArt}><span>Une direction</span><strong>Claire.<br />Cohérente.<br />Vivante.</strong><i /></div>}
        </div>
        <div className={styles.universeCopy}><span className={styles.kicker}>VOTRE PROCHAIN LEVIER</span><h3>{selected.name}</h3><p>{selected.description}</p><Link className="text-link" href={selected.href}>{selected.cta} <span aria-hidden="true">↗</span></Link></div>
      </div>
    </div>
  </div>;
}
