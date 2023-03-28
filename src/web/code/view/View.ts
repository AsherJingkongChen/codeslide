import {
  Component,
} from 'solid-js';
import {
  State
} from '../state/State';

export type View<
  T extends { state: State; }
> = Component<T>;
