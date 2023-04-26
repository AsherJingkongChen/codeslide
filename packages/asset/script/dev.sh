#! /usr/bin/env sh

./node_modules/.bin/esbuild \
  ./src/app.ts \
  --bundle \
  --format=iife \
  --outfile=./dist/app.script \
  --platform=browser \
  $@ && \
\
./node_modules/.bin/esbuild \
  ./src/index.ts \
  --bundle \
  --format=cjs \
  --loader:.script=text \
  --loader:.stylesheet=text \
  --loader:.template=text \
  --outfile=./dist/index.cjs \
  $@ && \
\
./node_modules/.bin/esbuild \
  ./src/index.ts \
  --bundle \
  --format=esm \
  --loader:.script=text \
  --loader:.stylesheet=text \
  --loader:.template=text \
  --outfile=./dist/index.mjs \
  $@ && \
\
rm ./dist/app.script;
