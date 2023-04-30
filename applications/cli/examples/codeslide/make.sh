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
    "Render the HTML template and CSS to a slideshow" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/slides/index.ts" \
    "" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/printer.ts" \
    "" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/index.ts" \
    "The HTML template" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/slides/slides.html" \
    "The CSS" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/src/slides/slides.horizontal.css" \
    "Let's see some applications!" "" \
    "CodeSlide CLI: A Node.js Command Line Interface" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/index.ts" \
    "CLI options validator" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/options.ts" \
    "Parse CLI options -> Print to output" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/parse.ts" \
    "" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/print.ts" \
    "" "https://raw.githubusercontent.com/AsherJingkongChen/codeslide/main/applications/cli/src/run.ts" \
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
