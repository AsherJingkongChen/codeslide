import {
  View
} from './View';
import {
  CodeEditorState,
  SlideNavigatorState
} from '../state';
import {
  BasePageView
} from './BasePage';
import {
  children,
  ComponentProps,
  onCleanup,
  onMount
} from 'solid-js';

export const SlideNavigatorView: View<SlideNavigatorProps> = (
  props
) => {
  const { state, code } = props;

  onMount(() => {
    document.addEventListener('keydown', onNavigate);
  });

  onCleanup(() => {
    document.removeEventListener('keydown', onNavigate);
  });

  const onNavigate = (ev: KeyboardEvent) => {
    if (state.navigate(ev)) {
      code.setText(state.slide.text);
    }
  };

  const getChildren = children(() => props.children);

  return (
    <BasePageView state={ state }>
      { getChildren() }
    </BasePageView>
  );
};

export type SlideNavigatorProps =
& Pick<
    ComponentProps<typeof BasePageView>,
  | 'children'
  >
& { code: CodeEditorState }
& { state: SlideNavigatorState; };

export { SlideNavigatorState };
