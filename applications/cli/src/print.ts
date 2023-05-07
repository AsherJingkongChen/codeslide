import { PathOrFileDescriptor, writeFile } from 'fs';
import { launch } from 'puppeteer';
import { Renderer } from '../../../src';

export const render = async (
  output: PathOrFileDescriptor,
  renderer: Renderer,
): Promise<void> => {
  if (renderer.format === 'html') {
    writeFile(output, Renderer.render(renderer), 'utf8', (err) => {
      if (err) { throw err; }
    });
  } else if (renderer.format === 'pdf') {
    const browser = await launch();
    const page = await browser.newPage();
    await page.setContent(Renderer.render(renderer));
    const result = await page.pdf({
      printBackground: true,
      format: renderer.pageSize,
    });
    const closeBrowser = browser.close();
    writeFile(output, result, 'base64', (err) => {
      if (err) { throw err; }
    });
    await closeBrowser;
  }
};
