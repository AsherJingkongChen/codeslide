import type { Command } from 'commander';
import { stdout } from 'process';
import { name } from '../package.json';

export const installType = (program: Command) => {
  program
    .command('type [field]')
    .description(`\
Check the type of field. If not set, it prints types of all field.

Example 1: ${name} type styles
Example 2: ${name} type slides.lang
`   )
    .action((field?: string) => {
      const fieldType = _fieldTypes[field ?? ''] ;
      if (fieldType !== undefined) {
        stdout.write(fieldType);
      } else {
        stdout.write(`\
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
`       );
      }
    });
};

const _fieldTypes: Record<string, string | undefined> = {
'layout': `\
layout:
| "pdf" | "pdf_letter" | "pdf_legal" | "pdf_tabloid"
| "pdf_ledger" | "pdf_a0" | "pdf_a1" | "pdf_a2"
| "pdf_a3" | "pdf_a4" | "pdf_a5" | "pdf_a6"
| "scroll" | "slide" | "slide_loop",
`,
'slides': `\
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
`,
'slides.code': `\
slides: [
  { code?: string, ... },
  ...
],
`,
'slides.lang': `\
slides: [
  {
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
    ...
  },
  ...
],
`,
'slides.title': `\
slides: [
  { title?: string, ... },
  ...
],
`,
'styles': `\
styles: string[],
`} as const;
