#! /usr/bin/env sh

cd ./example/rustlings && pwd && \
echo 'index.html' && \
../../dist/index.js -c config.html.json -o index.html && \
echo 'index.pdf' && \
../../dist/index.js -c config.pdf.json -o index.pdf;
