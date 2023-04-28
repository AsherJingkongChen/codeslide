import fetch from 'node-fetch';
import { pathToFileURL } from 'url';
import { existsSync, readFileSync } from 'fs';
import { exit, stderr } from 'process';

export const parseURL = (
  raw?: string,
): URL | undefined => {
  if (raw === undefined) {
    return;
  }
  try {
    return new URL(raw);
  } catch (_) {
    return pathToFileURL(raw);
  }
};

export const getContent = async (
  src?: string | URL,
): Promise<string | undefined> => {
  if (typeof src !== 'object') {
    src = parseURL(src);
  }
  if (src === undefined) {
    return;
  }
  if (src.protocol === 'file:') {
    return existsSync(src.pathname)
      ? readFileSync(src).toString()
      : undefined;
  }
  return fetch(src)
    .then((r) => r.text())
    .catch((e: Error) => {
      stderr.write(`Error: ${e.message}\n`);
      exit(1);
    });
};
