import {
  State,
} from '../shared';
import {
  Accessor,
  createSignal,
  Setter,
} from 'solid-js';
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
  bracketMatching,
  indentUnit
} from '@codemirror/language';
import {
  javascript
} from '@codemirror/lang-javascript';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab
} from '@codemirror/commands';

export class CodeEditorState extends State {
  public readonly getExtensions: Accessor<Extension[]>;
  public readonly setExtensions: Setter<Extension[]>;

  constructor() {
    super('CodeEditor');

    // [TODO] reactivity and flexibility
    [this.getExtensions, this.setExtensions] = createSignal(
      [
        // editable
        EditorState.readOnly.of(false),

        // history
        history(),
        keymap.of(historyKeymap),

        // indent
        EditorState.tabSize.of(2),
        indentUnit.of(' '.repeat(2)),
        keymap.of([ indentWithTab ]),

        // keymap
        keymap.of(defaultKeymap),

        // language
        javascript({ typescript: true, jsx: true }),

        // line
        lineNumbers(),
        highlightActiveLineGutter(),

        // selection
        bracketMatching(),
        drawSelection(),
        rectangularSelection(),
        crosshairCursor()
      ],
      // [PATCH] #2: Disable serialization at solid-js/dev
      { internal: true }
    );
  }
};

export const CodeEditorBaseTheme = {
  Patch: [
    EditorView.baseTheme({
      // Set to Screen Height
      '&.cm-editor': {
        'height': 'inherit',
      },

      // No Outline on Focused
      '&.cm-focused': {
        'outline': 'none',
      },

      // Hide ScrollBar
      '.cm-scroller::-webkit-scrollbar': {
        'display': 'none',
      },
      '.cm-scroller': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        'overflowY': 'scroll',
        'font-family': 'inherit',
      },

      // Adjust Gutter Padding
      '.cm-lineNumbers .cm-gutterElement': {
        'padding': '0 1.0em 0 1.2em',
      },
      '.cm-line': {
        'padding': '0 1px',
      },
    })
  ] as const,

  OneDark: [
    EditorView.baseTheme({
      // Highlight Active LineGutter
      '.cm-activeLineGutter': {
        'background-color': 'inherit !important',
        'color': OneDarkColor.ivory,
      },
    }),
    oneDark
  ] as const,
} as const;

export {
  Extension,
  EditorView,
  EditorState,
  OneDarkColor
};
