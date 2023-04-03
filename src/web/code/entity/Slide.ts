import {
  Direction
} from './Direction';

export type Slide = Map<string, SlideItem>;
export const Slide = Map<string, SlideItem>;

export type SlideItem =
& {
    path: string;
    text: string;
  }
& Partial<Record<Direction, string | null>>;
