export type WideRecord<T> = OptionalRecord<
  | keyof T
  | symbol
  | (string & {})
  | (number & {}),
  T[keyof T]
>;

export const WideRecord = <T extends WideRecord<T>>(
  x: T
): WideRecord<T> => x;

export type OptionalRecord<K extends keyof any, V> = {
  [P in K]?: V;
};
