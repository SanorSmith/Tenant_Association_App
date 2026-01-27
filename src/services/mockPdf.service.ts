import type { Document } from '../types';

export function generateDocumentPDF(document: Document): Promise<Blob> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pdfContent = `Mock PDF for: ${document.title}\n\nDocument Type: ${document.documentType}\nStatus: ${document.status}\nVersion: ${document.version}`;
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      resolve(blob);
    }, 1500);
  });
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function mockDownloadDocument(document: Document) {
  const blob = await generateDocumentPDF(document);
  const filename = `${document.title.replace(/\s+/g, '_')}.pdf`;
  downloadPDF(blob, filename);
  return { success: true, message: 'PDF nedladdad' };
}
