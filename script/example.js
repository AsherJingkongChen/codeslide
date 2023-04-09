#!/usr/bin/env node

import { stdout, stderr } from 'node:process';
import { exec } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const main = () => {
  readdirSync('./example').forEach((exampleName) => {
    exampleName = join('./example', exampleName);
    const exampleClientSchema = join(exampleName, 'cs.json');
    const exampleSlide = join(exampleName, 'index.html');
    if (existsSync(exampleClientSchema)) {
      exec(`
        ./target/release/codeslide-cli\
        < ${exampleClientSchema}\
        > ${exampleSlide}
      `, execall);
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
