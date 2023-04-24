import { writeFileSync } from 'fs';
import { basename, extname } from 'path';
import { stderr, stdin, stdout, exit } from 'process';
import { launch } from 'puppeteer';
import {
  getPdfFormat,
  Config,
  guessLangFromBasename,
  guessLangFromExtname,
} from '../../codeslide-config';
import { getContent, parseURL } from './tool';

export const processIO = async (
  { config, output }: any
): Promise<void> => {
  if (config === undefined) {
    let input = Buffer.alloc(0);
    stdin
      .on('data', (d) => {
        input = Buffer.concat([input, d]);
      })
      .once('end', async () => {
        const [result, encoding] = await processConfig(
          input.toString()
        );
        writeFileSync(output ?? stdout.fd, result, encoding);
      });
  } else {
    config = await getContent(config);
    if (config === undefined) {
      stderr.write('Error: Cannot read the given config\n');
      exit(1);
    }
    const [result, encoding] = await processConfig(config);
    writeFileSync(output ?? stdout.fd, result, encoding);
  }
};

export const processConfig = async (
  rawJson: string,
): Promise<[string, BufferEncoding]> => {
  try {
    const config = Config.parse(rawJson);
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

    let result = Config.print(config);
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
    }
    exit(1);
  }
};
