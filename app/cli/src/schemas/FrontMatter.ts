import { z } from 'zod';
import { Renderer } from '../../../../src';
import { version } from '../../../../package.json';
import { formatZodErrors } from '../utils';

export type FrontMatter = z.infer<typeof FrontMatter.schema>;

export namespace FrontMatter {
  export const parse = (
    fm?: Partial<FrontMatter>
  ): FrontMatter => {
    const result = schema.default({}).safeParse(fm);
    if (! result.success) {
      throw new Error(
        `Cannot parse the Front Matter section: ${
          formatZodErrors(result.error.errors)
        }`
      );
    }
    return result.data;
  };

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
        fm.format === 'pdf' &&
        fm.layout !== 'vertical'
      ) {
        fm.layout = 'vertical';
      }
      return fm;
    });
}