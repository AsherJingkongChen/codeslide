import {
  View
} from './View';
import {
  CodePageState
} from '../state';
import {
  ComponentProps, createEffect,
} from 'solid-js';
import highlighter from 'highlight.js/lib/common';

export const CodePageView: View<CodePageProps> = (
  props
) => {
  const { setView, getView, getText } = props.state;

  createEffect(() => {
    highlighter.highlightElement(getView());
  });

  return (
    <code
      ref={ setView }
      class={ 'CodePage language-javascript' }
      innerHTML={ highlighter.highlightAuto(getText()).value }
    />
  );
};

export type CodePageProps =
& Pick<
    ComponentProps<'div'>,
  | 'children'
  >
& { state: CodePageState };

export { CodePageState };
