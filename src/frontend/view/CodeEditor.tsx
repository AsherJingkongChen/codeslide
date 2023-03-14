import {
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  splitProps
} from 'solid-js';
import {
  createCodeMirror,
  CreateCodeMirrorProps
} from 'solid-codemirror';

export const CodeEditor = (
  props: CodeEditorProps
): JSXElement => {

  onMount(() => console.log('CodeEditor:mount'));
  onCleanup(() => console.log('CodeEditor:cleanup'));

  const [
    codeProps,
    codeExtraProps,
    restProps
  ] = splitProps(props, ...propsSpliter);

  const { ref, createExtension } =
    createCodeMirror(codeProps);

  if (codeExtraProps.extension !== undefined) {
    createExtension(codeExtraProps.extension);
  }

  // window.addEventListener('keydown', (e) => {
  //   if (e.code === 'KeyE' && e.ctrlKey) {
  //     console.log(editorView().contentDOM);
  //   }
  // });

  return (
    <div
      { ...restProps }
      class={`CodeEditor`}
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
& Partial<
    Omit<
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
    ,

    | 'children'
    | 'class'
    | 'classList'
    >
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
] as const;
