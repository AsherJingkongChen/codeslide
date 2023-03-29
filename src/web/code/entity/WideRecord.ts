export type WideRecord<T> = Record<
  | keyof T
  | symbol
  | (string & {})
  | (number & {}),
  T[keyof T]
>;

export const WideRecord = <T extends WideRecord<T>>(
  x: T
): WideRecord<T> => x;
