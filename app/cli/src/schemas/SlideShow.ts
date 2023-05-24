import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
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
  marked.parse(markdown, { async: true }).catch((err: Error) => {
    err.message = `Cannot parse the Slide Show section:\n\t${
      err.message.replace(
        '\nPlease report this to https://github.com/markedjs/marked.', ''
      )
    }`;
    throw err;
  })
);

const langPrefix = 'hljs language-';

marked.use(
  markedHighlight({
    langPrefix,
    highlight: (code, lang) => _highlight(code, lang).value,
  }),
  {
    async: true,
    mangle: false,
    renderer: {
      heading(
        text: string,
        level: 1 | 2 | 3 | 4 | 5 | 6,
        raw: string,
      ): string {
        const id = _slugger.slug(raw);
        return `\
<h${level} id="${id}">
  ${text}
  <a class="hljs anchor" href="#${id}">🔗</a>
</h${level}>
`;
      }
    },
    walkTokens: async (token: marked.Token) => {
      if (token.type === 'link') {
        const { href, text } = token;
        if (! text.startsWith(':')) {
          return;
        }
  
        const [prefix, suffix] = <[string, string | undefined]>
          text.split('.');
        if (prefix === ':slide') {
          token = _toHTMLToken(token);
          token.text = await _parseMarkdown(
            await getContent(href)
          );
        } else if (prefix === ':code') {
          token = _toHTMLToken(token);
          const { language, value } = _highlight(
            await getContent(href), suffix,
          );
          token.text = `\
<pre><code class="${langPrefix}${language}">${
  value
}</code></pre>
`;
        } else if (prefix === ':video') {
          token = _toHTMLToken(token);
          token.text = `\
<div class="video">
  <video controls src="${href}">
    <a class="hljs" href="${href}">🎥</a>
  </video>
  <a class="hljs" href="${href}">🎥</a>
</div>
`;
        }
      }
    },
  },
);

const _highlight = (
  code: string,
  language?: string,
) => {
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

const _slugger = new marked.Slugger();

const _toHTMLToken = (
  token: marked.Token
): marked.Tokens.HTML => {
  for (const p in token) {
    if (token.hasOwnProperty(p) && p !== 'raw'){
      delete token[p as keyof marked.Token];
    }
  }
  token = token as marked.Token;
  token.type = 'html';
  return token as marked.Tokens.HTML;
};
