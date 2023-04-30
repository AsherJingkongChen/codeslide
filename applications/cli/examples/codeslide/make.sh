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
    "Render the HTML template and CSS to a slideshow" "../../../../src/printer.ts" \
    "" "../../../../src/app/index.ts" \
    "" "../../../../src/index.ts" \
    "The HTML template" "../../../../src/app/app.html" \
    "The CSS" "../../../../src/app/app.horizontal.css" \
    "Let's see some applications!" "" \
    "CodeSlide CLI: A Node.js Command Line Interface" "../../../../applications/cli/src/index.ts" \
    "CLI options validator" "../../../../applications/cli/src/options.ts" \
    "Parse CLI options -> Print to output" "../../../../applications/cli/src/parse.ts" \
    "" "../../../../applications/cli/src/print.ts" \
    "" "../../../../applications/cli/src/run.ts" \
    "The End" ""
);

echo "index.html" && \
time ../../dist/index.js \
  -o ./index.html \
  --format html \
  --layout horizontal \
  "${SLIDES[@]}" && \
\
echo "index.html" && \
time ../../dist/index.js \
  -o ./index.vertical.html \
  --format html \
  --layout vertical \
  "${SLIDES[@]}" && \
\
echo "index.pdf" && \
time ../../dist/index.js \
  -o ./index.pdf \
  --format pdf \
  "${SLIDES[@]}";
