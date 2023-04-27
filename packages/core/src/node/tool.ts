import fetch from 'node-fetch';
import { pathToFileURL } from 'url';
import { existsSync, readFileSync } from 'fs';

export const parseURL = (
  raw?: string,
): URL | undefined => {
  if (typeof raw !== 'string') {
    return;
  }
  try {
    return new URL(raw);
  } catch (_) {
    const result = pathToFileURL(raw);
    if (existsSync(result.pathname)) {
      return result;
    }
  }
  return;
};

export const getContent = async (
  src?: string | URL,
): Promise<string | undefined> => {
  if (typeof src === 'string') {
    src = parseURL(src);
  }
  if (typeof src !== 'object') {
    return;
  }
  if (src.protocol === 'file:') {
    return readFileSync(src).toString();
  }
  return fetch(src).then((r) => r.text());
};
