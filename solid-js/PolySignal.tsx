import {
  createSignal,
  Setter,
  createMemo,
  Accessor,
  SignalOptions
} from 'solid-js';

export type PolySignal<T, U extends T> =
  [PolyAccessor<T, U>, PolySetter<T, U>];

export type PolyAccessor<T, U extends T> =
  Accessor<U>;

export type PolySetter<T, _ extends T> =
  Setter<T>;

export type PolyMapper<T, U extends T> =
  (v: T) => U;

export function createPolySignal
  <T, U extends T>(
  mapper: PolyMapper<T, U>,
  value: T,
  options?: SignalOptions<T>
): PolySignal<T, U> {

  const [getValue, setValue] =
    createSignal(value, options);

  return [
    createMemo(() => mapper(getValue()), options),
    setValue
  ];
}
