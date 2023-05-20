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
    renderer,
    walkTokens,
  }).catch((err: Error) => {
    err.message = `Cannot parse the Slide Show section:\n\t${
      err.message.replace(
        '\nPlease report this to https://github.com/markedjs/marked.', ''
      )
    }`;
    throw err;
  })
);

const highlight = (
  code: string,
  language: string,
): string => (
  _highlight(code, language).value
);

const _highlight = (
  code: string,
  language: string,
): HighlightResult => {
  try {
    language = language || 'plaintext';
    return hljs.highlight(code, { language });
  } catch (e) {
    const err = e as Error;
    err.message =
      `Cannot parse the code "${
        code.substring(0, 30).split('\n')[0]
      } ...":\n\t${err.message}`;
    throw e;
  }
};

const renderer = new class extends marked.Renderer {
  override code(
    code: string,
    language: string | undefined,
    isEscaped: boolean
  ): string {
    const original = super.code(code, language, isEscaped);
    const class_index = original.indexOf('">');
    return class_index === -1
      ? original
      : `${
        original.slice(0, class_index)
      } hljs${
        original.slice(class_index)
      }`;
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
      const result = _highlight(code, suffix ?? 'plaintext');
      token.text = `\
<pre><code${
  result.language ?
    ` class="language-${result.language} hljs"` : ''
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
