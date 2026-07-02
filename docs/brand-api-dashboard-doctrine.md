# Brand API Dashboard Doctrine

Design rules for Brand API prototypes (Promo Radar, Prospector, Moodtape, Poppi Health, and any future dashboard built on the Waldo Brand Intelligence API).

**Read this before generating any dashboard. It overrides general intuition but does NOT override `CLAUDE.md` — that file is always the floor.**

> **This doctrine holds principles and rules, never implementation.** It does not
> restate component CSS, pixel values, hex codes, or JS. Those drift from the real DS
> and cause bugs (a hardcoded height here once contradicted the thin-line rule and
> shipped a chunky bar). The authoritative implementation always lives in the source:
> - **Tokens / hex / RGB channels →** `docs/token-catalog.yaml` + `waldo-ds.css`
> - **Component & chart CSS/markup →** `index.html` under `#comp-*` / `#chart-page-*`
> - **Brand-API orphans (KPI Stat Card, Leaderboard Row, Depth Pill) →**
>   `waldo-labs/brand-api/components/index.html`
> - **Radii, type scale, spacing →** the DS scale in `waldo-ds.css`
>
> When this doctrine and the source disagree, **the source wins** — and the doctrine is
> the thing to fix.

---

## What these prototypes are

Vanilla HTML single-file dashboards. No framework, no build step. They link to `../_waldo/waldo-ds.css` and use Waldo DS tokens. They live in `waldo-labs/<prototype-name>/`. They are sales tools — the visual bar is high.

---

## Component discovery & reuse

**Before building ANY visual element, check `docs/component-index.md`** — the generated
flat list of every consumable in the DS. It has TWO sections — Components and Charts —
and you must scan both: data-viz (donuts, area/line/bar charts, horizontal bars,
sparklines, proportion bars, segmented bars) lives in the Charts section, and a
components-only glance leads to rebuilding viz that already ships.

Resolution order for every element: **core DS component → DS chart → doctrine custom
component → only then a new component.**

The Brand-API custom components below (KPI card, HBar row, leaderboard row, depth pill,
trend line / sparkline, proportion bar, theme pill) cover the dashboard-specific pieces
that the core DS does not. Where a DS or chart equivalent exists, **use it and read its
markup from `index.html` — do not re-derive it here.**

### When a component genuinely doesn't exist

If — after checking both index sections and this doctrine — an element truly has no
match, you may build it, but **using the DS itself as the reference, never from
scratch out of your own head**:

1. Open the closest sibling components in the DS showcase (`index.html` under
   `#comp-*` / `#chart-page-*`) and study how they are built — class naming, markup
   structure, token usage, density, type scale, the opacity convention.
2. Write the new component so it looks like it always belonged to that family.
   DS tokens only, on the DS radius / type / spacing scale.
3. **Report it as a DS gap** when you finish the prototype — list every component you
   had to create. Recurring gaps are candidates for promotion to the core DS or to
   this doctrine (file a Linear card).

---

## Token rules

### Surfaces
Use DS semantic tokens only — never the prototype legacy vars.

| Use this | Never this (legacy prototype vars) |
|----------|------------------------------------|
| `var(--background)` | `--bg` |
| `var(--card)` | `--surface` |
| `var(--secondary)` | `--surface-2` |
| `var(--accent)` | `--surface-3` |
| `var(--border)` | ad-hoc `--border` |
| `var(--muted-foreground)` | `--text-2`, `--text-3` |
| `var(--foreground)` | `--text` |

Exact hex/channel values for every token live in `docs/token-catalog.yaml` and
`waldo-ds.css` — check there, never memorize or hardcode a value.

### Data visualization — chart palette only
`--chart-1` through `--chart-12` are the **only** valid colors for bars, donut segments,
and line series. Never hardcode a hex in data-viz. Never use brand colors as chart
colors. The palette's values and names live in `token-catalog.yaml` — reference the
token, not the hex.

### Data-viz reads light — weight rules

Charts and gauges must read delicate, never heavy:
- **Thin strokes and thin bars.** Trend/spark lines are hairline; proportion bars,
  hbar tracks, ring arcs are thin relative to their length/diameter. When a value isn't
  pinned by the canonical component, err thinner — a thick data bar reads "burdo."
- Numbers and labels on charts are **regular weight (400)** — never bold. Large display
  numbers (KPI values, ring scores) may go up to 600, never beyond.
- Gridlines are subtle — a low-opacity foreground tint, never a distracting line.
- All numeric values use **tabular numerals** (`font-variant-numeric: tabular-nums`).

Thick + bold data ink is the single most common way a dashboard reads "burdo." When in
doubt, go lighter.

### Multi-brand color semantics

When a chart shows "you" (the client brand) against competitors and a category
reference, the encoding is fixed:
- **"You" / the client brand** → `var(--primary)` — the only saturated series
- **Competitors** → neutral grays (muted foreground ramp) — never chart-palette hues
- **Category median / benchmark** → a **dashed** neutral reference line, never solid
- Positive states / good trends → `var(--primary)`; negative trends / risk →
  `var(--warning)` (never `--destructive` for a metric — see Proportion Bar rules)

Only switch competitors to `--chart-N` hues when a legend requires distinguishing many
same-importance series — and then "you" still keeps `var(--primary)`.

### Accent tokens for status/emphasis

| Semantic | Token | Use |
|----------|-------|-----|
| Brand teal | `var(--primary)` | Focus rings, active states, links, positive metrics |
| Highlight | `var(--highlight)` | Depth pill, decorative emphasis, "mixed" — never urgency |
| Destructive | `var(--destructive)` | Irreversible actions, live/alert states — never a metric |
| Warning | `var(--warning)` | Negative sentiment / negative trends / risk |

### Opacity patterns — always use rgba(var(--*-rgb), alpha)

`waldo-ds.css` defines token variables as hex strings, not HSL. `hsl(var(--primary) / 0.12)`
is **invalid** and produces no output. Always use the `rgba()` form —
`rgba(var(--primary-rgb), 0.12)`.

- `--primary-rgb` and `--highlight-rgb` ship in `waldo-ds.css` — use without declaring.
- `--destructive-rgb` and `--warning-rgb` are **not** shipped — declare them in the
  prototype `:root`, with **channels that match the DS token** (copy the current values
  from `token-catalog.yaml`; do not invent channels — a wrong channel ships a wrong color).

### Typography
- UI text: **Inter** (default, no font-family declaration needed)
- Numbers, metric values, IDs: **Inter** — NOT JetBrains Mono
- Code snippets, promo codes, keyboard shortcuts, token documentation: JetBrains Mono only

---

## Layout

> **Reconstruction vs. new dashboard:** When rebuilding an existing prototype, preserve
> the source layout (rings, hero, custom tabs, etc.) — use DS tokens and components for
> every element but keep the visual structure. The grid-of-cards shell below is the
> default only for **new dashboards** built from scratch. In both cases, tokens,
> components, and rules apply without exception.

### Topbar

The topbar always uses the **Waldo SVG logo** — never text, never a placeholder square,
never the word "Waldo" in a box. The wordmark path:

```html
<svg width="70" height="18" viewBox="0 0 69.75 18" fill="none" style="color:var(--foreground)" xmlns="http://www.w3.org/2000/svg"><path d="M63.2676 0C67.6298 0 69.75 2.26338 69.75 7.52148V10.6641C69.75 15.7985 67.6298 18 63.2676 18C58.8935 17.9984 56.7862 15.7968 56.7861 10.6641V7.52148C56.7861 2.26354 58.8934 0.000133701 63.2676 0ZM37.0039 14.6191L41.9775 13.9814V17.6562H32.4795V0.335938H37.0039V14.6191ZM5.47168 7.7832C5.68287 9.47803 5.78297 10.7646 5.85742 12.6689H6.10645C6.21888 10.7887 6.35555 9.37851 6.53027 7.7832L7.39062 0.335938H11.4912L12.4258 7.7832C12.6248 9.37852 12.7498 10.7902 12.8379 12.6689H13.1113C13.2116 10.7887 13.3102 9.47652 13.4971 7.7832L14.3193 0.335938H18.707L15.9277 17.6543H10.5449L10.0469 13.4609C9.79769 11.4328 9.62264 9.51443 9.49805 7.43652H9.23633C9.09958 9.51443 8.91281 11.4072 8.67578 13.4609L8.20215 17.6543H2.90332L0 0.335938H4.54883L5.47168 7.7832ZM31.6318 17.6543H26.8457L26.4961 15.5762H22.3086L21.959 17.6543H17.6094L21.6221 0.335938H27.5312L31.6318 17.6543ZM49.2207 0.335938C53.5328 0.335938 55.5898 2.67494 55.5898 7.61035V10.4062C55.5897 15.3172 53.5327 17.6543 49.2207 17.6543H43.2373V0.335938H49.2207ZM63.2676 3.55078C61.984 3.55097 61.3614 4.50431 61.3613 6.48242V11.6904C61.3613 13.5465 61.9839 14.449 63.2676 14.4492C64.5515 14.4492 65.1748 13.5452 65.1748 11.6904V6.48242C65.1748 4.5026 64.5515 3.55078 63.2676 3.55078ZM47.7617 14.1035H48.9717C50.3558 14.1035 51.0156 13.3613 51.0156 11.79V6.19824C51.0155 4.62735 50.3542 3.88577 48.9717 3.88574H47.7617V14.1035ZM24.2764 4.36816C24.1761 5.76588 23.989 7.03991 23.7656 8.53711L22.9043 12.7627L25.834 12.3721L25.0742 8.5498C24.8493 7.04039 24.65 5.76599 24.5254 4.36816H24.2764Z" fill="currentColor"/></svg>
```

Layout: sticky, blurred, bottom border in `var(--border)`. Left = logo only (no product
name, no subtitle). Right = a small nav (Dashboard / Alerts / API coverage) and a muted
"Powered by Waldo API". Match the density of the DS topbar in `index.html`.

### Page header (below topbar, above grid)

A full-width header inside `.wrap`, above the card grid: product name (large, tight
tracking) + an optional one-line descriptor (muted). The right side may include
contextual actions **only when the specific design requires them** — never a fixed set.
The page title matches the prototype name; the subtitle is a short product descriptor.

⚠️ `waldo-ds.css` injects a `border-bottom` on `.page-header` — always kill it with
`border-bottom: none !important`.

### Page shell

**Required DS conflict overrides** — these are load-bearing fixes for `waldo-ds.css`
quirks, put them at the top of every prototype's `<style>` block verbatim:
```css
/* waldo-ds.css sets html,body{height:100%;overflow:hidden} — breaks scroll */
html, body { height: auto !important; overflow: visible !important; overflow-y: auto !important; }
/* waldo-ds.css sets body{display:flex!important} — collapses card widths */
body { display: block !important; }
/* waldo-ds.css sets svg{display:block} — collapses ring/icon SVGs inside flex containers */
svg { flex: none; min-height: fit-content; }
```

Beyond the overrides, known `waldo-ds.css` collisions to guard against (all bit real
prototypes): a bare `section { display:none }`, `.input { height:40px }`, and a border
injected via `[class*=card]`. If a generic class name goes wrong, suspect a DS
collision first.

**Grid rules:**
- Centered content column ~1184px wide, zero horizontal padding on the wrap.
- Rows stack vertically. **All columns in a row are equal width** (`flex: 1`) — never
  proportional (no 1.35fr + 1fr).
- All cards in a row are the **same height** (`align-items: stretch`).
- If a card's content is taller than the row → **scroll inside the card**, never push the
  row taller. Only lists and HBars scroll; SVG charts have fixed height and never scroll.
- Gap between rows ~24px, between columns ~16px.

### Card

Cards are distinguished by **background elevation** (`var(--card)` on `var(--background)`),
**never by a border** — kill any injected border. Radius, padding and gaps come from the
DS scale. Card header is always vertical: title (medium weight) + subtitle (regular,
muted), small gap — never a flex row.

---

## Custom dashboard components

These are specific to Brand API dashboards and have no core-DS equivalent. The rules
below define behavior and semantics. The implementation splits by where the canonical
source lives:

- **KPI Stat Card, Leaderboard Row, Depth Pill** are NOT in the DS showcase or
  `component-index.md`. Their canonical markup/CSS lives in
  **`waldo-labs/brand-api/components/index.html`** — copy classes verbatim from there.
- **HBar, Trend Line, Sparkline, Proportion Bar** ship as DS charts — read them in
  `index.html` under `#chart-page-*`.

If one of the orphans stabilizes, promote it to the core DS (`index.html`) with a
Linear card, then delete it from the reference file and point here instead.

### 1. KPI Stat Card
Canonical: `waldo-labs/brand-api/components/index.html`.
A compact summary metric: label, dominant value, a delta badge, and optional context line.
- Delta badge sits **top-right** — never inline below the value.
- The value is the dominant element — large, tight tracking, tabular numerals.
- **Delta classes are semantic (`.good` / `.bad` / `.flat`), not directional** — the arrow
  glyph carries direction, the class carries meaning. Map per dashboard:
  - **Brand Health:** up = `.good` (`--primary`); down = `.bad` (`--destructive`).
  - **Promo Radar:** inverted — more discounting = pressure, so up = `.bad`,
    down = relief = `.good`.
- Use `comp-segmented` from the DS for any time-range toggle — never custom buttons.

### 2. Horizontal Bar (HBar) row
Ranked magnitude comparison. **Monochromatic teal by default** — a thin track in
`var(--secondary)` with a `var(--primary)` fill.
- **Alpha-fill encoding:** fill opacity encodes magnitude — highest value fully opaque,
  lowest ~30% (`alpha = 0.30 + value/max × 0.70`). One hue, magnitude by opacity.
- Never use `--highlight` (yellow) for HBar fills — that's reserved for the Depth Pill.
- Never mix alpha-teal bars and `--chart-*` bars in the same chart. Multi-color only when
  a legend distinguishes distinct series.
- The DS ships a Horizontal Bar chart (`index.html #chart-page-hbar`) — read it there.

### 3. Leaderboard Row
Canonical: `waldo-labs/brand-api/components/index.html`.
Ranked list: muted rank number (structural, not the focus) + dominant name/meta + a
right-aligned trailing pill. Last row has no bottom divider. Use the DS `Badge`
(`.badge.badge-secondary`) for type tags and the Depth Pill for magnitude.

### 4. Depth Pill
Canonical: `waldo-labs/brand-api/components/index.html` — including the `depthAlpha()`
encoding formula, which IS the rule (alpha 0.30 at 10% depth → 1.0 at 60%+, clamped;
copy it verbatim, do not re-derive).
A badge whose **opacity encodes magnitude** (e.g. discount depth) on a fixed
`var(--highlight)` base: heavier value = more opaque text, fixed low-opacity background
(`rgba(var(--highlight-rgb), 0.10)`).
- Opacity encoding is intentional — never flatten all pills to one opacity.
- Use only for magnitude (discount depth or comparable), never for status.
- Never use `--chart-*` colors here.

### 5. SVG Trend Line + 5b. Sparkline
Multi-series (trend) or single-series embedded (sparkline) SVG line charts, no library.
- **Hairline strokes.** Trend lines thin; sparklines slightly thinner. Never thick.
- Area fill only under the primary series, very low opacity.
- **Dots hidden by default** — only on hover. Never always-visible dots.
- Direction color: rising `var(--primary)`, falling `var(--warning)` — never
  `--destructive` for a trend.
- Series: primary `var(--primary)`; additional series pick from `--chart-*` in order.
- Strokes via `style="stroke:…"` — SVG presentation attributes do not resolve CSS vars.
- Sparklines are **always embedded** (card, cell, row), never standalone; each scales to
  its own min/max. The DS ships both (`#chart-page-trend`, `#chart-page-sparkline`).

### 5c. Proportion Bar
Per-row 100% stacked bar showing tone composition across platforms/segments.
- Color encodes meaning, not chart palette: positive → `var(--primary)`, neutral →
  `var(--muted-foreground)`, negative → `var(--warning)`, mixed → `var(--highlight)`.
- **Negative is `--warning`, never `--destructive`** — a sentiment share is a metric, not
  an action.
- **The bar is a thin line** (data-viz reads light), a fully-rounded track in
  `var(--secondary)`, segments flush (no gaps), clipped to the pill.
- Segments always sum to 100%. Always render a legend. Row = fixed-width muted label +
  bar + trailing positive-share value (tabular, muted).
- Canonical: `index.html #chart-page-proportion` — read the thin height and markup there.

### 5d. Theme Pill
A topic chip colored by sentiment (same mapping as the Proportion Bar) with a frequency
count. A variant of the DS `Tag`.
- **One fixed text size for every pill** — volume is shown by the count, never by type size.
- Sentiment tint via `color-mix` (light fill + border, text in the full token color).
- Negative is `--warning`, never `--destructive`.

---

## Interior page patterns

### Page header (category / brand detail)
- Breadcrumb `< Dashboard` uses `var(--highlight)` — not muted, not primary.
- H1 brand name left-aligned; subtitle muted with a primary "view category" link.
- Status badge floated top-right: "Discounting now" = `var(--destructive)` + animated
  filled dot; "No active discount" = muted badge, no dot.

### Brand detail — promo cards
Full-width cards, one per active promo. Discount terms inside quotes are highlighted
inline with `var(--highlight)`. "Detected in ad copy" = secondary badge. Evidence blocks
sit on `var(--secondary)` inside the card.

### Timeline / Gantt (discount history)
Label left, solid `var(--primary)` bar for the period (no gradient, no opacity variation),
muted uppercase month labels below.

### Alerts page — form patterns
- Form section labels use `var(--primary)` (teal, not muted, not uppercase).
- Segment controls: pill options, active = filled dark, inactive = plain text.
- Primary CTA = large high-contrast pill, right-aligned.
- **Progressive disclosure:** show the initial fields (what to watch, target, condition,
  disabled CTA) first; reveal delivery fields and enable the CTA only after the first set
  is complete. Fields animate in — never jump.

---

## Interactive patterns

- **Drill-down side panel** is the standard "click for detail" surface — a right-slide
  panel over a dimming overlay, never a centered modal (modals are for forms). Header =
  eyebrow + title + close; body scrolls independently. Anything clickable as evidence
  (a mention, chart segment, ranked row, card) opens a drill with full detail + source.
  Close via ✕, overlay click, and `Esc` — all three. One drill open at a time.
- **Search / autocomplete:** input + dropdown as one unit; dropdown below the input;
  results grouped by type; small colored status dots for live/active state.
- **Segment controls (toggles):** pill options on `var(--secondary)`; active state tinted
  `var(--primary)`. Prefer the DS `comp-segmented`.
- **Platform favicon chips:** identify external sources with a small favicon from a
  favicon service (`https://www.google.com/s2/favicons?domain=<domain>&sz=64`), ~14–16px,
  small radius; degrade gracefully to a neutral dot on error — never a broken image.
  Favicons are the one sanctioned remote asset.
- **Toast:** fixed bottom-center, ~2.6s auto-dismiss, confirmations only — never errors.
- **Live badge:** low-opacity `var(--destructive)` tint + animated dot; only for genuinely
  real-time states.

---

## Demo data — deterministic, always

Prototypes run on synthetic data, and that data must be **identical on every reload**:
- Generate time-series with a **seeded PRNG** (e.g. mulberry32 with a fixed literal seed)
  — never `Math.random()`.
- Anchor "now" to a **fixed literal datetime** and compute every relative timestamp
  ("3d ago") from it — never `new Date()` / `Date.now()`.

A demo that changes numbers between reloads reads as broken in a sales context and makes
visual verification impossible.

---

## File structure

```
waldo-design-system/
  waldo-labs/
    brand-api/
      components/
        index.html        ← canonical Brand-API orphans (KPI, Leaderboard, Depth Pill)
    <prototype-name>/
      index.html          ← Justin's original
      index-ds.html       ← DS-applied version
  waldo-ds.css            ← shared DS shell, linked by all prototypes
  index.html              ← DS showcase — authoritative component & chart source
  docs/
    brand-api-dashboard-doctrine.md  ← this file (principles only)
    component-index.md               ← generated flat list of all consumables
    token-catalog.yaml               ← VALIDATOR owns — source of truth for all tokens
    usage-doctrine.yaml              ← Intelligence Layer owns — core DS components
```

Do not copy CSS between prototype files — always link to `../_waldo/waldo-ds.css`.

---

## Validation gate — detect.js before "done"

Running the validator is a **mandatory closing step**, not optional hygiene. A prototype
is not finished until detect.js reports clean:

```bash
node tools/detect.js waldo-labs/<prototype>/
```

An **explicit** `waldo-labs/` path is always scanned — no flag needed. (A broad scan like
`detect.js .` skips `waldo-labs/` to keep the commit guard fast; `--include-labs` forces
it there too.)

Fix every violation and re-run until clean **before** reporting the work or asking for
review. Then verify visually (preview tools) — detect.js catches token violations, not
layout breakage.

---

## Do not

- Do not hardcode hex, rgba, or pixel color values anywhere — tokens only.
- Do not restate DS values (hex, radii, type scale, component CSS) in a prototype or in
  this doctrine — reference the source (`index.html`, `waldo-ds.css`, `token-catalog.yaml`).
- Do not use `--bg`, `--surface-*`, `--text-*`, `--border-strong` — legacy prototype vars.
- Do not use JetBrains Mono for numeric metric values — Inter only.
- Do not use `--chart-*` colors in depth pills or single-metric bar charts — alpha system.
- Do not mix alpha-highlight bars and chart-palette bars in the same visualization.
- Do not use `--warning`/`--destructive` interchangeably: negative metric/trend = `--warning`;
  irreversible action / live-alert = `--destructive`.
- Do not add italic anywhere.
- Do not use brand colors (`--brand-*`) in product dashboards.
- Do not use text or a colored box in the topbar — always the Waldo SVG.
- Do not put the KPI delta inline below the value — badge, top-right.
- Do not render trend-line dots always-visible — hover only.
- Do not use custom buttons for time-range toggles — use `comp-segmented`.
- Do not use `--highlight` for HBar fills — HBars are always teal.
- Do not add a `border` to cards — elevation only.
- Do not let a separator line appear below the page header — kill the injected border.
- Do not hardcode actions in the page header — only what the design requires.
- Do not declare `html`/`body` with `height:100%` or `overflow:hidden` — breaks scroll.
- Do not omit the required DS conflict overrides.
- Do not declare `--chart-1..12` in your own `:root` — they ship in `waldo-ds.css`.
- Do not build a chart/component from scratch when the DS has it — read its markup in
  `index.html` and match it.
- Do not use `hsl(var(--token) / alpha)` — DS tokens are hex; use `rgba(var(--token-rgb), alpha)`.
