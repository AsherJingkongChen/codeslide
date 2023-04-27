#! /usr/bin/env sh

PM='npm';
[ -f $(which pnpm) 2>/dev/null ] && PM='pnpm';
$PM install;
