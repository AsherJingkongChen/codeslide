import {
  BasePageState,
  CodeEditorState,
  CodeEditorBaseTheme,
  OneDarkColor,
  EditorState,
} from './state';
import {
  BasePageView,
  CodeEditorView,
} from './view';
import {
  renderStaticStyle
} from './shared';
import {
  render
} from 'solid-js/web';

const start = () => render(
  () => (
    <BasePageView
      state={ page }
    >
      <CodeEditorView
        state={ code }
        value={ '[?= code ?]' }
      />
    </BasePageView>
  ),
  document.body
);

const page = new BasePageState();
const code = new CodeEditorState();

renderStaticStyle(
  {
    margin: 0,
    backgroundColor: OneDarkColor.darkBackground
  },
  'body'
);

page.setClass((prev) => ({
  ...prev,
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  height: '100vh',
}));

code.setClass((prev) => ({
  ...prev,
  display: 'inline-block',
  width: '100%',
  height: '100%',
  fontFamily: 'Noto Sans Mono',
  fontSize: '1rem',
  fontWeight: '400',
}));

code.setExtensions((prev) => [
  EditorState.readOnly.of(true),
  CodeEditorBaseTheme.OneDark,
  CodeEditorBaseTheme.Patch,
  ...prev,
]);

start();
