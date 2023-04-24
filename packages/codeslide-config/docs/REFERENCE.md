# CodeSlide Config Reference

# Configuration Schema
Defined with [Zod](https://github.com/colinhacks/zod) at [`../src/index.ts`](../src/index.ts)):
```typescript
type Config = {
  layout: "pdf" | "scroll" | "slide";
  looping: boolean;
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

# Development
- It requires the built module at another module [codeslide-asset](../../codeslide-asset/)
- The built module:
  - is an ES Module
  - is at `./dist/index.js` after built
- [./script/build.sh](../script/build.sh): Build production-level module
- [./script/dev.sh](../script/dev.sh): Build development-level module
- [./script/clean.sh](../script/clean.sh): Clean built module

# Source Tree
```
src/
|-- index.ts { Config which works with HTML template engine }
|-- lang.ts { Code snippets language labeling }
`-- layout.ts { Layout Enum }
```
