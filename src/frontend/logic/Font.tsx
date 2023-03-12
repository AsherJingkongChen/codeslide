import { Property, DataType } from 'csstype';
import { LengthUnits } from '../model';

export type FontFamilyLike
  <S extends string = string> =
  | S
  | Property.FontFamily
  | (S | DataType.GenericFamily)[];

export type FontSizeLike =
  | Property.FontSize
  | [number, LengthUnits]
  | number;

export type FontWeightLike =
  Property.FontWeight;

export function parseFontFamily
  <S extends Property.FontFamily = Property.FontFamily>(
  value: FontFamilyLike<S>
): string {

  return (typeof value === 'string')
    ? value
    : value.join(', ');
}

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

export function parseFontWeight(
  value: FontWeightLike
): string {

  return (typeof value === 'string')
    ? value
    : value.toString();
}
