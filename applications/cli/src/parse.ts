import { Renderer, guessLangFromURL } from '../../../src';
import { CLIOptions } from './options';
import { mayfail } from './tool';
import { getContent, parseURL } from './tool';

export const parse = async (
  options: CLIOptions,
): Promise<Renderer> => {
  options = mayfail(() => CLIOptions.parse(options));

  const slides: Renderer['slides'] = [];
  options.slides?.forEach((arg, index) => {
    if (index % 2 === 0) {
      slides.push({ title: arg, code: '' });
    } else {
      slides[slides.length - 1].code = arg;
    }
  });

  const renderer = mayfail(() => Renderer.parse({
    ...options,
    slides,
  }));

  renderer.slides = await Promise.all(
    renderer.slides.map(async (slide) => {
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

  renderer.styles = await Promise.all(
    renderer.styles.map((path) => getContent(path))
  );

  return renderer;
};
