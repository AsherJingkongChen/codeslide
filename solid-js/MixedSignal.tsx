import {
  createSignal,
  SignalOptions,
  Accessor,
  Setter
} from 'solid-js';

export type MixedSignal<T, U extends T> =
  [MixedAccessor<T, U>, MixedMapper<T, U>];

export type MixedAccessor<T, U extends T> =
  Accessor<U>;

export type MixedSetter<T, _U extends T> =
  Setter<T>;

export type MixedMapper<T, U extends T> =
  (v: T) => U;

export const createMixedSignal =
  <T, U extends T>(
  compute: MixedMapper<T, U>,
  value: T,
  options?: SignalOptions<T>
): MixedSignal<T, U> => {

  const [getValue, setValue] =
    createSignal(value, options);

  return [
    () => compute(getValue()),
    setValue
  ];
};
