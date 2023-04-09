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

# What is the `Client Schema`?
- Specifies the configuration for the slide presentation in JSON format
- Has type definitions in the source code
- Below is the definition written in TypeScript (Some fields are WIP):
```ts
type ClientSchema = {
  font?: {
    family?: string;
    size?: string;
    weight?: string;
    href?: string;
  };
  looping?: boolean;
  slide?: Array<
  | string
  | {
      title?: string;
      path: string; // equivalent to path
      // lang?: string;
    }
  >;
  style?:
  | string;
  // | {
  //     sheet?: string;
  //     hrefs: Array<string>;
  //   }
  // | {
  //     sheet: string;
  //     hrefs?: Array<string>;
  //   };
  // target?:
  // | string
  // | {
  //     format?: string;
  //     layout?: string;
  //     transition?: string;
  //   };
};
```
- Default values
  - `ClientSchema.slide`: `[]`
- Below are some simple valid examples,
  [(see more in the `example` directory)](https://github.com/AsherJingkongChen/codeslide-cli/tree/main/example):
```json
{
  "slide": [
    "./example/demo/src/index.js",
    "./example/demo/src/main.rs"
  ],
  "style": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/base16/default-dark.min.css"
}
```

```json
{
  "font": {
    "family": "Inconsolata",
    "size": "large",
    "href": "https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
  },
  "slide": [
    "./src/cli/client.rs",
    "./src/cli/main.rs",
    "./src/cli/template.rs",
    "./src/cli/tool.rs"
  ],
  "style": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css"
}
```

# Development Workflow
- **(Not For End Users)**
- Use `npm run build` to build in release mode
- Use `npm run dev` to build in development mode
- Use `npm run clean` to clean built files
- `branch v0` is the git branch for development
- Use `npm run example` to build all examples
- `npm run start` is alias for `npm run dev && npm run example`

## NOTE
- After web app built, the bundle size analysis is at `doc/web/stats.html`
  (generated).
