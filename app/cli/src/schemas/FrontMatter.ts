import semver from 'semver-regex';
import { z } from 'zod';
import { Renderer } from '../../../../src';
import { homepage, version } from '../../package.json';
import { formatZodError, getContent } from '../utils';

export type FrontMatter = z.infer<typeof FrontMatter.schema>;

export namespace FrontMatter {
  export const parse = async (
    fm?: Partial<FrontMatter>
  ): Promise<FrontMatter> => (
    schema.default({}).parseAsync(fm)
  );

  export const schema =
    z.object({
      version: z.string()
        .regex(semver(), 'Expect semver string')
        .default(version),
      format: z.enum(['html', 'pdf']).default('html'),
      pageSize: z.enum([
        'ledger', 'legal', 'letter', 'tabloid',
        'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
      ]).optional(),
      orientation: z.enum([
        'landscape', 'portrait',
      ]).optional(),
    })
    .and(
      Renderer.schema.omit({ slides: true })
    )
    .superRefine((fm, ctx) => {
      if (fm.format === 'pdf') {
        fm.pageSize = fm.pageSize ?? 'A4';
        fm.orientation = fm.orientation ?? 'landscape';
      } else {
        if (fm.pageSize) {
          ctx.addIssue({
            code: 'invalid_type',
            path: ['pageSize'],
            expected: 'never',
            received: 'string',
          });
        }
        if (fm.orientation) {
          ctx.addIssue({
            code: 'invalid_type',
            path: ['orientation'],
            expected: 'never',
            received: 'string',
          });
        }
      }
    })
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
      throw new Error(`\
Cannot parse the Front Matter section:
\t${formatZodError(e.error, ['codeslide'])}
\tReference: ${homepage}/docs/REFERENCE.md`
      );
    });
}
