#!/usr/bin/env bash
# Installs the Waldo DS git hooks. Run once per clone: bash tools/install-hooks.sh
set -eu
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOK="$ROOT/.git/hooks/pre-commit"
cat > "$HOOK" <<'EOF'
#!/usr/bin/env bash
exec "$(git rev-parse --show-toplevel)/tools/pre-commit.sh"
EOF
chmod +x "$HOOK" "$ROOT/tools/pre-commit.sh"
echo "✓ pre-commit hook installed → $HOOK"
