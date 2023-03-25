import {
  BasePageState,
  CodeEditorState,
  CodeEditorBaseTheme,
  OneDarkColor,
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

renderStaticStyle(
  {
    margin: 0,
    backgroundColor: OneDarkColor.darkBackground
  },
  'body'
);

const page = new BasePageState();
const code = new CodeEditorState();

render(
  () => (
    <BasePageView
      state={ page }
    >
      <CodeEditorView
        state={ code }
        value={ 'console.log(\'Hello World!\');' }
      />
    </BasePageView>
  ),
  document.body
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
  marginLeft: 'auto',
  fontFamily: 'Noto Sans Mono',
  fontSize: '1rem',
  fontWeight: '400',
}));

code.setExtensions((prev) => [
  ...prev,
  CodeEditorBaseTheme.Patch,
  CodeEditorBaseTheme.OneDark
]);
