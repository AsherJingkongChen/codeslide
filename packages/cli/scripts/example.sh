#! /usr/bin/env sh

# echo '==== Helps ====' && ./dist/index.js -h && echo '===============' && \
# cd ./examples/rustlings && dirs && \
# echo 'index.html' && \
# ../../dist/index.js -c config.html.json -o index.html && \
# echo 'index.pdf' && \
# ../../dist/index.js -c config.pdf.json -o index.pdf && \
# \
cd ./examples/codeslide && dirs && \
echo 'index.html' && \
../../dist/index.js -c config.html.json -o index.html;
