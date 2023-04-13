# How To Make It Work?
## 1. Prepare the environment and install the application
1. Prepare the command line environment (like `Terminal.app` in MacOS)
   because this is a CLI App (CLI is for Command Line Interface)
2. Install **One** of package managers and their environments:
   - `Node.js` and (`NPM` or `PNPM`)
   - `Rust` and `Cargo`
3. Install the binary:
   - For `NPM` users, type `npm i -g codeslide-cli` on the command line to install
   - For `Cargo` users, type `cargo install codeslide-cli` on the command line to install

## 2. Execute the command with Client Schema
1. Get the `Client Schema` ready
   - [Click here for the definition of `Client Schema` (JSON)](#what-is-the-client-schema)
2. To run the CLI App,
   Make use of file descriptors (`stdout, stdin`):
   - Type `codeslide-cli < ./client.cs.json > ./output.cs.html` on the command line

## 3. Use the slide file
1. Open the slide output file (HTML) with the browser
2. Navigate through pages:
   - For Desktop viewers, enter arrow keys and whitespace to navigate.
   - For Mobile viewers, double tap to navigate.

## In a nutshell
**Install the binary and trun a valid CodeSlide Client Schema into a slide file**

## Note
- For `NPM` installation, `Cargo` (Rust toolchain) will be installed
  on your device. After installation, `Cargo` will build the executable.
- For users of `NPM`, please uninstall via `Cargo`,
  type `cargo uninstall codeslide-cli` (Temporary approach).

# What is the `Client Schema`?
- Specifies the configuration for the slide presentation in JSON format
- Has type definitions in the source code
- The TypeScript definition (More WIP):
```ts
type ClientSchema = {
  links?: Array<string>; // Stylesheet links
  show?: {
    font?: { // CSS style rules
      family?: string;
      size?: string;
      weight?: string;
    };
    looping?: boolean; // Toggle Looping slide
    single?: boolean; // Toggle Single page
  };
  slide?: Array<
  | string // Works as slide[number].path
  | {
      path: string;
      title?: string;
      lang?: string;
    }
  >;
};
```
- Default values for all fields (or required)
```yml
links: [
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css"
]
show: null
show.font.family: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace"
show.font.size: "medium"
show.font.weight: "normal"
show.looping: false
show.single: false
slide: []
slide[number]: !AS slide[number].path
slide[number].path: !REQUIRED
slide[number].title: slide[number].path
slide[number].lang: !AUTO
```
- The following JSON is a complete example of client schema from [`example/demo`](https://github.com/AsherJingkongChen/codeslide-cli-demo),
  [(see more in the `example` directory)](https://github.com/AsherJingkongChen/codeslide-cli/tree/main/example):
```json
{
  "links": [
    "https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;500;600&display=swap",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
  ],
  "show": {
    "font": {
      "family": "Noto Sans Mono",
      "size": "large",
      "weight": "400"
    },
    "looping": false,
    "single": true
  },
  "slide": [
    { "path": "./src/web/asset/index.j2", "title": "Web Template" },
    { "path": "./Cargo.toml", "title": "Cargo Config", "lang": "plaintext" },
    "./src/cli/client.rs",
    "./src/cli/file.rs",
    "./src/cli/lang.rs",
    "./src/cli/main.rs",
    "./src/cli/template.rs",
    { "path": "./src/web/index.ts", "title": "The Script for Web App" }
  ]
}
```
- NOTE:
  - CodeSlide CLI supports syntax highlighting for 44 common language families. `slide[number].lang` can be one of these (See more information in [`src/cli/lang.rs`](https://github.com/AsherJingkongChen/codeslide-cli/blob/main/src/cli/lang.rs)):
  ```
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
  "yaml"
  ```
  Note that these values are language families but **not filename extensions**.
  If a file named `index.html`, it will be recognized as `xml`.

  - The program determines the value of `slide[number].lang` with the file extensions and syntax by default.
  - Users can set the value of `slide[number].lang` explicitly to override the default logics only when the value is one of supported languages.
  - To **disable** syntax highlighting, it is mandatory to set the value of `slide[number].lang` to `"plaintext"` explicitly.

# Development Workflow
- **(Not For End Users)**
- `branch v0` is the git branch for development
- Use `npm run build` to build in release mode
- Use `npm run dev` to build in development mode
- Use `npm run clean` to clean built files
- Use `npm run ex -- release` to build all examples with binary in release mode
- Use `npm run ex -- debug` to build all examples with binary in debug mode
- `npm run start` or `npm start` is alias for
  `npm run build && npm run ex -- release`
- `npm run debug` is alias for `npm run dev && npm run ex -- debug`

## NOTE
- After web app built, the bundle size analysis is at `doc/web/stats.html`
  (generated).
