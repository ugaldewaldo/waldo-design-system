#!/usr/bin/env bash
# Generates waldo-ds.css from its real sources — it is NO LONGER hand-edited.
#
#   waldo-ds.css  =  banner  +  vanilla component styles  (HSL overlay, NO tokens)
#
# Token-free component-class layer; consumes the HSL theme (waldo-shadcn-theme.css)
# via hsl(var(--token)). Consumers link the theme FIRST, then waldo-ds.css.
# Edit component CSS in tools/waldo-ds.styles.css; then run this. Never hand-edit waldo-ds.css.
#
# Usage:  bash tools/build-waldo-ds.sh
set -eu
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

build() {
  cat tools/waldo-ds.banner.css \
      tools/waldo-ds.styles.css
}

# --check: verify waldo-ds.css matches its sources (for guard/CI), don't write.
if [ "${1:-}" = "--check" ]; then
  if ! diff -q <(build) waldo-ds.css >/dev/null; then
    echo "✗ waldo-ds.css is out of date with its sources. Run: bash tools/build-waldo-ds.sh"
    exit 1
  fi
  echo "✓ waldo-ds.css is in sync with globals.css + styles."
  exit 0
fi

build > waldo-ds.css
echo "✓ waldo-ds.css regenerated — tokens from globals.css, styles from tools/waldo-ds.styles.css"
