# Waldo UI — Session Status

**Read this at the start of every session before touching anything.**

---

## Where we are

Building a shadcn/ui component library (`waldo-ui/`) + a live docs site (`index.html`) that Steve can install and use, and AI agents can read to design correctly.

**Live docs site:** https://ugaldewaldo.github.io/waldo-design-system/  
**Figma DS:** https://www.figma.com/design/bgyz7RmoeEbnsqybjQveUy/

---

## Component progress

### ✅ Done — reviewed against Figma
- **Button** — 8 variants, pill, green-700 fill, sizes 28/36/44px
- **Input / Field** — pill, teal label (#2db4b4), green-800 hover border, no ring
- **Badge** — shadcn style, coral destructive, no borders on most
- **Avatar** — round/square shapes, 16/24/32/40px, AvatarGroup, SQR+ROUND combo
- **Checkbox** — circular (not square!), green + mono variants
- **Switch** — 32×18px, green-700 ON
- **Tag / TagInput** — zinc-750 bg, font-medium 500, strokeWidth 1.5 on X
- **FileInput** — zinc-850 bg, radius 24px (not 32!), 2 sizes, error state, file hover→teal
- **SegmentedControl** — zinc-950 container, zinc-800 active
- **Select / Dropdown** — zinc-750 container, rounded-20px, shadow, search flush top, separator rgba/12%
- **Badge** — shadcn style

### 🔨 In progress / needs Figma review
- **Dialog / Modal** — exists in code, not reviewed against Figma yet
- **Table** — exists in code, not reviewed yet

### ⏳ Not started
- Cards / ResultCard (Waldo-specific)
- Side panels / Panels
- SKILL.md (AI design skill — Phase 3)

---

## Key files

| File | What |
|------|------|
| `index.html` | Live docs site (GitHub Pages) — Components + Foundation |
| `waldo-ui/` | React package for Steve |
| `waldo-ui/CLAUDE.md` | Component rules + exact values |
| `CLAUDE.md` | Root DS rules (colors, typography, etc.) |
| `figma/waldo.tokens.json` | Token source of truth |

---

## Workflow (per component)

1. Get Figma node → screenshot + design context
2. Extract exact values (bg, radius, padding, typography, states)
3. Update `.tsx` component file with correct values
4. Update `index.html` demo page with correct CSS + interactive demo
5. Update `waldo-ui/CLAUDE.md` if values changed

---

## Non-negotiable rules (burn these in)

```
Button fill       → primary (green-500 #32a9a9) — use bg-primary, NOT hardcoded hex
Field label       → primary (green-500 #32a9a9) — use text-primary, NOT hardcoded hex
Input hover       → waldo-green-800 (#265152) — use border-waldo-green-800, NO box-shadow ring
Destructive       → coral-500 #de3a28 — use text-destructive / bg-destructive, NOT hardcoded hex
Warning           → orange-500 #e76638 — use text-warning / bg-warning
Dropdown bg       → popover (zinc-750 #2d2f33) — use bg-popover, NOT hardcoded hex
Dropdown radius   → 20px
FileInput radius  → 24px (NOT 32px)
Checkbox shape    → circular (NOT square)
Button font       → font-medium 500 (NOT semibold)
```

---

## Next session — start here

1. **Dialog/Modal** — get Figma node, review values, update `dialog.tsx` + demo
2. **Table** — review against Figma
3. Then: Cards/ResultCard (Waldo-specific compound components)

---

## ⛔ RULE #1 — Never hardcode values

Every value in every component MUST use DS tokens. No exceptions.
- `var(--txt-high)` not `#d2d3d3`
- `var(--line-low)` not `rgba(210,211,211,0.12)`
- `var(--fill-low)` not `#27282b`
- `var(--bg)` not `#171819`
- `var(--destructive)` not `#e8533a`

If you don't know the token → check DS variables in index.html or the root CLAUDE.md.
Hardcoding values = building outside the system = wrong.

---

## What NOT to do

- Don't modify `waldo-design-system.html` — it's the original, keep it clean
- Don't post to Linear/Slack without Miguel saying "sí"
- Don't invent color values — always get from Figma variables or DS page
- Don't add `font-semibold` to buttons
- Don't add `box-shadow` ring to inputs (single border only)
