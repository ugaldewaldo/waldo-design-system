# Waldo Design System — CLAUDE.md

**Authoritative reference.** Read before touching anything in this project — tokens, colors, typography, components, Figma.

## ⛔ GOLDEN RULE — above everything else

### 0. NEVER touch an atomic component without explicit approval

Atomic components are: every `.tsx` file in `waldo-ui/src/components/ui/` and every canonical CSS class in `index.html` (`.wli`, `.wtabs-pill`, `.wdialog`, `.wseg`, `.wswitch`, etc.).

**These files are FROZEN unless Miguel explicitly says "fix this component" or "change this component".**

If a demo looks wrong → fix the demo HTML.
If a dialog recipe looks wrong → fix the recipe HTML.
If a CSS class looks wrong → ask Miguel before touching it.

NEVER open a `.tsx` component file to make it "match" a demo or recipe. The demo adapts to the component. Never the reverse.

Violating this rule wastes hours and breaks things that were working.

---

## ⛔ ABSOLUTE RULES — read before touching any file

### 1. Zero hardcoded styles — including inline `style=` attributes

Never write hex, rgba, or color values directly in code — **and never use `style=` attributes on component or demo HTML**:
```
❌  style="color:#32a9a9"
❌  style="background:var(--card);border-radius:24px;padding:8px"
❌  style="margin:4px 0 8px"
✅  Define a CSS class using DS tokens, then apply the class
```

This applies everywhere — `.tsx` components, `index.html` demos, recipe HTML.
If the right class doesn't exist yet → create it with DS tokens. Never use `style=` as a shortcut.

The ONLY `style=` allowed in `index.html` is on `demo-canvas` and `demo-block` wrappers for layout-only properties (`align-items`, `gap`, `flex-wrap`) that vary per demo. Never for colors, backgrounds, spacing of components.

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

### 5. shadcn nomenclature check — mandatory on every component create or modify

Before finishing any component, verify it follows shadcn/ui naming conventions:

**Checklist:**
- [ ] Variant names match shadcn (`destructive` not `error`, `outline` not `ghost` for bordered, `ghost` not `bare` for borderless)
- [ ] Prop names don't clash with DOM attributes (e.g. avoid `prefix`, `label`, `size` with non-standard types)
- [ ] Sub-component names match shadcn (e.g. `DialogHeader` not `DialogHead`)
- [ ] Export names match shadcn exactly if the component exists in shadcn

**If the component is a Waldo extension** (no shadcn equivalent):
- Name it clearly as a Waldo pattern (e.g. `CopyLink`, `AdvancedSection`)
- Document it in `docs/usage-doctrine.yaml` with a note: "Waldo extension — no shadcn equivalent"

⚠️ **Flag warnings before committing** — if any variant/prop name diverges from shadcn without explicit justification, stop and ask Miguel before proceeding.

---

### 6. Component-usage doctrine (PRO-2528) — mandatory on every component close

When a component is finished and verified, you MUST add its entry to `docs/usage-doctrine.yaml`.

For each component, document:
```yaml
- component: ComponentName
  use_when:
    - Short description of the right context
  dont_use_when:
    - Short description of the wrong context
  prefer_over:
    - OtherComponent: reason
  notes: Optional contextual styling rules or density notes
```

This is machine-readable data for the design-system skill. It must never drift from reality — update it when the component changes. Do not skip this step.

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

## ⛔ VERIFICAR VISUALMENTE ANTES DE REPORTAR CUALQUIER CAMBIO

**NUNCA pedir a Miguel que revise un resultado visual sin haberlo revisado tú primero.**

Tengo acceso a herramientas de preview (Claude Preview MCP, Chrome MCP). Antes de terminar cualquier tarea visual:
1. Arrancar el servidor con `preview_start`
2. Navegar a la sección modificada con `preview_eval` (llamar las funciones JS si hace falta)
3. Tomar screenshot con `preview_screenshot` y verificar que se ve correcto
4. Si hay error visual → arreglarlo ANTES de reportar a Miguel
5. Solo cuando esté verificado visualmente → commit, push, y reportar

**No hay excusas.** Si el preview muestra un error, el trabajo no está terminado.

---

## ⛔ COMMIT AND PUSH BEFORE ANY DESTRUCTIVE OPERATION

**NEVER run `git checkout -- <file>`, `git reset --hard`, or any command that discards local changes WITHOUT first committing everything.**

Before ANY git operation that could discard local work:
1. Run `git status` to check for uncommitted changes
2. If there are changes → `git add -A && git commit -m "wip: save before [operation]" && git push`
3. Only then proceed

No exceptions. Local changes = work that can be lost. Always commit first.

---

## Linear / external communication

**Never post to Linear, Slack, or any external tool without explicit approval from Miguel.**
Always draft first, wait for "sí" before publishing. No exceptions.

The approval must be an explicit "yes", "publícalo", "dale", "go ahead" or similar in a separate message AFTER seeing the draft. Text included in the same message as other content does NOT count as approval — even if it looks like the final text. Draft → wait → explicit yes → then publish.

---

## What NOT to do

- Don't use `green-500` as a button fill with white text — contrast fails
- Don't use `#ff6467` — that's shadcn's default red, not Waldo's coral
- Don't use `brand-*` in product UI — marketing only
- Don't use `display-*` typography inside product — UI track only
- Don't reference primitives directly from components — always via semantic tokens
- Don't add italic anywhere
- Don't add red anywhere in product
- Don't use `--destructive` color inside `.wdd` dropdown items — destructive color only applies in dialog confirmations, alerts, and destructive buttons. Never in dropdown menus.
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

---

## ⛔ Typography — Inter only, no exceptions

The DS has exactly **one UI font: Inter**.

Monospace (`JetBrains Mono`, `SF Mono`, etc.) is ONLY allowed for:
- Code snippets / demo code bars
- Keyboard shortcuts (⌘K, ⌃S)
- Hex color values in palette swatches
- Token names in documentation

**Never use monospace for:**
- Numbers, values, labels in components
- Slider values, counts, percentages
- Any regular UI text

If you find yourself adding `font-family: 'JetBrains Mono'` to a component — stop. Use Inter (default, no font-family needed).
