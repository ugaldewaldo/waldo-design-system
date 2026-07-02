# WALDO Design System

Living reference for the Waldo design system — typography scale, brand colors, and design tokens.

🔗 **Live site:** https://ugaldewaldo.github.io/waldo-design-system/

## Pages

- **[index.html](index.html)** — Living reference. 5 tabs: Typography, Colors (primitives + alpha), Brand Colors, Semantic Tokens, Migration. The page most people visit.
- **[waldo-design-system.html](waldo-design-system.html)** — Original full system with extra Components and Migration sections.
- **[waldo-design-system-migration.html](waldo-design-system-migration.html)** — Standalone migration guide (old → new equivalences).

## Design tokens

| File | Purpose |
|---|---|
| `waldo-tokens.json` | Single source of truth — all primitives, alpha, semantic (Tokens Studio format) |
| `waldo-typography-tokens.json` | Typography only — for importing into Tokens Studio Figma plugin |
| `waldo-brand-colors-tokens.json` | Brand colors only (green / yellow / pink / chrome / purple — marketing palette) |
| `waldo-colors-tokens.json` | All primitive color scales (zinc / teal / amber / orange / pink / red / blue + alpha) |
| `waldo-shadcn-theme.css` | CSS variables + Tailwind v4 compound syntax — for product UI integration |

## Typography model — two-track scale (Linear-style)

- **`text-*`** track: UI, body, product surfaces. Tailwind standard 12 → 36 px. Tracking `-0.02em`.
- **`text-display-*`** track: Marketing heros + section headings. Custom scale 24 → 96 px. Tracking `-0.04em`.

## How to consume

### Website (Tailwind)
Wrap the CSS variables in `@theme { ... }` (Tailwind v4) so utilities auto-generate — e.g. `<h1 class="text-display-md">`.

For Tailwind v3, mirror in `tailwind.config.js`.

### Product UI (shadcn)
Import `waldo-shadcn-theme.css` in your shadcn theme. Semantic tokens (`--primary`, `--background`, etc.) wire to Waldo's anchored colors.

### Figma
- Variables and Text Styles are synced via the Tokens Studio plugin from the JSON files above.
- Live library: **🧰 WALDO 4 - DESIGN.SYS**

