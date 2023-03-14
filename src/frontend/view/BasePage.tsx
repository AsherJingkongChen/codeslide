// import { styleRenderer } from '../model/Base';
import { TRule } from 'fela';
import { Property } from 'csstype';
import { createSignal } from 'solid-js';
import {
  Accessor,
  children,
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  Setter,
  splitProps
} from 'solid-js';
import { styleRenderer } from '../model';

export class BasePage {
  public static class = 'BasePage';

  public id: string;
  public style:
    Accessor<JSX.CSSProperties>;
  public setStyle:
    Setter<JSX.CSSProperties>;

  public class: Accessor<string>;
  private _setClass: Setter<string>;

  constructor({
    id
  }: WithoutMethods<BasePage>) {

    this.id = id;
    [this.style, this.setStyle] = createSignal({
      'background-color': 'black',
      'color': 'white',
      'height': '100%',
      'width': '100%',
    });
    [this.class, this._setClass] = createSignal('');

    this.setClass({
      fontSize: 19
    });
  }

  public view = (props: BasePageProps): JSXElement => {
    onMount(() => console.log('BasePage:mount'));
    onCleanup(() => console.log('BasePage:cleanup'));

    const [pickProps, restProps] =
      splitProps(props, ...splitPropsList);

    const getChildren =
      children(() => pickProps.children);

    const classNames = [
      BasePage.class,
      pickProps.class ?? ''
    ].join(' ');

    return (
      <div
        { ...restProps }
        class={
          classNames +
          this.class() // works
        }
        style={ this.style() }
      >
        { getChildren() }
      </div>
    );
  }

  private _rule = (props: { fontSize: number }) => ({ // rule as property
    fontSize: props.fontSize
  });

  public setClass = (props: { fontSize: number }) => { // Inteface extends TRuleProps
    styleRenderer.web.clear(); // Renderer per component
    this._setClass(
      styleRenderer.web.renderRule(
        this._rule,
        props
      )
    );
  }
}

export type BasePageProps =
& Partial<
  & JSX.HTMLAttributes<HTMLDivElement>
  >;

export type BasePageRule = TRule<{
  'backgroundColor': Property.BackgroundColor,
  'color': Property.Color,
  'height': Property.Height,
  'width': Property.Width,
}>;

export const createBasePageRule: () => BasePageRule = 
  () => (
    (props) => ({
      'backgroundColor': props.backgroundColor,
      'color': props.color,
      'height': props.height,
      'width': props.width,
    })
  );

const splitPropsList = [
  [
    'children',
    'class',
  ]
] as const;
