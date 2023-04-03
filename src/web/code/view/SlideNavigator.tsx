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
    const dir = state.beforeNavigation?.(ev);
    if (! dir) { return; }
    const nextpath = state.item?.[dir];
    if (! nextpath) { return; }
    state.item = state.slide.get(nextpath);
    if (state.item) {
      state.afterNavigation?.(state.item);
    }
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
