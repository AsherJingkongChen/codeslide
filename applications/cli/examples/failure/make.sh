#! /usr/bin/env sh

for i in {0..2}; do
  echo "$i.md (Failure example)";
  ../../dist/index.js -m $i.md -o $i.success;
done
