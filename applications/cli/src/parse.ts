import hljs from 'highlight.js';
import matter from 'gray-matter';
import fetch from 'node-fetch';
import { marked } from 'marked';
import { Renderer } from '../../../src';
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';

export const parse = async (
  manifest: string
): Promise<Renderer> => {
  manifest = manifest.replace(
    /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''
  );
  const { content, data } = matter(manifest);
  if (! data.codeslide) {
    throw new Error(
      'Cannot find "codeslide" scalar in the Font Matter section'
    );
  }

  const renderer = Renderer.parse(data.codeslide);

  renderer.slides = await _parse(content)
    .then((html) => html.split('<hr>').map((s) => s.trim()));

  renderer.styles = await Promise.all(
    renderer.styles.map((path) => _getContent(path))
  );

  // Is raw stylesheet needed?
  // const stylesheet: string | undefined =
  //   data.codeslide.stylesheet;
  // if (stylesheet) {
  //   renderer.styles.push(stylesheet);
  // }

  return renderer;
};

const _parse = async (manifest: string) => (
  marked.parse(manifest, {
    async: true,
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

const _parseURL = (path: string): URL => {
  try { return new URL(path); }
  catch (_) { return pathToFileURL(path); }
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
