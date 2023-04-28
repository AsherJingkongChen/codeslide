import { basename, extname } from 'path';
import { stderr, exit } from 'process';
import { launch } from 'puppeteer';
import {
  getPdfFormat,
  parseConfig,
  printConfig,
  guessLangFromBasename,
  guessLangFromExtname,
} from '../common';
import { getContent, parseURL } from './tool';

export const processConfig = async (
  rawJson: string,
): Promise<[string, BufferEncoding]> => {
  try {
    const config = parseConfig(rawJson);
    config.slides = await Promise.all(
      config.slides.map(async (slide) => {
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
    config.styles = await Promise.all(
      [
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/' +
        '11.7.0/styles/github-dark-dimmed.min.css',
        ...config.styles,
      ]
      .map(async (style) => (
        await getContent(style) ?? style
      ))
    );

    let result = printConfig(config);
    const format = getPdfFormat(config.layout);
    if (format === undefined) {
      return [result, 'utf8'];
    }

    const browser = await launch();
    const page = await browser.newPage();
    await page.setContent(result);
    result = (await page.pdf({
      printBackground: true,
      format,
    })).toString('base64');
    await browser.close();
    return [result, 'base64'];

  } catch (error) {
    if (error instanceof Error) {
      stderr.write(`${error.name}: ${error.message}\n`);
    } else {
      stderr.write(`Error: ${error}\n`);
    }
    exit(1);
  }
};
