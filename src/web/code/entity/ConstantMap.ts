export type ConstantMap<V> =
  Readonly<Partial<Record<keyof any, V>>>;
