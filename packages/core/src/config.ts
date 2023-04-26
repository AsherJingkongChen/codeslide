import { render } from 'eta';
import { z } from 'zod';
import {
  Script,
  Stylesheet,
  Template
} from '../../asset';
import { isLang } from './lang';
import { isLayout } from './layout';

export type Config = z.infer<typeof _Config>;

export namespace Config {
  export const parse = (rawJson: string): Config => (
    _Config.parse(JSON.parse(rawJson))
  );

  export const print = (config: Config): string => (
    render(
      Template,
      {
        ...config,
        script: Script,
        styles: [
          Stylesheet,
          ...config.styles,
        ],
      },
      {
        autoTrim: false,
        tags: ['{%', '%}'],
      }
    )
  );
}

const _Config = z.object({
  layout: z
    .string()
    .refine(isLayout)
    .default('slide'),
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
