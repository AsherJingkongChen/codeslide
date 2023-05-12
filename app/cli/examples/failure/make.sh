#! /usr/bin/env sh

for i in {0..7}; do
  echo "$i.md (Failure example)";
  ../../dist/index.js -m $i.md -o $i.success;
done
