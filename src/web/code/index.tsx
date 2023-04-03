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

nav.slides =
{
  "./src/web/code/entity/Slide.ts": {
    "path": "./src/web/code/entity/Slide.ts",
    "text": "import {\n  Direction\n} from './Direction';\n\nexport type SlideMap =\n  Record<string, Slide>;\n\nexport type Slide =\n& {\n    path: string;\n    text: string;\n  }\n& Partial<Record<Direction, string>>;\n",
    "up": null,
    "right": "./src/web/code/entity/Direction.ts",
    "down": null,
    "left": null
  },
  "./src/web/code/entity/Direction.ts": {
    "path": "./src/web/code/entity/Direction.ts",
    "text": "export const Direction = {\n  up: true,\n  right: true,\n  down: true,\n  left: true,\n} as const;\n\nexport type Direction = keyof typeof Direction;\n",
    "up": null,
    "right": "./src/web/code/entity/WideRecord.ts",
    "down": null,
    "left": "./src/web/code/entity/Slide.ts"
  },
  "./src/web/code/entity/WideRecord.ts": {
    "path": "./src/web/code/entity/WideRecord.ts",
    "text": "export type WideRecord<T> = OptionalRecord<\n  | keyof T\n  | symbol\n  | (string & {})\n  | (number & {}),\n  T[keyof T]\n>;\n\nexport const WideRecord = <T extends WideRecord<T>>(\n  x: T\n): WideRecord<T> => x;\n\nexport type OptionalRecord<K extends keyof any, V> = {\n  [P in K]?: V;\n};\n",
    "up": null,
    "right": "./src/web/code/entity/index.ts",
    "down": null,
    "left": "./src/web/code/entity/Direction.ts"
  },
  "./src/web/code/entity/index.ts": {
    "path": "./src/web/code/entity/index.ts",
    "text": "export * from './Direction';\nexport * from './WideRecord';\nexport * from './Slide';",
    "up": null,
    "right": null,
    "down": null,
    "left": "./src/web/code/entity/WideRecord.ts"
  }
};
nav.path = "./src/web/code/entity/Slide.ts";
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
if (nav.slide) {
  nav.afterNavigation(nav.slide);
}
