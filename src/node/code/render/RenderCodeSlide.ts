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
  const [error, embedded] = await to(
    renderFile(
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../../asset/template.ejs'
      ),
      {
        code: 'const num = 0;\nconsole.log(num);'.replace('\n', '\\n'),
        title: 'Hello CodeSlide!'
      },
      {
        openDelimiter: '[',
        closeDelimiter: ']',
        delimiter: '?'
      }
    )
  );

  if (error) {
    stderr.write(
      JSON.stringify({ error }, undefined, 2)
    );
    exit(1);
  } else {
    stdout.write(embedded);
  }
};
