import { render } from '../../../src';
import { writeFileSync } from 'fs';
import { stdout } from 'process';
import { parse } from './parse';

((async () => {
// title: the first h1 of each slide
const md: string = `\
---
codeslide:
  version: 0.12.0
  fontFamily: Noto Sans Mono
  fontSize: 20px
  fontWeight: '400'
  format: html
  layout: vertical
  styles:
    - https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;700&display=swap
---
# The Introduction of CodeSlide

---
[:slide](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/README.md "okok")

---
# The essentials

---
# Render the HTML template and CSS to a slideshow

[:code.ts](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/slides/index.ts)

[:code.ts](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/printer.ts)

[:code.ts](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/index.ts)

---
# The HTML template and CSS

HTML
[:code.html](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/slides/slides.html)

CSS (Horizontal layout)
[:code.css](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/slides/slides.horizontal.css)

CSS (Vertical layout)
[:code.css](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/slides/slides.vertical.css)

---
# Let's see some applications!

---
# CodeSlide CLI: A Node.js Command Line Interface
[:code.ts](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/index.ts)

---
# CLI options validator
[:code.ts](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/options.ts)

---
# Parse CLI options -> Print to output
[:code.ts](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/parse.ts)

[:code.ts](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/print.ts)

[:code.ts](https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/run.ts)

---
# The End
`.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '');

// parse
const printer = await parse(md);

// print
writeFileSync(stdout.fd, render(printer), 'utf8');

// process content: img (code.xxx), html (md), <hr>
})());
