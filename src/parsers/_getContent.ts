import { isNode } from 'browser-or-node';
import { fetch } from 'cross-fetch';
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';

export const _getContent = async (
  path: string | URL,
): Promise<string> => {
  if (isNode) {
    if (typeof path === 'string') {
      try {
        path = new URL(path);
      } catch (err) {
        path = pathToFileURL(path.toString());
      }
    }
    if (path.protocol === 'file:') {
      return readFileSync(path, 'utf8');
    } else {
      return fetch(path).then(async (r) => {
        if (r.ok) { return r.text(); }
        throw new Error(await r.text());
      });
    }
  }
  throw new Error(
    '_getContent is not implemented yet for the current platform'
  );
};
