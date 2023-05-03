#! /usr/bin/env sh

# ../../node_modules/.bin/esbuild \
#   ./src/index.ts \
#   --bundle \
#   --format=iife \
#   --loader:.css=text \
#   --loader:.html=text \
#   --outfile=./dist/index.js \
#   --platform=node \
#   $@ && \
# chmod +x ./dist/index.js && \
# \
# sed -i '' '1i\ 
# #! /usr/bin/env node
# ' ./dist/index.js;

../../node_modules/.bin/esbuild \
  ./src_alpha/index.ts \
  --bundle \
  --format=iife \
  --loader:.css=text \
  --loader:.html=text \
  --outfile=./dist/alpha.js \
  --platform=node \
  $@ && \
\
chmod +x ./dist/alpha.js && \
\
sed -i '' '1i\ 
#! /usr/bin/env node
' ./dist/alpha.js;