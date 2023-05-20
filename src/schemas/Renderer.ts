import { z } from 'zod';
import {
  HighlightCSS,
  SlidesCSS,
  SlidesHTML,
} from '../assets';

export type Renderer = z.infer<typeof Renderer.schema>;

export namespace Renderer {
  export const parse = (
    renderer?: Partial<Renderer>
  ): Renderer => (
    schema.default({}).parse(renderer)
  );

  export const render = (
    renderer: Renderer
  ): string => {
    const { slides } = renderer;
    const styles = new Array<string>();
    if (! renderer.styles.length) {
      styles.push(HighlightCSS);
    }
    styles.push(SlidesCSS, ...renderer.styles);

    if (renderer.codeFont.rule) {
      styles.push(`\
/*! CodeSlide codeFont at-rule */
${renderer.codeFont.rule}`);
    }
    if (renderer.slideFont.rule) {
      styles.push(`\
/*! CodeSlide slideFont at-rule */
${renderer.slideFont.rule}`);
    }

    styles.push(`\
/*! CodeSlide codeFont properties */
code {
  font-family: ${renderer.codeFont.family};
}
pre > code {
  font-size: ${renderer.codeFont.size};
  font-weight: ${renderer.codeFont.weight};
}

/* CodeSlide slideFont properties */
#slides {
  font-family: ${renderer.slideFont.family};
  font-size: ${renderer.slideFont.size};
  font-weight: ${renderer.slideFont.weight};
}`);

    return SlidesHTML({ slides, styles });
  };

  export const schema = z.object({
    slides: z.array(z.string()).default([]),
    styles: z.array(z.string()).default([]),
    codeFont: z.object({
      family: z.string().optional().transform((arg) => `\
${arg ? `${arg}, ` : ''}ui-monospace, SFMono-Regular, \
SF Mono, Menlo, Consolas, Liberation Mono, monospace`
      ),
      rule: z.string().optional(),
      size: z.string().default('smaller'),
      weight: z.string().default('normal'),
    }).default({}),
    slideFont: z.object({
      family: z.string().optional().transform((arg) => `\
${arg ? `${arg}, ` : ''}system-ui`
      ),
      rule: z.string().optional(),
      size: z.string().default('large'),
      weight: z.string().default('normal'),
    }).default({}),
  });
}
