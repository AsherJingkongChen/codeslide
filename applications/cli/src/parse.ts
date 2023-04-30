import { Printer } from '../../../src';
import { CLIOptions } from './options';
import { mayfail } from './tool';

export const parse = (
  options: CLIOptions,
): Printer => {
  options = mayfail(() => CLIOptions.parse(options));

  let slides: Printer['slides'] = [];
  options.slides?.forEach((arg, index) => {
    if (index % 2 === 0) {
      slides.push({ title: arg, code: '' });
    } else {
      slides[slides.length - 1].code = arg;
    }
  });

  return mayfail(() => Printer.parse({
    ...options,
    slides,
  }));
};
