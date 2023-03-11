import Layout from '../css/Layout.module.less';
import Text from '../css/Text.module.less';
import { children, JSXElement } from 'solid-js';
import { BasePage, BasePageProps } from './BasePage';

export function HomePage(
  props: HomePageProps
): JSXElement {

  const getChildren =
    children(() => props.children);

  return (
    <BasePage {...props}>
      <div
        class={
          `${Layout.FullScreen} ` +
          `${Text.Large} `
        }
        style={{
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center'
        }}
      >
        Home Page
      </div>

      { getChildren() }
    </BasePage>
  );
}

export type HomePageProps =
  Partial<
    BasePageProps
  >;
