import { render as renderEta } from 'eta';
import { z } from 'zod';
import { Stylesheets, Template } from './slides';

export type Renderer = z.infer<typeof Renderer.schema>;

export namespace Renderer {
  export const parse = (
    renderer: Partial<Renderer>
  ): Renderer => (
    schema.parse(renderer)
  );

  export const render = (
    renderer: Renderer
  ): string => {
    return renderEta(Template, {
      layout: renderer.layout,
      slides: renderer.slides,
      style: `\
<style>
${[
  Stylesheets['highlight'],
  Stylesheets[renderer.layout],
  ...renderer.styles,
`code {
  font-family: ${renderer.fontFamily};
  font-size: 85%;
}`,
`#slides {
  font-family: system-ui;
  font-size: ${renderer.fontSize};
  font-weight: ${renderer.fontWeight};
  line-height: 1.5;
}`,
].join('\n')}
</style>`,
    },
    {
      autoTrim: false,
      tags: ['{%', '%}']
    });
  };

  export const schema = z
    .object({
      fontFamily: z.string().optional().transform((arg) => `\
${arg ? `${arg}, ` : ''}ui-monospace, SFMono-Regular, \
SF Mono, Menlo, Consolas, Liberation Mono, monospace`
      ),
      fontSize: z.string().default('large'),
      fontWeight: z.string().default('normal'),
      layout: z.enum(['horizontal', 'vertical']).default('horizontal'),
      slides: z.array(z.string()).default([]),
      styles: z.array(z.string()).default([]),
    });
}
