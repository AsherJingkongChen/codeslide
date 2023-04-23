# CodeSlide Config Reference

# List of Options
Run `codeslide --help` on the command line:
```
Usage: codeslide [options]

Make a HTML or PDF slideshow for code snippets
with a JSON configuration.

Options:
  -v, --version        Check the version number
  -c, --config [path]  The file path of "slides config",
                       if not set, the config will be read from stdin.
  -o, --output [path]  The file path of "slides output",
                       if not set, the output will be written to stdout.
  -h, --help           Check all options and their description
```

Some example commands for making a slideshow at `./output.cs.html` with a config at `./config.cs.json`:
- `codeslide -c ./config.cs.json -o ./output.cs.html`
- `codeslide --config ./config.cs.json > ./output.cs.html`
- `codeslide < ./config.cs.json > ./output.cs.html`

[Click here](../example/) to see examples of configuration (all are named `config.cs.json`)

The configuration's schema (originally defined at [`codeslide-config`](../../codeslide-config/src/index.ts)):
```typescript
{
  layout: "pdf" | "scroll" | "slide";
  looping: boolean;
  slides: (string | {
    code?: string | undefined;
    lang?:
    | "armasm" | "c" | "clojure" | "cmake" | "coffeescript"
    | "cpp" | "csharp" | ... 37 more ... | undefined;
    title?: string | undefined;
  })[];
  styles: string[];
}
```

Features of each fields in configuration's schema:
- **`layout`**: Default value is `"slide"`
  - Case of `"pdf"`: Output file format is PDF and the actual layout is `"scroll"`.
  - Case of `"scroll"`: A single long page which is read by scrolling up and down.
  - Case of `"slide"`: A classic slideshow which allows users to navigate by 
  a keyboard or tapping.
    - On desktop: Press `Arrow Left` to go to the previous slide; press `Arrow Right` or `Whitespace` to go to the next slide.
    - On mobile: Tap at left or right side to go to the previous or next slide.
- **`looping`**: Default value is `false`.
  - Case of `true` and `layout: "slide"`: The slideshow becomes endless so that users can play again and again by just pressing `Arrow Right`.
  - Case of `false`: Navigating to the previous or next slide is ignored at the first or last slide.
- **`slides`**: Default value is `[]`.
  - It's an array type.
  - Case of `slides[number]` being `string type`: It works as `slides[number].code`.
  - **`slides[number].code`**: Optional. It can be a URL, a local file path and a raw text content of a code snippet.
  - **`slide[number].lang`**: Optional. It can be one of [44 computer languages](#supported-computer-languages). If the value is not set, the program determines the value from `slides[number].code` (file extension) and syntaxes.
  - **`slide[number].title`**: Optional. The title of slide. It's font size and weight is larger than content's.
- **`styles`**: Default value is `[]`.
  - It's an array of strings.
  - Each string can be a URL, a local file path and a raw text content of a CSS (Cascading Style Sheets) file.
  - Determine the font family by adding this CSS: `"code { font-family: ...; }"`.
  - Determine the font size or weight by adding this CSS: `"#slides { font-size: ...; font-weight: ...; }"`.

# Supported Computer Languages
Count: 44
```json
[
  "armasm",
  "c",
  "clojure",
  "cmake",
  "coffeescript",
  "cpp",
  "csharp",
  "css",
  "dart",
  "diff",
  "elixir",
  "erlang",
  "go",
  "graphql",
  "groovy",
  "haskell",
  "ini",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "less",
  "lisp",
  "lua",
  "makefile",
  "markdown",
  "objectivec",
  "perl",
  "php",
  "plaintext",
  "python",
  "r",
  "ruby",
  "rust",
  "scala",
  "scss",
  "shell",
  "sql",
  "swift",
  "typescript",
  "vbnet",
  "xml",
  "yaml",
]
```

# Source Tree
```s
src/
|-- index.ts { Program entry point and CLI options }
|-- parse.ts { Parse configuration }
|-- process.ts { Process I/O }
`-- tool.ts { Fetch text content from URL or file paths }
```
