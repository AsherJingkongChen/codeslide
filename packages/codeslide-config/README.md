# CodeSlide Config

# Features
- It is a module of [CodeSlide](../../)
- It provides functions for other applications of CodeSlide
- It uses [esbuild](https://github.com/evanw/esbuild) as module bundler
- It uses [Eta](https://github.com/eta-dev/eta) as HTML template engine
- It uses [Zod](https://github.com/colinhacks/zod) as JSON schema validator

# Documents
- See [**Reference**](./docs/REFERENCE.md) for more information

# Development
- It requires the built module at another module [codeslide-asset](../codeslide-asset/)
- The built module:
  - is an ES Module
  - is at `./dist/index.js` after built
- [./script/build.sh](./script/build.sh): Build production-level module
- [./script/dev.sh](./script/dev.sh): Build development-level module
- [./script/clean.sh](./script/clean.sh): Clean built module

# Creator
- [AsherJingkongChen](https://github.com/AsherJingkongChen)
