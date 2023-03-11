// import Text from '../css/Text.module.less';
import Color from '../css/Color.module.less';
import Layout from '../css/Layout.module.less';
import { baseFont } from '../model';
import {
  children,
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  splitProps
} from 'solid-js';

export function BasePage(
  props: BasePageProps
): JSXElement {

  onMount(() => console.log('BasePage:mount'));
  onCleanup(() => console.log('BasePage:cleanup'));

  const [pickProps, restProps] =
    splitProps(props, ...splitPropsList);

  const getChildren =
    children(() => pickProps.children);

  return (
    <div
      { ...restProps }
      class={
        `BasePage ` +
        `${Color.BasicDarkTheme} ` +
        `${Layout.FullScreen} ` +
        `${pickProps.class ?? ''}`
      }
      style={{
        'font-family': baseFont.family(),
        'font-size': baseFont.size(),
        'font-weight': baseFont.weight()
      }}
    >
      { getChildren() }
    </div>
  );
}

export type BasePageProps =
& Partial<
    & JSX.HTMLAttributes<HTMLDivElement>
  >;

const splitPropsList = [
  [
    'children',
    'class'
  ]
] as const;
