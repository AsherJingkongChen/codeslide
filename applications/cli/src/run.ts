import { writeFileSync } from 'fs';
import { stdout } from 'process';
import { launch } from 'puppeteer';
import {
  guessLangFromURL,
  render,
  Printer,
} from '../../../src';
import { CLIOptions } from './options';
import {
  getContent,
  mayfail,
  mayfailAsync,
  parseURL
} from './tool';

export const run = async (
  options: CLIOptions,
): Promise<void> => {
  options = mayfail(() => CLIOptions.parse(options));

  let slides: Printer['slides'] = [];
  options.slides?.forEach((arg, index) => {
    if (index % 2 === 0) {
      slides.push({ title: arg, code: '' });
    } else {
      slides[slides.length - 1].code = arg;
    }
  });

  const printer = mayfail(() => (
    Printer.parse({
      ...options,
      slides,
    })
  ));

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

  await mayfailAsync(async () => {
    switch (printer.format) {
      case 'html':
        writeFileSync(
          options.output ?? stdout.fd,
          render(printer), 'utf8'
        );
        break;
      case 'pdf':
        const browser = await mayfailAsync(launch());
        const page = await mayfailAsync(browser.newPage());
        await mayfailAsync(page.setContent(render(printer)));
        const result = await mayfailAsync(
          page.pdf({
            printBackground: true,
            format: printer.pagesize, // is it redundant?
          }
        ));
        const closeBrowser = mayfailAsync(browser.close());
        writeFileSync(
          options.output ?? stdout.fd,
          result, 'base64'
        );
        await closeBrowser;
        break;
      default: throw new Error('Undefined Printer.format');
    }
  });
};
