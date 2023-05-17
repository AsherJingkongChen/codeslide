# CodeSlide CLI Reference

## Commands and Options
- `codeslide-cli -h`: Check all options and their description
- `codeslide-cli -v`: Check the version number
- `codeslide-cli -m [local_path]`: The "manifest file path" of slideshow.
By default it reads manifest from stdin.
- `codeslide-cli -o [local_path]`: The "output file path" of slideshow. By default it writes the output to stdout.

## [Example usages](https://github.com/AsherJingkongChen/codeslide/tree/main/app/cli/examples/)

## Manifest file specifications
1. A Markdown text file with UTF-8 encoding
2. The manifest file is constructed of the [Front Matter](#the-schema-of-front-matter-section-yaml-syntax) section and the Slide Show section:
  - ```md
    ---
    [](# "The Front Matter section")
    codeslide:
      ...

    ---
    [](# "The Slide Show section")
    # Slide 1
    ...

    ---
    # Slide 2
    ...
    ```
4. Each slide is seperated with a horizontal line (`---` in Markdown)
5. Render `Embedded Link` in the Slide Show section with specific rules:
  - Links titled as `:slide`:
    - The source content is treated as a Markdown document
    - Rendered by the rules of the Slide Show section recursively
  - Links titled as `:code`:
    - The source content is treated as a plain text document
  - Links titled as `:code.<language>`:
    - The source content is treated as a code snippet of `<language>`
    - The code will be syntax-highlighted by [Highlight.js](https://github.com/highlightjs/highlight.js)

## The schema of Front Matter section (YAML syntax)
- The description and default value for each field
  ```yaml
  codeslide:
    # [UNUSED] Compatible CodeSlide version
    version: 0.14.0

    # Options: html | pdf
    format: html

    # Options: ledger | legal | letter | tabloid | A0 | A1 | A2 | A3 | A4 | A5 | A6
    # Only allowed when format is pdf
    pageSize: A4

    # Options: landscape | portrait
    # Only allowed when format is pdf
    orientation: landscape

    # Sequence of paths or URLs for CSS
    # The default value will be overridden if set
    styles:
      - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/vs2015.min.css

    # Code snippets font
    codeFont:
      # CSS font-family property (string scalar)
      # The default value will be concatenated backwards
      family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace

      # The path or URL of CSS @font-face at-rule (string scalar)
      rule: ~

      # CSS font-size property (string scalar)
      size: medium

      # CSS font-weight property (string scalar)
      weight: normal

    # Slides font
    slideFont:
      # CSS font-family property (string scalar)
      # Default values will be concatenated backwards
      family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace

      # The path or URL of CSS @font-face at-rule (string scalar)
      rule: ~

      # CSS font-size property (string scalar)
      size: large

      # CSS font-weight property (string scalar)
      weight: normal
  ```
- All fields of `codeslide` (including itself) are optional
- Redundant keys are all ignored

### Customize the slideshow
- See [Example usages](https://github.com/AsherJingkongChen/codeslide/tree/main/app/cli/examples) to make writing a manifest file easier
- References:
  - [CSS font-family Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)
  - Paste CSS URL to `codeslide.codeFont.rule` or `codeslide.slideFont.rule` if using external fonts from the following links:
    - [Google Fonts](https://fonts.google.com) 
  - [CSS font-size Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
  - [CSS font-weight Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)
  - Add CSS URL from the following links to `codeslide.styles`
    - [Highlight.js Styles](https://cdnjs.com/libraries/highlight.js) | [Demo](https://highlightjs.org/static/demo/)

### Notes
1. All contents acquired from paths or URLs are persistent

## Development
- The built application:
  - is a Node.js application in IIFE format
  - is at `./dist/app.js` after built
- [`./scripts/build.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/app/cli/scripts/build.sh): Build production-level application
- [`./scripts/dev.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/app/cli/scripts/dev.sh): Build development-level application
- [`./scripts/clean.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/app/cli/scripts/clean.sh): Clean built application
- [`./scripts/example.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/app/cli/scripts/example.sh): Build examples for the built application
- [`./scripts/publish.sh`](https://github.com/AsherJingkongChen/codeslide/blob/main/app/cli/scripts/publish.sh): Publish built application
- To print bundle analysis with either `./scripts/build.sh` or `./scripts/dev.sh`, add option `--analyze` or `--analyze=verbose` (from esbuild)

### Warning
`esbuild` skips type-checking and linting, which may cause unexpected errors in runtime. Use external tools for type-checking and linting.
