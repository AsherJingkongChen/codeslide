# CodeSlide CLI

# Description
> CodeSlide CLI: A simple code slideshow command line interface

# Demo
- None

# Version
> Current: 0.3.4

# Workflow
## CLI App is for End User

## Build And Run
1. Build Web App with `npm run build:web`
2. Build CLI App with `npm run build:cli`
3. Run CLI App with `npm run start`

- After building for web app, the analysis of bundle size is at `doc/web/stats.html`
- Build lazily with `npm run build`
- Build and Run lazily with `npm run br`

## Watch Files For Development
- For Web App: `npm run dev:web`
- For CLI App: `npm run dev:cli`

## Clean up Built files
- `npm run clean`

# Tech Stack
- Template Engine
- Module bundler
- Rust
- TypeScript
- ES6

# Features
- Uses CodeMirror as Code Editor
- Uses SolidJS as UI Library
- Uses JSX and Askama (Jinja-like) for HTML Templating
- Uses Webpack as Module Bundler

# Contributors
- Owner: [AsherJingkongChen](https://github.com/AsherJingkongChen)
