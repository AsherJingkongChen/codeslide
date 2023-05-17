#! /usr/bin/env sh

expect_fail() {
  echo $1;
  ${@:2};
  if [ $? -eq 0 ]; then
    echo "Failure example fails due to an example has succeeded";
    exit 1;
  fi
}

# 0.md does not exist as intended

for i in {0..16}; do
  expect_fail \
    "$i.md (Failure example)" \
    ../../dist/app.js -m $i.md -o $i.success;
done

expect_fail \
  "Wrong command 1 (Failure example)" \
  ../../dist/app.js -m;
expect_fail \
  "Wrong command 2 (Failure example)" \
  ../../dist/app.js -n _ -o _;
expect_fail \
  "Wrong command 3 (Failure example)" \
  ../../dist/app.js --manvest _ --input _;
expect_fail \
  "Wrong command 4 (Failure example)" \
  ../../dist/app.js --helps;
expect_fail \
  "Wrong command 5 (Failure example)" \
  ../../dist/app.js -V;
