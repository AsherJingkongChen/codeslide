export type Chained<
  T extends {},
  U extends keyof any,
> =
& { [P in keyof T]: T[P]; }
& { [K in U]?: Chained<T, U>; };

export type WeakChained<
  T extends {},
  U extends keyof any,
  V
> =
& { [P in keyof T]: T[P]; }
& { [K in U]?: V; };
