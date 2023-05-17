import semver from 'semver-regex';
import { z } from 'zod';
import { Renderer } from '../../../../src';
import { version } from '../../../../package.json';
import { formatZodError, getContent } from '../utils';

export type FrontMatter = z.infer<typeof FrontMatter.schema>;

export namespace FrontMatter {
  export const parse = async (
    fm?: Partial<FrontMatter>
  ): Promise<FrontMatter> => (
    schema.default({}).parseAsync(fm)
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
      version: z.string().regex(semver()).default(version),
    })
    .and(Renderer.schema.omit({ slides: true }))
    .transform(async (fm) => {
      fm.styles = await Promise.all(
        fm.styles.map((path) => getContent(path))
      );
      if (fm.codeFont.rule) {
        fm.codeFont.rule = await getContent(fm.codeFont.rule);
      }
      if (fm.slideFont.rule) {
        fm.slideFont.rule = await getContent(fm.slideFont.rule);
      }
      return fm;
    })
    .catch((e) => {
      const error = e.error.errors[0];
      error.path.unshift('codeslide');
      throw new Error(`\
Cannot parse the Front Matter section:
\t${formatZodError(error)}`
      );
    })
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
