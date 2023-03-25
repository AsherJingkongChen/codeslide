import {
  Accessor,
  Setter,
  Component,
  createSignal,
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
  public readonly getClassName: Accessor<string>;
  public readonly getClass: Accessor<IStyle>;
  public readonly setClass: Setter<IStyle>;

  private static _Id: bigint = 0n;

  constructor(name: string) {
    this.id = (++State._Id).toString();

    [this.getClass, this.setClass] = createSignal({});

    this.getClassName = () => (
      `${name} ${ renderDynamicStyle(this.getClass()) }`
    );
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
