#! /usr/bin/env sh

./node_modules/.bin/esbuild \
  ./src/app.ts \
  --bundle \
  --format=esm \
  --outfile=./dist/app.script \
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
  --outfile=./dist/index.js \
  $@ && \
\
rm ./dist/app.script;
