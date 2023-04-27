import { program } from 'commander';
import { writeFileSync } from 'fs';
import { stderr, stdin, stdout, exit } from 'process';
import { version, homepage, name } from '../package.json';
import { processConfig, getContent } from '../../core';
import { installType } from './type';

installType(program);

program
  .name(name)
  .description(`\
Example: ${name} -c ./config.json -o ./output.html

Make a HTML or PDF slideshow for code snippets
with a JSON configuration.

Configuration Schema (TypeScript Syntax):
\`\`\`
type Config = {
  layout:
  | "pdf" | "pdf_letter" | "pdf_legal" | "pdf_tabloid"
  | "pdf_ledger" | "pdf_a0" | "pdf_a1" | "pdf_a2"
  | "pdf_a3" | "pdf_a4" | "pdf_a5" | "pdf_a6"
  | "scroll" | "slide" | "slide_loop",
  slides: (
  | string
  | {
      code?: string,
      lang?:
      | "armasm" | "c" | "clojure" | "cmake" | "coffeescript"
      | "cpp" | "csharp" | "css" | "dart" | "diff"
      | "elixir" | "erlang" | "go" | "graphql" | "groovy"
      | "haskell" | "ini" | "java" | "javascript" | "json"
      | "julia" | "kotlin" | "less" | "lisp" | "lua"
      | "makefile" | "markdown" | "objectivec" | "perl" | "php"
      | "plaintext" | "python" | "r" | "ruby" | "rust"
      | "scala" | "scss" | "shell" | "sql" | "swift"
      | "typescript" | "vbnet" | "xml" | "yaml",
      title?: string,
    }
  )[],
  styles: string[],
};
\`\`\`

Go to home page for more information: ${homepage}
` )
  .version(version, '-v, --version',
    'Check the version number.'
  )
  .helpOption('-h, --help',
    'Check all options and their description.'
  )
  .option('-c, --config [path]',
    'The file path of "slideshow config". ' +
    'If not set, it reads the config from stdin.'
  )
  .option('-o, --output [path]',
    'The file path of "slideshow output". ' +
    'If not set, it writes the output to stdout.'
  )  
  .action(async ({ config, output }) => {
    if (typeof config !== 'string') {
      let input = Buffer.alloc(0);
      stdin
        .on('data', (d) => {
          input = Buffer.concat([input, d]);
        })
        .once('end', async () => {
          const [result, encoding] = await processConfig(
            input.toString()
          );
          writeFileSync(output ?? stdout.fd, result, encoding);
        });
    } else {
      config = await getContent(config);
      if (config === undefined) {
        stderr.write('Error: Cannot read the given config\n');
        exit(1);
      }
      const [result, encoding] = await processConfig(config);
      writeFileSync(output ?? stdout.fd, result, encoding);
    }
  });

program.parseAsync();
