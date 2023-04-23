export type Layout = keyof typeof Layout;

export const Layout = {
  pdf: true,
  scroll: true,
  slide: true,
} as const;

export const isLayout = (
  raw: string
): raw is Layout => raw in Layout;
