import { createMixedSignal } from '../../../solid-js';
import {
  FontFamilyLike,
  FontSizeLike,
  FontWeightLike,
  parseFontFamily,
  parseFontSize,
  parseFontWeight
} from '../logic';

const [family, setFamily] =
  createMixedSignal
    <BaseFontFamily, string>(
    parseFontFamily,
    ['Noto Sans Mono', 'monospace']
  );

const [size, setSize] =
  createMixedSignal
    <FontSizeLike, string>(
    parseFontSize,
    'medium'
  );

const [weight, setWeight] =
  createMixedSignal
    <FontWeightLike, string>(
    parseFontWeight,
    'normal'
  );

export type BaseFontFamily =
  FontFamilyLike<
  | 'Noto Sans Mono'
  >;

export const baseFont = {
  family,
  setFamily,
  size,
  setSize,
  weight,
  setWeight
};
