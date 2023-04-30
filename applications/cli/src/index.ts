import { program } from 'commander';
import { version, homepage, name } from '../package.json';
import { run } from './run';

program
  .name(name)
  .description(`\
Example: ${name} -o ./output.html

Make a slideshow (HTML/PDF file) for code snippets
with CLI options

Go to home page for more information: ${homepage}
` )
  .version(version, '-v, --version',
    'Check the version number.'
  )
  .helpOption('-h, --help',
    'Check all options and their description.'
  )
  .option('-o, --output [local_path]',
    'The "output file path" of slideshow. ' +
    'If not set, it writes the output to stdout.'
  )
  .option('--font-family [string]',
    'The font family of "displayed texts". ' +
    'Default is "ui-monospace, SFMono-Regular, ' +
    'SF Mono, Menlo, Consolas, Liberation Mono, monospace".'
  )
  .option('--font-size [string]',
    'The font size of "displayed texts". ' +
    'Default is "large".'
  )
  .option('--font-weight [string]',
    'The font weight of "displayed texts". ' +
    'Default is "normal".'
  )
  .option('--format [html | pdf]',
    'The "output file format" of slideshow. ' +
    'Default is "html".'
  )
  .option('--layout [horizontal | vertical]',
    'The "layout" of slideshow. ' +
    'Default is "horizontal".'
  )
  .option('--pagesize [letter | legal | tabloid | ledger | a0 | a1 | a2 | a3 | a4 | a5 | a6]',
    'The page size of slideshow "in PDF format". ' +
    'Default is "a4".'
  )
  .option('--slides [slide...]',
    'The "contents" to show. ' +
    'An array of slides, each slide is a pair of title and path (URL). ' +
    'Example: --slides "Intro" "./README.md" "Program" "./index.js"; ' +
    'There are 2 slides where the first is titled as "Intro" ' +
    'and shows the content from "./README.md".'
  )
  .option('--styles [path...]',
    'The "display styles" of slideshow. ' +
    'An array of paths (URLs) of CSS files. ' +
    'You may need this if: ' +
    '1. To load custom font family ' +
    '2. To load custom syntax highlighting theme ' +
    '3. To change the background '
  )
  .action(run)
  .parseAsync();
