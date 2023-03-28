import {
  ConstantMap
} from './ConstantMap';

export type Direction =
| 'up' | 'right' | 'down' | 'left';

export const Direction: ConstantMap<true> = {
  up: true,
  right: true,
  down: true,
  left: true,
};
