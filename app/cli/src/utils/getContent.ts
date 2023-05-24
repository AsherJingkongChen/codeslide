import fetch from 'node-fetch';
import statuses from 'statuses';
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';

export const getContent = async (
  path: string | URL,
): Promise<string> => {
  if (typeof path === 'string') {
    try {
      path = new URL(path);
    } catch (err) {
      path = pathToFileURL(path.toString());
    }
  }
  try {
    if (path.protocol === 'file:') {
      return readFileSync(path, 'utf8');
    } else {
      const res = await fetch(path);
      if (res.ok) {
        return await res.text();
      }
      const { status } = res;
      throw new Error(`HTTP Status ${status} (${statuses(status)})`);
    }
  } catch (e) {
    const err = e as Error;
    throw new Error(
      `Cannot GET ${path.href}:\n\t${err.message}`
    );
  }
};
