export type Format = keyof typeof Format;

export const Format = {
  html: true,
  pdf: true,
} as const;

export const isFormat = (
  raw: string
): raw is Format => raw in Format;
