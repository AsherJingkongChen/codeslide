import {
  createSignal,
  createMemo,
  SignalOptions,
  Accessor,
  Setter
} from 'solid-js';

export type MixedSignal<T, U extends T> =
  [MixedAccessor<T, U>, MixedSetter<T, U>];

export type MixedAccessor<T, U extends T> =
  Accessor<U>;

export type MixedSetter<T, _U extends T> =
  Setter<T>;

export function createMixedSignal<T, U extends T>(
  compute: (v: T) => U,
  value: T,
  options?: SignalOptions<T>
): MixedSignal<T, U> {

  const [getValue, setValue] =
    createSignal(value, options);

  return [
    createMemo(() => compute(getValue()), options),
    setValue
  ];
}
