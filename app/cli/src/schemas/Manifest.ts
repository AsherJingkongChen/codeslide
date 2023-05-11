import { PathOrFileDescriptor, writeFileSync } from 'fs';
import matter from 'gray-matter';
import { launch } from 'puppeteer';
import { FrontMatter } from './FrontMatter';
import { SlideShow } from './SlideShow';
import { Renderer } from '../../../../src';
import { getContent } from '../utils';

export type Manifest = FrontMatter & SlideShow;

export namespace Manifest {
  export const parse = async (
    manifest: string
  ): Promise<Manifest> => {
    manifest = manifest.replace(
      /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''
    );
    const { content, data } = matter(manifest);
    if (data.codeslide === undefined) {
      throw new Error(
        'Cannot find the key "codeslide" in the Front Matter section'
      );
    }
    const fm = FrontMatter.parse(data.codeslide);
    fm.styles = await Promise.all(
      fm.styles.map((path) => getContent(path))
    );
    const slides = await SlideShow.parse(content);
    return { ...fm, ...slides };
  };

  export const print = async (
    output: PathOrFileDescriptor,
    manifest: Manifest,
  ): Promise<void> => {
    if (manifest.format === 'html') {
      writeFileSync(output, Renderer.render(manifest), 'utf8');
    } else if (manifest.format === 'pdf') {
      const browser = await launch();
      const page = await browser.newPage();
      await page.setContent(Renderer.render(manifest));
      const result = await page.pdf({
        printBackground: true,
        format: manifest.pageSize,
      });
      const closeBrowser = browser.close();
      writeFileSync(output, result, 'base64');
      await closeBrowser;
    }
  };  
}
