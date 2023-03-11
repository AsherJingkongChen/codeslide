import {
  createFontFamilySignal,
  createFontSizeSignal,
  createFontWeightSignal
} from '../logic';

const [family, setFamily] =
  createFontFamilySignal('Noto Sans Mono, monospace');

const [size, setSize] =
  createFontSizeSignal('1rem');

const [weight, setWeight] =
  createFontWeightSignal('400');

export const baseFont = {
  family,
  setFamily,
  size,
  setSize,
  weight,
  setWeight
};
