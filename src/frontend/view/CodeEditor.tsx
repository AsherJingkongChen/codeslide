import { Accessor, JSX, JSXElement, splitProps } from 'solid-js';
import { createCodeMirror, CreateCodeMirrorProps } from 'solid-codemirror';
import { Extension } from '@codemirror/state';

export function CodeEditor(
  props: CodeEditorProps
): JSXElement {

  const [codeMirrorProps, { extension }, rest] =
    splitProps(props, ...propSpliter);

  const { ref, createExtension } =
    createCodeMirror(codeMirrorProps);

  if (extension !== undefined) {
    createExtension(extension);
  }

  return (
    <div
      { ...rest }
      ref={ref}
    >
    </div>
  );
}

export type CodeEditorProps =
  Partial<
    & CreateCodeMirrorProps
    & JSX.HTMLAttributes<HTMLDivElement>
    & {
        extension: Extension | Accessor<Extension | undefined>
      }
  >;

const propSpliter = [
  [
    'value',
    'onValueChange',
    'onModelViewUpdate'
  ],
  [
    'extension'
  ]
] as const;
