#! /usr/bin/env sh

./node_modules/.bin/esbuild \
  ./src/index.ts \
  --bundle \
  --format=cjs \
  --outfile=./dist/index.cjs \
  --platform=node \
  $@ && \
\
./node_modules/.bin/esbuild \
  ./src/index.ts \
  --bundle \
  --format=esm \
  --outfile=./dist/index.mjs \
  $@;
