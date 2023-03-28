import {
  Accessor,
  Setter,
  Component,
  createSignal,
  createEffect,
  createRoot,
  on
} from 'solid-js';
import {
  createRenderer,
  IStyle,
} from 'fela';
import {
  render,
} from 'fela-dom';

export class State {
  public readonly id: string;
  public getView: Accessor<HTMLElement>;
  public setView: Setter<HTMLElement>;

  private static _Id: bigint = 0n;

  constructor() {
    this.id = (++State._Id).toString();

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

export type View<Props extends { state: State; }> =
  Component<Props>;

const _dynamicStyleRenderer = createRenderer();
render(_dynamicStyleRenderer);

const _staticStyleRenderer = createRenderer();
render(_staticStyleRenderer);

const _rule = (props: IStyle): IStyle => props;
export const renderDynamicStyle = (props: IStyle) => (
  _dynamicStyleRenderer.renderRule(_rule, props)
);

export const renderStaticStyle =
  _staticStyleRenderer.renderStatic;

export const clearDynamicStyle =
  _dynamicStyleRenderer.clear;

export const clearStaticStyle =
  _staticStyleRenderer.clear;
