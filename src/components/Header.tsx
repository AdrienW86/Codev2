"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/qui-sommes-nous", label: "À propos" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className={`site-header ${styles.header}`} ref={header}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="CODE-V, accueil" onClick={close}>
          <img src="/brand/code-v-logo-dark.svg" width="875" height="875" className="brand-logo" alt="CODE-V" />
        </Link>

        <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
          {links.map(link => <Link key={link.href} href={link.href} onClick={close}>{link.label}</Link>)}
          <a className={styles.mobilePhone} href="tel:+33666672709" onClick={close}>Appeler le 06 66 67 27 09</a>
          <Link className="nav-cta mobile-only" href="/contact" onClick={close}>
            Recevoir mon devis <span aria-hidden="true">↗</span>
          </Link>
        </nav>

        <div className={styles.headerActions}>
          <a className={styles.headerPhone} href="tel:+33666672709">06 66 67 27 09</a>
          <Link className="nav-cta desktop-only" href="/contact">
            Recevoir mon devis <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <button
          ref={toggle}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(current => !current)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
