# CodeSlide Config Reference

## Configuration Schema
Defined with [Zod](https://github.com/colinhacks/zod) at [`../src/index.ts`](../src/index.ts):
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
- It requires the built module at another module [CodeSlide Asset](../../asset/)
- The built module:
  - `./dist/index.mjs` is an ES module
  - `./dist/index.cjs` is a CommonJS module
- [`./script/build.sh`](../script/build.sh): Build production-level module
- [`./script/dev.sh`](../script/dev.sh): Build development-level module
- [`./script/clean.sh`](../script/clean.sh): Clean built module
- [`./script/install.sh`](./script/install.sh): Install `node_modules`
- [`./script/uninstall.sh`](./script/uninstall.sh): Uninstall `node_modules`

## Source Tree
```
src/
|-- config.ts { Config which works with HTML template engine }
|-- index.ts { Export }
|-- lang.ts { Code snippets language labeling }
`-- layout.ts { Layout options }
```
