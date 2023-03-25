import {
  View
} from '../shared';
import {
  CodeEditorState
} from '../state';
import {
  createCodeMirror
} from 'solid-codemirror';

export const CodeEditorView: View<CodeEditorProps> = (
  props
) => {
  const { ref, createExtension } = createCodeMirror({
    value: props.value
  });

  const {
    id,
    getClassName,
    getExtensions
  } = props.state;

  createExtension(getExtensions);

  return (
    <div
      id={ id }
      ref={ ref }
      class={ getClassName() }
    >
    </div>
  );
};

export type CodeEditorProps =
& { value?: string; }
& { state: CodeEditorState; };

export { CodeEditorState };
