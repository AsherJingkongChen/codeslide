import { program } from 'commander';
import { version, homepage, name } from '../package.json';
import { run } from './run';

program
  .name(name)
  .description(`\
Example: ${name} -o ./output.html

Make a HTML or PDF slideshow for code snippets
with a JSON configuration.

Go to home page for more information: ${homepage}
` )
  .version(version, '-v, --version',
    'Check the version number.'
  )
  .helpOption('-h, --help',
    'Check all options and their description.'
  )
  .option('-o, --output [local_path]',
    'The file path of "slideshow output". ' +
    'If not set, it writes the output to stdout.'
  )
  .option('--font-family [string]',
    'CSS Property'
  )
  .option('--font-size [string]',
    'CSS Property'
  )
  .option('--font-weight [string]',
    'CSS Property'
  )
  .option('--format [enum]',
    'enum = html | pdf'
  )
  .option('--layout [enum]',
    'enum = horizontal | vertical\n' +
    'Note: Cannot set --layout=horizontal when --format=pdf '
  )
  .option('--pagesize [enum]',
    'enum = letter | legal | tabloid | ledger | a0 | a1 | a2 | a3 | a4 | a5 | a6\n' +
    'Is only needed when --format=pdf'
  )
  .option('--slides [slide...]',
    'slide = title path'
  )
  .option('--styles [path...]',
    ''
  )
  .action(run)
  .parseAsync();
