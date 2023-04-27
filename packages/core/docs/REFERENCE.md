# CodeSlide Core Reference

## Configuration Schema
Defined with [Zod](https://github.com/colinhacks/zod) as [`Config`](../src/core/config.ts):
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

## Development
- The built modules is at `./dist`
- [`./scripts/build.sh`](../scripts/build.sh): Build production-level module
- [`./scripts/dev.sh`](../scripts/dev.sh): Build development-level module
- [`./scripts/clean.sh`](../scripts/clean.sh): Clean built module
- [`./scripts/install.sh`](./scripts/install.sh): Install `node_modules`
- [`./scripts/uninstall.sh`](./scripts/uninstall.sh): Uninstall `node_modules`
- To print bundle analysis with either `./scripts/build.sh` or `./scripts/dev.sh`, add option `--analyze` or `--analyze=verbose` (from esbuild)

## Source Tree
```
src/
|-- app/ { Slideshow Template }
|   |-- app.css { CSS }
|   |-- app.template { HTML Template }
|   |-- app.ts { HTML embedded script }
|   |-- highlighter.ts { Highlight.js Importer }
|   |-- index.ts { Exporting HTML, CSS and JavaScript as textual assets }
|   `-- textual.d.ts { Textual asset declaration }
|-- config.ts
|-- index.node.ts { Exporting for Node.js environment }
|-- lang.ts { Code snippets language detection }
`-- layout.ts { Layout options }
```