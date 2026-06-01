# Waldo DS — Figma & Tokens workflow

Technical notes for Figma + Tokens Studio + direct DS-file editing.
(Design-system authority lives in `CLAUDE.md`. Component conventions live with the shadcn agent.)

---

## Source of truth

`waldo.tokens.json` → single file → drives everything (CSS, HTML, Figma).

Figma DS: https://www.figma.com/design/bgyz7RmoeEbnsqybjQveUy
Live ref: https://ugaldewaldo.github.io/waldo-design-system/

---

## Token structure (4 top-level sets → 4 Figma collections)

| Set | What's inside |
|-----|---------------|
| `primitives` | zinc · green · yellow · orange · coral families + alpha namespace |
| `brand` | green · yellow · pink · chrome · purple (5 steps, marketing ONLY) |
| `typography` | fontFamily/weight/size/lineHeight/letterSpacing + 42 textStyles |
| `semantic` | surface · border · text · interactive · scrim · ring · accent |

**Do not add new top-level keys** — Tokens Studio will create extra Figma collections.

---

## Tokens Studio push gotchas

1. **References don't resolve in composite textStyles.**
   Push fails with "Error setting font family/weight combination".
   → textStyles must use **literal values** (Inter, "Regular", "14", "20", "-2%"), not `{typography.fontWeight.normal}`.

2. **Font weights are named strings, not numbers.**
   Figma expects "Semi Bold" (with space), "Regular", "Medium", "Bold".

3. **Top-level JSON key = separate Figma collection.**
   4 keys → 4 clean collections. Add a 5th, get a 5th. Don't.

4. **NEVER push with "Remove styles and variables without connection" ON.**
   Wipes everything not in the JSON.

---

## Figma push workflow

1. Open Tokens Studio plugin
2. Verify 4 sets enabled: primitives, brand, typography, semantic
3. Push → Options:
   - Variables: Color ✓ · String ✓ · Number ✓ · Boolean ✓
   - Styles: Typography ✓ (rest off)
   - Update existing: ✓
   - Remove without connection: ❌
4. Confirm
5. Check Figma → should be exactly 4 collections. More = something went wrong.

---

## Direct Figma editing (use_figma MCP)

Plugin API in JS. Can read context, bind variables, apply text styles, create/delete vars and collections.

**Rules:**
- Always audit before destructive ops (collection deletion, mass binding)
- Use Figma version history as escape hatch
- Skip `#9747FF`, `#522B2B`, `#D9D9D9`, `#444444` (Figma section UI / placeholders)
- For instance descendants: changing fills creates overrides — usually fix at master instead

**Bind hex → variable map:**
```
#F8F8F9 → zinc/50    #F0F0F2 → zinc/100   #D2D3D3 → zinc/200
#B4B5B6 → zinc/300   #8F9091 → zinc/400   #636465 → zinc/500
#41454B → zinc/600   #323539 → zinc/700   #2D2F33 → zinc/750
#27282B → zinc/800   #242528 → zinc/850   #202123 → zinc/900
#171819 → zinc/950
#32A9A9 → green/500  #2C797A → green/600  #2A6C6D → green/700
#265152 → green/800
#F7D371 → yellow/300
#CD917B → orange/300 #A95D41 → orange/400 #E76638 → orange/500
#DE3A28 → coral/500
#FFFFFF → zinc/200 (DS choice, no pure white in product)
#000000 → zinc/950
```

**D2D3D3 with opacity → nearest alpha:**
```
5%/10%/12%/20%/30%/50%/70% → alpha/zinc-200/{step}
```

---

## Text style mapping (for binding text nodes)

Match by `fontSize/fontName.style`:
```
12 / Regular    → text-xs-normal
12 / Medium     → text-xs-medium
12 / Semi Bold  → text-xs-semibold
13 / Regular    → text-sm-normal     (round up from 13)
14 / Regular    → text-sm-normal
14 / Medium     → text-sm-medium
14 / Semi Bold  → text-sm-semibold
16 / Regular    → text-base-normal
16 / Medium     → text-base-medium
16 / Semi Bold  → text-base-semibold
18 / Regular    → text-lg-normal
... etc (see waldo.tokens.json textStyles for full list)
```

Stale legacy labels (LX·Regular, LX2·SemiBold) → migration table in `index.html`.
