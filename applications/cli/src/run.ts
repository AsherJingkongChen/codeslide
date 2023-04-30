import { stdout } from 'process';
import { guessLangFromURL } from '../../../src';
import { CLIOptions } from './options';
import { parse } from './parse';
import { print } from './print';
import { getContent, parseURL } from './tool';

export const run = async (
  options: CLIOptions,
): Promise<void> => {
  const printer = parse(options);

  printer.slides = await Promise.all(
    printer.slides.map(async (slide) => {
      if (slide.code) {
        const codeURL = parseURL(slide.code);
        return {
          code: await getContent(codeURL),
          lang: guessLangFromURL(codeURL),
          title: slide.title,
        };
      }
      return slide;
    })
  );

  printer.styles = await Promise.all(
    printer.styles.map((path) => getContent(path))
  );

  return print(options.output ?? stdout.fd, printer);

  // // Not paralleled
  // for (const slide of printer.slides) {
  //   if (slide.code) {
  //     const codeURL = parseURL(slide.code);
  //     slide.code = await getContent(codeURL);
  //     slide.lang = guessLangFromURL(codeURL);
  //   }
  // }
  // for (const [index, path] of printer.styles.entries()) {
  //   printer.styles[index] = await getContent(path);
  // }
};
