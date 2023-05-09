import { z } from 'zod';
import { isFormat } from '../Format';
import { isLayout } from '../Layout';
import { isPageSize } from '../PageSize';

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
  slides: z.array(z.string()).default([]),
  styles: z.array(z.string()).default([]),
}).transform((fm) => {
  if (
    fm.layout === 'horizontal' &&
    fm.format === 'pdf'
  ) {
    fm.layout = 'vertical';
  }
  return fm;
});
