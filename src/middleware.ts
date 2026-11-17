import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';
import { pdfAuthConfigured, PDF_SIGN_IN, PDF_SIGN_UP } from './lib/pdf/access';
const withClerk = clerkMiddleware({ signInUrl: PDF_SIGN_IN, signUpUrl: PDF_SIGN_UP });
export default function middleware(request: NextRequest, event: NextFetchEvent) {
  // The server page also fails closed when credentials are absent.
  if (!pdfAuthConfigured()) return NextResponse.next();
  return withClerk(request, event);
}
export const config = { matcher: ['/outils/remplir-pdf/espace/:path*'] };
