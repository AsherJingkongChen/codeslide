#! /usr/bin/env sh

echo '==== Helps ====' && ./dist/app.js -h && echo '===============';
cd ./examples/codeslide-cli && dirs && ./make.sh;
cd ../rustlings && dirs && ./make.sh;
cd ../failure && dirs && ./make.sh; # the last example
