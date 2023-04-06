import {
  Page,
  Slide,
  WideRecord
} from '../entity';
import {
  State
} from './State';

export class SlideNavigatorState extends State {
  private _pageNumber: number;

  public get page(): Page | undefined {
    return this._slide[this._pageNumber];
  }

  // receive the number of pages to navigate
  public readonly setPage: (
    by: number
  ) => Page | undefined;

  private _slide: Slide;

  public get slide(): Readonly<Slide> {
    return this._slide;
  }

  public readonly setSlide: (
    slide?: Slide
  ) => Readonly<Slide>;

  // give the number of pages to navigate
  public onNavigation?: (
    ev: KeyboardEvent | PointerEvent
  ) => number | undefined;

  public afterNavigation?: (
    page: Page
  ) => void;

  constructor() {
    super();
    this._slide = [];
    this._pageNumber = 0;
    this.setSlide = (slide) => {
      this._slide = slide ?? [];
      this._pageNumber = 0;
      return this._slide;
    };
    this.setPage = (by) => {
      const nextPageNumber = this._pageNumber + by;
      const nextPage = this._slide[nextPageNumber];
      if (nextPage) {
        this._pageNumber = nextPageNumber;
      }
      return nextPage;
    };
  }
}

// Map KeyboardEvent.code to the number of pages to navigate
export const SlideNavigatorBaseDirmap = WideRecord({
  ArrowUp: -1,
  ArrowRight: +1,
  ArrowDown: +1,
  ArrowLeft: -1,
  Space: +1,
} as const);
