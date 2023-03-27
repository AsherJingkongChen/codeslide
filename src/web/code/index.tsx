import {
  BasePageState,
  CodeEditorState,
  CodeEditorBaseTheme,
  OneDarkColor,
  EditorView,
} from './state';
import {
  BasePageView,
  CodeEditorView,
} from './view';
import {
  renderStaticStyle,
  renderDynamicStyle
} from './shared';
import {
  render
} from 'solid-js/web';

const open = () => render(
  () => (
    <BasePageView
      state={ page }
    >
      <CodeEditorView state={ code } />
    </BasePageView>
  ),
  document.body
);

const page = new BasePageState();
const code = new CodeEditorState();

open();

renderStaticStyle(
  {
    margin: 0,
    backgroundColor: OneDarkColor.background
  },
  'body'
);

page.getView()?.setAttribute(
  'class',
  renderDynamicStyle({
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: '100vh',
  })
);

code.getView()?.setAttribute(
  'class',
  renderDynamicStyle({
    display: 'inline-block',
    width: '100%',
    height: '100%',
    fontFamily: 'Noto Sans Mono',
    fontSize: '1rem',
    fontWeight: '400',
  })
);

code.addExtension([
  EditorView.editable.of(false),
  CodeEditorBaseTheme.OneDark,
  CodeEditorBaseTheme.Patch,
]);

code.setText(
`const open = () => render(
  () => (
    <BasePageView
      state={ page }
    >
      <CodeEditorView state={ code } />
    </BasePageView>
  ),
  document.body
);
`);
