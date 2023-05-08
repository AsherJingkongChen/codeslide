import { PathOrFileDescriptor, writeFileSync } from 'fs';
import { launch } from 'puppeteer';
import { Renderer } from '../../../src';

export const print = async (
  output: PathOrFileDescriptor,
  manifest: string,
): Promise<void> => {
  const renderer = await Renderer.parse(manifest);
  if (renderer.format === 'html') {
    writeFileSync(output, Renderer.render(renderer), 'utf8');
  } else if (renderer.format === 'pdf') {
    const browser = await launch();
    const page = await browser.newPage();
    await page.setContent(Renderer.render(renderer));
    const result = await page.pdf({
      printBackground: true,
      format: renderer.pageSize,
    });
    const closeBrowser = browser.close();
    writeFileSync(output, result, 'base64');
    await closeBrowser;
  }
};
