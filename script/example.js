#!/usr/bin/env node

import { stdout, stderr, argv } from 'node:process';
import { exec } from 'node:child_process';
import { join } from 'node:path';

const main = () => {
  run('demo', 'index.html');
  run('demo-pdf', 'index.pdf');
  run('demo-scroll', 'index.html');
};

const run = (exampleName, slideName) => {
  const binary = join('target', argv[2], 'codeslide-cli');
  const example = join('example', exampleName);
  const slide = join(example, slideName);
  const clientSchema = join(example, 'client_schema.json');
  const debug = join(example, 'debug.log');
  exec(`${binary} < ${clientSchema} 1>${slide} 2>${debug}`, execall);
};

const execall = (error, fromStdout, fromStderr) => {
  if (error) {
    stderr.write(JSON.stringify(error, undefined, 2) + '\n');
    return;
  }
  if (fromStderr) {
    stderr.write(fromStderr);
    return;
  }
  if (fromStdout) {
    stdout.write(fromStdout);
    return;
  }
  return;
};

main();
