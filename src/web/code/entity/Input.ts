import {
  SlideItem
} from './Slide';

export type Input = {
  output?: string | null,
  slide?: {
    [path: string]: {
      [P in keyof SlideItem]: SlideItem[P];
    };
  } | null,
};
