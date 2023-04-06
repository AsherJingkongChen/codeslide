import {
  View
} from './View';
import {
  SlideNavigatorState
} from '../state';
import {
  BasePageView
} from './BasePage';
import {
  ComponentProps,
  onCleanup,
  onMount
} from 'solid-js';

export const SlideNavigatorView: View<SlideNavigatorProps> = (
  props
) => {
  const state = props.state;

  const navigate = (
    ev: KeyboardEvent | PointerEvent
  ): void => {
    const by = state.onNavigation?.(ev);
    if (! by) { return; }
    const page = state.setPage(by);
    if (page) { state.afterNavigation?.(page); }
  };

  onMount(() => {
    document.addEventListener('keydown', navigate);
    document.addEventListener('pointerdown', navigate);
  });

  onCleanup(() => {
    document.removeEventListener('keydown', navigate);
    document.removeEventListener('pointerdown', navigate);
  });

  return <BasePageView { ...props }/>;
};

export type SlideNavigatorProps =
& Pick<
    ComponentProps<typeof BasePageView>,
  | 'children'
  >
& { state: SlideNavigatorState; };

export { SlideNavigatorState };
