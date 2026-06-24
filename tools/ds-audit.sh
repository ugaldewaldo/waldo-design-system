#!/usr/bin/env bash
# ds:audit — full DS audit. Run this BEFORE reporting DS work.
#
# Broader than the pre-commit guard: it also scans index.html (the showcase) and
# the waldo-labs/ prototypes, which the commit guard skips. The guard BLOCKS drift
# on component code; this command gives the full picture (incl. known showcase debt).
#
# Usage:  bash tools/ds-audit.sh
#
# REPORT MODE (always exits 0). This is the full-picture view you read BEFORE
# reporting DS work — it surfaces pre-existing debt the commit guard never sees
# (the guard only scans CHANGED files, and skips index.html + waldo-labs).
# The GATE that blocks new drift is the pre-commit hook / CI, not this command.
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT" || exit 1

echo "▶ detect.js — components + index.html + prototypes (incl. labs)…"
node tools/detect.js waldo-ui/src index.html waldo-labs --include-labs | tail -1 || true

echo "▶ lint-doctrine.js — every .tsx has a doctrine entry…"
node tools/lint-doctrine.js >/dev/null 2>&1 && echo "  ✓ doctrine coverage" || echo "  ✗ doctrine coverage — run: node tools/lint-doctrine.js"

echo "▶ lint-index.js — every demo backed by a .tsx…"
node tools/lint-index.js >/dev/null 2>&1 && echo "  ✓ index demos backed" || echo "  ✗ index orphans — run: node tools/lint-index.js"

echo "▶ build-waldo-ds.sh --check — waldo-ds.css in sync…"
bash tools/build-waldo-ds.sh --check >/dev/null 2>&1 && echo "  ✓ waldo-ds.css in sync" || echo "  ✗ waldo-ds.css stale — run: bash tools/build-waldo-ds.sh"

echo "▶ build-component-index.js --check — component index in sync…"
node tools/build-component-index.js --check >/dev/null 2>&1 && echo "  ✓ component index in sync" || echo "  ✗ component index stale — run: node tools/build-component-index.js"

echo ""
echo "ℹ ds:audit is a REPORT (full detail: node tools/detect.js <path> --include-labs)."
echo "  The gate that blocks NEW drift is the pre-commit hook / CI on changed files."
exit 0
