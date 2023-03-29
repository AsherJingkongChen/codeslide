import {
  View
} from './View';
import {
  BasePageState
} from '../state';
import {
  children,
  ComponentProps
} from 'solid-js';

export const BasePageView: View<BasePageProps> = (
  props
) => {
  const { id, setView } = props.state;
  const getChildren = children(() => props.children);
  return (
    <div
      id={ id }
      ref={ setView }
    >
      { getChildren() }
    </div>
  );
};

export type BasePageProps =
& Pick<
    ComponentProps<'div'>,
  | 'children'
  >
& { state: BasePageState };

export { BasePageState };
