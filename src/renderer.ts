import { z } from 'zod';
import { isFormat } from './format';
import { isLayout } from './layout';
import { isPagesize } from './pagesize';
import { render as renderEta } from 'eta';
import { Stylesheets, Template } from './slides';

export type Renderer = z.infer<typeof _Renderer>;

export namespace Renderer {
  export const parse = (
    raw: object
  ): Renderer => _Renderer.parse(raw);

  export const render = (
    renderer: Renderer
  ): string => renderEta(
    Template,
    {
      layout: renderer.layout,
      slides: renderer.slides,
      style: `\
<style>
${
  [
    Stylesheets['github'],
    Stylesheets[renderer.layout],
    ...renderer.styles,
    `.hljs, code { font-family: ${renderer.fontFamily}; }`,
    `#slides { font-size: ${renderer.fontSize}; }`,
    `#slides { font-weight: ${renderer.fontWeight}; }`,
  ].join('\n')
}
  </style>`,
    },
    {
      autoTrim: false,
      tags: ['{%', '%}'],
    }
  );
}

export const _Renderer = z.object({
  fontFamily: z
    .string()
    .default('')
    .transform((arg) => `\
${arg ? `${arg}, ` : ''}ui-monospace, SFMono-Regular, \
SF Mono, Menlo, Consolas, Liberation Mono, monospace`
    ),
  fontSize: z
    .string()
    .default('large'),
  fontWeight: z
    .string()
    .default('normal'),
  format: z
    .string()
    .refine(isFormat)
    .default('html'),
  layout: z
    .string()
    .refine(isLayout)
    .default('horizontal'),
  pagesize: z
    .string()
    .refine(isPagesize)
    .default('a4'),
  slides: z
    .array(z.string())
    .default([]),
  styles: z
    .array(z.string())
    .default([]),
})
.transform((arg) => {
  if (
    arg.layout === 'horizontal' &&
    arg.format === 'pdf'
  ) {
    arg.layout = 'vertical';
  }
  return arg;
});