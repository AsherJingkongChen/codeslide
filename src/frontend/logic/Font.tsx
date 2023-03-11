import { createSignal, Setter } from 'solid-js';

export type FontFamilyLike = string | string[];

export function parseFontFamily(
  value: FontFamilyLike
): string {

  return (typeof value === 'string')
    ? value
    : value.join(',');
}

export function createFontFamilySignal(
  value: FontFamilyLike
): [
  () => string,
  (v: Arguments<Setter<FontFamilyLike>>) => string
] {

  const [get, set] =
    createSignal(parseFontFamily(value));

  return [
    get,
    (v: Arguments<Setter<FontFamilyLike>>) => (
      (typeof v === 'function')
        ? set(parseFontFamily(v(get())))
        : set(parseFontFamily(v))
    )
  ];
}

export type FontSizeLike =
  string | [string | number, string] | number;

export function parseFontSize(
  value: FontSizeLike
): string {

  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return `${value}px`;
  } else {
    return `${value[0]}${value[1]}`;
  }
}

export function createFontSizeSignal(
  value: FontSizeLike
): [
  () => string,
  (v: Arguments<Setter<FontSizeLike>>) => string
] {

  const [get, set] =
    createSignal(parseFontSize(value));

  return [
    get,
    (v: Arguments<Setter<FontSizeLike>>) => (
      (typeof v === 'function')
        ? set(parseFontSize(v(get())))
        : set(parseFontSize(v))
    )
  ];
}

export type FontWeightLike = string | number;

export function parseFontWeight(
  value: FontWeightLike
): string {

  return (typeof value === 'string')
    ? value
    : value.toString();
}

export function createFontWeightSignal(
  value: FontWeightLike
): [
  () => string,
  (v: Arguments<Setter<FontWeightLike>>) => string
] {

  const [get, set] =
    createSignal(parseFontWeight(value));

  return [
    get,
    (v: Arguments<Setter<FontWeightLike>>) => (
      (typeof v === 'function')
        ? set(parseFontWeight(v(get())))
        : set(parseFontWeight(v))
    )
  ];
}
