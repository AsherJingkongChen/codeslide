declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare type SplitHead<T extends unknown[]> =
  T extends [infer I, ...infer L] ? [I, L] : never;

declare type SplitTail<T extends unknown[]> =
  T extends [...infer I, infer L] ? [I, L] : never;
