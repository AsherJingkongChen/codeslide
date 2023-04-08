import {
  WideRecord
} from '../entity';
import {
  State
} from './State';

export class SlideNavigatorState extends State {
  // give the page of number
  public readonly getPage: (
  ) => Slide[number] | undefined;

  // receive the number of pages to navigate
  public readonly setPage: (
    by: number
  ) => Slide[number] | undefined;

  private _pageNumber: number;

  // give the number of pages to navigate
  public onNavigation?: (
    ev: KeyboardEvent | TouchEvent
  ) => number | undefined;

  public afterNavigation?: (
    page: Slide[number]
  ) => void;

  constructor(options: {
    looping: boolean;
    slide: Slide;
  }) {
    super();
    this._pageNumber = 0;
    this.getPage = () => (
      options.slide[this._pageNumber]
    );
    this.setPage = (by) => {
      const pageCount = options.slide.length;
      const nextPageNumber = options.looping
        ? (pageCount + this._pageNumber + by) % pageCount
        : (this._pageNumber + by);
      const nextPage = options.slide[nextPageNumber];
      if (nextPage) {
        this._pageNumber = nextPageNumber;
      }
      return nextPage;
    };
  }
}

export type Slide = Array<{
  text: string;
  title: string;
}>;

// Map KeyboardEvent.code to the number of pages to navigate
export const SlideNavigatorDirmap = WideRecord({
  ArrowUp: -1,
  ArrowRight: +1,
  ArrowDown: +1,
  ArrowLeft: -1,
  Space: +1,
} as const);
