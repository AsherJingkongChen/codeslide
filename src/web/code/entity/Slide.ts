import {
  Direction
} from './Direction';
import {
  Chained
} from './Chained';
import {
  sameModifier
} from '../tool';
import {
  ConstantMap
} from './ConstantMap';

export type Code = {
  path: string;
  text: string;
};

export type Slide = Chained<Code, Direction>;

export const getNextSlide = (
  slide: Slide,
  ev: KeyboardEvent | MouseEvent
): Slide | undefined => {
  let dir: Direction | undefined;

  if (! sameModifier(ev, {})) {
    if (ev.type === 'keydown') {
      dir = _dirmap[(ev as KeyboardEvent).code];
    } else if (ev.type === 'mousedown') {
      dir = _dirmap[(ev as MouseEvent).button];
    }
  }
  return dir && slide[dir];
};

const _dirmap: ConstantMap<Direction> = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  Space: 'right',
  0: 'right'
};
