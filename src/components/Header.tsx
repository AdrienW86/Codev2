"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import { siteNavigation, solutionNavigation, quickServiceNavigation, primarySolutionNeeds } from "@/data/navigation";

const links = siteNavigation;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solutions, setSolutions] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const solutionsToggle = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); setSolutions(false); };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (solutions) { setSolutions(false); solutionsToggle.current?.focus(); }
        else if (open) { setOpen(false); toggle.current?.focus(); }
      }
    };
    const onPointer = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) close(); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open, solutions]);

  return (
    <header className={`site-header ${styles.header}`} ref={header}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Codev, accueil" onClick={close}>
          <img src="/brand/code-v-logo-white.svg" width="875" height="875" className="brand-logo" alt="CODE-V" />
        </Link>

        <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
          <div className={styles.mobileShortcuts} aria-label="Accès directs aux services">{[...quickServiceNavigation.slice(0, 4), { href: "/realisations", label: "Réalisations" }, { href: "/contact", label: "Contact" }].map(link => <Link key={link.href} href={link.href} onClick={close}>{link.label}<span aria-hidden="true">↗</span></Link>)}</div>
          <div className={styles.solutions} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setSolutions(false); }}>
            <button ref={solutionsToggle} className={styles.solutionsToggle} type="button" aria-expanded={solutions} aria-controls="solutions-links" onClick={() => setSolutions(value => !value)}>Solutions <span aria-hidden="true">⌄</span></button>
            <div id="solutions-links" className={styles.dropdown} hidden={!solutions}>
              <div className={styles.menuIntro}><span>LES SOLUTIONS CODE-V</span><strong>Un objectif.<br />Les bons leviers.</strong><p>Explorez une expertise ou échangeons sur votre besoin.</p></div>
              <div className={styles.menuFamilies}>
                <div className={styles.primaryFamilies}>{primarySolutionNeeds.map(need => { const family = solutionNavigation.find(item => item.id === need.id)!; return <Link key={family.id} href={family.href} onClick={close}><span className={styles.needLabel}>{need.label}</span><strong>{family.name} <span aria-hidden="true">↗</span></strong><small>{family.description}</small></Link>; })}</div>
                <div className={styles.otherFamilies}>{solutionNavigation.filter(family => !primarySolutionNeeds.some(need => need.id === family.id)).map(family => <Link key={family.id} href={family.href} onClick={close}>{family.name}<span aria-hidden="true">↗</span></Link>)}</div>
              </div>
              <Link className={styles.allSolutions} href="/solutions" onClick={close}>Voir toutes les solutions <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          {links.map((link) => (
            <Link key={link.href} href={link.href} title={link.description} onClick={close} className={link.href === "/realisations" || link.href === "/contact" ? styles.desktopSiteLink : undefined}>
              {link.label}
            </Link>
          ))}

          <Link className="nav-cta mobile-only" href="/contact" onClick={close}>
            Parler de votre projet <span aria-hidden="true">↗</span>
          </Link>
        </nav>

        <Link className="nav-cta desktop-only" href="/contact">
          Parler de votre projet <span aria-hidden="true">↗</span>
        </Link>

        <button
          ref={toggle}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => { setOpen((current) => !current); setSolutions(false); }}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
