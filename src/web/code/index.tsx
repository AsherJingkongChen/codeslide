import {
  BasePageState,
  CodeEditorState,
  CodeEditorBaseTheme,
  OneDarkColor,
  EditorView,
  BasePageView,
  CodeEditorView,
} from './shared';
import {
  render
} from 'solid-js/web';
import {
  createRenderer,
} from 'fela';
import {
  rehydrate
} from 'fela-dom';

const open = () => (
  render(
    () => (
      <BasePageView state={ page }>
        <CodeEditorView state={ code }/>
      </BasePageView>
    ),
    document.body
  )
);

const page = new BasePageState();
const code = new CodeEditorState();
const felaRenderer = createRenderer();
const { renderStatic } = felaRenderer;

renderStatic(
  {
    margin: 0,
    backgroundColor: OneDarkColor.background
  },
  'body'
);

renderStatic(
  {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: '100vh',
  },
  `#${page.id}`
);

renderStatic(
  {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    fontFamily: 'Noto Sans Mono',
    fontSize: '1rem',
    fontWeight: '400',
  },
  `#${code.id}`
);

code.addExtension([
  EditorView.editable.of(false),
  CodeEditorBaseTheme.OneDark,
  CodeEditorBaseTheme.Patch,
]);

rehydrate(felaRenderer);
open();
