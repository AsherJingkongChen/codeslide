#! /usr/bin/env sh

for i in {0..2}; do
  echo "[Failure example] $i.md";
  ../../dist/index.js -m $i.md -o $i.illegal;
done
