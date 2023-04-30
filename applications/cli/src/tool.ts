import fetch from 'node-fetch';
import { readFileSync, writeFileSync } from 'fs';
import { exit, stderr } from 'process';
import { pathToFileURL } from 'url';

export const parseURL = (path: string): URL => {
  try { return new URL(path); }
  catch (_) { return pathToFileURL(path); }
};

export const getContent = async (
  path: string | URL,
): Promise<string> => {
  if (typeof path === 'string') {
    path = parseURL(path);
  }
  if (path.protocol === 'file:') {
    return mayfail(() => (
      readFileSync(path).toString()
    ));
  } else {
    return mayfailAsync(
      fetch(path).then((r) => r.text())
    );
  }
};

export const mayfail = <T>(fn: () => T): T => {
  try { return fn(); }
  catch (e) { _fail(e); exit(1); }
};

export const mayfailAsync = async <T>(
  fn: Promise<T> | (() => Promise<T>)
): Promise<T> => (
  (typeof fn === 'function' ? fn() : fn).catch((e) => _fail(e))
);

const _fail = (err: unknown): never => {
  if (err instanceof Error) {
    writeFileSync(stderr.fd, `Error: ${err.message}\n`);
  } else {
    writeFileSync(stderr.fd, `Error: ${err}\n`);
  }
  exit(1);
};
