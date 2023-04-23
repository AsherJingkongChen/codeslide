# CodeSlide Asset Reference

# Development
- The built module:
  - is an ES Module
  - is at `./dist/index.js` after built
  - is built for another module [CodeSlide Config](../codeslide-config/)
- [./script/build.sh](./script/build.sh): Build production-level module
- [./script/dev.sh](./script/dev.sh): Build development-level module
- [./script/clean.sh](./script/clean.sh): Clean built module

# Source Tree
```
dist/
|-- index.js { Built module which compiled from src/index.ts }
src/
|-- app.ts { Script that manages views and logics of each slideshows }
|-- asset/
|   |-- app.stylesheet { CSS }
|   `-- app.template { HTML Template }
|-- highlighter.ts { Highlight.js Importer }
|-- import.d.ts { Declares text modules }
`-- index.ts { Exports HTML, CSS, Script as text modules }
```
