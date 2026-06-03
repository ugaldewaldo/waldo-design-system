# Waldo Design System — CLAUDE.md

**Authoritative reference.** Read before touching anything in this project — tokens, colors, typography, components, Figma.

## ⛔ ABSOLUTE RULES — read before touching any file

### 1. Zero hardcoded styles

Never write hex, rgba, or color values directly in code:
```
❌  bg-[#2d2f33]  text-[#d2d3d3]  rgba(50,169,169,0.12)  style="color:#32a9a9"
✅  bg-popover    text-foreground  bg-primary/12           text-primary
```
If a token doesn't exist → run `/ds-add-token`. Never hardcode as "temporary".

### 2. Only foundational DS tokens — never legacy vars

The ONLY allowed CSS variables are the DS semantic tokens:
```
✅  --foreground  --background  --card  --muted  --popover  --secondary  --accent
✅  --primary  --destructive  --warning  --highlight  --border  --muted-foreground
✅  --radius  --shadow-*
```

**NEVER use these — they don't exist in the DS:**
```
❌  --txt-high  --txt-med  --txt-reg  --txt-low
❌  --fill-low  --fill-reg  --fill-menu  --fill-high
❌  --bg  --bg-card  --bg-high  --elevated  --sunken
❌  --line-low  --line-reg  --line-high  --green
```

### 3. No creating styles without authorization

Forbidden to add colors, CSS variables, or classes not in the token system.
If something doesn't exist → **ask Miguel first.**

### 3. Usar componentes existentes — no recrearlos

Antes de escribir HTML para algo visual, verificar si existe componente en `waldo-ui/src/components/ui/`.

| Necesitas | Usa |
|-----------|-----|
| Estado / etiqueta | `Badge` (variant: active, destructive, warning, highlight, secondary) |
| Fila de lista | `ListItem` + `ListView` |
| Divisor | `Separator` |
| Toggle | `Switch` |
| Checkbox | `Checkbox` |
| Menú contextual | `DropdownMenu` |
| Campo de texto | `Input` + `Field` |
| Pastilla removible | `Tag` |

En `index.html` usar las clases CSS del sistema (`badge-active`, `badge-destructive`, etc.) — nunca inventar estilos equivalentes.

### 4. Actualizar index.html siempre

Todo componente creado o modificado en `waldo-ui/src/components/ui/` DEBE actualizarse en `index.html` en la misma sesión. No preguntes — hazlo siempre.

---

## Fallback de referencia — Linear

Cuando algo no esté documentado en este DS (un patrón de interacción, un comportamiento de componente, un valor de spacing, una decisión de UX), **usa Linear como referencia canónica**.

Waldo y Linear comparten el mismo ADN de diseño: dark-first, tool-aesthetic, alta densidad, zinc palette, Inter. Lo que hace Linear es casi siempre correcto para Waldo.

**Cómo aplicarlo:**
- ¿Cómo se comporta un table row en hover? → Linear
- ¿Qué pasa con un input con error? → Linear
- ¿Cómo se ve un card vacío? → Linear
- ¿Qué typography usa un modal title? → Linear

Radix UI Themes es el segundo fallback — especialmente para comportamientos de accesibilidad y estados de foco.

**Nunca inventar** — si no está en Waldo DS y no está en Linear/Radix, pregunta a Miguel.

---

## What this is

Waldo's design system and component library. Dark-first. Product UI (not marketing). Built on shadcn/ui + Tailwind + Radix primitives.

**Source of truth:** `waldo.tokens.json` (single file, Tokens Studio format) drives everything — CSS, HTML, Figma.

Figma DS: https://www.figma.com/design/bgyz7RmoeEbnsqybjQveUy
Live ref: https://ugaldewaldo.github.io/waldo-design-system/

---

## Token structure

4 top-level sets → 4 Figma collections. Do not add more.

| Set | Contents |
|-----|----------|
| `primitives` | zinc · green · yellow · orange · coral + alpha namespace |
| `brand` | green · yellow · pink · chrome · purple (marketing ONLY) |
| `typography` | fontFamily · weight · size · lineHeight · letterSpacing + 42 textStyles |
| `semantic` | surface · border · text · interactive · scrim · ring · accent |

Components reference **semantic tokens only** — never primitives directly.

---

## Colors — non-negotiable rules

### Brand green (product)
- `green-700: #2a6c6d` → darker green
- `green-500: #32a9a9` → primary brand · `accent-brand` · CTA fill · focus rings
- `green-600: #2c797a` → hover state

### Destructive
- `coral-500: #de3a28` → `accent-destructive`. Red-leaning (hue 5°) to differentiate from warning.
- **Not red. Not pink. Not #ff6467. Coral.**

### Warning
- `orange-600: #c94e22` → `accent-warning`

### Highlight (decorative, no urgency)
- `yellow-300: #f7d371` → `accent-highlight` (badges, "Pro" tags)

### Brand (marketing only — never in product UI)
- `brand-green-500: #63dbdb`
- `brand-yellow-500: #fac034`
- `brand-pink-500: #d40a60`
- `brand-chrome-500: #bdd8d8`
- `brand-purple-500: #813aef`

### Zinc surfaces
| Token | Hex | Semantic | Use |
|-------|-----|----------|-----|
| zinc-950 | #171819 | `surface-default` | App background |
| zinc-900 | #202123 | `surface-elevated` | Cards, panels |
| zinc-850 | #242528 | `surface-elevated-alt` | Sidebar |
| zinc-800 | #27282b | `surface-sunken` | Inputs, code |
| zinc-750 | #2d2f33 | `secondary` | Secondary button bg |
| zinc-700 | #323539 | `surface-popover` | Menus, dropdowns |
| zinc-600 | #41454b | `accent` | Menu items |

---

## Components

Component-level conventions (button variants, sizes, etc.) are owned by the **shadcn agent**, not this one. My authority ends at the tokens layer — the semantic vocabulary components consume.

If a component needs a token that doesn't exist yet, ask me to add it. Don't reference primitives directly.

---

## Typography

Two tracks — never mix.

- **UI track** `text-*` (12 → 36px, tracking -2%) → product surfaces
- **Display track** `text-display-*` (24 → 96px, tracking -4%) → marketing heros only

Font: Inter. Weights: Regular, Medium, Semi Bold, Bold (Figma is picky — use named strings with space).

**No italic** anywhere.

42 composite textStyles defined. Legacy label migration (LX·Regular → text-lg-normal etc.) → `index.html` Migration tab.

---

## Files

| File | What |
|------|------|
| `figma/` | **Everything for Figma** — tokens JSON, CSS theme. See `figma/README.md` |
| `figma/waldo.tokens.json` | Source of truth — Token Studio format |
| `figma/waldo-shadcn-theme.css` | shadcn HSL CSS vars |
| `waldo-ui/` | **Everything for shadcn/React** — components, CSS vars, Tailwind config. See `waldo-ui/README.md` |
| `index.html` | Live DS reference + component library (GitHub Pages) |
| `waldo-design-system.html` | Legacy DS reference |
| `NOTES-FOR-STEVE.md` | Notes for the developer |

---

## Component library (`waldo-ui/`)

```bash
# Link as workspace dep or local file dep
# "dependencies": { "@waldo/ui": "file:../waldo-ui" }
npm install
```

```tsx
import { Button, Badge, Input, Field, Avatar } from '@waldo/ui'
import '@waldo/ui/globals.css'
```

---

## Figma push workflow (Tokens Studio)

1. Open Tokens Studio plugin
2. Verify 4 sets enabled: primitives, brand, typography, semantic
3. Push → Options:
   - Variables: Color ✓ · String ✓ · Number ✓ · Boolean ✓
   - Styles: Typography ✓ (rest off)
   - Update existing: ✓
   - Remove without connection: ❌ (CRITICAL — wipes things not in JSON)
4. Confirm
5. Verify exactly 4 collections in Figma. More = something duplicated.

### Tokens Studio gotchas
- **References do NOT resolve in composite textStyles** → use literal values (Inter, "Regular", "14", "20", "-2%"), not `{typography.fontWeight.normal}`.
- **Font weights are named strings**: "Semi Bold" (with space), not "600" or "SemiBold".
- **Top-level JSON keys become Figma collections** — don't add new ones casually.

---

## Direct Figma editing (use_figma MCP)

Plugin API in JS. Read context, bind variables, apply text styles, create/delete vars.

**Rules:**
- Always audit before destructive ops
- Use Figma version history as escape hatch
- Skip `#9747FF`, `#8A38F5`, `#522B2B`, `#D9D9D9`, `#444444` (Figma chrome / placeholders)
- For instance descendants: changing fills creates overrides — fix master instead

---

## Communication

- Chat with Miguel: Spanish
- Linear / Steve / external: **English always**

Linear PRO-2461 tracks Tailwind config alignment with Steve.

---

## Git

```bash
cd /Users/miguelugalde/Desktop/waldo-design-system
git add -A && git commit -m "..." && git push
```

Pushes to GitHub Pages.

---

## Linear / external communication

**Never post to Linear, Slack, or any external tool without explicit approval from Miguel.**
Always draft first, wait for "sí" before publishing. No exceptions.

---

## What NOT to do

- Don't use `green-500` as a button fill with white text — contrast fails
- Don't use `#ff6467` — that's shadcn's default red, not Waldo's coral
- Don't use `brand-*` in product UI — marketing only
- Don't use `display-*` typography inside product — UI track only
- Don't reference primitives directly from components — always via semantic tokens
- Don't add italic anywhere
- Don't add red anywhere in product
- Don't add top-level keys to `waldo.tokens.json` without planning the Figma collection
- Don't push Tokens Studio with references in textStyles — resolve to literals first

---

## ⛔ English only — no exceptions

All content in the Design System must be in English:
- Section titles, descriptions, demo labels
- Code comments
- Variant names, prop names, state names
- Example/placeholder content in demos

Not a single word in any other language. Ever.

## ⛔ SVG color values

SVG presentation attributes (`stroke=""`, `fill=""`) do NOT resolve CSS variables.
Always use `style=""` for color tokens on SVG elements:

```html
❌  <svg stroke="var(--primary)">
✅  <svg style="stroke:var(--primary)">
✅  <svg stroke="currentColor"> + parent color:var(--primary)
```
