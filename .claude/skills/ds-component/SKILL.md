---
name: ds-component
description: Implementar o corregir un componente del Waldo Design System desde Figma
argument-hint: "[component-name]"
---

# DS Component

Implementa o corrige un componente del Waldo Design System con valores exactos de Figma.

**Lee esto antes de tocar nada:**

!`cat "CLAUDE.md"`
!`cat "STATUS.md"`
!`cat "waldo-ui/CLAUDE.md"`

---

## Flujo obligatorio

### 1. Obtener valores de Figma

Antes de escribir una sola línea de código, obtener del nodo de Figma:
- Background color
- Border color + width
- Border radius (exacto en px)
- Padding (top/right/bottom/left)
- Height si es fijo
- Typography (size / weight / line-height / tracking)
- Estados: hover, focus, active, disabled, checked, error

Usar `mcp__figma__get_design_context` o `mcp__figma__get_screenshot` con el nodo ID.

### 2. Mapear valores a tokens

Cada valor de Figma tiene un token equivalente. **Nunca usar el hex directamente.**

Proceso:
1. Obtener hex de Figma (ej: `#32a9a9`)
2. Buscar en `figma/waldo.tokens.json` a qué primitivo corresponde
3. Buscar a qué token semántico apunta ese primitivo
4. Usar la clase Tailwind que mapea ese token semántico

Ejemplo:
```
Figma fill: #32a9a9
→ primitives.green.500
→ semantic.accent.brand (o --primary en shadcn)
→ bg-primary ✓
```

Si el hex no coincide con ningún token → **preguntar antes de hardcodear**.

### 3. Estructura del componente

```tsx
// waldo-ui/src/components/ui/[nombre].tsx

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Comentario corto: valores clave de Figma (nodo ID, medidas no obvias)
// Ej: // Shape → pill · Height → 36px · Figma node 83838:481260

const componentVariants = cva(
  // clases base (siempre presentes)
  "...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ...",
        // ...
      },
      size: {
        sm: "h-7 px-3",
        default: "h-9 px-4",
        // ...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 4. Tokens disponibles — referencia rápida

**Superficies:**
- `bg-background` — zinc-950, app bg
- `bg-card` — zinc-900, panels/cards
- `bg-popover` — zinc-750, dropdowns/menus
- `bg-muted` — zinc-800, inputs/sunken
- `bg-secondary` — zinc-750, secondary button bg
- `bg-accent` — zinc-600, hover state en menús

**Colores interactivos:**
- `bg-primary` / `text-primary` — green-500, CTA brand
- `text-primary-foreground` — texto sobre bg-primary
- `bg-destructive` / `text-destructive` — coral-500
- `bg-warning` / `text-warning` — orange-600
- `bg-highlight` / `text-highlight` — yellow-300

**Texto:**
- `text-foreground` — zinc-200, texto principal
- `text-foreground/70` — texto secundario
- `text-muted-foreground` — zinc-400, texto terciario
- `text-foreground/50` — placeholder

**Bordes:**
- `border-foreground/[0.12]` — sutil (border-subtle)
- `border-foreground/20` — default
- `border-foreground/30` — fuerte
- `border-waldo-green-800` — input hover/focus
- `border-primary` — focus brand
- `border-destructive` — error

**Opacidades** con `/`: `bg-primary/12`, `bg-destructive/10`, `text-foreground/70`

**Radios — usar clases token, NUNCA `rounded-[Xpx]`:**
| Clase | px | Usar para |
|-------|----|-----------|
| `rounded-sm` | 4px | avatar square |
| `rounded` / `rounded-md` | 6px | cards, menu items, tabla |
| `rounded-lg` | 8px | — |
| `rounded-xl` | 12px | — |
| `rounded-2xl` | 16px | — |
| `rounded-2-5xl` | 20px | dropdowns, selects, command |
| `rounded-4xl` | 32px | file input |
| `rounded-full` | 9999px | buttons, inputs, badges, tags, checkbox, switch |

**Shadows — usar clases token, NUNCA `shadow-[...]` hardcodeado:**
| Clase | Usar para |
|-------|-----------|
| `shadow-popover` | dropdowns, selects, menus, command palette |
| `shadow-surface` | cards, panels, tooltips |
| `shadow-dialog` | modals, dialogs |
| `shadow-sm` | elementos pequeños elevados (switch thumb) |

**Spacing — el scale de Tailwind ES el token:**
Los tokens de spacing (1=4px, 2=8px, 3=12px…) mapean 1:1 con Tailwind.
Usar `px-4 py-2 gap-3` directamente — NUNCA `px-[16px]` o `style="padding:16px"`.

| Token | px | Tailwind |
|-------|----|----------|
| spacing.1 | 4px | `p-1`, `gap-1` |
| spacing.2 | 8px | `p-2`, `gap-2` |
| spacing.3 | 12px | `p-3`, `gap-3` |
| spacing.4 | 16px | `p-4`, `gap-4` |
| spacing.5 | 20px | `p-5`, `gap-5` |
| spacing.6 | 24px | `p-6`, `gap-6` |
| spacing.8 | 32px | `p-8`, `gap-8` |
| spacing.10 | 40px | `p-10` |
| spacing.1_5 | 6px | `p-1.5` |
| spacing.2_5 | 10px | `p-2.5` |

**Typography:**
- `text-sm font-medium tracking-[-0.02em]` — UI standard (buttons, labels)
- `text-sm font-normal tracking-[-0.02em]` — body/input
- `text-xs tracking-[-0.01em]` — badges, meta

### 5. Non-negotiable rules

```
rounded-full      → buttons, inputs, tags, badges, checkboxes, switches
rounded-[20px]    → dropdowns, selects, command palettes
border-foreground/[0.12] → input default (NO rounded border)
bg-primary        → CTA fill único por vista
NO font-semibold en buttons → font-medium siempre
NO box-shadow ring en inputs → solo border
NO italic en ningún sitio
NO colores brand.* en producto → son marketing

--destructive     → ONLY for irreversible/destructive actions (delete, purge, no-undo)
                    NEVER for trends, metrics, live badges, or recoverable errors
--warning         → negative trends, competitor growth, caution states (recoverable)
--primary         → positive trends, CTAs, good metric direction
```

---

## ⛔ GOLDEN RULE

### NEVER touch an atomic component without Miguel's explicit approval

Atomic components = every `.tsx` in `waldo-ui/src/components/ui/` + every canonical CSS class in `index.html`.

If a demo or recipe looks wrong → fix the demo/recipe, NOT the component.
The demo adapts to the component. Never the reverse.

Only valid reason to open a component file: Miguel said "fix this component" or "change this component."

---

## ⛔ ABSOLUTE PROHIBITIONS

### 0. Only foundational DS tokens

The ONLY allowed CSS variables are DS semantic tokens:
- foreground, background, card, muted, popover, secondary, accent
- primary, destructive, warning, highlight, border, muted-foreground, radius

NEVER use legacy vars (they don't exist in the DS):
- --txt-high, --txt-med, --txt-reg, --txt-low
- --fill-low, --fill-reg, --fill-menu, --fill-high
- --bg, --bg-card, --bg-high, --elevated, --sunken, --line-low, --green

SVG colors — presentation attributes do NOT resolve CSS vars. Use style attribute:
  Wrong:   stroke="var(--primary)"
  Correct: style="stroke:var(--primary)"
  Also OK: stroke="currentColor" with parent's color:var(--primary)

### 1. Zero hardcoded styles

**Never write hex, rgba, or numeric color values directly in code.**

```tsx
// ❌ NUNCA — aunque el valor sea "correcto"
className="bg-[#2d2f33] text-[#d2d3d3] border-[rgba(210,211,211,0.12)]"
style={{ color: '#32a9a9', background: 'rgba(50,169,169,0.12)' }}

// ✅ SIEMPRE
className="bg-popover text-foreground border-foreground/[0.12]"
```

If no token exists → run `/ds-add-token` first. Never hardcode as a "temporary fix".

### 2. No crear estilos nuevos sin autorización

**Forbidden to add CSS not in the token system.**

Esto incluye:
- Clases CSS nuevas en `index.html` que usen colores inventados
- Variables CSS nuevas (`--mi-color-nuevo`) sin pasar por `/ds-add-token`
- Valores de `style=""` inline con hex/rgba
- Colores de Tailwind no mapeados (`bg-teal-500`, `text-red-400`, `bg-zinc-800` en lugar de `bg-muted`)

If you need a color that doesn't exist → **ask Miguel before inventing it.**

### 3. Usar componentes existentes, no recrearlos en HTML

**Antes de escribir HTML para algo visual, verificar si existe un componente en `waldo-ui/src/components/ui/`.**

Componentes disponibles y cuándo usarlos:

| Necesitas mostrar... | Usa |
|----------------------|-----|
| Estado / etiqueta informativa | `Badge` con variant correcto |
| Fila de lista | `ListItem` + `ListView` |
| Divisor | `Separator` |
| Toggle on/off | `Switch` |
| Opción binaria | `Checkbox` |
| Texto de estado con color | `Badge variant="active|destructive|warning|highlight"` |
| Menú contextual | `DropdownMenu` |
| Campo de texto | `Input` + `Field` |
| Opción de selección | `Select` |
| Pastilla removible | `Tag` |

**Critical example — table with status:**
```html
<!-- ❌ NUNCA inventar estilos de estado -->
<td><span style="background:rgba(50,169,169,0.12);color:#32a9a9;border-radius:4px;padding:2px 8px">Active</span></td>

<!-- ✅ SIEMPRE usar el componente Badge -->
<td><Badge variant="active" size="sm">Active</Badge></td>
```

En `index.html` (que usa HTML vanilla), usar las clases CSS del sistema:
```html
<!-- ✅ index.html — usar clases .badge-* ya definidas -->
<td><span class="badge badge-active badge-sm">Active</span></td>
```

---

### 6. Update index.html ⛔ REQUIRED

**The component is NOT done until index.html is updated.**

Después de implementar el componente en `.tsx`:
- Añadir o actualizar la sección del componente en el tab "Components"
- Mostrar todos los variants y estados (hover, focus, disabled, error)
- En las demos usar **las clases CSS del sistema** (`badge-active`, `var(--green)`, etc.) — NO inventar estilos nuevos
- Si el componente tiene interacción (toggle, input), hacerlo funcional con JS inline

### 7. Update STATUS.md

En la sección "Component progress":
- Mover el componente de "In progress" o "Not started" a "✅ Done — reviewed against Figma"
- Actualizar "Next session — start here" con el siguiente componente

### 8. Pre-completion checklist

- [ ] Valores obtenidos de Figma (no inventados)
- [ ] Cada valor mapeado a token — cero hex hardcodeados
- [ ] Todos los estados implementados (hover, focus, disabled, error si aplica)
- [ ] Demo en `index.html` actualizada
- [ ] `STATUS.md` actualizado
- [ ] Si se necesitó un token nuevo → se ejecutó `/ds-add-token` primero
- [ ] Si se añadió un variant nuevo o regla de uso → actualizar `docs/usage-doctrine.yaml`

---

## Si un valor de Figma no tiene token

No hardcodear. El proceso correcto:

1. Identificar si es un valor que debería existir (un nuevo step de color, un radio nuevo)
2. Ejecutar `/ds-add-token` para agregarlo en todas las capas
3. Luego usar el token nuevo en el componente

Si el valor es un one-off que no tiene sentido como token (ej: un shadow muy específico de un componente), se puede usar un valor arbitrario de Tailwind con comentario explicando por qué no es token.

---

## ⛔ English only — no exceptions

All content in the Design System must be in English:
- Section titles, descriptions, demo labels
- Code comments
- Variant names, prop names, state names
- Example/placeholder content in demos

Not a single word in Spanish. Ever.

---

## Fallback — cuando algo no está documentado

Si un patrón, comportamiento, o valor no está en este DS ni en Figma, **usar Linear como referencia canónica**. Waldo y Linear comparten el mismo ADN (dark-first, tool-aesthetic, zinc, Inter).

Orden de decisión:
1. ¿Está en Waldo DS / Figma? → usar eso
2. ¿Cómo lo hace Linear? → replicar ese patrón con tokens de Waldo
3. ¿Cómo lo hace Radix UI Themes? → especialmente para accesibilidad y estados de foco
4. Ninguno cubre el caso → **pregunta a Miguel**

Nunca inventar comportamientos, espaciados, o jerarquías visuales sin respaldo en uno de estos tres.

---

## Dropdown item with inline actions (···)

Composition pattern — not a variant. Use when items represent entities with individual actions.

```tsx
<DropdownMenuItem className="justify-between group">
  Brand strategy
  <Button
    variant="ghost"
    size="icon-sm"
    className="opacity-0 group-hover:opacity-100"
    onClick={(e) => {
      e.stopPropagation() // prevent triggering item action
      openContextMenu()
    }}
  >
    <MoreHorizontal className="h-3 w-3" />
  </Button>
</DropdownMenuItem>
```

Rules:
- Always `e.stopPropagation()` on the ··· button click
- Visibility via `group` + `group-hover:opacity-100` — no JS
- The ··· opens a nested DropdownMenu, not an alert/modal
