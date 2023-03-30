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
  public get slide(): Slide {
    return this.slides[this.path];
  }

  constructor() {
    super();
    this.path = '';
    this.slides = {};
  }

  public readonly navigate = (
    ev: KeyboardEvent
  ): boolean => {

    if (! sameModifier(ev, {})) {
      return false;
    }

    let dir: Direction | undefined;
    if (ev.type === 'keydown') {
      dir = _dirmap[(ev as KeyboardEvent).code];
    }

    const nextpath = dir && this.slide[dir];
    if (! nextpath) {
      return false;
    }

    this.path = nextpath;
    return true;
  };
}

const _dirmap = WideRecord({
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  Space: 'right',
} as const);