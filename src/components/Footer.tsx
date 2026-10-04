import Link from "next/link";
import { quickServiceNavigation } from "@/data/navigation";
import styles from "./footer.module.css";

const groups = [
  { title: "Solutions", links: [...quickServiceNavigation, { href: "/solutions", label: "Toutes les solutions" }] },
  { title: "CODE-V", links: [{ href: "/realisations", label: "Réalisations" }, { href: "/qui-sommes-nous", label: "À propos" }, { href: "/contact", label: "Contact" }] },
  { title: "Ressources", links: [{ href: "/ressources", label: "Ressources" }, { href: "/articles", label: "Articles" }, { href: "/facebook", label: "Publications Facebook" }] },
  { title: "Légal", links: [{ href: "/mentions-legales", label: "Mentions légales" }, { href: "/politique-confidentialite", label: "Politique de confidentialité" }] },
];

export default function Footer() {
  return <footer className={styles.footer}><div className="container">
    <div className={styles.top}><div><Link href="/" aria-label="CODE-V, accueil"><img src="/brand/code-v-logo-white.svg" width="875" height="875" className={styles.logo} alt="CODE-V" /></Link><p>Le digital plus clair, plus utile, plus humain.</p></div>
      <div className={styles.contact}><Link href="/contact" className={styles.project}>Parler de votre projet <span aria-hidden="true">↗</span></Link><Link href="mailto:contact@code-v.fr">contact@code-v.fr</Link><Link href="tel:+33666672709">06 66 67 27 09</Link></div></div>
    <nav className={styles.navigation} aria-label="Navigation de pied de page">{groups.map(group => <div key={group.title}><h2>{group.title}</h2>{group.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>)}</nav>
    <div className={styles.bottom}><span>© {new Date().getFullYear()} CODE-V. Tous droits réservés.</span><span>Conçu avec attention à Perpignan.</span></div>
  </div></footer>;
}
