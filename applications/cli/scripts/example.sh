#! /usr/bin/env sh

echo '==== Helps ====' && ./dist/index.js -h && echo '===============';
cd ./examples/codeslide && dirs && ./make.sh
cd -;
cd ./examples/rustlings && dirs && ./make.sh;
