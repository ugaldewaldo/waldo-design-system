#!/bin/bash
# DS Component Verifier
# Runs after every edit to waldo-ui component files
# Checks: no hardcoded colors, no wrong fonts, no orphan styles

FILE=$(echo "$1" | tr -d '\n')

# Only check component files
if [[ "$FILE" != *"waldo-ui/src/components"* ]]; then
  exit 0
fi

VIOLATIONS=()

# 1. Hardcoded hex colors
HEX=$(grep -nE '(#[0-9a-fA-F]{3,8}|bg-\[#|text-\[#|border-\[#|fill=\\?"#)' "$FILE" 2>/dev/null | grep -v "//.*#\|/\*.*#\|stroke-width\|viewBox\|xmlns")
if [ -n "$HEX" ]; then
  VIOLATIONS+=("❌ HARDCODED HEX: $HEX")
fi

# 2. Hardcoded rgba
RGBA=$(grep -nE 'rgba\([0-9]' "$FILE" 2>/dev/null | grep -v "//\|/\*")
if [ -n "$RGBA" ]; then
  VIOLATIONS+=("❌ HARDCODED RGBA: $RGBA")
fi

# 3. Wrong font family (not Inter/default)
FONT=$(grep -nE "font-family.*(?!Inter|inherit|sans-serif|var\(--font)" "$FILE" 2>/dev/null | grep -v "//\|/\*\|monospace.*code\|JetBrains.*shortcut")
if [ -n "$FONT" ]; then
  VIOLATIONS+=("❌ NON-DS FONT: $FONT")
fi

# 4. Legacy CSS vars that don't exist in DS
LEGACY=$(grep -nE 'var\(--(txt-|fill-|bg-card|bg-high|elevated|sunken|line-low|line-reg|line-high|green\b)' "$FILE" 2>/dev/null)
if [ -n "$LEGACY" ]; then
  VIOLATIONS+=("❌ LEGACY VAR (doesn't exist): $LEGACY")
fi

# 5. Hardcoded px in class names that should use tokens
HARDPX=$(grep -nE '(rounded|w|h)-\[[0-9]+(px)\]' "$FILE" 2>/dev/null | grep -v "//\|/\*")
if [ -n "$HARDPX" ]; then
  VIOLATIONS+=("⚠️  HARDCODED PX (use token radius/spacing): $HARDPX")
fi

if [ ${#VIOLATIONS[@]} -eq 0 ]; then
  echo '{"systemMessage": "✅ DS verification passed — no violations found."}'
else
  MSG="⛔ DS VIOLATIONS in $(basename $FILE):\n"
  for v in "${VIOLATIONS[@]}"; do
    MSG="$MSG$v\n"
  done
  MSG="${MSG}Fix before continuing. Run /ds-verify for details."
  echo "{\"systemMessage\": \"$MSG\"}"
fi
