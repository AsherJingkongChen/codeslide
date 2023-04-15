#!/usr/bin/env node

import { stdout, stderr, argv } from 'node:process';
import { exec } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const main = () => {
  readdirSync('./example').forEach((examplePath) => {
    examplePath = join('./example', examplePath);
    const exampleClientSchema
      = join(examplePath, 'client_schema.json');
    const exampleSlide = join(examplePath, 'index.html');
    const exampleDebug = join(examplePath, 'debug.log');
    if (existsSync(exampleClientSchema)) {
      exec(`\
./target/${argv[2]}/codeslide-cli \
< ${exampleClientSchema} \
1>${exampleSlide} \
2>${exampleDebug}`, execall);
    }
  });
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
