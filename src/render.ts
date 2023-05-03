import { render as renderEta } from 'eta';
import { Stylesheets, Template } from './slides';
import { Printer } from './printer';

export const render = (printer: Printer): string => renderEta(
  Template,
  {
    layout: printer.layout,
    slides: printer.slides,
    style: `\
<style>
${
  [
    Stylesheets['github'],
    Stylesheets[printer.layout],
    ...printer.styles,
    `code { font-family: ${printer.fontFamily}; }`,
    `#slides { font-size: ${printer.fontSize}; }`,
    `#slides { font-weight: ${printer.fontWeight}; }`,
  ].join('\n')
}
  </style>`,
  },
  {
    autoTrim: false,
    tags: ['{%', '%}'],
  }
);
