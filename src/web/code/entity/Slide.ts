import {
  Direction
} from './Direction';

export type SlideMap =
  Record<string, Slide>;

export type Slide =
& {
    path: string;
    text: string;
  }
& Partial<Record<Direction, string>>;
