import {
  CodeEditorState,
  CodeEditorBaseTheme,
  OneDarkColor,
  EditorView,
  CodeEditorView,
  SlideNavigatorState,
  SlideNavigatorView,
  sameModifier,
  SlideNavigatorBaseDirmap,
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

const nav = new SlideNavigatorState();
const code = new CodeEditorState();
const felaRenderer = createRenderer();
const { renderStatic } = felaRenderer;

const open = () => (
  render(
    () => (
      <SlideNavigatorView state={ nav }>
        <CodeEditorView state={ code }/>
      </SlideNavigatorView>
    ),
    document.body
  )
);

const renderStaticRules = () => {
  rehydrate(felaRenderer);

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
    `#${nav.id}`
  );
  
  renderStatic(
    {
      display: 'inline-block',
      width: '100%',
      height: '100%',
      fontFamily: 'Noto Sans Mono',
      fontSize: '1rem',
      fontWeight: '400'
    },
    `#${code.id}`
  );
};

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
nav.beforeNavigation = (ev) => {
  if (! sameModifier(ev, {})) {
    return;
  }
  if (ev.type === 'keydown') {
    return SlideNavigatorBaseDirmap[
      (ev as KeyboardEvent).code
    ];
  }
  return;
};
nav.afterNavigation = (slide) => {
  code.setText(slide.text);
  document.title = slide.path;
};

code.addExtension([
  EditorView.editable.of(false),
  CodeEditorBaseTheme.OneDark,
  CodeEditorBaseTheme.Patch,
]);

renderStaticRules();
open();

// SetText After rendering the DOM
nav.afterNavigation(nav.slide);
export const test = () => {{}};
