import { program } from 'commander';
import { version, homepage, name } from '../package.json';
import { stdout } from 'process';
import { parse } from './parse';
import { print } from './print';

program
  .name(name)
  .description(`\
Example: ${name} -o ./output.html

Make a slideshow (HTML/PDF file) for code snippets
with CLI options.

Go to home page for more information: ${homepage}
` )
  .version(version, '-v, --version',
    'Check the version number.'
  )
  .helpOption('-h, --help',
    'Check all options and their description.'
  )
  .option('-o, --output [local_path]', `\
The "output file path" of slideshow.
By default it writes the output to stdout.`
  )
  .option('--font-family [CSS_value]', `\
The font family of "displayed texts".
Default is "ui-monospace, SFMono-Regular, \
SF Mono, Menlo, Consolas, Liberation Mono, monospace".`
  )
  .option('--font-size [CSS_value]', `\
The font size of "displayed texts".
Default is "large".`
  )
  .option('--font-weight [CSS_value]', `\
The font weight of "displayed texts".
Default is "normal".`
  )
  .option('--format [html | pdf]', `\
The "output file format" of slideshow.
Default is "html".`
  )
  .option('--layout [layout]', `\
The "layout" of slideshow.
[layout] can be either "horizontal" or "vertical"
Default is "horizontal".`
  )
  .option('--pagesize [size]', `\
The page size of slideshow "in PDF format".
[size] can be either "letter", "legal", "tabloid", \
"ledger", "a0", "a1", "a2", "a3", "a4", "a5", "a6"
Default is "a4".`
  )
  .option('--slides [slide...]', `\
The "contents" to show. An array of slides.
Each slide is a pair of title and path (URL).
Example: --slides "Intro" "./README.md" "Program" "./index.js"; \
There are 2 slides where the first is titled as "Intro" \
and shows the content from "./README.md".`
  )
  .option('--styles [path...]', `\
The "display styles" of slideshow. An array of paths (URLs) of CSS files.
You may need this if the slideshow needs to ...:
1. load custom font family.
2. load custom syntax highlighting theme.
3. change the background.`
  )
  .action(async (options) => (
    print(options.output ?? stdout.fd, await parse(options))
  ))
  .parseAsync();
