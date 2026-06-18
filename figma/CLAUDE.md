# Waldo DS — Figma & Tokens workflow

Technical notes for syncing tokens into the Figma Master DS.
(Design-system authority lives in `CLAUDE.md`. Component conventions live with the shadcn agent.)

---

## Source of truth

`waldo.tokens.json` → single source of truth → drives everything (CSS, HTML, Figma).

Figma DS: https://www.figma.com/design/bgyz7RmoeEbnsqybjQveUy
Live ref: https://ugaldewaldo.github.io/waldo-design-system/

---

## Token sync mechanism — CODE-FIRST + Claude via MCP (official, decided 2026-06)

**`waldo.tokens.json` is the only source of truth. Claude writes the native Figma
variables to match it, via the Figma MCP (`use_figma` → `figma.variables.*`).**

Procedure for a new/changed token:
1. Edit `waldo.tokens.json` (the value lives here, nowhere else).
2. Claude writes/updates the matching native Figma variable via MCP
   (`createVariable` / `setValueForMode`, with explicit `scopes` + WEB code syntax).
3. Publish the library (Figma → Assets → Publish) — manual.
4. Consumer files (e.g. BRAND API) accept the library update.

**HARD RULES**
- NEVER hand-edit variable values in Figma. Edit `waldo.tokens.json`, then Claude
  rewrites the variable. Hand edits get overwritten on the next sync.
- Tokens Studio is OUT of the loop. It only seeded the original 4 collections
  (kept below for reference / re-seeding only — not the day-to-day flow).

---

## Token structure (4 top-level sets → 4 Figma collections)

| Set | What's inside |
|-----|---------------|
| `primitives` | zinc · green · yellow · orange · coral families + alpha namespace |
| `brand` | green · yellow · pink · chrome · purple (5 steps, marketing ONLY) |
| `typography` | fontFamily/weight/size/lineHeight/letterSpacing + 42 textStyles |
| `semantic` | surface · border · text · interactive · scrim · ring · accent |

**Do not add new top-level keys** — each top-level JSON key maps to a separate Figma
collection; there should be exactly 4. Add tokens *inside* the existing 4.

When writing variables via MCP, mirror these conventions:
- Color values 0–1 range; set explicit `scopes` (never `ALL_SCOPES`) + WEB code syntax `var(--name)`.
- Font weights are named strings with spaces: "Semi Bold", "Regular", "Medium", "Bold".
- Composite textStyles use **literal values** (Inter, "Semi Bold", "14", "20", "-2%"), not references.

---

## Tokens Studio (HISTORICAL — re-seeding only, NOT the day-to-day flow)

> Tokens Studio seeded the original 4 collections once. The official sync today is
> code-first + Claude via MCP (see "Token sync mechanism" above). Only use this if
> rebuilding the collections from scratch.

Push options if ever re-seeding: 4 sets enabled · Variables Color/String/Number/Boolean ✓ ·
Styles Typography ✓ · Update existing ✓ · **Remove without connection ❌** (wipes everything
not in the JSON). Expect exactly 4 collections.

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

---

## Component conversion rules (CSS → Figma)

How to convert `waldo-ds.css` components into Figma component sets in the Master DS
(file `bgyz7RmoeEbnsqybjQveUy`). Done so far: `badge` (page BADGES), `button` (page BUTTONS).

### Pages & naming

- One page per component family: **UPPERCASE, no emoji** — `BADGES`, `BUTTONS`, `INPUTS`
- Page background: dark `#1c1c1c` (match existing component pages)
- Component set name: **lowercase shadcn style** — `badge`, `button`, `input`
- Variant names: `variant=default, size=sm` (shadcn axes)

### Structure

- Variant axes = the CSS modifier classes: `variant` (`.badge-default`…) × `size` (`.badge-sm`…)
- Everything else = component properties, not variants:
  TEXT prop `label` · BOOLEAN props for optional children (`dot`, `icon`, `chevron`)
- Optional children live hidden (`visible=false`) in every variant, bound to the BOOLEAN prop
- **Icons ALWAYS as instances, NEVER raw vectors.** Any icon inside a component must be an
  instance of an icon component from the ICONS page (`icon/*` custom or `lucide/*`), so it
  stays linked to the library and updates with it. Never embed a `createNodeFromSvg` vector
  directly in a component. If the icon doesn't exist yet, create it as a component on the
  ICONS page first, then instance it. Per instance: resize to the slot size, re-bind the
  inner vector stroke/fill to the variant's color, preserve opacity + the visibility prop
  ref. Use INSTANCE_SWAP for true icon slots (button leading icon, input prefix/suffix).
- Cap variant matrices at ~30; hover/active/disabled states are NOT modeled (CSS-only)

### Bindings (mandatory — zero hardcoded values)

| Property | Bind to |
|----------|---------|
| Fills / text / strokes | `semantic` first (`surface/*`, `text/*`, `accent/*`, `border/*`); `primitives` `alpha/*` only when no semantic fits |
| Gap / padding | `spacing/*` if the exact px value exists as a token; literal otherwise |
| Corner radius | `radius/full` (all 4 corners) for pills |
| Typography | `textStyles/*` — 13px rounds up to `text-sm-*`; 10px has no style → literal, flag it |

### Verification (before and after)

1. **Before building**: check `waldo-ui/src/components/ui/*.tsx` FIRST — the React
   components are canonical and `waldo-ds.css` can lag behind (e.g. outline border is
   foreground/12% in button.tsx but 20% in the vanilla CSS). Then read *computed* styles
   in the browser (`getComputedStyle` via the "DS Preview" server, port 4500) — never
   trust the CSS file alone; cascade order and duplicate blocks lie (e.g. `.btn` is
   defined twice; line ~571 block wins)
2. **After building**: screenshot the Figma set vs the rendered HTML section; smoke-test
   BOOLEAN/TEXT props on a temp instance, then delete it

### Drift protocol

- CSS value with no exact token → bind the **nearest** token (alpha steps, text styles)
  and **report the drift to Miguel** — never silently invent new tokens or new top-level
  collections (Tokens Studio creates a 5th collection per new top-level key)
- Known intentional gaps: `badge-sm` 10px / `btn-sm` 13px type (no text style) · badge
  `outline` has no real border in CSS (vestigial `border-color`, no `border-width`)
- RESOLVED (jun 2026): `text/on-brand = #ffffff` added to `semantic` (tokens.json + Figma
  variable) — the only allowed pure white; maps to shadcn `--primary-foreground`. Button
  `default` binds it; `destructive-solid` binds `text/primary` (dark-mode value of
  `--destructive-foreground` per waldo-ui). ⚠️ vanilla `waldo-ds.css` `.btn-destructive-solid`
  still says `#fff` — pending sync with waldo-ui dark theme

### Publishing

Library publish is manual (Figma → Assets → Publish) — MCP cannot do it.
