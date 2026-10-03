import { useId } from "react";
import type { Review } from "@/data/reviews";
import styles from "./reviews.module.css";

type Props = {
  reviews: readonly Review[];
  heading: string;
  eyebrow?: string;
  variant?: "featured" | "compact" | "inline";
  maxItems?: number;
  compact?: boolean;
};
const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
function visitLabel(value: string) {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  return match ? `${months[Number(match[2])-1]} ${match[1]}` : value;
}

export default function ReviewsSection({ reviews, heading, eyebrow = "AVIS GOOGLE", variant = "featured", maxItems, compact = false }: Props) {
  const headingId = useId();
  const selected = maxItems === undefined ? reviews : reviews.slice(0, Math.max(0, Math.floor(maxItems)));
  if (!selected.length) return null;
  return <section className={`${styles.section} ${styles[variant]} ${compact ? styles.dense : ""}`} aria-labelledby={headingId} data-reviews>
    <div className="container"><div className={styles.heading}><p>{eyebrow}</p><h2 id={headingId}>{heading}</h2></div>
      <div className={styles.quotes}>{selected.map(review => <figure key={review.id} data-review-id={review.id}>
        <span className={styles.rating}><span className={styles.srOnly}>{review.rating} sur 5 étoiles</span><span aria-hidden="true">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span></span>
        <blockquote><p>{review.text}</p></blockquote>
        <figcaption><strong>{review.author}</strong><span>Avis {review.source}</span>{review.visitedAt && <span>Visité en <time dateTime={review.visitedAt}>{visitLabel(review.visitedAt)}</time></span>}</figcaption>
      </figure>)}</div>
    </div>
  </section>;
}
