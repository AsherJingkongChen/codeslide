# CodeSlide CLI

# Description
> CodeSlide CLI: A simple code slideshow command line interface

*Note this project is still incomplete, only CLI App is for End User now.*

# Demo
- [Repo of Demo](https://github.com/AsherJingkongChen/codeslide-cli-demo)
- [Link to Demo](https://asherjingkongchen.github.io/codeslide-cli-demo)

# Version
- Current: 0.5.1
- Pre-MVP: 0.5.0

# [Manual](./doc/MANUAL.md)

# Build Workflow
1. Build Web App with `npm run build:web`
2. Build CLI App with `npm run build:cli`
3. Run CLI App with `npm run start`

- After web app built, the bundle size analysis is at `doc/web/stats.html`
- Build easily with `npm run build`

# Development Workflow
- For Web App: `npm run dev:web`
- For CLI App: `npm run dev:cli`

## Clean up Built files
- For Web App: `npm run clean:web`
- For CLI App: `npm run clean:cli`
- For Both: `npm run clean`

# Tech Stack
- Template Engine
- Module bundler
- Rust
- TypeScript (ES6)

# Features
- Read input schema (JSON) and export slide files in HTML
- Uses CodeMirror as Web Code Editor
- Uses SolidJS as Web UI Library
- Uses JSX and Askama (Jinja-like) for HTML Templating
- Uses Webpack as Module Bundler

# Contributors
- Owner: [AsherJingkongChen](https://github.com/AsherJingkongChen)
