#! /usr/bin/env sh

echo '==== Helps ====' && ./dist/index.js -h && echo '===============';
cd ./examples/codeslide-cli && dirs && ./make.sh;
cd -;
cd ./examples/rustlings && dirs && ./make.sh;
cd -;
cd ./examples/failure && dirs && ./make.sh; # the last example
