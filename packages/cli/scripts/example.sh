#! /usr/bin/env sh

echo '==== Helps ====' && ./dist/index.js -h && echo '===============' && \
cd ./example/rustlings && dirs && \
echo 'index.html' && \
../../dist/index.js -c config.html.json -o index.html && \
echo 'index.pdf' && \
../../dist/index.js -c config.pdf.json -o index.pdf && \
\
cd ../codeslide && dirs && \
echo 'index.html' && \
../../dist/index.js -c config.html.json -o index.html;
