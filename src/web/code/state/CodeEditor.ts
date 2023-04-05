import {
  State,
} from './State';
import {
  oneDark,
  color as OneDarkColor
} from '@codemirror/theme-one-dark';
import {
  EditorView,
  lineNumbers,
  highlightActiveLineGutter,
  rectangularSelection,
  keymap,
  drawSelection,
  crosshairCursor
} from '@codemirror/view';
import {
  EditorState,
  Extension,
} from '@codemirror/state';
import {
  // bracketMatching,
  indentUnit
} from '@codemirror/language';
import {
  javascript
} from '@codemirror/lang-javascript';
// import {
//   history,
//   defaultKeymap,
//   historyKeymap,
//   indentWithTab
// } from '@codemirror/commands';
import {
  createCodeMirror
} from 'solid-codemirror';
import {
  createRoot,
  createSignal,
} from 'solid-js';

export class CodeEditorState extends State {
  public readonly addExtension: (extension: Extension) => void;
  public readonly getText: () => string;
  public readonly setText: (text: string) => void;

  constructor() {
    super();

    const {
      createExtension,
      editorView,
      ref
    } =
    createRoot(() => ( // [TODO] dispose
      createCodeMirror({
        onModelViewUpdate: (update) => {
          console.log({ '?': update.view });
        }
      })
    ));

    // (parent DOM of .cm-editor) ?? ().cm-editor DOM)
    this.getView = () => {
      const view = editorView();
      return view.dom.parentElement ?? view.dom;
    };

    // .cm-editor DOM
    this.setView = ref;

    this.addExtension = (ext) => {
      _setExtension((prev) => [ ext, prev ]);
    };

    this.getText = () => (
      editorView().state.sliceDoc()
    );

    this.setText = (text) => {
      editorView().dispatch({
        changes: {
          from: 0,
          to: editorView().state.doc.length,
          insert: text,
        },
        scrollIntoView: true,
        selection: { anchor: 0 }
      });
    };

    const [_getExtension, _setExtension] = createSignal(
      [
        // editable:
        // EditorView.editable.of(true),

        // history:
        // history(),
        // keymap.of(historyKeymap),

        // indent:
        EditorState.tabSize.of(2),
        indentUnit.of(' '.repeat(2)),
        // keymap.of([ indentWithTab ]),

        // keymap:
        // keymap.of(defaultKeymap),

        // language:
        javascript({ typescript: true, jsx: true }),

        // line:
        lineNumbers(),
        highlightActiveLineGutter(),
        EditorView.lineWrapping,

        // selection:
        // bracketMatching(),
        drawSelection(),
        [
          rectangularSelection(),
          crosshairCursor()
        ]
      ],
      { internal: true }
    );

    createRoot(() => {
      createExtension(_getExtension);
    });
  }
};

export namespace CodeEditorBaseTheme {
  export const Patch = EditorView.baseTheme({
    // Set to Screen Height
    '&.cm-editor': {
      height: 'inherit',
    },

    // No Outline on Focused
    '&.cm-focused': {
      outline: 'none',
    },

    // Hide ScrollBar
    '.cm-scroller::-webkit-scrollbar': {
      display: 'none',
    },
    '.cm-scroller': {
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',
      overflow: 'scroll',
      fontFamily: 'inherit',
    },

    // Adjust Gutter Layout
    '.cm-lineNumbers .cm-gutterElement': {
      padding: '0 1.5em',
      minWidth: '5em'
    },

    // Adjust Cursor Padding At the Left Margin
    '.cm-line': {
      padding: '0 1px',
    },
  });

  export const OneDark = [
    EditorView.baseTheme({
      // Adjust Active Line
      '.cm-activeLineGutter': {
        backgroundColor: 'inherit !important',
        color: OneDarkColor.ivory,
      },
    }),
    oneDark
  ] as const;
}

export {
  keymap,
  Extension,
  EditorView,
  EditorState,
  OneDarkColor
};
