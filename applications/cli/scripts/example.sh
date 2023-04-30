#! /usr/bin/env sh

# cd ./examples/rustlings && dirs && \
# echo 'index.html' && \
# ../../dist/index.js -c config.html.json -o index.html && \
# echo 'index.pdf' && \
# ../../dist/index.js -c config.pdf.json -o index.pdf && cd - && \
# \
echo '==== Helps ====' && ./dist/index.js -h && echo '===============' && \
cd ./examples/codeslide && dirs && ./make.sh && cd - &&\
cd ./examples/rustlings && dirs && ./make.sh;
