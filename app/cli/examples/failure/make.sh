#! /usr/bin/env sh

for i in {10..10}; do
  echo "$i.md (Failure example)";
  ../../dist/index.js -m $i.md -o $i.success;
done

echo "Wrong command 1 (Failure example)";
../../dist/index.js -m;

echo "Wrong command 2 (Failure example)";
../../dist/index.js -n _ -o _;

echo "Wrong command 3 (Failure example)";
../../dist/index.js --manvest _ --input _;

echo "Wrong command 4 (Failure example)";
../../dist/index.js --helps;

echo "Wrong command 5 (Failure example)";
../../dist/index.js -V;
