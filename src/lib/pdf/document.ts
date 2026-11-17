import { PDFDocument, PDFName, PDFDict, PDFSignature, concatTransformationMatrix, pushGraphicsState, popGraphicsState } from 'pdf-lib';
export const MAX_PDF_BYTES = 25 * 1024 * 1024;
export const MAX_PAGES = 100;
export type Placement = { id: string; page: number; x: number; y: number; width: number; height: number; image: string; label: string };
export type PageGeometry = { width: number; height: number; transform: number[] };
export async function inspectPdf(bytes: Uint8Array) {
  if (bytes.length > MAX_PDF_BYTES) throw new Error('Le PDF dépasse la limite de 25 Mo.');
  let doc: PDFDocument;
  try { doc = await PDFDocument.load(bytes, { updateMetadata: false }); }
  catch { throw new Error('Ce fichier est illisible ou protégé par un mot de passe. Utilisez un PDF non chiffré.'); }
  if (doc.getPageCount() > MAX_PAGES) throw new Error('Ce PDF dépasse la limite de 100 pages.');
  // Check both canonical fields and orphaned signature dictionaries.
  const signed = doc.getForm().getFields().some(field => field instanceof PDFSignature) || doc.context.enumerateIndirectObjects().some(([, value]) => value instanceof PDFDict && (value.has(PDFName.of('ByteRange')) || value.get(PDFName.of('Type')) === PDFName.of('Sig')));
  if (signed) throw new Error('Ce document contient une signature numérique. Importez une copie non signée pour préserver sa validité.');
  return doc;
}
/** Convert image coordinates (bottom-left) into original PDF user space.
 * PDF.js viewport includes CropBox offset, UserUnit and all four rotations. */
export function overlayMatrix({ height, transform: [a,b,c,d,e,f] }: PageGeometry): [number,number,number,number,number,number] {
  const det = a*d-b*c;
  if (!Number.isFinite(det) || det === 0) throw new Error('Géométrie de page invalide.');
  return [d/det, -b/det, c/det, -a/det, (-d*e-c*(height-f))/det, (b*e+a*(height-f))/det];
}
export async function exportFilledPdf(bytes: Uint8Array, placements: Placement[], geometries: Record<number, PageGeometry>) {
  const doc = await inspectPdf(bytes);
  for (const item of placements) {
    const geometry = geometries[item.page];
    if (!geometry || item.page < 1 || item.page > doc.getPageCount()) throw new Error('Une page doit être rechargée avant l’export.');
    const image = await doc.embedPng(item.image);
    const page = doc.getPage(item.page-1);
    page.pushOperators(pushGraphicsState(), concatTransformationMatrix(...overlayMatrix(geometry)));
    page.drawImage(image, { x: item.x, y: geometry.height-item.y-item.height, width: item.width, height: item.height });
    page.pushOperators(popGraphicsState());
  }
  return doc.save({ updateFieldAppearances: false });
}
export function clampPlacement(item: Placement, geometry: PageGeometry): Placement {
  const ratio = Math.min(1, geometry.width/item.width, geometry.height/item.height);
  const width = item.width*ratio, height = item.height*ratio;
  return { ...item, width, height, x: Math.max(0, Math.min(item.x, geometry.width-width)), y: Math.max(0, Math.min(item.y, geometry.height-height)) };
}
