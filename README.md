# [CodeSlide CLI](https://github.com/AsherJingkongChen/codeslide-cli)

[![latest version](https://img.shields.io/npm/v/codeslide-cli.svg)](https://www.npmjs.com/package/codeslide-cli)
[![Latest version](https://img.shields.io/crates/v/codeslide-cli.svg)](https://crates.io/crates/codeslide-cli)

# Brief
> CodeSlide CLI: A simple code slideshow command line interface

# Functionality In A Nutshell
Generate a slide file from given schema

# All Instructions Are In [Manual](https://github.com/AsherJingkongChen/codeslide-cli/blob/main/doc/MANUAL.md)

Install commands (pick one):
- `npm i -g codeslide-cli`
- `cargo install codeslide-cli`

*Note this project is still incomplete (WIP), only CLI App is open for End User now.*

# Example
- Demo: [Link](https://asherjingkongchen.github.io/codeslide-cli-demo)
      | [Repo](https://github.com/AsherJingkongChen/codeslide-cli-demo)

# Version
- Current: 0.8.1
- Pre-MVP: 0.5.0

# Tech Stack
- Template Engine
- Module bundler
- Rust
- TypeScript (ES6)

# Features
- Read client schema (JSON) and export slide files (HTML)
- Use Webpack as Module Bundler
- Use Askama (Jinja-like) for HTML Templating
- Use SerDe as (De)serializer
- Use Highlight.js as Syntax Highlighter
- Use file descriptors for I/O only

# Contributors
- Owner: [AsherJingkongChen](https://github.com/AsherJingkongChen)
