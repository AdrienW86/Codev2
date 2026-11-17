export const PDF_BASE = '/outils/remplir-pdf';
export const PDF_EDITOR = `${PDF_BASE}/espace/editeur`;
export const PDF_SIGN_IN = `${PDF_BASE}/espace/connexion`;
export const PDF_SIGN_UP = `${PDF_BASE}/espace/inscription`;
export function pdfAuthConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
}
export function hasVerifiedEmail(user: { emailAddresses: { verification: { status: string | null } | null }[] } | null) {
  return Boolean(user?.emailAddresses.some(email => email.verification?.status === 'verified'));
}
