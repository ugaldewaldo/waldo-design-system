# Waldo — Design Brand Bundle

This is the single, portable source of truth for generating **on-brand Waldo UI and marketing** with an AI design tool (e.g. Claude Design). It distills Waldo's canonical theme — `packages/design-system/registry/waldo-theme/theme.css` — into tokens, rules, rationale, and a ready-to-paste agent prompt.

Upload **this file plus public brand assets only**. Do not link the private Waldo repository.

**Waldo is dark-first.** The product is a calm, data-dense brand-intelligence workspace. The default surface is near-black; teal is the one accent that carries the brand. There is no red, no blue, no pink, and no purple in product UI — those read as "generic dashboard" and are explicitly off-brand.

> **Keeping this current:** the token values below are copied verbatim from `theme.css`. A freshness test (`scripts/check-design-md.test.mjs`) fails CI if any token in the CSS Variables block drifts from the theme. When `theme.css` changes, re-copy the block.

---

## 1. Brand identity

- **Dark-first.** App background is `#171819` (near-black). Light mode exists but the brand lives in the dark.
- **One accent.** Teal/green `#32a9a9` is *the* Waldo color — focus rings, links, selected states, primary emphasis.
- **Calm and dense.** Professional, low-chroma, high information density. No decorative gradients or playful color in product surfaces.
- **Type:** Inter everywhere. No italics, anywhere.
- **Logo:** the Waldo wordmark (teal on dark). Use the official asset; never recolor it outside the brand palette.

---

## 2. Color system

### Dark mode (primary)

| Role | Token | Primitive | Hex | Use |
|---|---|---|---|---|
| App background | `--background` | zinc-950 | `#171819` | Page / app shell |
| Primary text | `--foreground` | zinc-200 | `#d2d3d3` | Body, headings |
| Elevated surface | `--card` | zinc-900 | `#202123` | Cards, panels |
| Popover surface | `--popover` / `--secondary` | zinc-750 | `#2d2f33` | Dropdowns, menus, selects, secondary buttons, tags |
| Sunken surface | `--muted` | zinc-800 | `#27282b` | Inputs, code blocks, sticky table headers, active nav |
| Hover/selected | `--accent` | zinc-600 | `#41454b` | Menu item hover/selected |
| Tertiary text | `--muted-foreground` | zinc-400 | `#8f9091` | Meta, captions |
| **Brand / primary** | `--primary` / `--ring` | green-500 | `#32a9a9` | Focus rings, links, selected, accents |
| Warning | `--warning` | orange-600 | `#c94e22` | Caution, non-blocking |
| Destructive | `--destructive` | coral-500 | `#de3a28` | Errors, destructive actions |
| Highlight | `--accent-highlight` | yellow-300 | `#f7d371` | Decorative / "Pro" — no urgency meaning |
| Default border | `--border` | zinc-200 @ 12% | — | Inputs, separators, card borders |
| Input border | `--input` | zinc-200 @ 20% | — | Default border strength |

Light mode is fully defined in §13 (secondary; product is dark-first).

### Contrast rules (do not break these)

- **Default button = green-700 `#2a6c6d` + white text** (6.06:1 AA). This is the button fill, *not* `--primary`.
- **Never white on green-500** `#32a9a9` (2.84:1 — fails AA). As a *fill*, green-500 takes **dark** text `#171819` (6.25:1).
- **Never dark text on green-700** (2.93:1 — fails). Text color is married to the fill.
- **Input focus = a single `green-800 #265152` border**, never a box-shadow ring.

### Brand palette — MARKETING ONLY

These richer colors are for marketing surfaces and **must never appear in product UI**:

| Name | Hex |
|---|---|
| brand-green | `#63dbdb` (500), `#1b8c8c` (700) |
| brand-yellow | `#fac034` |
| brand-pink | `#d40a60` |
| brand-purple | `#813aef` |
| brand-chrome | `#bdd8d8` |

> Marketing-only colors are hand-maintained and live outside `theme.css`, so they are **not** in the CSS Variables block below. Treat them as a separate marketing layer.

---

## 3. Typography

**Inter is the only font. No italic anywhere.** Two tracks:

- **Text track** (`text-*`) — all product + UI + body. Tracking `-0.02em`.
- **Display track** (`text-display-*`) — marketing heroes and big section headings **only**, never in product. Tracking `-0.04em`.

### Text track (UI)

| Token | Size | Line height |
|---|---|---|
| `text-xs` | 12px | 16px |
| `text-sm` | 14px | 20px |
| `text-base` | 16px | 24px |
| `text-lg` | 18px | 28px |
| `text-xl` | 20px | 28px |
| `text-2xl` | 24px | 32px |
| `text-3xl` | 30px | 36px |
| `text-4xl` | 36px | 40px |

### Display track (marketing only)

| Token | Size | Line height |
|---|---|---|
| `text-display-xs` | 24px | 32px |
| `text-display-sm` | 32px | 40px |
| `text-display-md` | 40px | 48px |
| `text-display-lg` | 56px | 64px |
| `text-display-xl` | 72px | 80px |
| `text-display-2xl` | 96px | 100px |

### Weights & headings

- Weights: Regular 400, Medium 500, Semi Bold 600, Bold 700.
- **Buttons are `font-medium` (500), never semibold.**
- Heading map: `h1` text-4xl/700, `h2` text-3xl/600, `h3` text-2xl/600, `h4` text-xl/600, `h5` text-lg/600, `h6` text-base/600.
- **Mono** (`--font-mono`) is allowed only for: code snippets, keyboard shortcuts, hex swatches, and token names in docs. Never for UI text or numbers.

---

## 4. Spacing & layout

- **Spacing scale = Tailwind's 4px scale.** Use utilities (`px-4`, `gap-3`), never arbitrary `px-[16px]` or inline padding. (1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px, 10=40px, 12=48px, 16=64px…)
- **Dialog widths:** sm 560px (confirmations, simple forms), md 720px (share/invite, upload, forms+lists), lg 960px (report builder, complex forms).
- Generous whitespace; let dense data breathe.

---

## 5. Radius

A closed set — always the token, never `rounded-[Xpx]`:

| Token | px | Use |
|---|---|---|
| `radius-sm` | 4 | square avatars |
| `radius-md` (base `--radius`) | 6 | cards, menu items, tables |
| `radius-lg` | 8 | — |
| `radius-xl` | 12 | — |
| `radius-2xl` | 16 | copy-link container |
| `radius-2-5xl` | 20 | dropdowns, selects, command palettes |
| `radius-4xl` | 32 | file input |
| `rounded-full` | 9999 | **buttons, inputs, badges, tags, switches, pills (and circular checkboxes)** |

---

## 6. Shadows

Dark-first; never hardcode shadow values.

- `shadow-surface` — cards, panels, tooltips.
- `shadow-popover` — dropdowns, selects, menus, command palettes.
- `shadow-dialog` — modals, dialogs.

---

## 7. Motion

Subtle and fast (150–200ms, ease-out). Tokens: `animate-fade-in`, `animate-scale-in`, `animate-slide-in-top`, `animate-slide-in-bottom`, `animate-accordion-down/up`, `animate-shimmer` (loading), `animate-blink` (text cursor). Full keyframes are in the CSS Variables block.

---

## 8. Component stylings

Key patterns (cribbed from the component usage doctrine):

- **Button** — pill (`rounded-full`), `font-medium`. Default = green-700 fill + white. Variants: `outline` (border, no fill), `ghost` (no border/fill), `destructive` (soft coral 10% fill+border), `destructive-solid` (solid coral, confirmation dialogs only), `white` (over images/color). One default button per view.
- **Input / Field** — pill (`rounded-full`), `bg-muted`. Hover/focus = single `green-800` border, **no ring**. Field labels are teal (`text-primary`).
- **Badge** — static status (Active/Paused/Error/Draft). Variants: default/active/success (teal tint), warning (orange tint), highlight (yellow tint), destructive (coral). Single word or short phrase.
- **Tag** — like a badge but user-removable (`onRemove` adds an X). `bg-popover`, pill.
- **Card** — `rounded-xl`, `bg-card`, `shadow-surface`, subtle border. Header / content / footer.
- **Dropdown / Select** — `bg-popover` (zinc-750), `radius-2-5xl` (20px), `shadow-popover`. Never put destructive color inside dropdown items.
- **Tabs vs SegmentedControl** — Tabs = navigation between sections; SegmentedControl = mode toggle on the same data. Never mix them.
- **Alert vs Toast** — Alert = persistent, in-content; Toast = ephemeral, corner, auto-dismiss.

---

## 9. Do's and don'ts

**Do**

- Lead dark; teal is the only brand accent.
- Use semantic tokens (`bg-background`, `text-foreground`, `text-primary`) — never raw palette classes (`bg-zinc-800`, `text-green-500`).
- Pills for buttons/inputs/badges; `font-medium` buttons.
- Inter only.

**Don't**

- **No red, blue, pink, or purple in product UI.** Destructive is **coral `#de3a28`** — "not red, not pink, not `#ff6467`."
- No italics, anywhere.
- No `font-semibold` on buttons.
- No arbitrary hex, `px-[Xpx]`, or `rounded-[Xpx]` — token classes only.
- No `display-*` type in product UI (marketing heroes only).
- No brand-* / marketing colors in product UI.

### AI model-default traps

Unconstrained models emit these defaults from shadcn/Tailwind training data. Replace every one:

| Model default | Looks like | Use instead |
|---|---|---|
| `#09090b` / `#0a0a0a` | shadcn/neutral-950 bg | `--background #171819` |
| `#18181b` | shadcn zinc-900 card | `--card #202123` |
| `#27272a` | shadcn zinc-800 muted | `--muted #27282b` |
| `#fafafa` / `#f4f4f5` | shadcn light text | `--foreground #d2d3d3` |
| `#a1a1aa` / `#71717a` | Tailwind zinc-400/500 | `--muted-foreground #8f9091` |
| `#ff6467` / `#ef4444` / `#dc2626` | red | `--destructive #de3a28` |
| `#22c55e` / `#10b981` | green/emerald | `--primary #32a9a9` |
| `#3b82f6` | blue | `--primary #32a9a9` (Waldo has no blue) |
| `#8b5cf6` / `#a855f7` | violet/purple | `--primary #32a9a9` (no purple in product) |
| `#f59e0b` | amber | `--warning #c94e22` |
| `#eab308` / `#f5c453` | yellow/gold | `--accent-highlight #f7d371` |

---

## 10. Responsive behavior

- Tailwind breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
- **Sheet → Drawer** on touch/mobile; **Sidebar → off-canvas** drawer on mobile.
- Scale display type down a step or two on small viewports; keep body at `text-base` (16px).
- Dialogs cap at their size max-width and fall back to near-full-width with margins on small screens.

---

## 11. Agent-prompt guide

Paste this as system/brand context when generating Waldo UI or marketing:

> **You are designing for Waldo, a dark-first brand-intelligence product.**
> - **Surfaces:** background `#171819`, cards `#202123`, popovers/menus `#2d2f33`, inputs `#27282b`. Primary text `#d2d3d3`, muted `#8f9091`.
> - **Accent:** teal `#32a9a9` for links, focus rings, selected states. It is the only brand color in product UI.
> - **Buttons:** pill-shaped, `font-medium`. Default fill green-700 `#2a6c6d` with **white** text. Never white text on `#32a9a9`.
> - **Destructive = coral `#de3a28`.** **Never** use red, blue, pink, or purple in product UI.
> - **Type:** Inter only, no italics. UI uses the `text-*` scale (tracking -0.02em); marketing heroes use `text-display-*` (-0.04em).
> - **Shape:** buttons/inputs/badges are `rounded-full`; cards/menus use 6–20px radius tokens. Never arbitrary radii.
> - **Spacing:** Tailwind 4px scale via utilities, never inline styles.
> - Use semantic tokens, not raw palette values.

**On-brand checklist:** dark background? · teal the only accent? · no red/blue/pink/purple? · destructive is coral? · Inter, no italics? · buttons green-700 + white, font-medium, pill? · semantic tokens only?

---

## 12. Assets

- **Font:** Inter, loaded via Google Fonts (`@import` in the CSS Variables block).
- **Logo:** Waldo wordmark — teal on dark. Use the official asset; do not recolor or stretch.

---

## 13. CSS Variables

The complete canonical theme, copied verbatim from `packages/design-system/registry/waldo-theme/theme.css`. This is the machine-checked block — the freshness test asserts every token here matches the theme.

<!-- design-tokens:start -->
```css
/*
  WALDO Design System — Shadcn/ui CSS Variables
  ─────────────────────────────────────────────
  Nomenclature: Shadcn/Tailwind convention
    zinc   = Waldo neutral scale (dark grays)
    green  = Brand primary (formerly teal) (#32a9a9)
    yellow = Warning / accent (formerly amber)
    orange = Accent orange
    pink   = (pink removed from product DS)
    coral  = Destructive (red-orange, NOT blood-red)
    

  ANCHOR = real Figma value
  DERIVED = interpolated to fill scale gaps
  GAP FILL = new family added for system completeness
*/

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');


/* ══════════════════════════════════════════════════════
   PRIMITIVES — full 50→950 scales
   ══════════════════════════════════════════════════════ */
:root {

  /* ── zinc (Waldo dark neutral) ── */
  --zinc-50:   #f8f8f9;   /* DERIVED */
  --zinc-100:  #f0f0f2;   /* DERIVED */
  --zinc-200:  #d2d3d3;   /* ANCHOR — text50High */
  --zinc-300:  #b4b5b6;   /* DERIVED */
  --zinc-400:  #8f9091;   /* ANCHOR — text100Regular */
  --zinc-500:  #636465;   /* ANCHOR — text200Low */
  --zinc-600:  #41454b;   /* ANCHOR — fill500Highest */
  --zinc-700:  #323539;   /* ANCHOR — fill600Menu */
  --zinc-750:  #2d2f33;   /* ANCHOR — fill700Regular (custom step) */
  --zinc-800:  #27282b;   /* ANCHOR — fill800Low */
  --zinc-850:  #242528;   /* ANCHOR — bg850High (custom step) */
  --zinc-900:  #202123;   /* ANCHOR — bg900Regular */
  --zinc-950:  #171819;   /* ANCHOR — bg950Low */

  /* ── green (brand primary — formerly teal) ── */
  --green-50:   #edfafa;   /* DERIVED */
  --green-100:  #d5f3f3;   /* DERIVED */
  --green-200:  #a8e6e6;   /* DERIVED */
  --green-300:  #6dcece;   /* DERIVED */
  --green-400:  #4dbcbc;   /* DERIVED */
  --green-500:  #32a9a9;   /* ANCHOR — primary brand */
  --green-600:  #2c797a;   /* ANCHOR */
  --green-700:  #2a6c6d;   /* ANCHOR */
  --green-800:  #265152;   /* ANCHOR */
  --green-900:  #223133;   /* ANCHOR */
  --green-950:  #111e1f;   /* DERIVED */

  /* ── yellow (formerly amber) ── */
  --yellow-50:   #fffbeb;  /* DERIVED */
  --yellow-100:  #fef3c7;  /* DERIVED */
  --yellow-200:  #fde68a;  /* DERIVED */
  --yellow-300:  #f7d371;  /* ANCHOR */
  --yellow-400:  #f0c040;  /* DERIVED */
  --yellow-500:  #e5b020;  /* DERIVED */
  --yellow-600:  #d6ac32;  /* ANCHOR */
  --yellow-700:  #b48a00;  /* ANCHOR */
  --yellow-800:  #946f00;  /* ANCHOR */
  --yellow-900:  #713d00;  /* DERIVED */
  --yellow-950:  #3d2100;  /* DERIVED */

  /* ── orange ── */
  --orange-50:   #fff8f5; /* DERIVED */
  --orange-100:  #ffeed5; /* DERIVED */
  --orange-200:  #ffd4b0; /* DERIVED */
  --orange-300:  #cd917b; /* ANCHOR — muted warm */
  --orange-400:  #a95d41; /* ANCHOR — terracotta */
  --orange-500:  #e76638; /* ANCHOR — bright orange */
  --orange-600:  #c94e22; /* DERIVED */
  --orange-700:  #a83a18; /* DERIVED */
  --orange-800:  #86280f; /* DERIVED */
  --orange-900:  #5e1a08; /* DERIVED */
  --orange-950:  #380e03; /* DERIVED */


  /* red / blue removed from DS. Destructive now references orange.
     If you need them later, re-add as primitives. */
}


/* ══════════════════════════════════════════════════════
   ALPHA PRIMITIVES — transparent variants
   Why: semi-transparent colors adapt to any background
   automatically, so the same token works on zinc-900,
   zinc-850 or zinc-800 without defining separate values.
   Naming: --{color}-{step}-{opacity%}
   ══════════════════════════════════════════════════════ */
:root {

  /* ── zinc-200 alpha — text & borders on dark ── */
  /* Use for text/icons that sit on variable-depth backgrounds */
  --zinc-200-5:  rgba(210, 211, 211, 0.05);  /* fillOpacity800Low   — very subtle fill */
  --zinc-200-10: rgba(210, 211, 211, 0.10);  /* fillOpacity700Reg   — subtle fill */
  --zinc-200-12: rgba(210, 211, 211, 0.12);  /* border / input bg   — current --border */
  --zinc-200-20: rgba(210, 211, 211, 0.20);  /* line700Low          — low contrast border */
  --zinc-200-30: rgba(210, 211, 211, 0.30);  /* line400High         — medium border */
  --zinc-200-50: rgba(210, 211, 211, 0.50);  /* text50Disabled      — disabled text */
  --zinc-200-70: rgba(210, 211, 211, 0.70);  /* text50Med           — secondary text */

  /* ── zinc-950 alpha — dark overlays & surface fills ── */
  /* Use for frosted/overlay surfaces that sit on lighter panels */
  --zinc-950-40: rgba(23, 24, 25, 0.40);     /* fillOpacityWidgetBg      — widget bg */
  --zinc-950-50: rgba(23, 24, 25, 0.50);     /* fillOpacityWidgetBgHover — hover state */
  --zinc-950-80: rgba(23, 24, 25, 0.80);     /* scrim / modal backdrop  */

  /* ── green alpha — brand tints ── */
  /* Use for highlighted states, tags, focus rings, active indicators */
  --green-500-10: rgba(50, 169, 169, 0.10);   /* brand tag bg */
  --green-500-15: rgba(50, 169, 169, 0.15);   /* brand tag hover */
  --green-500-20: rgba(50, 169, 169, 0.20);   /* brand subtle border */
  --green-500-25: rgba(50, 169, 169, 0.25);   /* brand ring / focus glow */

  /* ── coral alpha — destructive states ── */
  --coral-500-10: rgba(222, 58, 40, 0.10); /* destructive bg subtle */
  --coral-500-15: rgba(222, 58, 40, 0.15); /* destructive bg hover */
  --coral-500-20: rgba(222, 58, 40, 0.20); /* destructive ring soft */
  --coral-500-40: rgba(222, 58, 40, 0.40); /* destructive ring strong */

  /* ── orange alpha — warning states ── */
  --orange-500-10: rgba(231, 102, 56, 0.10); /* warning bg subtle */
  --orange-500-15: rgba(231, 102, 56, 0.15); /* warning bg hover */
  --orange-500-20: rgba(231, 102, 56, 0.20); /* warning ring soft */

  /* ── yellow alpha — highlight states ── */
  --yellow-300-10: rgba(247, 211, 113, 0.10); /* highlight bg subtle */
  --yellow-300-20: rgba(247, 211, 113, 0.20); /* highlight bg hover */
}


/* ══════════════════════════════════════════════════════
   SHADCN SEMANTIC TOKENS
   ══════════════════════════════════════════════════════ */

@layer base {
  :root {
    /* ── LIGHT MODE ── */
    --background:             0 0% 100%;
    --foreground:             220 4% 9%;            /* zinc-950 */

    --card:                   0 0% 98%;
    --card-foreground:        220 4% 9%;

    --popover:                0 0% 100%;
    --popover-foreground:     220 4% 9%;

    --primary:                180 54% 43%;           /* green-500 #32a9a9 */
    --primary-foreground:     0 0% 100%;

    --secondary:              220 9% 94%;            /* zinc-100 */
    --secondary-foreground:   220 4% 9%;

    --muted:                  220 9% 94%;
    --muted-foreground:       210 1% 39%;            /* zinc-500 */

    --accent:                 180 70% 96%;           /* green-50 */
    --accent-foreground:      180 54% 30%;           /* green-700 */

    --destructive:            6 77% 41%;              /* coral-600 #ba2818 */
    --destructive-foreground: 0 0% 100%;

    --warning:                16 71% 46%;            /* orange-600 #c94e22 */
    --warning-foreground:     0 0% 100%;

    --border:                 220 9% 88%;
    --input:                  220 9% 88%;
    --ring:                   180 54% 43%;           /* green-500 */

    --radius: 0.375rem;

    --chart-1: 174 66% 50%;    /* Cyan Teal */
    --chart-2: 210 17% 60%;    /* Slate */
    --chart-3: 16 85% 73%;     /* Salmon */
    --chart-4: 353 81% 69%;    /* Rose */
    --chart-5: 253 59% 71%;    /* Lavender */

    --sidebar-background:           220 9% 96%;
    --sidebar-foreground:           220 4% 9%;
    --sidebar-primary:              180 54% 43%;
    --sidebar-primary-foreground:   0 0% 100%;
    --sidebar-accent:               180 70% 94%;
    --sidebar-accent-foreground:    180 54% 30%;
    --sidebar-border:               220 9% 88%;
    --sidebar-ring:                 180 54% 43%;
  }

  .dark {
    /* ── DARK MODE — WALDO ── */
    --background:             220 4% 9%;             /* zinc-950  #171819 */
    --foreground:             180 1% 82%;            /* zinc-200  #d2d3d3 */

    --card:                   220 4% 13%;            /* zinc-900  #202123 */
    --card-foreground:        180 1% 82%;

    --popover:                220 6% 19%;            /* zinc-750  #2d2f33 */
    --popover-foreground:     180 1% 82%;

    --primary:                180 54% 43%;           /* green-500  #32a9a9 */
    --primary-foreground:     0 0% 100%;             /* white — brand green is same in both modes */

    --secondary:              220 6% 19%;            /* zinc-750  #2d2f33 */
    --secondary-foreground:   180 1% 82%;

    --muted:                  225 5% 16%;            /* zinc-800  #27282b */
    --muted-foreground:       210 1% 56%;            /* zinc-400  #8f9091 */

    --accent:                 216 7% 27%;            /* zinc-600  #41454b */
    --accent-foreground:      180 1% 82%;

    --destructive:            6 73% 51%;              /* coral-500 #de3a28 */
    --destructive-foreground: 180 1% 82%;

    --warning:                16 71% 46%;            /* orange-600 #c94e22 */
    --warning-foreground:     0 0% 100%;

    --border:                 180 1% 82% / 0.12;     /* zinc-200  12% */
    --input:                  180 1% 82% / 0.20;     /* zinc-200  20% */
    --ring:                   180 54% 43%;           /* green-500  #32a9a9 */

    --chart-1: 174 66% 50%;    /* Cyan Teal */
    --chart-2: 210 17% 60%;    /* Slate */
    --chart-3: 16 85% 73%;     /* Salmon */
    --chart-4: 353 81% 69%;    /* Rose */
    --chart-5: 253 59% 71%;    /* Lavender */

    --sidebar-background:           225 5% 15%;     /* zinc-850  #242528 */
    --sidebar-foreground:           180 1% 82%;
    --sidebar-primary:              180 54% 43%;
    --sidebar-primary-foreground:   0 0% 100%;      /* white */
    --sidebar-accent:               214 7% 21%;     /* zinc-700  #323539 */
    --sidebar-accent-foreground:    180 1% 82%;
    --sidebar-border:               180 1% 82% / 0.12;
    --sidebar-ring:                 180 54% 43%;
  }
}


/* ══════════════════════════════════════════════════════
   TYPOGRAPHY — Inter, two-track scale (Linear-style)

   Track A — text-*         UI + body + product (Tailwind standard)
   Track B — text-display-* Marketing heros + section headings

   Naming uses Tailwind v4 compound syntax: each font-size carries its paired
   --line-height and --letter-spacing on the same token via `--`. That way a
   single utility (`text-display-md`) applies size + line-height + tracking
   automatically when these vars live inside an @theme block.

   Tracking convention:
     • text-*         uses -0.02em (-2%)  — bundled per size
     • text-display-* uses -0.04em (-4%)  — bundled per size
     • --tracking-normal/tight/tighter remain for arbitrary overrides

   ─── For Tailwind v4 users (recommended) ────────────────────────
   Wrap the typography vars below in `@theme { ... }` so utilities
   `text-xs`, `text-display-md`, `font-mono`, etc. auto-generate.

   ══════════════════════════════════════════════════════ */
:root {
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;

  /* ── TEXT TRACK — Tailwind standard sizes, compound syntax ── */
  --text-xs:                  0.75rem;     /* 12px */
  --text-xs--line-height:     1rem;        /* 16px */
  --text-xs--letter-spacing: -0.02em;

  --text-sm:                  0.875rem;    /* 14px */
  --text-sm--line-height:     1.25rem;     /* 20px */
  --text-sm--letter-spacing: -0.02em;

  --text-base:                  1rem;      /* 16px — default body */
  --text-base--line-height:     1.5rem;    /* 24px */
  --text-base--letter-spacing: -0.02em;

  --text-lg:                  1.125rem;    /* 18px */
  --text-lg--line-height:     1.75rem;     /* 28px */
  --text-lg--letter-spacing: -0.02em;

  --text-xl:                  1.25rem;     /* 20px */
  --text-xl--line-height:     1.75rem;     /* 28px */
  --text-xl--letter-spacing: -0.02em;

  --text-2xl:                  1.5rem;     /* 24px */
  --text-2xl--line-height:     2rem;       /* 32px */
  --text-2xl--letter-spacing: -0.02em;

  --text-3xl:                  1.875rem;   /* 30px */
  --text-3xl--line-height:     2.25rem;    /* 36px */
  --text-3xl--letter-spacing: -0.02em;

  --text-4xl:                  2.25rem;    /* 36px — top of text-* track */
  --text-4xl--line-height:     2.5rem;     /* 40px */
  --text-4xl--letter-spacing: -0.02em;

  /* For sizes ≥ 40px use text-display-* below. Tailwind's stock text-5xl/6xl/7xl
     utilities still work via Tailwind defaults if anyone needs them, but they
     are not declared as Waldo tokens. */

  /* ── DISPLAY TRACK — marketing only, compound syntax ── */
  --text-display-xs:                  1.5rem;     /* 24px — soft card title (display tracking) */
  --text-display-xs--line-height:     2rem;       /* 32px */
  --text-display-xs--letter-spacing: -0.04em;

  --text-display-sm:                  2rem;       /* 32px — section heading */
  --text-display-sm--line-height:     2.5rem;     /* 40px */
  --text-display-sm--letter-spacing: -0.04em;

  --text-display-md:                  2.5rem;     /* 40px — default hero */
  --text-display-md--line-height:     3rem;       /* 48px */
  --text-display-md--letter-spacing: -0.04em;

  --text-display-lg:                  3.5rem;     /* 56px — big hero (Home / Pricing) */
  --text-display-lg--line-height:     4rem;       /* 64px */
  --text-display-lg--letter-spacing: -0.04em;

  --text-display-xl:                  4.5rem;     /* 72px — wow hero / closing CTA */
  --text-display-xl--line-height:     5rem;       /* 80px */
  --text-display-xl--letter-spacing: -0.04em;

  --text-display-2xl:                  6rem;       /* 96px — landing wow hero (Vercel/Linear scale max) */
  --text-display-2xl--line-height:     6.25rem;    /* 100px */
  --text-display-2xl--letter-spacing: -0.04em;

  /* ── Unitless line-height utilities — for `leading-tight` etc. ── */
  --leading-none:    1;
  --leading-tight:   1.25;
  --leading-snug:    1.375;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  --leading-loose:   2;

  /* ── Letter spacing — independent utilities (Tailwind tracking-*) ── */
  --tracking-normal:   0em;
  --tracking-tight:   -0.02em;   /* -2% — matches text-* compound default    */
  --tracking-tighter: -0.04em;   /* -4% — matches text-display-* compound    */
}

html {
  font-family: var(--font-sans);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: var(--text-base);
  line-height: var(--text-base--line-height);
  letter-spacing: var(--text-base--letter-spacing);
  font-weight: 400;
}

/* Product / app headings — text-* track, compound vars handle size + LH + tracking */
h1 { font-size: var(--text-4xl);  line-height: var(--text-4xl--line-height);  letter-spacing: var(--text-4xl--letter-spacing);  font-weight: 700; }
h2 { font-size: var(--text-3xl);  line-height: var(--text-3xl--line-height);  letter-spacing: var(--text-3xl--letter-spacing);  font-weight: 600; }
h3 { font-size: var(--text-2xl);  line-height: var(--text-2xl--line-height);  letter-spacing: var(--text-2xl--letter-spacing);  font-weight: 600; }
h4 { font-size: var(--text-xl);   line-height: var(--text-xl--line-height);   letter-spacing: var(--text-xl--letter-spacing);   font-weight: 600; }
h5 { font-size: var(--text-lg);   line-height: var(--text-lg--line-height);   letter-spacing: var(--text-lg--letter-spacing);   font-weight: 600; }
h6 { font-size: var(--text-base); line-height: var(--text-base--line-height); letter-spacing: var(--text-base--letter-spacing); font-weight: 600; }

/* Marketing display helpers — text-display-* track.
   Class names match the Tailwind utility names so JSX works the same whether
   Tailwind auto-generates them (v4 @theme) or Steve registers them in v3 config.
   In raw HTML (no Tailwind) these helpers still produce the right output. */
.text-display-xs { font-size: var(--text-display-xs); line-height: var(--text-display-xs--line-height); letter-spacing: var(--text-display-xs--letter-spacing); }
.text-display-sm { font-size: var(--text-display-sm); line-height: var(--text-display-sm--line-height); letter-spacing: var(--text-display-sm--letter-spacing); }
.text-display-md { font-size: var(--text-display-md); line-height: var(--text-display-md--line-height); letter-spacing: var(--text-display-md--letter-spacing); }
.text-display-lg { font-size: var(--text-display-lg); line-height: var(--text-display-lg--line-height); letter-spacing: var(--text-display-lg--letter-spacing); }
.text-display-xl  { font-size: var(--text-display-xl);  line-height: var(--text-display-xl--line-height);  letter-spacing: var(--text-display-xl--letter-spacing); }
.text-display-2xl { font-size: var(--text-display-2xl); line-height: var(--text-display-2xl--line-height); letter-spacing: var(--text-display-2xl--letter-spacing); }

/* Mono — for code, tags, technical labels */
code, kbd, samp, pre { font-family: var(--font-mono); }


/* ══════════════════════════════════════════════════════
   TAILWIND v4 @theme block
   Registers Waldo primitives + design tokens as Tailwind
   utilities so bg-zinc-800, shadow-popover, animate-blink
   etc. resolve to Waldo values in v4 consumers.

   v3 users: mirror these in tailwind.config.js →
   theme.extend.colors / boxShadow / borderRadius / keyframes
   ══════════════════════════════════════════════════════ */
@theme {
  /* ── Color scale ── */
  --color-zinc-50:  rgb(248 248 249);
  --color-zinc-100: rgb(240 240 242);
  --color-zinc-200: rgb(210 211 211);
  --color-zinc-300: rgb(180 181 182);
  --color-zinc-400: rgb(143 144 145);
  --color-zinc-500: rgb(99 100 101);
  --color-zinc-600: rgb(65 69 75);
  --color-zinc-700: rgb(50 53 57);
  --color-zinc-750: rgb(45 47 51);
  --color-zinc-800: rgb(39 40 43);
  --color-zinc-850: rgb(36 37 40);
  --color-zinc-900: rgb(32 33 35);
  --color-zinc-950: rgb(23 24 25);

  --color-green-400: rgb(77 188 188);
  --color-green-500: rgb(50 169 169);
  --color-green-600: rgb(44 121 122);
  --color-green-700: rgb(42 108 109);
  --color-green-800: rgb(38 81 82);

  --color-coral-500:  rgb(222 58 40);
  --color-orange-500: rgb(231 102 56);
  --color-orange-600: rgb(201 78 34);
  --color-yellow-300: rgb(247 211 113);

  /* ── Border radius ── */
  --radius-sm:    calc(var(--radius) - 2px);   /* 4px  */
  --radius-md:    var(--radius);               /* 6px  */
  --radius-lg:    calc(var(--radius) + 2px);   /* 8px  */
  --radius-xl:    calc(var(--radius) + 6px);   /* 12px */
  --radius-2xl:   calc(var(--radius) + 10px);  /* 16px */
  --radius-2-5xl: calc(var(--radius) + 14px);  /* 20px — dropdowns */
  --radius-4xl:   calc(var(--radius) + 26px);  /* 32px — file input */

  /* ── Shadows ── */
  --shadow-popover: 0px 4px 6px -1px rgba(0,0,0,0.35), 0px 2px 4px -2px rgba(0,0,0,0.25), 0px -2px 3px rgba(0,0,0,0.15);
  --shadow-surface: 0px 1px 3px rgba(0,0,0,0.30), 0px 2px 4px -1px rgba(0,0,0,0.20);
  --shadow-dialog:  0px 20px 40px -10px rgba(0,0,0,0.60), 0px 8px 20px rgba(0,0,0,0.30);

  /* ── Animations ── */
  --animate-blink:           blink 1s ease-in-out infinite;
  --animate-scale-in:        scale-in 0.15s ease-out forwards;
  --animate-shimmer:         shimmer 2s linear infinite;
  --animate-accordion-down:  accordion-down 0.2s ease-out;
  --animate-accordion-up:    accordion-up 0.2s ease-out;
  --animate-fade-in:         fade-in 0.15s ease-out;
  --animate-slide-in-top:    slide-in-from-top 0.15s ease-out;
  --animate-slide-in-bottom: slide-in-from-bottom 0.15s ease-out;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes scale-in {
  0%   { transform: scale(0);   opacity: 0; }
  70%  { transform: scale(1.2); }
  100% { transform: scale(1);   opacity: 1; }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes accordion-down {
  from { height: 0; }
  to   { height: var(--radix-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to   { height: 0; }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slide-in-from-top {
  from { transform: translateY(-4px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes slide-in-from-bottom {
  from { transform: translateY(4px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
```
<!-- design-tokens:end -->
