import {
  Direction
} from './Direction';

export type SlideList =
  Record<string, Slide>;

export type Slide =
& Code
& Partial<Record<Direction, string>>;

export type Code = {
  path: string;
  text: string;
};
