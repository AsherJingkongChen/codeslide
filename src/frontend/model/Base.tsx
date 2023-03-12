import { createPolySignal } from '../../../solid-js';
import {
  FontFamilyLike,
  FontSizeLike,
  FontWeightLike,
  parseFontFamily,
  parseFontSize,
  parseFontWeight
} from '../logic';

const [family, setFamily] =
  createPolySignal
    <BaseFontFamily, string>(
    parseFontFamily,
    ['Noto Sans Mono', 'monospace']
  );

const [size, setSize] =
  createPolySignal
    <FontSizeLike, string>(
    parseFontSize,
    'medium'
  );

const [weight, setWeight] =
  createPolySignal
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
