import { SignIn } from '@clerk/nextjs';
import { pdfAuthConfigured, PDF_SIGN_IN, PDF_SIGN_UP, PDF_EDITOR } from '@/lib/pdf/access';
import styles from '../../../pdf.module.css';
export default function Page() {
  if (!pdfAuthConfigured()) return null;
  return <section className={styles.auth}><h1>Retrouvez votre outil PDF.</h1><p>Connectez-vous pour remplir vos documents sur votre appareil.</p><SignIn routing="path" path={PDF_SIGN_IN} signUpUrl={PDF_SIGN_UP} forceRedirectUrl={PDF_EDITOR} /></section>;
}
