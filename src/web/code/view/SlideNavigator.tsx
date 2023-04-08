import {
  View
} from './View';
import {
  SlideNavigatorState
} from '../state';
import {
  ComponentProps,
  onCleanup,
  onMount,
  children
} from 'solid-js';

export const SlideNavigatorView: View<SlideNavigatorProps> = (
  props
) => {
  const state = props.state;
  const { setView } = state;
  const getChildren = children(() => props.children);

  const navigate = (
    ev: KeyboardEvent | TouchEvent
  ): void => {
    const by = state.onNavigation?.(ev);
    if (! by) { return; }
    const page = state.setPage(by);
    if (page) { state.afterNavigation?.(page); }
  };

  onMount(() => {
    document.addEventListener('keydown', navigate);
    document.addEventListener('touchstart', navigate);
  });

  onCleanup(() => {
    document.removeEventListener('keydown', navigate);
    document.removeEventListener('touchstart', navigate);
  });

  return (
    <pre
      ref={ setView }
      class={ 'SlideNavigator' }
    >
      { getChildren() }
    </pre>
  );
};

export type SlideNavigatorProps =
& Pick<
    ComponentProps<'div'>,
  | 'children'
  >
& { state: SlideNavigatorState };

export { SlideNavigatorState };
