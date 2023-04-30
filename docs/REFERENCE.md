# (Outdated)

# Packages
- [CodeSlide CLI](../packages/cli/docs/REFERENCE.md) (application)
- [CodeSlide Core](../packages/config/docs/REFERENCE.md) (package)

# Development
- The scripts at `./scripts` are the combinations of all packages' scripts
- [`./scripts/build.sh`](./scripts/build.sh): Build all production-level packages
- [`./scripts/dev.sh`](./scripts/dev.sh): Build all development-level packages
- [`./scripts/clean.sh`](./scripts/clean.sh): Clean all built packages
- [`./scripts/example.sh`](./scripts/example.sh): Build examples for all built packages
- [`./scripts/install.sh`](./scripts/install.sh): Install `node_modules`
- [`./scripts/uninstall.sh`](./scripts/uninstall.sh): Uninstall `node_modules`
- [`./scripts/publish.sh`](./scripts/publish.sh): Publish all built packages
- To print bundle analysis with either `./scripts/build.sh` or `./scripts/dev.sh`, add option `--analyze` or `--analyze=verbose` (from esbuild)
- **[Warning]** esbuild skips type-checking and linting, which may cause unexpected errors in runtime. Use external tools to type-checking and linting.

# CodeSlide Core Reference

## Development
- The built modules is at `./dist`
- [`./scripts/build.sh`](../scripts/build.sh): Build production-level module
- [`./scripts/dev.sh`](../scripts/dev.sh): Build development-level module
- [`./scripts/clean.sh`](../scripts/clean.sh): Clean built module
- [`./scripts/install.sh`](./scripts/install.sh): Install `node_modules`
- [`./scripts/uninstall.sh`](./scripts/uninstall.sh): Uninstall `node_modules`
- To print bundle analysis with either `./scripts/build.sh` or `./scripts/dev.sh`, add option `--analyze` or `--analyze=verbose` (from esbuild)
- **[Warning]** esbuild skips type-checking and linting, which may cause unexpected errors in runtime. Use external tools to type-checking and linting.

## Core
- It provides essential functions for any application of CodeSlide to render slideshows

## Source Tree
```
src/
|-- app/ { Slideshow Shell }
|   |-- app.css { CSS }
|   |-- app.template { HTML Template }
|   |-- app.ts { HTML embedded script }
|   |-- highlighter.ts { Highlight.js Importer }
|   |-- index.ts { Exporting HTML, CSS and JavaScript as textual assets }
|   `-- textual.d.ts { Textual asset declaration }
|-- common/ { For any platform }
|   |-- config.ts { Configuration Schema and utility }
|   |-- index.ts { Exporting all common modules }
|   |-- lang.ts { Code snippets language detection }
|   `-- layout.ts { Layout options }
`-- node/ { Entry for Node.js }
    |-- config.ts
    |-- index.ts { Exporting for Node.js }
    `-- tool.ts
```
