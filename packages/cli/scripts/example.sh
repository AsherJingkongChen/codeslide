#! /usr/bin/env sh

cd ./example/rustlings && \
dirs && \
echo '==== Helps ====' && ../../dist/index.js -h && echo '===============' && \
echo 'index.html' && \
../../dist/index.js -c config.html.json -o index.html && \
echo 'index.pdf' && \
../../dist/index.js -c config.pdf.json -o index.pdf;
