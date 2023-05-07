export type PageSize = keyof typeof PageSize;

export const PageSize = {
  letter: true,
  legal: true,
  tabloid: true,
  ledger: true,
  A0: true,
  A1: true,
  A2: true,
  A3: true,
  A4: true,
  A5: true,
  A6: true,
} as const;

export const isPageSize = (
  raw: string
): raw is PageSize => raw in PageSize;
