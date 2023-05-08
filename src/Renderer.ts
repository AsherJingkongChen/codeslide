import fetch from 'cross-fetch';
import hljs from 'highlight.js';
import matter from 'gray-matter';
import { Stylesheets, Template } from './slides';
import { isNode } from 'browser-or-node';
import { marked } from 'marked';
import { pathToFileURL } from 'url';
import { readFileSync } from 'fs';
import { render as renderEta } from 'eta';
import { z } from 'zod';
import { isFormat } from './Format';
import { isLayout } from './Layout';
import { isPageSize } from './PageSize';

export type Renderer = z.infer<typeof _Renderer>;

export namespace Renderer {
  export const parse = async (
    manifest: string
  ): Promise<Renderer> => {
    manifest = manifest.replace(
      /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''
    );
    const { content, data } = matter(manifest);
    if (! data.codeslide) {
      throw new Error(
        'Cannot find "codeslide" scalar in the Front Matter section'
      );
    }
  
    const renderer = _Renderer.parse(data.codeslide);
    renderer.slides = await _parse(content)
      .then((html) => html.split('<hr>').map((s) => s.trim()));
    renderer.styles = await Promise.all(
      renderer.styles.map((path) => _getContent(path))
    );
    return renderer;
  };

  export const render = (
    renderer: Renderer
  ): string => renderEta(
    Template,
    {
      layout: renderer.layout,
      slides: renderer.slides,
      style: `\
<style>
${
  [
    Stylesheets['github'],
    Stylesheets[renderer.layout],
    ...renderer.styles,
    `\
code {
  font-family: ${renderer.fontFamily};
  font-size: 85%;
}`,
    `\
#slides {
  font-family: system-ui;
  font-size: ${renderer.fontSize};
  font-weight: ${renderer.fontWeight};
  line-height: 1.5;
}`,
  ].join('\n')
}
  </style>`,
    },
    {
      autoTrim: false,
      tags: ['{%', '%}'],
    }
  );
}

export const _Renderer = z.object({
  fontFamily: z
    .string()
    .default('')
    .transform((arg) => `\
${arg ? `${arg}, ` : ''}ui-monospace, SFMono-Regular, \
SF Mono, Menlo, Consolas, Liberation Mono, monospace`
    ),
  fontSize: z
    .string()
    .default('large'),
  fontWeight: z
    .string()
    .default('normal'),
  format: z
    .string()
    .refine(isFormat)
    .default('html'),
  layout: z
    .string()
    .refine(isLayout)
    .default('horizontal'),
  pageSize: z
    .string()
    .refine(isPageSize)
    .default('A4'),
  slides: z
    .array(z.string())
    .default([]),
  styles: z
    .array(z.string())
    .default([]),
})
.transform((arg) => {
  if (
    arg.layout === 'horizontal' &&
    arg.format === 'pdf'
  ) {
    arg.layout = 'vertical';
  }
  return arg;
});

const _parse = async (manifest: string) => (
  marked.parse(manifest, {
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
          token.text = await _getContent(href)
            .then((content) => _parse(content));
        } else if (prefix === ':code') {
          token = _toHTMLToken(token);
          token.raw = raw;
          const code = await _getContent(href).then((content) => (
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

const _getContent = async (
  path: string | URL,
): Promise<string> => {
  if (typeof path === 'string') {
    path = _parseURL(path);
  }
  if (path.protocol === 'file:') {
    return readFileSync(path).toString();
  } else {
    return fetch(path).then(async (r) => {
      if (r.ok) { return r.text(); }
      throw new Error(await r.text());
    });
  }
};

const _parseURL = (path: string): URL => {
  try {
    return new URL(path);
  } catch (err) {
    if (isNode) {
      return pathToFileURL(path);
    }
    throw err;
  }
};
