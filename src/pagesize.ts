export type Pagesize = keyof typeof Pagesize;

export const Pagesize = {
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

export const isPagesize = (
  raw: string
): raw is Pagesize => raw in Pagesize;
