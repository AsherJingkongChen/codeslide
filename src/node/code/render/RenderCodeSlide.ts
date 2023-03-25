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
  const [markupError, markup] = await to(
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

  if (markupError) {
    stderr.write(
      JSON.stringify({ error: markupError }, undefined, 2)
    );
    exit(1);
  } else {
    stdout.write(markup);
  }
};
