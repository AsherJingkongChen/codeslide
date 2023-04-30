import { render as renderEta } from 'eta';
import { Stylesheet, Template } from './app';
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
    Stylesheet[printer.layout],
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

export * from './format';
export * from './lang';
export * from './layout';
export * from './pagesize';
export * from './printer';
