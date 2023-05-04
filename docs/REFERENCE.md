# CodeSlide Reference

# Applications
- [CodeSlide CLI](https://github.com/AsherJingkongChen/codeslide/tree/main/applications/cli/docs/REFERENCE.md)

# Development
- Run `npm install` to install dependencies
- Go to subdirectories to run scripts, e.g. `./applications/cli/`
- Check every `README.md`, `docs/` and `scripts/` for more info

## Source Tree
```
./
|-- applications/ { Applications of CodeSlide }
|   `-- cli/ { Node.js Command Line Interface }
`-- src/ { Essential functions for any application of CodeSlide }
    |-- format.ts { Format options }
    |-- index.ts { Exporting core modules }
    |-- layout.ts { Layout options }
    |-- pagesize.ts { Page size options }
    |-- renderer.ts { Slideshow renderer }
    `-- slides/ { Slideshow shell }
        |-- index.ts { Exporting text assets }
        |-- slides.horizontal.css { CSS with horizontal layout }
        |-- slides.html { HTML Template and embedded <script> }
        |-- slides.vertical.css { CSS with vertical layout }
        `-- text.d.ts { Text asset module declarations }
```
