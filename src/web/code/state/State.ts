import {
  Accessor,
  createSignal,
  createEffect,
  createRoot,
  Setter,
  on,
} from 'solid-js';

export class State {
  public readonly id: string;
  public getView: Accessor<HTMLElement>;
  public setView: Setter<HTMLElement>;

  private static _Id: bigint = 0n;

  constructor() {
    this.id = `_${++State._Id}`;

    // fake dom
    [this.getView, this.setView] = createSignal(
      document.createElement('div')
    );

    // [TODO] dispose
    createRoot(() => {
      createEffect(on(
        this.getView,
        (view) => { view.id = this.id; }
      ));
    });
  }
}
