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
import { to } from 'await-to-js';

const [templateError, template] =
  await to(renderFile(
    resolve(
      dirname(fileURLToPath(import.meta.url)),
      './asset/template.ejs'
    ),
    {
      content: 'Hello World!'
    },
    {
      openDelimiter: '[',
      closeDelimiter: ']'
    }
  ));

if (templateError) {
  console.log({ templateError });
} else {
  console.log({ template });
}
