import hljs, { HighlightResult } from 'highlight.js';
import { marked } from 'marked';
import { getContent } from '../utils';

export type SlideShow = { slides: string[] };

export namespace SlideShow {
  export const parse = async (
    markdown: string
  ): Promise<SlideShow> => {
    const html = await _parseMarkdown(markdown);
    return { slides: html.split('<hr>').map((s) => s.trim()) };
  };
}

const _parseMarkdown = (
  markdown: string
): Promise<string> => (
  marked.parse(markdown, {
    async: true,
    highlight,
    walkTokens,
  }).catch((err: Error) => {
    err.message = err.message.replace(
      '\nPlease report this to https://github.com/markedjs/marked.', ''
    );
    err.message = `Cannot parse the Slide Show section:\n\t${err.message}`;
    throw err;
  })
);

const highlight = (code: string, language: string): string => {
  try {
    return hljs.highlight(code, { language }).value;
  } catch (e) {
    const err = e as Error;
    err.message =
      `Cannot parse the code "${
        code.substring(0, 30).split('\n')[0]
      } ...":\n\t${err.message}`;
    throw e;
  }
};

const walkTokens = async (
  token: marked.Token
): Promise<void> => {
  if (token.type === 'link') {
    const { href, text } = token;
    if (! text.startsWith(':')) {
      return;
    }
    const [prefix, suffix] = <[string, string | undefined]>
      text.split('.');
    token = _toHTMLToken(token);
    if (prefix === ':slide') {
      const slide = await getContent(href);
      token.text = await _parseMarkdown(slide);
    } else if (prefix === ':code') {
      const code = await getContent(href);
      let result: HighlightResult | undefined;
      try {
        result = hljs.highlight(code, {
          language: suffix ?? 'plaintext'
        });
      } catch (e) {
        const err = e as Error;
        err.message = `\
Cannot parse the code at ${href}:
\t${err.message}`;
        throw e;
      }
      token.text = `\
<pre><code${
  result.language ?
    ` class="language-${result.language}"` : ''
}>${
  result.value
}</code></pre>`;
    }
  }
};

const _toHTMLToken = (
  token: marked.Token
): marked.Tokens.HTML => {
  const { raw } = token;
  for (const p in token) {
    if (token.hasOwnProperty(p)){
      delete token[p as keyof marked.Token];
    }
  }
  token = token as marked.Token;
  token.type = 'html';
  token.raw = raw;
  token = token as marked.Tokens.HTML;
  token.pre = true;
  return token;
};
