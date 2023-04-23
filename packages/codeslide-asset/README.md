# CodeSlide Asset

# Features
- It is a module of [`CodeSlide`](../../)
- It bundles HTML Template, CSS and TypeScript modules into one module
- It uses [`esbuild`](https://github.com/evanw/esbuild) as module bundler
- It uses [`Highlight.js`](https://github.com/highlightjs/highlight.js) as syntax highlighter

# Documents
- See [**Reference**](./docs/REFERENCE.md) for more information

# Development
- The built module:
  - is an ES Module
  - is at `./dist/index.js` after built
  - is for another module [CodeSlide Config](../codeslide-config/README.md#development)
- [`./script/build.sh`](./script/build.sh): Build production-level module
- [`./script/dev.sh`](./script/dev.sh): Build development-level module
- [`./script/clean.sh`](./script/clean.sh): Clean built module

# Creator
- [AsherJingkongChen](https://github.com/AsherJingkongChen)
