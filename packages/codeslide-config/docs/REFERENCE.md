# CodeSlide Config Reference

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
