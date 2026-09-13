#!/bin/bash
#
# Regenerates src/swirly-bundle.js from js/entry.js.
#
# Needs a checkout of the Swirly fork with its dependencies installed and built
# (`yarn && yarn build`). Point SWIRLY at it if it is not a sibling of this
# repository. Nothing else in this repository needs Node: the bundle is
# committed, so `cargo install mdbook-swirly` works on its own.

set -euo pipefail

SELF_DIR=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(dirname "$SELF_DIR")
SWIRLY=${SWIRLY:-$(cd "$REPO_ROOT/.." && pwd)/swirly}

if [[ ! -d "$SWIRLY/node_modules" ]]; then
  echo "No Swirly checkout with dependencies at $SWIRLY" >&2
  echo "Clone the fork there and run 'yarn && yarn build', or set SWIRLY." >&2
  exit 1
fi

ESBUILD="$SWIRLY/node_modules/.bin/esbuild"
OUT="$REPO_ROOT/src/swirly-bundle.js"

# platform=browser and format=iife keep the output free of any module system or
# Node built-in, so QuickJS can evaluate it directly. es2020 is what QuickJS
# supports.
NODE_PATH="$SWIRLY/node_modules" "$ESBUILD" "$SELF_DIR/entry.js" \
  --bundle \
  --platform=browser \
  --format=iife \
  --target=es2020 \
  --legal-comments=none \
  --outfile="$OUT"

# Record which Swirly commit the committed bundle came from, so a drift check
# can regenerate exactly this bundle and compare.
REV=$(git -C "$SWIRLY" rev-parse HEAD 2>/dev/null || echo unknown)
echo "$REV" > "$SELF_DIR/swirly-rev.txt"

echo "Wrote $OUT ($(wc -c <"$OUT") bytes) from $SWIRLY @ $REV"
