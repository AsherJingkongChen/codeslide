export type PageSize = keyof typeof PageSize;

export const PageSize = {
  letter: true,
  legal: true,
  tabloid: true,
  ledger: true,
  a0: true,
  a1: true,
  a2: true,
  a3: true,
  a4: true,
  a5: true,
  a6: true,
} as const;

export const isPageSize = (
  raw: string
): raw is PageSize => raw in PageSize;
