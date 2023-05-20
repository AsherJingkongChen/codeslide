import { program } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { stdin, stdout } from 'process';
import { version, homepage, name } from '../package.json';
import { CLIOptions, Manifest } from '.';

program
  .name(name)
  .description(`\
Example: ${name} -m ./manifest.md -o ./output.html

Make a slideshow (HTML/PDF file) for code snippets
with a manifest (Markdown file).

Go to home page for more information:
${homepage}`)
  .version(version, '-v, --version', `\
Check the version number.`)
  .helpOption('-h, --help', `\
Check all options and their description.`)
  .option('-m, --manifest [local_path]', `\
The "manifest file path" of slideshow.
By default it reads manifest from stdin.`)
  .option('-o, --output [local_path]', `\
The "output file path" of slideshow.
By default it writes the output to stdout.`)
  .action(async (options: CLIOptions) => {
    let { output, manifest } = CLIOptions.parse(options);
    const file = output ?? stdout.fd;
    if (manifest) {
      const _manifest = await Manifest.parse(
        readFileSync(manifest, 'utf8')
      );
      const { data, encoding } = await Manifest.render(
        _manifest
      );
      writeFileSync(file, data, encoding);
    } else {
      let buffer = Buffer.alloc(0);
      stdin
        .on('data', (d) => {
          buffer = Buffer.concat([buffer, d]);
        })
        .once('end', async () => {
          const _manifest = await Manifest.parse(
            buffer.toString('utf8')
          );
          const { data, encoding } = await Manifest.render(
            _manifest
          );
          writeFileSync(file, data, encoding);
        });
    }
  })
  .parseAsync()
  .catch((err) => { throw err; });
