import {
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  splitProps
} from 'solid-js';
import { createCodeMirror, CreateCodeMirrorProps } from 'solid-codemirror';

export function CodeEditor(
  props: CodeEditorProps
): JSXElement {

  onMount(() => console.log('CodeEditor:mount'));
  onCleanup(() => console.log('CodeEditor:cleanup'));

  const [
    cmProps,
    cmExtraProps,
    classProps,
    restProps
  ] = splitProps(props, ...propsSpliter);

  const { ref, createExtension } =
    createCodeMirror(cmProps);

  if (cmExtraProps.extension !== undefined) {
    createExtension(cmExtraProps.extension);
  }

  // window.addEventListener('keydown', (e) => {
  //   if (e.code === 'KeyE' && e.ctrlKey) {
  //     console.log(editorView().contentDOM);
  //   }
  // });

  return (
    <div
      { ...restProps }
      class={
        `CodeEditor ` +
        `${classProps.class ?? ''}`
      }
      style={{
        'width': '80%',
        'height': '100%',
        'margin': '0 0 0 auto',
      }}
      ref={ ref }
    >
    </div>
  );
}

export type CodeEditorProps =
& Omit<
    Partial<
    & CreateCodeMirrorProps
    & JSX.HTMLAttributes<HTMLDivElement>
    & {
        extension:
          Parameters<
            ReturnType<
              typeof createCodeMirror
            >['createExtension']
          >[0]
      }
    >,
    'children'
  >;

const propsSpliter = [
  [
    'value',
    'onValueChange',
    'onModelViewUpdate'
  ],
  [
    'extension'
  ],
  [
    'class'
  ]
] as const;
