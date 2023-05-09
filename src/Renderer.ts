import { Stylesheets, Template } from './slides';
import { render as renderEta } from 'eta';
import { z } from 'zod';
import { ManifestParser } from './parsers';

export type Renderer = z.infer<typeof ManifestParser>;

export namespace Renderer {
  export const parse = (
    manifest: string
  ): Promise<Renderer> => (
    ManifestParser.parseAsync(manifest)
  );

  export const render = (
    renderer: Renderer
  ): string => renderEta(Template, {
    layout: renderer.layout,
    slides: renderer.slides,
    style: `\
  <style>
${
  [
    Stylesheets['github'],
    Stylesheets[renderer.layout],
    ...renderer.styles,
    `\
code {
  font-family: ${renderer.fontFamily};
  font-size: 85%;
}`,
    `\
#slides {
  font-family: system-ui;
  font-size: ${renderer.fontSize};
  font-weight: ${renderer.fontWeight};
  line-height: 1.5;
}`,
  ].join('\n')
}
  </style>`,
  }, { autoTrim: false, tags: ['{%', '%}'] });
}
