#! /usr/bin/env sh

for i in {0..7}; do
  echo "$i.md (Failure example)";
  ../../dist/index.js -m $i.md -o $i.success;
done

echo "Wrong command 1";
../../dist/index.js -m;

echo "Wrong command 2";
../../dist/index.js -n _ -o _;

echo "Wrong command 3";
../../dist/index.js --manvest _ --input _;

echo "Wrong command 4";
../../dist/index.js --helps;

echo "Wrong command 5";
../../dist/index.js -V;
