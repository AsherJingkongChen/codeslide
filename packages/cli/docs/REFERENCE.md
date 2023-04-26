# CodeSlide CLI Reference

## Installation
1. Prepare Node.js runtime
2. Type `npm i -g codeslide-cli` on the command line

## List of Options
Type `codeslide-cli --help` on the command line:
```
Usage: codeslide-cli [options]

Example: codeslide-cli -c ./config.json -o ./output.html

Make a HTML or PDF slideshow for code snippets with a JSON configuration.
Go to home page for more information:
https://github.com/AsherJingkongChen/codeslide/tree/main/packages/cli/

Options:
  -v, --version        Check the version number.
  -c, --config [path]  The file path of "slideshow config".
                       If not set, the config will be read from stdin.
  -o, --output [path]  The file path of "slideshow output".
                       If not set, the output will be written to stdout.
  -h, --help           Check all options and their description.
```

Some example commands for making a slideshow at `./output.html` with a config at `./config.json`:
- `codeslide-cli -c ./config.json -o ./output.html`
- `codeslide-cli --config ./config.json > ./output.html`
- `codeslide-cli < ./config.json > ./output.html`

[Click here to see examples of configuration](https://github.com/AsherJingkongChen/codeslide/tree/main/packages/cli/example/) (all are named `config.cs.json`) and output

The configuration's schema (originally defined at [codeslide Core](https://github.com/AsherJingkongChen/codeslide/blob/main/packages/core/src/index.ts)):
```typescript
type Config = {
  layout:
  | "pdf" | "pdf_letter" | "pdf_legal" | "pdf_tabloid"
  | "pdf_ledger" | "pdf_a0" | "pdf_a1" | "pdf_a2"
  | "pdf_a3" | "pdf_a4" | "pdf_a5" | "pdf_a6"
  | "scroll" | "slide" | "slide_loop";
  slides: (string | {
    code?: string | undefined;
    lang?:
    | "armasm" | "c" | "clojure" | "cmake" | "coffeescript"
    | "cpp" | "csharp" | "css" | "dart" | "diff"
    | "elixir" | "erlang" | "go" | "graphql" | "groovy"
    | "haskell" | "ini" | "java" | "javascript" | "json"
    | "julia" | "kotlin" | "less" | "lisp" | "lua"
    | "makefile" | "markdown" | "objectivec" | "perl" | "php"
    | "plaintext" | "python" | "r" | "ruby" | "rust"
    | "scala" | "scss" | "shell" | "sql" | "swift"
    | "typescript" | "vbnet" | "xml" | "yaml" | undefined,
    title?: string | undefined;
  })[];
  styles: string[];
}
```

Configuration Schema Specification for CodeSlide CLI:
- **`layout`**: Determines the layout of the slideshow. The default value is `"slide"`.
  - If `"pdf_[size]"`, the output file format is PDF and the print size is `[size]`. The layout is actually `"scroll"`.
    - Supported print sizes are: `letter`, `legal`, `tabloid`, `ledger`, `a0`, `a1`, `a2`, `a3`, `a4`, `a5`, `a6`.
    - `"pdf"` is treated as `"pdf_a4"`.
  - If `"scroll"`, the slideshow is displayed as a single long page that can be scrolled up and down.
  - If `"slide"`, the slideshow is displayed as a classic slideshow that allows users to navigate by using the keyboard or tapping.
    - On desktop, press `Arrow Left` to go to the previous slide and `Arrow Right` or `Whitespace` to go to the next slide.
    - On mobile, tap on the left or right side to go to the previous or next slide.
    - Navigating to the previous or next slide is ignored at the first or last slide.
  - If `"slide_loop"`, the layout is very similar to `"slide"`, but it is an endless slideshow so that users can loop through slides again and again by just pressing `Arrow` keys.
- **`slides`**: Contains an array of slides. The default value is `[]`.
  - Each slide can either be a string or an object.
  - If the slide is a string, it is treated as `slides[number].code`.
  - If the slide is an object, it can contain the following properties:
    - **`code`**: Optional. The body of the slide. It can be a URL, a local file path, or a raw text content of a code snippet.
    - **`lang`**: Optional. The language of the code snippet. It can be one of 44 computer languages. If the value is not set, the program determines the value from `slides[number].code` (file extension) and syntaxes. It is used for syntax highlighting. If it is `"plaintext"`, the highlighting is disabled. Use `"xml"` syntax for HTML.
    - **`title`**: Optional. The title of the slide. Its font size and weight are larger than the content's.
- **`styles`**: Contains an array of styles. The default value is `[]`.
  - Each style can be a URL, a local file path, or a raw text content of a CSS (Cascading Style Sheets) file.
  - The font family can be determined by adding this CSS: `"code { font-family: ...; }"`.
  - The font size or weight can be determined by adding this CSS: `"#slides { font-size: ...; font-weight: ...; }"`.

## Development
- It requires the built module at another package [CodeSlide Core](https://github.com/AsherJingkongChen/codeslide/tree/main/packages/core/)
- The built application:
  - is a Node.js application in IIFE format
  - is at `./dist/index.js` after built
- [`./script/build.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/packages/cli/script/build.sh): Build production-level application
- [`./script/dev.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/packages/cli/script/dev.sh): Build development-level application
- [`./script/clean.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/packages/cli/script/clean.sh): Clean built application
- [`./script/example.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/packages/cli/script/example.sh): Build examples for the built application
- [`./script/install.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/packages/cli/script/install.sh): Install `node_modules`
- [`./script/uninstall.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/packages/cli/script/uninstall.sh): Uninstall `node_modules`
- [`./script/publish.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/packages/cli/script/publish.sh): Publish built application
- To print bundle analysis with either `./script/build.sh` or `./script/dev.sh`, add option `--analyze` or `--analyze=verbose` (from esbuild)

## Source Tree
```
src/
|-- index.ts { Program entry point and CLI options }
|-- process.ts { Process I/O and configuration }
`-- tool.ts { Fetch text content from URL or file paths }
```
