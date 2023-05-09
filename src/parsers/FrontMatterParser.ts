import { z } from 'zod';
import { isFormat } from '../Format';
import { isLayout } from '../Layout';
import { isPageSize } from '../PageSize';
import { version } from '../../package.json';

export const FrontMatterParser = z.object({
  fontFamily: z.string().default('').transform((arg) => `\
${arg ? `${arg}, ` : ''}ui-monospace, SFMono-Regular, \
SF Mono, Menlo, Consolas, Liberation Mono, monospace`
  ),
  fontSize: z.string().default('large'),
  fontWeight: z.string().default('normal'),
  format: z.string().refine(isFormat).default('html'),
  layout: z.string().refine(isLayout).default('horizontal'),
  pageSize: z.string().refine(isPageSize).default('A4'),
  styles: z.array(z.string()).default([]),
  version: z.string().default(version),
})
.strict()
.transform((fm) => {
  if (
    fm.layout === 'horizontal' &&
    fm.format === 'pdf'
  ) {
    fm.layout = 'vertical';
  }
  return fm;
});
