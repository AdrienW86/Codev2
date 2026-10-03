import type { FacebookFeedResult } from "@/lib/facebook-feed";
import styles from "./facebook.module.css";
const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
export default function FacebookFeed({ feed }: { feed: FacebookFeedResult }) {
  if (feed.status !== "available") return <div className={styles.state}><p>{feed.status === "empty" ? "Les prochaines publications seront à retrouver ici." : "Les publications sont momentanément indisponibles."}</p></div>;
  return <div className={styles.feed}>{feed.posts.map(post => {
    const long = post.message.length > 700;
    const cut = long ? Math.max(500, post.message.lastIndexOf(" ", 700)) : post.message.length;
    return <article key={post.id} className={styles.post}>
      <div className={styles.date}><span>CODE-V / PUBLICATION</span><time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time></div>
      <div className={styles.content}>
        {post.message && <div className={styles.copy}><p>{post.message.slice(0,cut)}</p>{long && <details><summary>Lire la suite</summary><p>{post.message.slice(cut)}</p></details>}</div>}
        {post.media && <figure className={styles.media} style={{ aspectRatio: Math.min(1.91, Math.max(.75, post.media.width / post.media.height)) }}>
          <img src={post.media.src} width={post.media.width} height={post.media.height} loading="lazy" decoding="async" referrerPolicy="no-referrer" alt={`Visuel de la publication CODE-V du ${dateFormat.format(new Date(post.date))}`} />
        </figure>}
        <a href={post.permalink} target="_blank" rel="noopener noreferrer" className={styles.link}>Voir sur Facebook <span aria-hidden="true">↗</span><span className={styles.srOnly}> (nouvel onglet)</span></a>
      </div>
    </article>;
  })}</div>;
}
