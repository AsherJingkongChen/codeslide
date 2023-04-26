# CodeSlide Asset Reference

## Development
- The built modules:
  - `./dist/index.js` is an ES module
  - `./dist/index.cjs` is a CommonJS module
  - are built for another module [CodeSlide Core](../../core/)
- [`./script/build.sh`](../script/build.sh): Build production-level module
- [`./script/dev.sh`](../script/dev.sh): Build development-level module
- [`./script/clean.sh`](../script/clean.sh): Clean built module
- [`./script/install.sh`](./script/install.sh): Install `node_modules`
- [`./script/uninstall.sh`](./script/uninstall.sh): Uninstall `node_modules`

## Source Tree
```
src/
|-- app.stylesheet { CSS }
|-- app.template { HTML Template }
|-- app.ts { HTML embedded script }
|-- highlighter.ts { Highlight.js Importer }
|-- import.d.ts { Declares textual modules }
`-- index.ts { Exports HTML, CSS and JavaScript as textual modules }
```
