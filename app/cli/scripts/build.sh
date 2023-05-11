#! /usr/bin/env sh

./scripts/dev.sh \
  --drop:console \
  --drop:debugger \
  --minify \
  $@;
