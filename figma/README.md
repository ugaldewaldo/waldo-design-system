# Figma

Everything in this folder is for Figma / Tokens Studio.

## Files

| File | What |
|------|------|
| `waldo.tokens.json` | Source of truth — Token Studio format. Drives all Figma variables, styles, and collections. Push this via Tokens Studio plugin. |
| `waldo-shadcn-theme.css` | shadcn HSL CSS variables — reference for how DS tokens map to shadcn. Also used to sync Figma ↔ code. |

## How to push tokens to Figma

1. Open Tokens Studio plugin in Figma
2. Load `waldo.tokens.json`
3. Enable all 4 sets: `primitives` · `brand` · `typography` · `semantic`
4. Push → Variables: Color ✓ · String ✓ · Number ✓ · Boolean ✓ · Styles: Typography ✓
5. **Remove without connection: ❌** — critical, never enable this

## Rule

Any file that needs to go into Figma lives here.
Nothing else.
