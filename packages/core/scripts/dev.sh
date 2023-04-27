#! /usr/bin/env sh

./node_modules/.bin/esbuild \
  ./src/app/app.ts \
  --bundle \
  --format=iife \
  --outfile=./dist/app.script \
  --platform=browser \
  $@ && \
\
./node_modules/.bin/esbuild \
  ./src/node/index.ts \
  --bundle \
  --format=cjs \
  --loader:.script=text \
  --loader:.stylesheet=text \
  --loader:.template=text \
  --outfile=./dist/node/index.cjs \
  --platform=node \
  $@ && \
\
./node_modules/.bin/esbuild \
  ./src/node/index.ts \
  --bundle \
  --format=esm \
  --loader:.script=text \
  --loader:.stylesheet=text \
  --loader:.template=text \
  --outfile=./dist/node/index.mjs \
  --platform=node \
  $@ && \
\
rm ./dist/app.script;
