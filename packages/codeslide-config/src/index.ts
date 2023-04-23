import { render } from 'eta';
import { z } from 'zod';
import {
  Script,
  Stylesheet,
  Template
} from '../../codeslide-asset';
import { isLang } from './lang';
import { isLayout } from './layout';

export type Config = z.infer<typeof _Config>;

export namespace Config {
  export const parse = (
    rawJson: string,
  ): Config => (
    _Config.parse(JSON.parse(rawJson))
  );

  export const print = (
    interp?: Config,
  ): string | undefined => (
    interp !== undefined ?
      render(
        Template,
        {
          ...interp,
          script: Script,
          styles: [
            Stylesheet,
            ...interp.styles,
          ],
        },
        {
          autoTrim: false,
          tags: ['{%', '%}'],
        }
      ) : undefined
  );
}

const _Config = z.object({
  layout: z
    .string()
    .refine(isLayout)
    .default('slide'),
  looping: z
    .boolean()
    .default(false),
  slides: z
    .array(
      z.object({
        code: z
          .string()
          .optional(),
        lang: z
          .string()
          .refine(isLang)
          .optional(),
        title: z
          .string()
          .optional(),
      })
      .strict()
      .or(z.string())
    )
    .default([]),
  styles: z
    .array(z.string())
    .default([]),
}).strict();

export * from './lang';
export * from './layout';
