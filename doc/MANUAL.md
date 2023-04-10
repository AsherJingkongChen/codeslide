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
  font?: {
    family?: string;
    size?: string;
    weight?: string;
    href?: string; // CDN Link
  };
  looping?: boolean;
  slide?: Array<
  | string // Works as path
  | {
      path: string;
      title?: string;
      lang?: string;
    }
  >;
  style?:
  | string; // CDN Link
};
```
- Default values for all fields (or required)
```yml
font.family: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace"
font.size: "medium"
font.weight: "normal"
font.href: null
looping: false
slide: null
slide[number]: !AS slide[number].path
slide[number].path: !REQUIRED
slide[number].title: slide[number].path
slide[number].lang: !AUTO
style: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css"
```
- Here are some simple valid examples,
  [(see more in the `example` directory)](https://github.com/AsherJingkongChen/codeslide-cli/tree/main/example):
```json
{
  "slide": [
    "./example/demo/src/index.js",
    "./example/demo/src/main.rs"
  ]
}
```
```json
{
  "font": {
    "family": "Noto Sans Mono",
    "size": "large",
    "weight": "400",
    "href": "https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;500;600&display=swap"
  },
  "slide": [
    { "path": "./Cargo.toml", "title": "Config", "lang": "plaintext" },
    "./src/cli/client.rs",
    "./src/cli/file.rs",
    "./src/cli/lang.rs",
    "./src/cli/main.rs",
    "./src/cli/template.rs"
  ],
  "style": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css"
}
```
- NOTE:
  - CodeSlide-CLI supports syntax highlighting for 36 common programming (or related) languages. `slide[number].lang` can be one of these (See more information in [`src/cli/lang.rs`](https://github.com/AsherJingkongChen/codeslide-cli/blob/main/src/cli/lang.rs)):
  ```
  "bash"
  "c"
  "cpp"
  "csharp"
  "css"
  "diff"
  "go"
  "graphql"
  "ini"
  "java"
  "javascript"
  "json"
  "kotlin"
  "less"
  "lua"
  "makefile"
  "markdown"
  "objectivec"
  "php"
  "php-template"
  "plaintext"
  "python"
  "r"
  "ruby"
  "rust"
  "scss"
  "shell"
  "sql"
  "swift"
  "typescript"
  "vbnet"
  "wasm"
  "xml"
  "yaml"
  ```
  - The program determines the value of `slide[number].lang` with the file extensions and syntax by default.
  - Users can set the value of `slide[number].lang` explicitly to override the default logics only when the value is one of supported languages.
  - To **disable** syntax highlighting, it is mandatory to set the value of `slide[number].lang` to `"plaintext"` explicitly.

# Development Workflow
- **(Not For End Users)**
- Use `npm run build` to build in release mode
- Use `npm run dev` to build in development mode
- Use `npm run clean` to clean built files
- `branch v0` is the git branch for development
- Use `npm run ex -- release` to build all examples with binary in release mode
- Use `npm run ex -- debug` to build all examples with binary in debug mode
- `npm run start` or `npm start` is alias for
  `npm run build && npm run ex -- release`
- `npm run debug` is alias for `npm run dev && npm run ex -- debug`

## NOTE
- After web app built, the bundle size analysis is at `doc/web/stats.html`
  (generated).
