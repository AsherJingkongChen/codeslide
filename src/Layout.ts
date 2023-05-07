export type Layout = keyof typeof Layout;

export const Layout = {
  'horizontal': true,
  'vertical': true,
} as const;

export const isLayout = (
  raw: string
): raw is Layout => raw in Layout;
