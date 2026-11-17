import { redirect } from 'next/navigation';
import { PDF_EDITOR } from '@/lib/pdf/access';
export default function Page() { redirect(PDF_EDITOR); }
