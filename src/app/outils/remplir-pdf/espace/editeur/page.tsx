import { currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { pdfAuthConfigured, hasVerifiedEmail, PDF_SIGN_IN } from '@/lib/pdf/access';
import PdfEditor from '../../PdfEditor';
import styles from '../../pdf.module.css';
export default async function Page() {
  if (!pdfAuthConfigured()) return null;
  const user = await currentUser();
  if (!user) redirect(PDF_SIGN_IN);
  if (!hasVerifiedEmail(user)) return <section className={styles.notice}><h1>Vérifiez votre adresse e-mail.</h1><p>Ouvrez votre compte pour vérifier votre adresse, puis rechargez cette page.</p><UserButton /></section>;
  return <PdfEditor account={<UserButton />} />;
}
