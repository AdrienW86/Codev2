import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getPageBreadcrumb } from '@/data/breadcrumbs';
import { defaultShareImages } from '@/lib/seo';
import { PDF_EDITOR } from '@/lib/pdf/access';
import styles from './pdf.module.css';
export const metadata: Metadata = {
  title: 'Remplir un PDF en ligne : texte, coches et signature | CODE-V',
  description: 'Complétez vos PDF et formulaires scannés : ajoutez du texte, cochez des cases, apposez une signature ou un tampon. Traitement sur votre appareil, sans inscription.',
  alternates: { canonical: 'https://www.code-v.fr/outils/remplir-pdf' },
  openGraph: { images: defaultShareImages, title: 'Vos PDF remplis, simplement. | CODE-V PDF', description: 'Texte, coches, dates, signature et tampon. Vos documents restent sur votre appareil.', url: 'https://www.code-v.fr/outils/remplir-pdf' },
};
export default function Page() {
  return <div className={styles.landing}>
    <section className={styles.hero}><div><Breadcrumb {...getPageBreadcrumb("/outils/remplir-pdf")} /><p className={styles.eyebrow}>LES OUTILS CODE-V / PDF</p><h1>Moins de papier.<br /><em>Plus de simplicité.</em></h1><p className={styles.lead}>Un formulaire à compléter ? Un devis à signer ? Ajoutez vos informations au bon endroit, puis repartez avec votre PDF rempli.</p><div className={styles.actions}><Link className={styles.primary} href={PDF_EDITOR}>Remplir mon PDF <span>↗</span></Link></div><p className={styles.subtle}>Gratuit · Sans inscription · Sans installation · Aucun PDF envoyé sur nos serveurs</p></div>
      <div className={styles.demo} aria-label="Exemple de formulaire rempli"><div className={styles.demoTop}><span>APERÇU / DOCUMENT EXEMPLE</span><span>PDF</span></div><h2>Tout est à sa place.</h2><p>COORDONNÉES DU CLIENT</p><div className={styles.mockField}><small>Nom et prénom</small><strong>Camille Martin</strong></div><div className={styles.mockField}><small>Date</small><strong>17 / 11 / 2026</strong></div><p className={styles.mockCheck}>✓ <span>Informations vérifiées</span></p><div className={styles.mockSignature}>Camille Martin</div><span className={styles.demoBadge}>✓ Prêt à télécharger</span></div>
    </section>
    <section className={styles.section}><p className={styles.eyebrow}>VOTRE DOCUMENT, VOS INFORMATIONS</p><h2>Les bons outils.<br />Juste ce qu’il faut.</h2><div className={styles.cards}>{[['Aa', 'Écrire librement', 'Nom, adresse, montant ou mention : ajoutez du texte, même sur un formulaire scanné.'], ['✓', 'Cocher et dater', 'Placez une coche, une croix ou la date du jour sans imprimer votre document.'], ['↗', 'Signer et tamponner', 'Dessinez une signature ou importez une image de signature ou de tampon.']].map(([icon,title,body])=><article key={title}><span>{icon}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className={styles.steps}><div><p className={styles.eyebrow}>DE L’IMPORT AU TÉLÉCHARGEMENT</p><h2>Trois étapes.<br /><em>Et c’est rempli.</em></h2></div><ol><li><strong>01 — Ouvrez votre PDF</strong><p>Choisissez un document sur votre appareil. Aucun compte à créer.</p></li><li><strong>02 — Ajoutez vos informations</strong><p>Sélectionnez un outil, cliquez sur la page et ajustez la position ou la taille.</p></li><li><strong>03 — Téléchargez votre copie</strong><p>Vos ajouts sont inscrits dans une nouvelle copie. Le fichier d’origine reste intact.</p></li></ol></section>
    <section className={styles.section}><h2>Vos questions, simplement.</h2>{[
      ['Puis-je remplir un PDF scanné ?', 'Oui. Vous placez du texte et des coches par-dessus les pages, sans modifier leur contenu d’origine.'],
      ['Où sont envoyés mes documents ?', 'Le contenu des PDF, signatures et tampons est traité dans votre navigateur. Il n’est pas transmis à nos serveurs.'],
      ['Mes documents sont-ils conservés ?', 'Non. Le document et les ajouts restent en mémoire pendant la session. Téléchargez votre copie avant de fermer ou de recharger la page.'],
      ['Comment ajouter une signature ?', 'Dessinez-la à la souris ou au doigt, ou importez une image PNG ou JPEG. L’outil appose une image : il ne fournit pas de certificat ni de parcours de signature électronique qualifiée.'],
      ['Quels fichiers sont acceptés ?', 'Les PDF non chiffrés, jusqu’à 25 Mo et 100 pages. Les fichiers protégés ou déjà signés numériquement sont refusés pour éviter d’altérer leurs protections.'],
    ].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <section className={styles.cta}><h2>Vos documents, sans détour.</h2><Link className={styles.primary} href={PDF_EDITOR}>Commencer avec mon PDF ↗</Link><p>Vous souhaitez simplifier d’autres tâches dans votre entreprise ? <Link href="/solutions/automatisation-ia">Découvrez les solutions CODE-V.</Link></p></section>
  </div>;
}
