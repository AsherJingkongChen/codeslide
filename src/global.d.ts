declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare type WithoutMethods<T> = 
  Pick<
    T,
    {
      [K in keyof T]:
        T[K] extends Function
          ? never
          : K
    }[keyof T]
  >;