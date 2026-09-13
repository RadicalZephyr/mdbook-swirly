#!/bin/bash
#
# Regenerates src/swirly-bundle.js from js/entry.js.
#
# Builds against the Swirly submodule in vendor/, whose commit pointer is what
# pins the version this crate embeds. Set SWIRLY to build against a checkout
# somewhere else -- useful while working on the renderer itself.
#
# Nothing else in this repository needs Node: the bundle is committed, so
# `cargo install mdbook-swirly` works without it.

set -euo pipefail

SELF_DIR=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(dirname "$SELF_DIR")
SWIRLY=${SWIRLY:-$REPO_ROOT/vendor/swirly}

if [[ ! -d "$SWIRLY/packages" ]]; then
  echo "No Swirly checkout at $SWIRLY" >&2
  echo "Run: git submodule update --init" >&2
  exit 1
fi

if [[ ! -x "$SWIRLY/node_modules/.bin/esbuild" ]]; then
  echo "Swirly at $SWIRLY has no dependencies installed" >&2
  echo "Run: (cd $SWIRLY && yarn --frozen-lockfile && yarn build)" >&2
  exit 1
fi

ESBUILD="$SWIRLY/node_modules/.bin/esbuild"
OUT="$REPO_ROOT/src/swirly-bundle.js"

# platform=browser and format=iife keep the output free of any module system or
# Node built-in, so QuickJS can evaluate it directly. es2020 is what QuickJS
# supports.
#
# --minify is what makes the output reproducible, not just smaller: unminified
# esbuild output carries each module's path as a comment, so the bytes would
# otherwise depend on where the Swirly checkout happens to sit and CI could
# never match a developer's rebuild.
NODE_PATH="$SWIRLY/node_modules" "$ESBUILD" "$SELF_DIR/entry.js" \
  --bundle \
  --platform=browser \
  --format=iife \
  --target=es2020 \
  --minify \
  --legal-comments=none \
  --outfile="$OUT"

echo "Wrote $OUT ($(wc -c <"$OUT") bytes)"
echo "from $SWIRLY @ $(git -C "$SWIRLY" rev-parse --short HEAD 2>/dev/null || echo unknown)"
