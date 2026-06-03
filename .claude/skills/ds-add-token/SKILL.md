---
name: ds-add-token
description: Add or update a token in the Waldo Design System keeping all layers in sync
argument-hint: "[token-name] [value]"
---

# DS Add Token

Añade o actualiza un token en el Waldo Design System manteniendo todas las capas sincronizadas.

**Lee esto antes de tocar nada:**

!`cat "/Users/miguelugalde/Desktop/waldo-design-system/CLAUDE.md"`

---

## Las 4 capas — TODAS deben actualizarse

```
figma/waldo.tokens.json   ← fuente de verdad absoluta (Tokens Studio)
       ↓
waldo-ui/src/globals.css  ← CSS vars (primitivos + semánticos + shadcn)
       ↓
waldo-ui/tailwind.config.ts ← clases utilitarias de Tailwind
       ↓
waldo-ui/src/components/ui/*.tsx ← componentes (usan tokens, nunca hex)
```

Si cambias una capa y no las demás → sistema desincronizado.

---

## Paso 1 — Verificar que el token no existe ya

```bash
# Busca en el JSON
cat "figma/waldo.tokens.json" | python3 -c "import json,sys; d=json.load(sys.stdin); print(json.dumps(d, indent=2))" | grep -i "<nombre>"

# Busca en globals.css
grep "<nombre>" waldo-ui/src/globals.css

# Busca en tailwind.config.ts  
grep "<nombre>" waldo-ui/tailwind.config.ts
```

Si ya existe en el JSON pero no en globals.css → solo agregar a globals.css y tailwind.
Si no existe en ningún lado → agregarlo en todas las capas en orden.

---

## Paso 2 — Agregar al JSON (si es nuevo)

`figma/waldo.tokens.json` tiene esta estructura de 4 colecciones:

```
primitives → colores base (zinc.950, green.500, coral.500…)
brand      → SOLO marketing (brand.green, brand.pink…) — nunca en producto
typography → fuentes, pesos, tamaños
semantic   → tokens de uso (surface.*, border.*, text.*, accent.*, shadow.*)
radius     → border radii (sm=4, md=6, lg=8, xl=12, 2xl=16, 2_5xl=20, 4xl=32, full=9999)
spacing    → spacing scale (1=4, 2=8, 3=12, 4=16… mapea 1:1 con Tailwind)
```

**Regla**: Primitivos nunca van directo en componentes. Siempre crear un token semántico que los referencie.

**Spacing y radius ya están completos** — no agregar nuevos sin revisar con Miguel. Son colecciones cerradas.

**Shadows** van en `semantic.shadow.*` — formato `boxShadow` type en el JSON.

Formato para primitivo nuevo:
```json
"green": {
  "800": {
    "value": "#265152",
    "type": "color"
  }
}
```

Formato para semántico nuevo (referencia al primitivo):
```json
"accent": {
  "warning": {
    "value": "{primitives.orange.600}",
    "type": "color"
  }
}
```

**No añadir nuevas colecciones top-level** — Tokens Studio crea una colección Figma por cada key top-level. Solo se permiten las 4 existentes.

---

## Paso 3 — Agregar a globals.css

Archivo: `waldo-ui/src/globals.css`

Tres secciones dentro de `:root {}`:

**1. Primitivo** (si es nuevo):
```css
/* ── Waldo primitives ── */
--green-800: 38 81 82;   /* #265152 */
```
Formato: `R G B` sin comas (para que Tailwind pueda aplicar opacidad con `/ <alpha>`).

**2. Semántico** (mapea primitivo a concepto):
```css
/* ── Waldo semantic extras ── */
--accent-warning: var(--orange-600);
```

**3. shadcn var** (si el componente shadcn lo necesita directamente):
```css
/* shadcn: destructive */
--destructive: var(--coral-500);
```

---

## Paso 4 — Agregar a tailwind.config.ts

Archivo: `waldo-ui/tailwind.config.ts`

Solo agregar cuando un componente necesita el token como clase utilitaria (`bg-warning`, `text-highlight`, etc.).

**Semánticos de acento** → entradas top-level:
```ts
warning: {
  DEFAULT: "rgb(var(--accent-warning) / <alpha-value>)",
},
highlight: {
  DEFAULT: "rgb(var(--accent-highlight) / <alpha-value>)",
},
```

**Colores de producto específicos** → bajo `waldo-green` (o similar):
```ts
"waldo-green": {
  800: "rgb(var(--green-800) / <alpha-value>)",
},
```

No usar el nombre `green` directamente — colisiona con la paleta de Tailwind.

---

## Paso 5 — Usar en componentes

**Regla absoluta: ningún componente usa hex ni rgba hardcodeados.**

```tsx
// ❌ NUNCA
className="bg-[#265152] text-[rgba(210,211,211,0.70)] border-[#32a9a9]"

// ✅ SIEMPRE
className="bg-waldo-green-800 text-foreground/70 border-primary"
```

Mapa de tokens → clases Tailwind:

| Concepto | Clase Tailwind |
|----------|---------------|
| App background | `bg-background` |
| Card/elevated | `bg-card` |
| Dropdown/popover | `bg-popover` |
| Input/sunken | `bg-muted` |
| Brand CTA fill | `bg-primary` |
| Brand CTA text | `text-primary-foreground` |
| Destructive | `bg-destructive` / `text-destructive` |
| Warning | `bg-warning` / `text-warning` |
| Highlight | `bg-highlight` / `text-highlight` |
| Text principal | `text-foreground` |
| Text secundario | `text-foreground/70` |
| Text terciario | `text-muted-foreground` |
| Border sutil | `border-foreground/12` |
| Border default | `border-foreground/20` |
| Border fuerte | `border-foreground/30` |
| Focus ring | `ring-ring` |
| Input hover/focus border | `border-waldo-green-800` |

Para opacidades usa el modificador `/`: `bg-primary/12`, `text-destructive/10`, etc.

---

## Paso 6 — Sincronizar Figma (si el JSON cambió)

Solo necesario si modificaste `figma/waldo.tokens.json`.

1. Abrir Tokens Studio en Figma
2. Verificar que los 4 sets están activos: `primitives`, `brand`, `typography`, `semantic`
3. Push → Options:
   - Variables: Color ✓ · String ✓ · Number ✓ · Boolean ✓
   - Styles: Typography ✓ (resto off)
   - Update existing: ✓
   - **Remove without connection: ❌ CRÍTICO — wipes cosas no en el JSON**
4. Confirmar → verificar que siguen siendo exactamente 4 colecciones

---

## Checklist antes de terminar

- [ ] Token existe en `figma/waldo.tokens.json`
- [ ] CSS var existe en `globals.css` (primitivo + semántico si aplica)
- [ ] Clase Tailwind existe en `tailwind.config.ts` (si el componente la necesita)
- [ ] Componente usa clase Tailwind o CSS var — **cero hex hardcodeados**
- [ ] `STATUS.md` actualizado si es un valor de referencia importante
- [ ] Si el JSON cambió → push a Figma via Tokens Studio

---

## Qué NO hacer

- No pegar hex de Figma directamente en componentes — siempre mapear al token
- No crear tokens `brand.*` para uso en producto — brand es solo marketing
- No referenciar primitivos directamente en componentes (`green.500`) — usar semánticos (`primary`, `accent-brand`)
- No añadir nuevas colecciones top-level al JSON sin planear la colección Figma
- No usar `text-green-500` de Tailwind — usar `text-primary` (mismo valor, semánticamente correcto)
