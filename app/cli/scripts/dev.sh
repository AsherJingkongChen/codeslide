#! /usr/bin/env sh

./node_modules/.bin/esbuild \
  ./src/app.ts \
  --bundle \
  --format=iife \
  --loader:.css=text \
  --loader:.html=text \
  --outfile=./dist/app.js \
  --platform=node \
  $@ && \
chmod +x ./dist/app.js && \
\
sed -i '' '1i\ 
#! /usr/bin/env node --stack-trace-limit=0
' ./dist/app.js;
