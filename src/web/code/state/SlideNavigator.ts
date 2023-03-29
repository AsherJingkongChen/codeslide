import {
  Direction,
  Slide,
  SlideList,
  WideRecord
} from '../entity';
import {
  sameModifier
} from '../tool';
import {
  State
} from './State';

export class SlideNavigatorState extends State {
  public path: string;
  public slides: SlideList;

  constructor() {
    super();
    this.path = '';
    this.slides = {};
  }

  public readonly getSlide = (
    path?: string
  ): Slide => (
    this.slides[path ?? this.path]
  );

  public readonly navigate = (
    ev: KeyboardEvent
  ): Slide | undefined => {

    if (! sameModifier(ev, {})) {
      return;
    }

    let dir: Direction | undefined;
    if (ev.type === 'keydown') {
      dir = _dirmap[(ev as KeyboardEvent).code];
    }

    const nextpath = dir && this.getSlide()[dir];
    console.log({ nextpath });
    if (! nextpath) { return; }

    this.path = nextpath;
    return this.getSlide(nextpath);
  };
}

const _dirmap = WideRecord({
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  Space: 'right',
} as const);