# Packages
- [CodeSlide Asset](../packages/codeslide-asset/docs/REFERENCE.md) (module)
- [CodeSlide CLI](../packages/codeslide-cli/docs/REFERENCE.md) (application)
- [CodeSlide Config](../packages/codeslide-config/docs/REFERENCE.md) (module)

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
