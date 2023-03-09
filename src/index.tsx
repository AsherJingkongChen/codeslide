import { createLifecycle } from "../solid-js/web/Lifecycle";
import { BasePage, CodeEditor } from "./frontend/view";
import { javascript } from '@codemirror/lang-javascript';
import { minimalSetup } from 'codemirror';
import {
  EditorView,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  gutters,
  highlightTrailingWhitespace
} from '@codemirror/view';
import Layout from './frontend/css/Layout.module.css';
import Color from './frontend/css/Color.module.css';

document.body.className = (
  `${Layout.NoMargin} ` +
  `${Layout.NoBouncyScroll} ` +
  `${Color.DefaultDark} `
);

const [openWeb] =
  createLifecycle(
    () => (
      <BasePage
        id='EditPage'
      >
        <CodeEditor
          id='CodeEditor'
          extension={[
            minimalSetup,
            lineNumbers(),
            highlightTrailingWhitespace(),
            highlightActiveLine(),
            highlightActiveLineGutter(),
            gutters(),
            javascript({
              jsx: true,
              typescript: true
            }),
            EditorView.lineWrapping,
            EditorView.theme({
              '&.cm-focused': {
                'outline': 'none'
              },
              '&.cm-editor': {
                'height': 'inherit',
              },
              '.cm-scroller': {
                'font-family': 'inherit',
              },
              '.cm-gutters': {
                'background-color': 'black',
                'margin-right': '0',
                'border-right': '1px solid white',
              },
              '.cm-lineNumbers .cm-gutterElement': {
                'padding': '0 1em 0 1em'
              },
              '.cm-line': {
                'padding': '0 0.2em 0 0.2em'
              }
            })
          ]}
          style={{
            'display': 'absolute',
            'margin': '0 0 0 auto',
            'width': '80%',
            'height': '100%',
            'border-left': '1px solid white',
          }}
          value={
            'const f = () => {\n' +
            '  console.log(f);\n' +
            '};\n'
          }
        />
      </BasePage>
    ),
    document.getElementById('Web')!
  );

openWeb();

// [Test] Lifecycle for nested JSXElement
//
// setTimeout(() => {
//   alert('begin');
//   for (let i = (1 << 15); i-- > 0;) {
//     closeWeb();
//     openWeb();
//   }
// }, 6000);
