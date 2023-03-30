import {
  BasePageState,
  CodeEditorState,
  CodeEditorBaseTheme,
  OneDarkColor,
  EditorView,
  BasePageView,
  CodeEditorView,
  SlideNavigatorState,
  SlideNavigatorView,
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
        <SlideNavigatorView
          state={ nav }
          code={ code }
        >
          <CodeEditorView state={ code }/>
        </SlideNavigatorView>
      </BasePageView>
    ),
    document.body
  )
);

const page = new BasePageState();
const nav = new SlideNavigatorState();
const code = new CodeEditorState();
const felaRenderer = createRenderer();
const { renderStatic } = felaRenderer;

nav.slides = {
  '1': {
    path: '1',
    text:
`export const BasePageView: View<BasePageProps> = (
  props
) => {
  const { id, setView } = props.state;
  const getChildren = children(() => props.children);
  return (
    <div
      id={ id }
      ref={ setView }
    >
      { getChildren() }
    </div>
  );
};
`,
    right: '2',
  },
  '2': {
    path: '2',
    text:
`const { id, setView } = props.state;
const getChildren = children(() => props.children);`,
    left: '1',
    right: '3',
  },
  '3': {
    path: '3',
    text:
`return (
  <div
    id={ id }
    ref={ setView }
  >
    { getChildren() }
  </div>
);
`.repeat(25),
    left: '2',
  }
};
nav.path = '1';

renderStatic(
  {
    outline: 'none'
  },
  '*:focus'
);

renderStatic(
  {
    margin: 0,
    backgroundColor: OneDarkColor.background,
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

// SetText After rendering the DOM
code.setText(nav.slide.text);
