import {
  View
} from './View';
import {
  CodeEditorState
} from '../state';

export const CodeEditorView: View<CodeEditorProps> = (props) => {
  const { id, setView } = props.state;

  return (
    <div
      id={ id }
      ref={ setView }
    />
  );
};

export type CodeEditorProps =
& { state: CodeEditorState; };

export { CodeEditorState };
