import { Printer, guessLangFromURL } from '../../../src';
import { CLIOptions } from './options';
import { mayfail } from './tool';
import { getContent, parseURL } from './tool';

export const parse = async (
  options: CLIOptions,
): Promise<Printer> => {
  options = mayfail(() => CLIOptions.parse(options));

  const slides: Printer['slides'] = [];
  options.slides?.forEach((arg, index) => {
    if (index % 2 === 0) {
      slides.push({ title: arg, code: '' });
    } else {
      slides[slides.length - 1].code = arg;
    }
  });

  const printer = mayfail(() => Printer.parse({
    ...options,
    slides,
  }));

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

  return printer;
};
