import { PathOrFileDescriptor, writeFileSync } from 'fs';
import { launch } from 'puppeteer';
import { render, Printer } from '../../../src';
import { mayfailAsync } from './tool';

export const print = (
  output: PathOrFileDescriptor,
  printer: Printer,
): Promise<void> => mayfailAsync(async () => {
  if (printer.format === 'html') {
    writeFileSync(output, render(printer), 'utf8');
  } else if (printer.format === 'pdf') {
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
    writeFileSync(output, result, 'base64');
    await closeBrowser;
  }
});
