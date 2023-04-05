import {
  Direction,
  Input,
  Slide,
  SlideItem,
  WideRecord
} from '../entity';
import {
  State
} from './State';

export class SlideNavigatorState extends State {
  private _item: SlideItem | undefined;
  public get item(): SlideItem | undefined {
    return this._item;
  }
  public readonly setItem: (
    path: string | null | undefined
  ) => SlideItem | undefined;

  private _slide: Slide;
  public get slide(): Slide {
    return this._slide;
  }
  public readonly setSlide: (
    slide?: Input['slide']
  ) => Slide;

  public beforeNavigation?: (
    ev: KeyboardEvent | PointerEvent
  ) => Direction | undefined;

  public afterNavigation?: (
    item: SlideItem
  ) => void;

  constructor() {
    super();
    this._slide = new Slide();
    this._item = undefined;
    this.setItem = (path) => {
      if (! path) { return; }
      const item = this.slide.get(path);
      if (item) { this._item = item; }
      return item;
    };
    this.setSlide = (slide) => {
      this._slide = new Slide(Object.entries(slide ?? {}));
      this._item = this.slide.values().next().value;
      return this.slide;
    };
  }
}
export const SlideNavigatorBaseDirmap = WideRecord({
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  Space: 'right',
  0: 'right'
} as const);