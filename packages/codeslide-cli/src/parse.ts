import { basename, extname } from 'path';
import { stderr, exit } from 'process';
import {
  Config,
  guessLangFromBasename,
  guessLangFromExtname,
} from '../../codeslide-config';
import { getContent, parseURL } from './tool';

export const parseConfig = async (
  rawJson?: string,
): Promise<Config | undefined> => {
  if (rawJson === undefined) {
    return;
  }
  try {
    const result = Config.parse(rawJson);
    result.slides = await Promise.all(
      result.slides.map(async (slide) => {
        if (typeof slide === 'string') {
          slide = { code: slide };
        }
        const url = parseURL(slide.code);
        return {
          code: await getContent(url) ?? slide.code,
          lang: slide.lang
            ?? guessLangFromBasename(basename(url?.pathname ?? ''))
            ?? guessLangFromExtname(extname(url?.pathname ?? '')),
          title: slide.title,
        };
      })
    );
    result.styles = await Promise.all(
      [
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/' +
        '11.7.0/styles/github-dark-dimmed.min.css',
        ...result.styles,
      ]
      .map(async (style) => (
        await getContent(style) ?? style
      ))
    );
    return result;
  } catch (error) {
    if (error instanceof Error) {
      stderr.write(`${error.name}: ${error.message}\n`);
    }
    exit(1);
  }
};
