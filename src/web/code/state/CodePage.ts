import {
  State
} from './State';
import {
  Accessor,
  createSignal,
  Setter,
} from 'solid-js';

export class CodePageState extends State {
  public getText: Accessor<string>;
  public setText: Setter<string>;

  constructor() {
    super();
    [this.getText, this.setText] = createSignal('');
  }
}