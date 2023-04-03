import {
  Direction,
  Slide,
  SlideItem,
  WideRecord
} from '../entity';
import {
  State
} from './State';

export class SlideNavigatorState extends State {
  public slide: Slide;
  public item: SlideItem | undefined;

  public beforeNavigation?: (
    ev: KeyboardEvent | PointerEvent
  ) => Direction | undefined;

  public afterNavigation?: (
    item: SlideItem
  ) => void;

  constructor(slide: Record<string, SlideItem>) {
    super();
    this.slide = new Slide(Object.entries(slide));
    this.item = this.slide.values().next().value;
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