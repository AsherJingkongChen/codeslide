import { z } from 'zod';
import { isFormat } from './format';
import { isLang } from './lang';
import { isLayout } from './layout';
import { isPagesize } from './pagesize';

export type Printer = z.infer<typeof Printer>;

export const Printer = z.object(
  {
    fontFamily: z
      .string()
      .default('')
      .transform((arg) => `\
${arg ? `${arg}, ` : ''}ui-monospace, SFMono-Regular, \
SF Mono, Menlo, Consolas, Liberation Mono, monospace`
      ),
    fontSize: z
      .string()
      .default('large'),
    fontWeight: z
      .string()
      .default('normal'),
    format: z
      .string()
      .refine(isFormat)
      .default('html'),
    layout: z
      .string()
      .refine(isLayout)
      .default('horizontal'),
    pagesize: z
      .string()
      .refine(isPagesize)
      .default('a4'),
    slides: z
      .array(
        z.object({
          code: z
            .string()
            .default(''),
          lang: z
            .string()
            .refine(isLang)
            .optional(),
          title: z
            .string()
            .default(''),
        })
        .strict()
      )
      .default([]),
    styles: z
      .array(z.string())
      .default([])
      .transform((arg) => [
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/' +
        '11.8.0/styles/github-dark-dimmed.min.css',
        ...arg,
      ]),
  })
  .superRefine((ref, ctx) => {
    if (
      ref.format === 'pdf' &&
      ref.layout === 'horizontal'
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `"${ref.format}" format has no "${ref.layout}" layout`,
      });
    }
  });
