#!/usr/bin/env bash
# Waldo DS pre-commit guard — owned by the Sync Runbook.
#
# Blocks a commit that:
#   1. introduces DS violations in staged code (detect.js errors),
#   2. breaks doctrine coverage (a .tsx with no usage-doctrine entry),
#   3. breaks either machine-readable YAML (which would kill the live docs render).
#
# Install:  bash tools/install-hooks.sh   (symlinks .git/hooks/pre-commit here)
# Bypass:   git commit --no-verify        (use only when you really must)
#
# Pure shell. Works on macOS /bin/bash 3.2 (no mapfile). YAML check uses python3
# +pyyaml if available, otherwise it is skipped with a notice.

set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1
fail=0

# 1. detect.js on staged, scannable files — excluding index.html (the DS showcase
#    reference, full of example colors by design) and tools/ (infra, not product UI;
#    the detector's own source legitimately contains hex literals as detection logic).
staged="$(git diff --cached --name-only --diff-filter=ACM \
  | grep -E '\.(html|css|tsx|jsx|ts|js|vue|svelte)$' \
  | grep -vx 'index.html' \
  | grep -v '^tools/' || true)"
if [ -n "$staged" ]; then
  count="$(printf '%s\n' "$staged" | grep -c .)"
  echo "▶ detect.js on $count staged file(s)…"
  # shellcheck disable=SC2086
  if ! node tools/detect.js $staged; then
    echo "✗ detect.js found DS violations (errors). Fix them or unstage."
    fail=1
  fi
else
  echo "▶ detect.js — no staged code files to scan."
fi

# 2. doctrine coverage — every component has an entry, every entry a real file.
echo "▶ lint-doctrine.js…"
if ! node tools/lint-doctrine.js; then
  echo "✗ usage-doctrine.yaml coverage failed."
  fail=1
fi

# 2b. index demos must be backed by a real .tsx component.
echo "▶ lint-index.js…"
if ! node tools/lint-index.js; then
  echo "✗ index.html has a component demo with no backing .tsx."
  fail=1
fi

# 3. YAML integrity — a broken indent silently kills the live-rendered docs pages.
if command -v python3 >/dev/null 2>&1 && python3 -c "import yaml" >/dev/null 2>&1; then
  for y in docs/token-catalog.yaml docs/usage-doctrine.yaml; do
    if ! python3 -c "import yaml,sys; yaml.safe_load(open('$y'))" >/dev/null 2>&1; then
      echo "✗ $y is not valid YAML — would break the live docs render."
      fail=1
    fi
  done
else
  echo "▶ YAML check skipped (python3 + pyyaml not available)."
fi

if [ "$fail" -ne 0 ]; then
  echo "⛔ DS pre-commit guard blocked the commit."
  exit 1
fi
echo "✓ DS pre-commit guard passed."
exit 0
