import { program } from 'commander';
import { readFile } from 'fs';
import { stdin, stdout } from 'process';
import { version, homepage, name } from '../package.json';
import { CLIOptions } from './CLIOptions';
import { print } from './print';

program
  .name(name)
  .description(`\
Example: ${name} -m ./manifest.md -o ./output.html

Make a slideshow (HTML/PDF file) for code snippets
with a manifest (Markdown file).

Go to home page for more information: ${homepage}
` )
  .version(version, '-v, --version', `\
Check the version number.`
  )
  .helpOption('-h, --help', `\
Check all options and their description.`
  )
  .option('-o, --output [local_path]', `\
The "output file path" of slideshow.
By default it writes the output to stdout.`
  )
  .option('-m, --manifest [local_path]', `\
The "manifest file path" of slideshow.
By default it reads manifest from stdin.`
  )
  .action(async (options: CLIOptions) => {
    let { output, manifest } = CLIOptions.parse(options);
    if (manifest) {
      readFile(manifest, (err, data) => {
        if (err) { throw err; }
        print(output ?? stdout.fd, data.toString('utf8'));
      });
    } else {
      let data = Buffer.alloc(0);
      stdin
        .on('data', (d) => {
          data = Buffer.concat([data, d]);
        })
        .once('end', () => {
          print(output ?? stdout.fd, data.toString('utf8'));
        });
    }
  })
  .parseAsync();
