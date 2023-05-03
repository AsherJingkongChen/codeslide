import { marked } from 'marked';
import matter from 'gray-matter';
import { Printer, render } from '../../../src';
import { getContent } from '../src/tool';
import {  } from 'lodash';
import { writeFileSync } from 'fs';
import { stdout } from 'process';
import hljs from 'highlight.js/lib/common';

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
  layout: horizontal
  styles:
    - https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;700&display=swap
  stylesheet: ".hljs { background: black !important; }"
---

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
`;

const { content, data } = matter(md);

const toHTMLToken = (token: marked.Token): marked.Tokens.HTML => {
  for (const p in token) {
    if (token.hasOwnProperty(p)){
      delete token[p as keyof marked.Token];
    }
  }
  token = token as marked.Token;
  token.type = 'html';
  token = token as marked.Tokens.HTML;
  token.pre = false;
  return token;
};

marked.use({
  async: true,
  async walkTokens(token) {
    if (token.type === 'link') {
      const { href, text, raw } = token;
      if (! text.startsWith(':')) { return; }

      const [prefix, suffix] = <[string, string | undefined]>
        text.split('.');

      if (prefix === ':slide') {
        token = toHTMLToken(token);
        token.raw = raw;
        token.text = await marked.parse(await getContent(href), { async: true });
      } else if (prefix === ':code') {
        token = toHTMLToken(token);
        token.raw = raw;
        const code = hljs.highlight(
          await getContent(href),
          { language: suffix ?? 'plaintext' }
        );
        token.text = `\
<pre><code class="${
  code.language ? `language-${code.language} ` : ''
}hljs">${
  code.value
}</code></pre>`;
      }
    }
  }
});

//     if (! token.text.startsWith(':')) {
//       return `<a\
// ${token.href ? ` href="${token.href}"` : ''}\
// ${token.title ? ` title="${token.title}"` : ''}\
// ${token.text ? `>${token.text}</a>` : '>'}`;
//     }

//     const [prefix, suffix] = <[string, string | undefined]>
//       token.text.split('.');
//     if (prefix === 'slide' && token.href !== null) {
//       return marked.parse(await getContent(href)) as string;
//     }
//     return false;

const printer = Printer.parse(data.codeslide);
printer.slides = (
  await marked.parse(content, { async: true })
).split('<hr>');
printer.styles = await Promise.all(
  printer.styles.map((path) => getContent(path))
);
writeFileSync(stdout.fd, render(printer), 'utf8');

// process content: img (code.xxx), html (md), <hr>
})());
