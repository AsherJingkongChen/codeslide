# CodeSlide CLI Reference (Outdated)

## Installation
1. Prepare Node.js runtime
2. Type `npm install -g codeslide` on the command line

## Commands and Options
- `codeslide-cli -h`: Check all options and their description
- `codeslide-cli -v`: Check the version number
- `codeslide-cli -o [local_path]`: The "output file path" of slideshow. By default it writes the output to stdout.

## [Example usages](https://github.com/AsherJingkongChen/codeslide/tree/main/applications/cli/examples/)

## The spec of `path`
For example, the option `--styles` can be `[path...]`:
- `--styles` is followed by an array of paths
- `path` can be a local path or a URL of the content to get

## Customize options
If [Example Usages](#example-usages) can't satisfy the requiremnets, the customizable options may meet the needs:
- `--font-family`
  - [CSS font-family Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)
  - [Google Font API (monospace)](https://fonts.google.com/?category=Monospace)
- `--font-size`
  - [CSS font-size Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
- `--font-weight`
  - [CSS font-weight Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
- `--styles`
  - [Highlight.js Styles](https://cdnjs.com/libraries/highlight.js) | [Demos](https://highlightjs.org/static/demo/)
  - [Google Font API (monospace)](https://fonts.google.com/?category=Monospace)

## Development
- The built application:
  - is a Node.js application in IIFE format
  - is at `./dist/index.js` after built
- [`./scripts/build.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/applications/cli/scripts/build.sh): Build production-level application
- [`./scripts/dev.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/applications/cli/scripts/dev.sh): Build development-level application
- [`./scripts/clean.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/applications/cli/scripts/clean.sh): Clean built application
- [`./scripts/example.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/applications/cli/scripts/example.sh): Build examples for the built application
- [`./scripts/publish.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/applications/cli/scripts/publish.sh): Publish built application
- To print bundle analysis with either `./scripts/build.sh` or `./scripts/dev.sh`, add option `--analyze` or `--analyze=verbose` (from esbuild)

### Warning
`esbuild` skips type-checking and linting, which may cause unexpected errors in runtime. Use external tools for type-checking and linting.

## Source Tree
```
src/
|-- index.ts { The entry point }
|-- options.ts { CLI options }
|-- parse.ts { Parse CLIOptions to Printer }
|-- print.ts { Render Printer and print to output }
|-- run.ts { Run after receiving arguments from CLI }
`-- tool.ts { Utilities }
```
