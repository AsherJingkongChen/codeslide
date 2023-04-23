# CodeSlide

# Features
- CodeSlide makes a slideshow for code snippets
- Its applications:
  - [`CodeSlide CLI`](./packages/codeslide-cli/)
- Its modules:
  - [`CodeSlide Asset`](./packages/codeslide-asset/)
  - [`CodeSlide Config`](./packages/codeslide-config/)
- It uses [`esbuild`](https://github.com/evanw/esbuild) as module bundler
- It uses [`Commander.js`](https://github.com/tj/commander.js) as CLI framework
- It uses [`Eta`](https://github.com/eta-dev/eta) as HTML template engine
- It uses [`Highlight.js`](https://github.com/highlightjs/highlight.js) as syntax highlighter
- It uses [`Node Fetch`](https://github.com/node-fetch/node-fetch) as resource fetcher
- It uses [`TypeScript`](https://www.typescriptlang.org/) as the main language
- It uses [`Zod`](https://github.com/colinhacks/zod) as JSON schema validator

# Documents
- See [**Reference**](./docs/REFERENCE.md) for more information

# Development
- The scripts at `./script` are the combinations of all packages' scripts
- [`./script/build.sh`](./script/build.sh): Build all production-level modules
- [`./script/dev.sh`](./script/dev.sh): Build all development-level modules
- [`./script/clean.sh`](./script/clean.sh): Clean all built modules

# Creator
- [AsherJingkongChen](https://github.com/AsherJingkongChen)