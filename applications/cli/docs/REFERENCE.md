# CodeSlide CLI Reference (Outdated)

## Installation
1. Prepare Node.js runtime
2. Type `npm install -g codeslide` on the command line

## Commands and Options
- `codeslide-cli -h`: Check all options and their description
- `codeslide-cli -v`: Check the version number
- `codeslide-cli -m [local_path]`: The "manifest file path" of slideshow.
By default it reads manifest from stdin.
- `codeslide-cli -o [local_path]`: The "output file path" of slideshow. By default it writes the output to stdout.

## [Example usages](https://github.com/AsherJingkongChen/codeslide/tree/main/applications/cli/examples/)

## Manifest file specifications
1. A Markdown text file encoded in UTF-8
2. The manifest file is constructured of the [`Front Matter`](#the-schema-of-front-matter-section-yaml-syntax) section and the `Slide Show` section:
   - ```md
     ---
     <!-- The Front Matter section -->
     codeslide:
       version: ...
       ...

     ---
     <!-- The Slide Show section -->
     # Slide 1
     ...

     ---
     # Slide 2
     ...
     ```
3. Each slide is seperated with a horizontal line (`---` in Markdown)
4. Render `Embedded Link` in `Slide Show` section with specific rules:
   - Links titled as `:slide`:
      - The source content is treated as a `Slide Show` section
      - Recursively
   - Links titled as `:code`:
      - The source content is treated as a plain text document
   - Links titled as `:code.<language>`:
      - The source content is treated as a code snippet of `<language>`
      - The code will be syntax-highlighted by [Highlight.js](https://github.com/highlightjs/highlight.js)

## The schema of `Front Matter` section (YAML syntax)
- All default values
   ```yaml
   codeslide:
     version: 0.12.0 # Compatible CodeSlide version
     fontFamily: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace # CSS font-family property
     fontSize: large # CSS font-size property (string scalar)
     fontWeight: normal # CSS font-weight property (string scalar)
     format: html # html | pdf
     layout: horizontal # horizontal | vertical
     pagesize: a4 # letter | legal | tabloid | ledger | a0 | a1 | a2 | a3 | a4 | a5 | a6
     styles: # sequence of paths or URLs for CSS 
       - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark-dimmed.min.css
   ```
- All fields of **codeslide** are optional
- If **codeslide.format** is `pdf`:
  - **codeslide.layout** is ignored
  - **codeslide.pagesize** is used for page print size

## Customize options
References to customize the slideshow:
  - `codeslide.fontFamily`
    - Use `codeslide.styles` to load external font file
    - [CSS font-family Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)
    - [Google Font API (monospace)](https://fonts.google.com/?category=Monospace)
  - `codeslide.fontSize`
    - [CSS font-size Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
  - `codeslide.fontWeight`
    - [CSS font-weight Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
  - `codeslide.styles`
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
|-- options.ts { CLI options validator }
|-- parse.ts { Parse CLIOptions to Printer }
|-- render.ts { Render Printer and print to output }
```
