import Link from "next/link";
import styles from "./breadcrumb.module.css";

export type BreadcrumbItem = { readonly label: string; readonly href?: string };
export type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  /** Published canonical pathname of the current page, without query or hash. */
  currentPath: string;
  tone?: "dark" | "light";
};

const origin = "https://www.code-v.fr";
const isPath = (path: string) => path.startsWith("/") && !path.startsWith("//") && !/[?#]/.test(path);

export default function Breadcrumb({ items, currentPath, tone = "dark" }: BreadcrumbProps) {
  if (!items.length || !isPath(currentPath)) throw new Error("Breadcrumb requires items and a canonical pathname.");
  for (const [index, item] of items.entries()) {
    if (!item.label.trim() || (index < items.length - 1 && (!item.href || !isPath(item.href)))) {
      throw new Error("Breadcrumb ancestors require a label and a published pathname.");
    }
  }
  const structuredData = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.label,
      item: new URL(index === items.length - 1 ? currentPath : item.href!, origin).href,
    })),
  };
  return <>
    <nav aria-label="Fil d’Ariane" className={`${styles.breadcrumb} ${styles[tone]}`}>
      <ol>{items.map((item, index) => <li key={`${index}-${item.label}`}>
        {index > 0 && <span className={styles.separator} aria-hidden="true">/</span>}
        {index === items.length - 1 ? <span aria-current="page" className={styles.current}>{item.label}</span> : <Link href={item.href!}>{item.label}</Link>}
      </li>)}</ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
  </>;
}
