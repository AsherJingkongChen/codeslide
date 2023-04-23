import { program } from 'commander';
import { process } from './process';

program
  .name('codeslide')
  .description(
    'Make a HTML or PDF slideshow for code snippets ' +
    'with a JSON configuration.\n' +
    'See README for more information:\n' +
    'https://github.com/AsherJingkongChen/codeslide/packages/' +
    'codeslide-cli/README.md'
  )
  .version('0.10.0', '-v, --version',
    'Check the version number.'
  )
  .helpOption('-h, --help',
    'Check all options and their description.'
  )
  .option('-c, --config [path]',
    'The file path of "slideshow config".\n' +
    'If not set, the config will be read from stdin.'
  )
  .option('-o, --output [path]',
    'The file path of "slideshow output".\n' +
    'If not set, the output will be written to stdout.'
  )
  .action(process)
  .parse();

export * from './parse';
export * from './process';
export * from './tool';
