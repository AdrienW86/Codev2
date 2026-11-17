import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { pdfAuthConfigured, PDF_SIGN_UP, PDF_SIGN_IN, PDF_EDITOR } from '@/lib/pdf/access';
import styles from '../../../pdf.module.css';
export default function Page() {
  if (!pdfAuthConfigured()) return null;
  return <section className={styles.auth}><h1>Un compte. Des papiers plus simples.</h1><p>Le compte protège l’accès. Vos PDF restent sur votre appareil.</p><SignUp routing="path" path={PDF_SIGN_UP} signInUrl={PDF_SIGN_IN} forceRedirectUrl={PDF_EDITOR} /><p>Les données de compte sont gérées par Clerk. <Link href="/politique-confidentialite">Confidentialité</Link>.</p></section>;
}
