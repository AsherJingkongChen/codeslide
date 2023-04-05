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

// nav.setSlide({
//   "./src/1.tsx": {
//     "path": "./src/1.tsx",
//     "text":
// `renderStatic(
//   {
//     display: 'inline-block',
//     width: '100%',
//     height: '100%',
//     fontFamily: 'Noto Sans Mono',
//     fontSize: '1rem',
//     fontWeight: '400'
//   },
//   \`#\${code.id}\`
// );`,
//     "up": null,
//     "right": "./src/2.ts",
//     "down": null,
//     "left": "./src/2.ts",
//   },
//   "./src/2.ts": {
//     "path": "./src/2.ts",
//     "text":
// `const arr = [\n  ${
//   new Array(50).fill(null).map((_, i) => i).join(",\n  ")
// }\n];`,
//     "up": null,
//     "right": "./src/1.tsx",
//     "down": null,
//     "left": "./src/1.tsx",
//   },
// });

nav.setSlide(JSON.parse(
  document.getElementById('input_slide')!.innerText
));
document.getElementById('input_slide')!.remove(); // [TODO] whether to discard

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
if (nav.item) {
  nav.afterNavigation(nav.item);
}
