import {
  Accessor,
  createSignal,
  Setter,
} from 'solid-js';

export class State {
  public getView: Accessor<HTMLElement>;
  public setView: Setter<HTMLElement>;

  constructor() {
    // fake dom
    [this.getView, this.setView] = createSignal(
      document.createElement('div')
    );
  }
}
