#!/bin/bash
# DS Component Verifier
# Runs after every edit to waldo-ui component files AND index.html
# Checks: no hardcoded colors, no wrong fonts, no orphan styles, no raw HTML in demos

FILE=$(echo "$1" | tr -d '\n')

# Check component .tsx files
IS_COMPONENT=false
IS_HTML=false
[[ "$FILE" == *"waldo-ui/src/components"* ]] && IS_COMPONENT=true
[[ "$FILE" == *"index.html"* ]] && IS_HTML=true

if [ "$IS_COMPONENT" = false ] && [ "$IS_HTML" = false ]; then
  exit 0
fi

VIOLATIONS=()

# 1. Hardcoded hex colors
HEX=$(grep -nE '(#[0-9a-fA-F]{3,8}|bg-\[#|text-\[#|border-\[#|fill=\\?"#)' "$FILE" 2>/dev/null | grep -v "//.*#\|/\*.*#\|stroke-width\|viewBox\|xmlns\|brand-swatch\|swatch-color\|swatch-hex\|alpha-chip\|mig-old\|token-dot\|token-src")
if [ -n "$HEX" ]; then
  VIOLATIONS+=("❌ HARDCODED HEX: $(echo "$HEX" | head -3)")
fi

# 2. Hardcoded rgba (skip known documentation sections)
RGBA=$(grep -nE 'rgba\([0-9]' "$FILE" 2>/dev/null | grep -v "//\|/\*\|alpha-chip\|box-shadow\|shadow.*rgba(0,0,0\|var(--shadow")
if [ -n "$RGBA" ]; then
  VIOLATIONS+=("❌ HARDCODED RGBA: $(echo "$RGBA" | head -3)")
fi

# 3. Legacy CSS vars
LEGACY=$(grep -nE 'var\(--(txt-|fill-|bg-card|bg-high|elevated|sunken|line-low|line-reg|line-high|green\b)' "$FILE" 2>/dev/null)
if [ -n "$LEGACY" ]; then
  VIOLATIONS+=("❌ LEGACY VAR (doesn't exist in DS): $(echo "$LEGACY" | head -3)")
fi

# 4. Raw HTML inputs with inline styles in demos (index.html only)
if [ "$IS_HTML" = true ]; then
  RAW_INPUT=$(grep -nE '<(input|select)[^>]*style="[^"]*height:[0-9]+px' "$FILE" 2>/dev/null | grep -v "comp-section-title\|demo-code\|copy-btn\|search.*input")
  if [ -n "$RAW_INPUT" ]; then
    VIOLATIONS+=("❌ RAW INPUT with inline styles — use class=\"input\" instead: $(echo "$RAW_INPUT" | head -2)")
  fi

  # Check for hardcoded font-family in demo styles
  FONT=$(grep -nE "font-family:'[^I][^n]" "$FILE" 2>/dev/null | grep -v "JetBrains.*shortcut\|JetBrains.*code\|monospace.*code\|demo-code\|copy-btn")
  if [ -n "$FONT" ]; then
    VIOLATIONS+=("❌ NON-DS FONT in demo: $(echo "$FONT" | head -2)")
  fi

  # 4b. Div/span styled as button — should use class="btn"
  FAKE_BTN=$(grep -nE '<(div|span)[^>]*style="[^"]*background:[^"]*var\(--(primary|foreground)[^"]*cursor:pointer' "$FILE" 2>/dev/null | grep -v "demo-code\|copy-btn\|swatch")
  if [ -n "$FAKE_BTN" ]; then
    VIOLATIONS+=("❌ DIV/SPAN styled as button — use class=\"btn\" instead: $(echo "$FAKE_BTN" | head -2)")
  fi

  # 4c. Multiple primary buttons in same demo-canvas (ONE PRIMARY PER SURFACE rule)
  while IFS= read -r block; do
    COUNT=$(echo "$block" | grep -cE 'class="btn[^"]*"' || true)
    PRIMARY=$(echo "$block" | grep -E 'class="btn[^"]*"' | grep -v 'btn-ghost\|btn-outline\|btn-secondary\|btn-destructive\|btn-white\|btn-solid' | wc -l | tr -d ' ')
    if [ "$PRIMARY" -gt 1 ]; then
      VIOLATIONS+=("❌ MULTIPLE PRIMARY BUTTONS in one demo-canvas — ONE PRIMARY PER SURFACE rule violated")
      break
    fi
  done < <(grep -oP '(?s)<div class="demo-canvas".*?</div>' "$FILE" 2>/dev/null || true)
fi

# 5. Hardcoded px in class names (tsx only)
if [ "$IS_COMPONENT" = true ]; then
  HARDPX=$(grep -nE '(rounded|w|h)-\[[0-9]+(px)\]' "$FILE" 2>/dev/null | grep -v "//\|/\*")
  if [ -n "$HARDPX" ]; then
    VIOLATIONS+=("⚠️  HARDCODED PX (use token): $(echo "$HARDPX" | head -2)")
  fi
fi

if [ ${#VIOLATIONS[@]} -eq 0 ]; then
  echo '{"systemMessage": "✅ DS verification passed — no violations found."}'
else
  MSG="⛔ DS VIOLATIONS in $(basename $FILE):\n"
  for v in "${VIOLATIONS[@]}"; do
    MSG="$MSG$v\n"
  done
  MSG="${MSG}Fix before continuing."
  echo "{\"systemMessage\": \"$MSG\"}"
fi
