import { marked } from 'marked';
import matter from 'gray-matter';
import { Renderer } from '../../../src';
import { getContent } from '../src/tool';
import hljs from 'highlight.js/lib/common';

export const parse = async (
  manifest: string
): Promise<Renderer> => {
  const { content, data } = matter(manifest);
  const renderer = Renderer.parse(data.codeslide);

  renderer.slides = await _parse(content).then((html) => (
    html.split('<hr>').map((s) => s.trim())
  ));

  renderer.styles = await Promise.all(
    renderer.styles.map((path) => getContent(path))
  );

  const stylesheet: string | undefined =
    data.codeslide.stylesheet;
  if (stylesheet) {
    renderer.styles.push(stylesheet);
  }

  return renderer;
};

const _parse = async (manifest: string) => (
  marked.parse(manifest, {
    async: true,
    async walkTokens(token: marked.Token) {
      if (token.type === 'link') {
        const { href, text, raw } = token;
        if (! text.startsWith(':')) { return; }

        const [prefix, suffix] = <[string, string | undefined]>
          text.split('.');

        if (prefix === ':slide') {
          token = _toHTMLToken(token);
          token.raw = raw;
          token.text = await _parse(
            await getContent(href)
          );
        } else if (prefix === ':code') {
          token = _toHTMLToken(token);
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
    },
  }
));

const _toHTMLToken = (
  token: marked.Token
): marked.Tokens.HTML => {
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
