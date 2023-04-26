import { program } from 'commander';
import { processIO } from './process';
import { version, homepage } from '../package.json';

program
  .name('codeslide-cli')
  .description(
    'Example: codeslide-cli -c ./config.json -o ./output.html\n\n' +
    'Make a HTML or PDF slideshow for code snippets ' +
    'with a JSON configuration.\n' +
    `Go to home page for more information: ${homepage}`
  )
  .version(version, '-v, --version',
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
  .action(processIO)
  .parse();

export * from './process';
export * from './tool';
