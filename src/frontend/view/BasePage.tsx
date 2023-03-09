import Text from '../css/Text.module.css';
import Color from '../css/Color.module.css';
import Layout from '../css/Layout.module.css';
import { children, JSX, JSXElement } from 'solid-js';

export function BasePage(
  props: BasePageProps
): JSXElement {

  const getChildren = children(() => props.children);

  return (
    <div
      { ...props }
      class={
        `${Text.Medium} ` +
        `${Text.MonoNormal} ` +
        `${Color.DefaultDark} ` +
        `${Layout.FullScreen} ` +
        (props.class ?? '')
      }
    >
      { getChildren() }
    </div>
  );
}

export type BasePageProps =
  Partial<
    JSX.HTMLAttributes<HTMLDivElement>
  >;
