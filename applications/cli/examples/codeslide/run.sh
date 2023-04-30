#! /usr/bin/env sh

SLIDES=(
  --font-family "Noto Sans Mono" \
  --font-size 20px \
  --font-weight 400 \
  --styles \
    "https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;700&display=swap"
  --slides \
    "The Introduction of CodeSlide" "" \
    "README" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/README.md" \
    "The essentials" "" \
    "Render the HTML template to a slideshow" "../../../../src/printer.ts" \
    "" "../../../../src/app/index.ts" \
    "" "../../../../src/index.ts" \
    "The HTML template" "../../../../src/app/app.html" \
    "The CSS" "../../../../src/app/app.horizontal.css" \
    "Let's see some applications!" "" \
    "CodeSlide CLI: A Node.js Command Line Interface" "../../../../applications/cli/src/index.ts" \
    "CLI options validator" "../../../../applications/cli/src/options.ts" \
    "After parsing, it will get contents from all paths" "../../../../applications/cli/src/tool.ts" \
    "" "../../../../applications/cli/src/run.ts"
);

echo 'index.html' && \
time ../../dist/index.js \
  -o ./index.html \
  --format html \
  --layout horizontal \
  "${SLIDES[@]}" && \
\
echo 'index.html' && \
time ../../dist/index.js \
  -o ./index.vertical.html \
  --format html \
  --layout vertical \
  "${SLIDES[@]}" && \
\
echo 'index.pdf' && \
time ../../dist/index.js \
  -o ./index.pdf \
  --format pdf \
  --layout vertical \
  "${SLIDES[@]}";
  
