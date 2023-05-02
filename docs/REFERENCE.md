# CodeSlide Reference

# Applications
- [CodeSlide CLI](../applications/cli/docs/REFERENCE.md)

# Development
- `npm install` to install dependencies
- Go to subdirectories to run scripts, e.g. `./applications/cli/`
- Check every `README.md`, `docs/` and `scripts/`

## Source Tree
```
src/ { Essential functions for any application of CodeSlide }
|-- format.ts { Format options }
|-- index.ts { Slideshow renderer }
|-- lang.ts { Language options }
|-- layout.ts { Layout options }
|-- pagesize.ts { Page size options }
|-- printer.ts { Slideshow schema }
`-- slides/ { Slideshow shell }
    |-- index.ts { Exporting textual assets }
    |-- slides.horizontal.css { CSS }
    |-- slides.html { HTML Template and embedded <script> }
    |-- slides.vertical.css { CSS }
    `-- textual.d.ts { Textual asset module declaration }
```
