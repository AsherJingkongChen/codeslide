import {
  dirname,
  resolve
} from 'path';
import {
  fileURLToPath
} from 'url';
import {
  renderFile
} from 'ejs';
import {
  to
} from 'await-to-js';
import {
  stdout,
  stderr,
  exit
} from 'node:process';

export const renderCodeSlide = async () => {
  const [templateError, template] =
    await to(renderFile(
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../../asset/index.ejs'
      ),
      {
        title: 'Hello CodeSlide!'
      },
      {
        openDelimiter: '[',
        closeDelimiter: ']',
        delimiter: '?'
      }
    ));

  if (templateError) {
    stderr.write(
      JSON.stringify(templateError, undefined, 2)
    );
    exit(1);
  } else {
    stdout.write(template);
  }
};
