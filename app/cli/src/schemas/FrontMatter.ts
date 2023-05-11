import { z } from 'zod';
import { Renderer } from '../../../../src';
import { version } from '../../../../package.json';

export type FrontMatter = z.infer<typeof FrontMatter.schema>;

export namespace FrontMatter {
  export const parse = (
    fm: Partial<FrontMatter>
  ): FrontMatter => (
    schema.parse(fm)
  );

  export const schema = z
    .object({
      format: z.enum(['html', 'pdf']).default('html'),
      pageSize: z
        .enum([
          'letter', 'legal', 'tabloid', 'ledger',
          'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'
        ])
        .default('A4'),
      version: z.string().default(version),
    })
    .and(Renderer.schema.omit({ slides: true }))
    .transform((fm) => {
      if (
        fm.layout === 'horizontal' &&
        fm.format === 'pdf'
      ) {
        fm.layout = 'vertical';
      }
      return fm;
    });
}
