import styles from "./home.module.css";

export default function GrowthCard() {
  return <div className={styles.heroVisual}>
    <div className={styles.graphHalo} aria-hidden="true" />
    <div className={styles.graphSurface}>
      <div className={styles.graphHead}><span>CODE-V / UN PARCOURS PLUS CLAIR</span><span className={styles.status}>Objectif : des demandes</span></div>
      <div className={styles.graphTitle}>Être trouvé.<br /><em>Être choisi.</em></div>
      <svg className={styles.graph} viewBox="0 0 500 300" role="img" aria-label="Trajectoire illustrant le passage de la visibilité à la demande client">
        <defs><linearGradient id="home-trajectory-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#50e3c2" stopOpacity=".18" /><stop offset="1" stopColor="#50e3c2" stopOpacity="0" /></linearGradient></defs>
        <g className={styles.graphGrid}><path d="M0 75H500M0 150H500M0 225H500M100 0V300M200 0V300M300 0V300M400 0V300" /></g>
        <path fill="url(#home-trajectory-fill)" d="M0 260C85 260 85 200 150 200S230 125 290 125S380 48 440 48H500V300H0Z" />
        <path className={styles.trajectory} pathLength="1" d="M0 260C85 260 85 200 150 200S230 125 290 125S380 48 440 48H500" />
        <g className={styles.graphNodes}><circle cx="150" cy="200" r="7" /><circle cx="290" cy="125" r="7" /><circle cx="440" cy="48" r="7" /></g>
        <g className={styles.graphLabels}><text x="120" y="235">Visibilité</text><text x="250" y="160">Confiance</text><text x="400" y="83">Demande</text></g>
      </svg>
      <div className={styles.graphFooter}><span>Parcours simplifié</span><span>Visibilité · Confiance · Demande</span></div>
    </div>
    <div className={styles.floatingInterface} aria-hidden="true"><span>Votre activité</span><i /><strong>Un objectif clair.</strong><div><b />Les bons leviers, au bon moment</div></div>
  </div>;
}
