import {
  View
} from '../shared';
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
  const getChildren = children(() => props.children);
  const { id, getClassName } = props.state;

  return (
    <div
      id={ id }
      class={ getClassName() }
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
