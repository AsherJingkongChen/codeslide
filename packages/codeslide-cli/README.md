# CodeSlide CLI

# Features
- It is an application of [`CodeSlide`](../../)
- It is a command-line interface (CLI)
- It uses [`esbuild`](https://github.com/evanw/esbuild) as module bundler
- It uses [`Commander.js`](https://github.com/tj/commander.js) as CLI framework
- It uses [`Node Fetch`](https://github.com/node-fetch/node-fetch) as resource fetcher

# Documents
- See [**Reference**](./docs/REFERENCE.md) for more information

# Development
- It requires the built module at another package [`codeslide-config`](../codeslide-config/README.md#features)
- The built application:
  - is a Node.js program in IIFE format
  - is at `./dist/index.js` after built
- [`./script/build.sh`](./script/build.sh): Build production-level application
- [`./script/dev.sh`](./script/dev.sh): Build development-level application
- [`./script/clean.sh`](./script/clean.sh): Clean built application

# Creator
- [AsherJingkongChen](https://github.com/AsherJingkongChen)
