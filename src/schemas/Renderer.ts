import { render as renderEta } from 'eta';
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
    let {
      slides, styles,
      codeFont, slideFont,
    } = renderer;

    const preStyles = new Array<string>();
    if (! styles.length) {
      preStyles.push(HighlightCSS);
    }
    preStyles.push(SlidesCSS);
    styles.unshift(...preStyles);

    if (codeFont.rule) {
      styles.push(
        '/*! CodeSlide codeFont.rule */',
        codeFont.rule,
      );
    }
    if (slideFont.rule) {
      styles.push(
        '/*! CodeSlide slideFont.rule */',
        slideFont.rule,
      );
    }

    styles.push(`\
/*! CodeSlide codeFont properties */
code {
  font-family: ${codeFont.family};
}
pre > code {
  font-size: ${codeFont.size};
  font-weight: ${codeFont.weight};
}

/* CodeSlide slideFont properties */
#slides {
  font-family: ${slideFont.family};
  font-size: ${slideFont.size};
  font-weight: ${slideFont.weight};
}`);

    const style = `\
<style>
${styles.join('\n')}
</style>`;

    return renderEta(
      SlidesHTML,
      { slides, style },
      { autoTrim: false, tags: ['{%', '%}'] }
    );
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
      size: z.string().default('medium'),
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
