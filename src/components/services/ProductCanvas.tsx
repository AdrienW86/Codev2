import Reveal from "../motion/Reveal";
import styles from "./productCanvas.module.css";

/** Illustrative UI anatomy, never presented as a delivered client product. */
export default function ProductCanvas() {
  return <Reveal className={styles.canvas}>
    <div className={styles.window}>
      <div className={styles.toolbar}><span>Interface / vue de conception</span><span aria-hidden="true">▱</span></div>
      <div className={styles.workspace}>
        <aside className={styles.rail} aria-label="Principes de conception"><span>Structure</span><span>Parcours</span><span>Composants</span></aside>
        <div className={styles.screen}>
          <span className={styles.label}>Une interface, une intention</span>
          <strong>Tout commence<br />par un usage.</strong>
          <div className={styles.modules}><div><span>01</span><b>Orienter</b><p>Un parcours lisible.</p></div><div><span>02</span><b>Agir</b><p>Une action claire.</p></div></div>
          <div className={styles.foundation}><span>Architecture</span><span>Données</span><span>Intégrations</span></div>
        </div>
      </div>
    </div>
    <div className={styles.detail}><span>État d’interface</span><strong>La bonne information.<br />Au bon moment.</strong><div aria-hidden="true" /><small>Lecture → action → confirmation</small></div>
    <p className={styles.caption}>Composition illustrative · aucun produit client ni indicateur de performance présenté</p>
  </Reveal>;
}
