export type Layout = keyof typeof Layout;

export const Layout = {
  'pdf': true,
  'pdf_letter': true,
  'pdf_legal': true,
  'pdf_tabloid': true,
  'pdf_ledger': true,
  'pdf_a0': true,
  'pdf_a1': true,
  'pdf_a2': true,
  'pdf_a3': true,
  'pdf_a4': true,
  'pdf_a5': true,
  'pdf_a6': true,
  'scroll': true,
  'slide': true,
  'slide_loop': true, 
} as const;

export const isLayout = (
  raw: string
): raw is Layout => raw in Layout;

export type PdfFormat =
| 'letter'
| 'legal'
| 'tabloid'
| 'ledger'
| 'a0'
| 'a1'
| 'a2'
| 'a3'
| 'a4'
| 'a5'
| 'a6';

export const getPdfFormat = (
  layout: Layout
): PdfFormat | undefined => {
  let [prefix, suffix] = 
    layout.split('_') as [string, string | undefined];
  return prefix === 'pdf'
    ? ((suffix ?? 'a4') as PdfFormat)
    : undefined;
};
