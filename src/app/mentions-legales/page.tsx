import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { getPageBreadcrumb } from "@/data/breadcrumbs";
import styles from "./legal.module.css";
const title = "Mentions légales — CODE-V";
const description = "Informations relatives au site CODE-V : contact, hébergement, contenus, liens externes et protection des données personnelles.";
export const metadata: Metadata = { title, description, alternates: { canonical: "https://www.code-v.fr/mentions-legales" }, robots: { index: false, follow: true }, openGraph: { title, description, url: "https://www.code-v.fr/mentions-legales", type: "website", locale: "fr_FR" } };
export default function LegalPage() {
 return <><header className={styles.hero}><div className="container"><Breadcrumb {...getPageBreadcrumb("/mentions-legales")} /><h1>Mentions légales</h1><p>Informations relatives au site www.code-v.fr et à son utilisation.</p></div></header><div className={styles.body}>
 <section><h2>Éditeur du site</h2><p>Le site code-v.fr est édité par Adrien Weissenbacher, entrepreneur individuel (EI), sous le nom commercial CODE-V.</p><address>142 rue de Rivoli<br />75001 Paris<br />France<br />Email : <a href="mailto:contact@code-v.fr">contact@code-v.fr</a><br />Téléphone : <a href="tel:+33666672709">06 66 67 27 09</a></address><p>SIREN : 912 773 447<br />SIRET : 912 773 447 00038<br />Code APE : 6201Z — Programmation informatique<br />Activité principale : Programmation informatique</p></section>
 <section><h2>Directeur de publication</h2><p>Adrien Weissenbacher.</p></section>
 <section><h2>Hébergement</h2><p>Le site est hébergé par Vercel Inc.</p><address>Adresse de contact publiée par Vercel :<br />440 N Barranca Avenue #4133<br />Covina, CA 91723, États-Unis.</address><p><a href="https://vercel.com/legal/privacy-notice">Informations officielles de Vercel</a> · <a href="https://vercel.com/help">Assistance Vercel</a></p></section>
 <section><h2>Propriété intellectuelle</h2><p>Les textes, créations graphiques, vidéos et éléments de marque présentés sur ce site sont protégés selon les droits applicables. Les marques et contenus appartenant à des tiers restent soumis aux droits de leurs titulaires.</p><p>Pour toute demande de réutilisation d’un contenu, contactez CODE-V afin de vérifier les autorisations nécessaires.</p></section>
 <section><h2>Responsabilité</h2><p>Le contenu présente les activités et approches de CODE-V. Le périmètre d’une prestation, ses livrables et ses conditions sont précisés dans les échanges et documents contractuels correspondants.</p><p>Si vous constatez une erreur ou un problème d’accès, vous pouvez le signaler à <a href="mailto:contact@code-v.fr">contact@code-v.fr</a>. Le fonctionnement du site peut être affecté par des opérations de maintenance ou des incidents techniques.</p></section>
 <section><h2>Données personnelles</h2><p>Le formulaire et le chatbot traitent les informations que vous leur transmettez. Les outils de mesure et services techniques sont décrits dans notre <Link href="/politique-confidentialite">politique de confidentialité</Link>, avec les moyens d’exercer vos droits.</p></section>
 <section><h2>Liens externes</h2><p>Des liens permettent de consulter des sites de réalisations, des publications et des sources externes. Le contenu et les pratiques de ces sites relèvent de leurs propres éditeurs.</p></section>
 <section><h2>Droit applicable</h2><p>L’utilisation de ce site est soumise au droit français, sous réserve des dispositions impératives applicables.</p></section>
 </div></>;
}
