import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';
import Link from 'next/link';
import { pdfAuthConfigured, PDF_BASE, PDF_EDITOR, PDF_SIGN_IN, PDF_SIGN_UP } from '@/lib/pdf/access';
import styles from '../pdf.module.css';
export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default function Layout({ children }: { children: React.ReactNode }) {
  if (!pdfAuthConfigured()) return <section className={styles.notice}><p className={styles.eyebrow}>CODE-V PDF</p><h1>L’espace ouvrira bientôt.</h1><p>La connexion sécurisée est en cours de préparation. Aucun document ne peut être importé pour le moment.</p><Link href={PDF_BASE}>Découvrir l’outil PDF →</Link></section>;
  return <ClerkProvider localization={frFR} signInUrl={PDF_SIGN_IN} signUpUrl={PDF_SIGN_UP} signInForceRedirectUrl={PDF_EDITOR} signUpForceRedirectUrl={PDF_EDITOR}>{children}</ClerkProvider>;
}
