import {
  View
} from './View';
import {
  CodeEditorState
} from '../state';
import {
  BasePageView
} from './BasePage';

export const CodeEditorView: View<CodeEditorProps> = (
  props
) => <BasePageView { ...props }/>;

export type CodeEditorProps =
& { state: CodeEditorState; };

export { CodeEditorState };
