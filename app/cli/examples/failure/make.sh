#! /usr/bin/env sh

expect_fail() {
  echo $1;
  $2;
  if [ $? -eq 0 ]; then
    echo "Failure example fails due to an example has succeeded";
    exit 1;
  fi
}

# 0.md does not exist as intended

for i in {0..10}; do
  expect_fail \
    "$i.md (Failure example)" \
    "../../dist/index.js -m $i.md -o $i.success";
done

expect_fail \
  "echo Wrong command 1 (Failure example)" \
  "../../dist/index.js -m";
expect_fail \
  "echo Wrong command 2 (Failure example)" \
  "../../dist/index.js -n _ -o _";
expect_fail \
  "echo Wrong command 3 (Failure example)" \
  "../../dist/index.js --manvest _ --input _";
expect_fail \
  "echo Wrong command 4 (Failure example)" \
  "../../dist/index.js --helps";
expect_fail \
  "echo Wrong command 5 (Failure example)" \
  "../../dist/index.js -V";
