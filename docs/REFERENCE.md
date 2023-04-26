# Packages
- [CodeSlide Asset](../packages/codeslide-asset/docs/REFERENCE.md) (module)
- [CodeSlide CLI](../packages/codeslide-cli/docs/REFERENCE.md) (application)
- [CodeSlide Config](../packages/codeslide-config/docs/REFERENCE.md) (module)

# Development
- The scripts at `./script` are the combinations of all packages' scripts
- [`./script/build.sh`](./script/build.sh): Build all production-level packages
- [`./script/dev.sh`](./script/dev.sh): Build all development-level packages
- [`./script/clean.sh`](./script/clean.sh): Clean all built packages
- [`./script/example.sh`](./script/example.sh): Build examples for all built packages
- [`./script/install.sh`](./script/install.sh): Install `node_modules`
- [`./script/uninstall.sh`](./script/uninstall.sh): Uninstall `node_modules`
- [`./script/publish.sh`](./script/publish.sh): Publish all built packages
- To print bundle analysis with either `./script/build.sh` or `./script/dev.sh`, add option `--analyze` or `--analyze=verbose` (from esbuild)
