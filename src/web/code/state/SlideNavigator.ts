import {
  Direction,
  Slide,
  SlideMap,
  WideRecord
} from '../entity';
import {
  State
} from './State';

export class SlideNavigatorState extends State {
  public path!: string;
  public slides!: SlideMap;
  public get slide(): Slide {
    return this.slides[this.path];
  }

  public beforeNavigation?: (
    ev: KeyboardEvent | PointerEvent
  ) => Direction | undefined;

  public afterNavigation?: (
    slide: Slide
  ) => void;

  constructor() {
    super();
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