import { createLifecycle } from "../solid-js/web/Lifecycle";
import { BasePage, CodeEditor } from "./frontend/view";
import { indentUnit } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab
} from '@codemirror/commands';
import {
  EditorState
} from '@codemirror/state';
import {
  oneDark,
  color
} from '@codemirror/theme-one-dark';
import {
  EditorView,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightTrailingWhitespace,
  gutters,
  rectangularSelection,
  keymap,
  drawSelection
} from '@codemirror/view';
import Layout from './frontend/css/Layout.module.less';
import Color from './frontend/css/Color.module.less';

document.body.className = (
  `${Layout.NoMargin} ` +
  `${Layout.NoBouncyScroll} ` +
  `${Color.TransparentTheme} `
);

const [openEditPage, _closeEditPage] =
  createLifecycle(
    () => (
      <BasePage
        id='CodeEditor'
      >
        <CodeEditor
          extension={[
            drawSelection(),
            history(),
            EditorState.tabSize.of(2),
            EditorView.editable.of(true),
            EditorView.lineWrapping,
            EditorView.theme(
              {
                '&.cm-editor': {
                  'height': 'inherit',
                },
                '&.cm-focused': {
                  'outline': 'none',
                },
                '.cm-scroller': {
                  'overflow': 'auto',
                  'font-family': 'inherit',
                },
                '.cm-lineNumbers .cm-gutterElement': {
                  'padding': '0 0.8em 0 1.0em',
                },
                '.cm-activeLineGutter': {
                  'color': color.ivory,
                },
                '.cm-line': {
                  'padding': '0 0.2em 0 0.2em',
                },
              },
              { dark: true }
            ),
            gutters(),
            highlightActiveLine(),
            highlightActiveLineGutter(),
            highlightTrailingWhitespace(),
            indentUnit.of(' '.repeat(2)),
            javascript({
              jsx: true,
              typescript: true
            }),
            keymap.of([
              ...defaultKeymap,
              ...historyKeymap,
              indentWithTab
            ]),
            lineNumbers(),
            oneDark,
            rectangularSelection(),
          ]}
          value={
            'const f = () => {\n' +
            '  console.log(f);\n' +
            '};\n'
          }
        />
      </BasePage>
    ),
    () => document.getElementById('Web')!
  );

openEditPage();

// [Test] Lifecycle for nested JSXElement
//
// for (let i = 200; i-- > 0;) {
//   closeBasePage();
//   openBasePage();
// }
// console.log('done');

// [Test] baseFont reactivity
//
// baseFont.setWeight(500);
// const a: BaseFontFamily = ['Noto Sans Mono'];
// baseFont.setFamily(['']);
