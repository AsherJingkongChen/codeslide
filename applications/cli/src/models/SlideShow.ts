import hljs from 'highlight.js';
import { marked } from 'marked';
import { getContent } from '../utils';

export type SlideShow = { slides: string[] };

export namespace SlideShow {
  export const parse = async (
    markdown: string
  ): Promise<SlideShow> => {
    const html = await _parseMarkdown(markdown);
    return {
      slides: html.split('<hr>').map((s) => s.trim())
    };
  };
}

const _parseMarkdown = (
  markdown: string
): Promise<string> => marked.parse(markdown, {
  async: true,
  highlight: (code, language) => (
    hljs.highlight(code, { language }).value
  ),
  walkTokens: async (token: marked.Token) => {
    if (token.type === 'link') {
      const { href, text, raw } = token;
      if (! text.startsWith(':')) {
        return;
      }
      const [prefix, suffix] = <[string, string | undefined]>
        text.split('.');
      if (prefix === ':slide') {
        token = _toHTMLToken(token);
        token.raw = raw;
        token.text = await getContent(href)
          .then((content) => _parseMarkdown(content));
      } else if (prefix === ':code') {
        token = _toHTMLToken(token);
        token.raw = raw;
        const code = await getContent(href).then((content) => (
          hljs.highlight(content, {
            language: suffix ?? 'plaintext'
          })
        ));
        token.text = `\
<pre><code${
  code.language ? ` class="language-${code.language}"` : ''
}>${
  code.value
}</code></pre>`;
      }
    }
  },
});

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
  token.pre = true;
  return token;
};
