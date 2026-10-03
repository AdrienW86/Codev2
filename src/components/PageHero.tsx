import type { ReactNode } from "react";
import Breadcrumb, { type BreadcrumbProps } from "./Breadcrumb";
import styles from "./pageHero.module.css";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  text: string;
  breadcrumb: BreadcrumbProps;
};

export default function PageHero({ eyebrow, title, text, breadcrumb }: PageHeroProps) {
  return (
    <section className={`page-hero ${styles.hero}`}>
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="container page-hero-content">
        <Breadcrumb {...breadcrumb} />
        <span className="eyebrow"><i />{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="page-hero-grid" aria-hidden="true" />
    </section>
  );
}
