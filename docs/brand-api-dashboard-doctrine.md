# Brand API Prototypes Doctrine

Design rules for Brand API prototypes (Promo Radar, Prospector, Moodtape, Poppi Health, and any future dashboard built on the Waldo Brand Intelligence API).

**Read this before generating any dashboard. It overrides general intuition but does NOT override `CLAUDE.md` — that file is always the floor.**

> **This doctrine holds principles and rules, never implementation.** It does not
> restate component CSS, pixel values, hex codes, or JS. Those drift from the real DS
> and cause bugs (a hardcoded height here once contradicted the thin-line rule and
> shipped a chunky bar). The authoritative implementation always lives in the source:
> - **Tokens / hex / RGB channels →** `docs/token-catalog.yaml` + `waldo-ds.css`
> - **Component & chart CSS/markup (core + Brand API) →** `index.html` under
>   `#comp-*` / `#chart-page-*`
> - **Prototype-reachable tab-switching JS →** `waldo-labs/brand-api/components/index.html`
> - **Radii, type scale, spacing →** the DS scale in `waldo-ds.css`
>
> When this doctrine and the source disagree, **the source wins** — and the doctrine is
> the thing to fix.

---

## Aesthetic thesis — the north

A Waldo dashboard is a quiet instrument for an operator who lives inside it. It earns trust by receding: the interface is the frame, the data is the subject. Every rule below derives from this — when a rule doesn't cover your case, resolve it toward this.

1. **Restraint is the default.** The most common way a dashboard fails is by trying too hard — thick ink, bold everything, decoration standing in for hierarchy. We call that "burdo." Quiet is not empty; quiet is confident. When in doubt, go lighter, thinner, fewer.
2. **Dark, dense, tool-first.** These are instruments for professionals, not marketing pages. High information density on zinc surfaces, Inter throughout, no ornament. We share Linear's DNA on purpose: the product should feel fast, sharp, and built for someone who returns to it daily.
3. **Structure through elevation and space — never lines.** Hierarchy comes from surface steps (background → card → muted → secondary), spacing, and type weight. A border is an admission that the layout didn't separate on its own. The shell is borderless.
4. **Data reads light.** The chart is the point, so the chart whispers — hairline strokes, regular-weight numbers, tabular figures, subtle gridlines. Saturated color is a scarce resource, spent only on what matters most (you, the client brand). Everything else is neutral.
5. **One system, reused — never reinvented.** Consistency beats cleverness. Nothing is built that the DS already ships; nothing is styled off-token. A prototype that looks like it always belonged to the family beats a clever one-off.
6. **Craft is the product.** These are sales tools — the visual bar is the pitch. Determinism is part of the craft: seeded data, verified paint, identical on every reload. A demo that flickers or drifts reads as broken, no matter how good the idea.

---

## What these prototypes are

Vanilla HTML single-file dashboards. No framework, no build step. They link the DS via `<link rel="stylesheet" href="../../waldo-ds.css">` (the repo-root file — there is no vendored copy inside `waldo-labs/`) and use Waldo DS tokens. They live in `waldo-labs/<prototype-name>/`. They are sales tools — the visual bar is high.

---

## Calibration — gold standard & slop

Each row is the thesis made testable. Study the shipped prototypes in `waldo-labs/` (Poppi Health, Promo Radar, Prospector) as gold-standard references — real work beats mockups. If your output matches the Slop column, stop and fix it before going further.

| Dimension | Gold | Slop ("burdo") |
|-----------|------|----------------|
| Density & restraint | High-density zinc, one saturated accent, quiet confidence | Padded boxes, every metric in its own bordered card, decoration doing hierarchy's job |
| Data-viz weight | Hairline strokes, regular-weight tabular numbers, subtle gridlines | Thick bold bars, chunky rings, always-on dots |
| Chart color | Teal only on "you"; competitors neutral gray; benchmark dashed | Rainbow `--chart-*` on same-importance series; brand colors as data |
| Negative encoding | Falling metric or trend = `--warning` | `--destructive` used for a metric — destructive is an action verdict, not data |
| Structure | Zones separate by elevation + space; borderless shell | `border-bottom` on topbar, `border-right` on sidebar, `<hr>` between sections |
| App header | One line: wordmark + name inline, muted text nav | Stacked brand lockup with tagline; search, pills or buttons in the header |
| Card surfaces | Neutral card; status color lives in pills and labels | Card background tinted `--primary` / `--warning` / `--highlight` |
| Reuse | Looks like it always belonged to the DS family | Clever off-token one-off that reinvents a shipped component |
| Determinism | Seeded data, identical every reload, verified paint | `Math.random()` / `new Date()`, flickering demo, invisible zero-size bars |

---

## Reference gallery

Gold-standard references to study before building — real shipped work is the bar.

- [POV AMP](waldo-labs/PROTOTYPES/pov-amp/Test1/index.html) — app
- [Prospector](waldo-labs/PROTOTYPES/prospector/index.html) — App
- [Reception](waldo-labs/PROTOTYPES/reception/index.html)
- [Seedit](waldo-labs/PROTOTYPES/seddit/index.html)
- [Brand health](waldo-labs/PROTOTYPES/poppi-health/index.html)
- [Moodtape](waldo-labs/PROTOTYPES/moodtape/index.html) — music-mood dashboard prototype

---

## Component discovery & reuse

**Before building ANY visual element, check the component index** — the generated,
authoritative flat list of every consumable in the DS. It ships in two forms, same
content: `docs/component-index.md` (read this) and `docs/component-index.json` (the
machine-readable form an agent or the `/new-prototype` scaffold consumes — each entry
carries `id`, `name`, `selector`, `category`, and `use_when`/`dont_use_when`). It has
THREE sections — Components, **Brand API
components**, and Charts — and you must scan all three: data-viz (donuts, area/line/bar
charts, horizontal bars, sparklines, proportion bars, segmented bars) lives in the Charts
section, and dashboard-specific patterns (KPI Stat Card, Comment Card, Article Card,
Leaderboard Row, Score Ring, Depth Pill…) live in the Brand API section. A
components-only glance leads to rebuilding things that already ship — that exact failure
once produced a duplicate "Mention Card" while Comment Card already existed.

Resolution order for every element: **core DS component → Brand API component → DS
chart → only then a new component.**

**The task brief is never an authority on what exists in the DS.** A brief describes
the design (structure, data, interactions) — it does not know the DS inventory. If a
brief claims an element "is custom" or "has no component", treat that as a hypothesis
and run the same resolution order anyway; the index + grep verdict wins over the brief.
(A brief once declared score rings "custom" the day after Score Ring shipped — the
agent obeyed the brief and reinvented it.)

The Brand-API custom components below cover the dashboard-specific pieces that the core
DS does not; the full inventory lives in the index's Brand API section, and this doctrine
only defines the semantics that markup can't express. Where an equivalent exists, **use
it and read its markup from `index.html` — do not re-derive it here.**

When copying from a showcase demo: **copy the component classes, never the demo's inline
`style=` scaffolding.** The showcase has a layout-only `style=` exemption that prototypes
do NOT have — dragging those attributes into a prototype is a violation.

### When a component genuinely doesn't exist

If — after checking all three index sections and this doctrine — an element truly has
no match, **grep `index.html` for the concept's keywords first** (e.g. "comment",
"article", "quote", "ring"): a hit means the component exists and the index missed it —
consume the component and report the index gap to VALIDATOR. Only when the grep also
comes up empty may you build it, and then **using the DS itself as the reference, never
from scratch out of your own head**:

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

**Negative encoding — one rule for every component:** a **datum that worsens**
(a falling sparkline, a negative sentiment share, a risk metric) is `var(--warning)`;
a **verdict about state or action** (a KPI delta judged "bad", an alert, an
irreversible action) is `var(--destructive)`. Data = warning · verdict = destructive.
Apply this consistently — do not re-decide it per component.

### Opacity patterns — always use hsl(var(--token) / alpha)

The theme (`waldo-shadcn-theme.css`) defines tokens as **HSL triplets**, and `waldo-ds.css`
consumes them with `hsl(var(--token))`. Solid = `hsl(var(--primary))`; with opacity use the
native slash form — `hsl(var(--primary) / 0.12)`.

**The old `rgba(var(--x-rgb), a)` convention is retired** — there are no `-rgb` companion
tokens anymore. Never declare `-rgb` vars in a prototype `:root`. If a color token you need
is missing from the theme, that's a change request to VALIDATOR, not a local declaration.

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

### App Header

Every prototype has an app header — **with or without a sidebar**. A sidebar is
workspace navigation, additional to the header, never a replacement for it.
Canonical frames: Figma BRAND-API `281-423` (header), `281-445` (search row),
`281-31` (full page).

The header is **one line with exactly two groups — nothing else**:

- **A — identity (left):** the product name, normally preceded by the **Waldo wordmark
  SVG**. The logo is optional; the name normally isn't. Logo and name sit **inline on
  one baseline** — never stacked. **No subtitle, tagline, or descriptor under or beside
  the logo** — a stacked brand lockup in the chrome is a hard violation (the single most
  common agent mistake).
- **B — navigation (right):** plain text links, muted, active = `var(--foreground)`.
  Text links only — no buttons, no pills.

**Prohibited inside the header:** search inputs, status/integration pills, badges,
buttons, "Powered by" lines, or any third group. Utility state (integration status,
credits, sync state) lives in the sidebar panel, Settings, or contextual surfaces —
never in the header.

**Search** never shares the header line with navigation. It goes on a **second line
below the header, right-aligned**; that line may double as a toolbar — filters, range
switchers, and other context controls may sit on its left side. **Exception:** when the
header has no navigation (B is empty), search may take the right slot of the header
line itself.

The search input itself always uses the canonical `.app-search` shell (360px, ships in
`waldo-ds.css`) — never a custom search container or an ad-hoc width.

The toolbar line follows the grid's **row rhythm: ~24px above and ~24px below,
symmetric** — never tucked tight against the section above or below it.

When the Waldo mark appears it is always the **SVG wordmark** — never text, never a
placeholder square, never the word "Waldo" in a box. The wordmark path:

```html
<svg width="70" height="18" viewBox="0 0 69.75 18" fill="none" style="color:var(--foreground)" xmlns="http://www.w3.org/2000/svg"><path d="M63.2676 0C67.6298 0 69.75 2.26338 69.75 7.52148V10.6641C69.75 15.7985 67.6298 18 63.2676 18C58.8935 17.9984 56.7862 15.7968 56.7861 10.6641V7.52148C56.7861 2.26354 58.8934 0.000133701 63.2676 0ZM37.0039 14.6191L41.9775 13.9814V17.6562H32.4795V0.335938H37.0039V14.6191ZM5.47168 7.7832C5.68287 9.47803 5.78297 10.7646 5.85742 12.6689H6.10645C6.21888 10.7887 6.35555 9.37851 6.53027 7.7832L7.39062 0.335938H11.4912L12.4258 7.7832C12.6248 9.37852 12.7498 10.7902 12.8379 12.6689H13.1113C13.2116 10.7887 13.3102 9.47652 13.4971 7.7832L14.3193 0.335938H18.707L15.9277 17.6543H10.5449L10.0469 13.4609C9.79769 11.4328 9.62264 9.51443 9.49805 7.43652H9.23633C9.09958 9.51443 8.91281 11.4072 8.67578 13.4609L8.20215 17.6543H2.90332L0 0.335938H4.54883L5.47168 7.7832ZM31.6318 17.6543H26.8457L26.4961 15.5762H22.3086L21.959 17.6543H17.6094L21.6221 0.335938H27.5312L31.6318 17.6543ZM49.2207 0.335938C53.5328 0.335938 55.5898 2.67494 55.5898 7.61035V10.4062C55.5897 15.3172 53.5327 17.6543 49.2207 17.6543H43.2373V0.335938H49.2207ZM63.2676 3.55078C61.984 3.55097 61.3614 4.50431 61.3613 6.48242V11.6904C61.3613 13.5465 61.9839 14.449 63.2676 14.4492C64.5515 14.4492 65.1748 13.5452 65.1748 11.6904V6.48242C65.1748 4.5026 64.5515 3.55078 63.2676 3.55078ZM47.7617 14.1035H48.9717C50.3558 14.1035 51.0156 13.3613 51.0156 11.79V6.19824C51.0155 4.62735 50.3542 3.88577 48.9717 3.88574H47.7617V14.1035ZM24.2764 4.36816C24.1761 5.76588 23.989 7.03991 23.7656 8.53711L22.9043 12.7627L25.834 12.3721L25.0742 8.5498C24.8493 7.04039 24.65 5.76599 24.5254 4.36816H24.2764Z" fill="currentColor"/></svg>
```

Chrome: sticky, blurred, **no bottom border** (see Borderless shell below — the blur +
translucent background marks the sticky layer). Match the density of the canonical
frame, not the DS showcase topbar.

### Borderless shell — no structural lines

Zones separate by **surface elevation and spacing, never by divider lines** — the card
rule ("elevation, never a border") extended to the whole shell.

- **No horizontal lines, sidebar or not.** The topbar carries no `border-bottom` in
  either shell (wrap-only or sidebar) — the sticky layer reads via blur + translucent
  background alone. No `border-top` on footers, and no rule between page sections (use
  spacing + a muted section label instead of a `<hr>`/divider).
- **No vertical line on the sidebar.** In a sidebar app shell, the content column
  separates from the sidebar by surface, never a `border-right`.
- **One integrated navigation panel.** Identity/workspace controls (agency chip, account
  switcher) and the nav items live in a **single** `var(--popover)` surface — not stacked
  separate boxes. The chip is the panel header: transparent, hover-lightens to
  `var(--muted)`; the active nav item also uses `var(--muted)`.
- **Exception — content rows inside a card.** Row separators inside a scrolling list
  (List Item, Alert List Row, key/value meta) are DS-native content structure, not shell
  chrome, and stay. The rule governs shell/page chrome, not list internals.

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
/* waldo-ds.css sets html,body{height:100%;overflow:hidden} — breaks scroll.
   Scroll override goes on html ONLY: any overflow other than visible on body
   silently kills position:sticky (the sticky topbar scrolls away). */
html { height: auto !important; overflow: visible !important; overflow-y: auto !important; }
body { height: auto !important; overflow: visible !important; }
/* waldo-ds.css sets body{display:flex!important} — collapses card widths */
body { display: block !important; }
/* waldo-ds.css sets svg{display:block} — collapses ring/icon SVGs inside flex containers */
svg { flex: none; min-height: fit-content; }
```

Beyond the overrides, known `waldo-ds.css` collisions to guard against (all bit real
prototypes): a bare `section { display:none }`, `.input { height:40px }`, and a border
injected via `[class*=card]`. If a generic class name goes wrong, suspect a DS
collision first. Corollary: **never name a prototype class or variant after a DS atom**
(`.input`, `.badge`, `.tag`, bare `.output`…) — use a prefixed/state name
(`.is-input`, `.track-input`) so DS rules can't land on it.

**Grid rules:**
- Centered content column ~1184px wide, zero horizontal padding on the wrap.
- Rows stack vertically. **All columns in a row are equal width** (`flex: 1`) — never
  proportional (no 1.35fr + 1fr).
- All cards in a row are the **same height** (`align-items: stretch`).
- If a card's content is taller than the row → **scroll inside the card**, never push the
  row taller. Only lists and HBars scroll; SVG charts have fixed height and never scroll.
- **List height cap (standalone cards):** a list card never grows the page unbounded. In
  a full-width card (no row sibling to set the height), cap the list at **~6 visible
  rows (~420px max)** and scroll the rest inside — `overflow-y: auto` on the **list
  container, never on the card itself**, so the card header stays fixed. **~420px is the
  general trigger:** any list container about to exceed it should scroll instead of
  growing. Applies to leaderboards, mention feeds, news feeds, ranked lists. Exception:
  when the list is the only content of its view (a dedicated tab with nothing else), it
  may run full length.
- Gap between rows ~24px, between columns ~16px.

### Card

Cards are distinguished by **background elevation** (`var(--card)` on `var(--background)`),
**never by a border** — kill any injected border. Radius, padding and gaps come from the
DS scale. Card header is always vertical: title (medium weight) + subtitle (regular,
muted), small gap — never a flex row.

**Card shell and header type ship in `waldo-ds.css`** as `.wcard` / `.wcard-head` /
`.wcard-title` (20 medium) / `.wcard-sub` (14 regular muted) / `.wcard-body` /
`.wcard-footer` — use these classes and **never re-declare their sizes locally**
(no local `.card-title { font-size: … }`). Canonical demo: showcase `#comp-card`.

**Card surfaces stay neutral.** A card's background is `var(--card)`; hover on an
interactive card may lighten it with a neutral mix (`color-mix(in srgb, var(--foreground)
4–6%, var(--card))`) — but a card surface never takes an accent or status tint
(`--primary`, `--warning`, `--destructive`, `--highlight`, `--chart-*`), in any state.
Status and zone color belong to inner elements — tag pills, labels, numbers — never to
the card background.

**Nested blocks on a card — the `on-card` rule.** Any block with its own surface nested
inside a card (evidence/reason blocks, nested article/comment/quote cards, board
mini-cards) uses `hsl(var(--muted))` — never `--secondary` as the first nesting step.
Hover on an interactive nested block = `color-mix(in srgb, hsl(var(--foreground)) 5%,
hsl(var(--muted)))`. A third nesting level (a detail inside the nested block, e.g. a
thumbnail) steps to `--secondary`. Surface ladder: `--background` → `--card` →
`--muted` → `--secondary`. Canonical: the `.on-card` variants of Article Card,
Comment Card, and Quote Card in the showcase.
If the **parent card itself is hoverable**, nested blocks lighten in lockstep — the same
mix % over `--muted` that the parent applies over `--card`
(`.parent:hover .nested { background: color-mix(in srgb, hsl(var(--foreground)) 4%,
hsl(var(--muted))) }`) — otherwise the parent hover flattens the nested surfaces into it.

---

## Custom dashboard components

These are specific to Brand API dashboards and have no core-DS equivalent. The rules
below define behavior and semantics — **the canonical markup/CSS for every one of them
lives in the showcase (`index.html`)**: components under the Brand API section
(`#comp-kpi-stat-card`, `#comp-leaderboard-row`, `#comp-depth-pill`, …) and charts under
`#chart-page-*` (HBar, Trend Line, Sparkline, Proportion Bar). All are listed in
`component-index.md` — copy classes verbatim from the showcase.

`waldo-labs/brand-api/components/index.html` remains canonical **only for the
prototype-reachable tab-switching JS** (`showAreaTab()` — the showcase's `switchTab()`
is not reachable from prototypes). Do not copy component CSS from it; the showcase wins.

### 1. KPI Stat Card
Canonical: `index.html #comp-kpi-stat-card`.
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
Canonical: `index.html #comp-leaderboard-row`.
Ranked list: muted rank number (structural, not the focus) + dominant name/meta + a
right-aligned trailing pill. Last row has no bottom divider. Use the DS `Badge`
(`.badge.badge-secondary`) for type tags and the Depth Pill for magnitude.

### 4. Depth Pill
Canonical: `index.html #comp-depth-pill` — including the `depthAlpha()` encoding
formula, which IS the rule (alpha 0.30 at 10% depth → 1.0 at 60%+, clamped; copy it
verbatim, do not re-derive).
A badge whose **opacity encodes magnitude** (e.g. discount depth) on a fixed
`var(--highlight)` base: heavier value = more opaque text, fixed low-opacity background
(`hsl(var(--highlight) / 0.10)`).
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
sit on `hsl(var(--muted))` inside the card (the `on-card` rule above).

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

- **Tabbed views (area-level page navigation):** use the DS Tabs **text variant**
  (`.wtabs-text` / `.wtab-text` — usage-doctrine: navigation between distinct sections;
  SegmentedControl is only for 2–3 toggle options). Behavior spec:
  - One panel visible at a time; panels are `div`s, **never `<section>`** (DS collision).
  - Summary content (hero / KPI rows) stays persistent above the tab bar; the tab bar
    sits between the hero and the panels.
  - ARIA: `role="tablist"/"tab"/"tabpanel"` with `aria-selected` kept in sync.
  - Optional but preferred for sales demos: sync active tab to `location.hash` so a
    specific view is deep-linkable.
  - The canonical switching JS lives in `waldo-labs/brand-api/components/index.html` —
    copy it, do not re-derive it (the showcase's `switchTab()` is not reachable from
    prototypes).
- **Drill-down side panel** is the standard "click for detail" surface — a right-slide
  panel over a dimming overlay, never a centered modal (modals are for forms). Header =
  eyebrow + title + close; body scrolls independently. Anything clickable as evidence
  (a mention, chart segment, ranked row, card) opens a drill with full detail + source.
  Close via ✕, overlay click, and `Esc` — all three. One drill open at a time.
- **Search / autocomplete:** input + dropdown as one unit; dropdown below the input;
  results grouped by type; small colored status dots for live/active state.
- **Segment controls (toggles):** pill options on `var(--secondary)`; active state tinted
  `var(--primary)`. Prefer the DS `comp-segmented`.
- **Card action rows (triage buttons on a card):** exactly one primary action per card,
  `btn btn-default` (filled) — it must always read as THE button of the card. Secondary
  actions use `btn-outline` (bordered) or `btn-secondary` (subtle fill). **Never
  `btn-ghost` (bare) inside an action row** — bare loses all button affordance by design
  and is reserved for tertiary inline actions (a "view all" at the end of a list).
  Buttons always come from the DS `.btn` variants — never restyled locally.
- **Platform favicon chips:** identify external sources with a small favicon from a
  favicon service (`https://www.google.com/s2/favicons?domain=<domain>&sz=64`), ~14–16px,
  small radius; degrade gracefully to a neutral dot on error — never a broken image.
- **Remote media (favicons + content thumbnails):** the only sanctioned remote assets
  are favicons (rule above) and **content thumbnails on media tiles** (owned posts, ad
  creatives — real images when they exist). Every remote image MUST degrade gracefully:
  favicons fall back to a neutral dot; thumbnails fall back to a local token-gradient
  placeholder (`onerror` removes the img, the fallback shows underneath). Never a broken
  image, never a layout shift. No other remote assets — no CDN scripts, no external
  fonts, no hero images.
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
        index.html        ← canonical tab-switching JS only (components live in the showcase)
    <prototype-name>/
      index.html          ← Justin's original
      index-ds.html       ← DS-applied version
  waldo-ds.css            ← shared DS shell, linked by all prototypes
  index.html              ← DS showcase — authoritative component & chart source
  docs/
    brand-api-dashboard-doctrine.md  ← this file (principles only)
    component-index.md               ← generated flat list of all consumables (human)
    component-index.json             ← same list, machine-readable — agents + scaffold consume this
    token-catalog.yaml               ← VALIDATOR owns — source of truth for all tokens
    usage-doctrine.yaml              ← Intelligence Layer owns — core DS components
```

Do not copy CSS between prototype files — always link the repo-root `../../waldo-ds.css`.

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

**Visual verification of data-viz must include a zero-size check.** "The card renders"
is not "the data shows": a bar/segment/arc can be token-perfect and measure 0px (an
inline element ignoring `width` shipped invisible teal bars — this happened, and the
gray track made the chart look merely dim, not broken). Programmatically assert that
every data element (`.hbar-fill`, `.senti-seg`, sparkline/arc paths…) has
`getBoundingClientRect()` width **and** height > 0 in the active view — one
`preview_eval` line per page. Elements inside hidden tab panels report 0 — switch to
each view before asserting.

**…and a paint check.** Size is not paint: a declaration whose token fails to resolve
(e.g. a non-triplet var inside `hsl()`) is dropped silently and the element paints
transparent at full size — this shipped an unfilled primary button and invisible HBar
fills while passing every size assertion. For the same data elements — plus the page's
primary CTA (`.btn-default`) — assert computed `background-color` / `background-image`
(or `stroke`/`fill` on SVG) is not `transparent`/`none`, one `preview_eval` line per page.

---

## Do not

### Hard — blocking violations

_A prototype that breaks one of these is wrong. detect.js / review must reject it._

- [hard] Do not hardcode hex, rgba, or pixel color values anywhere — tokens only.
- [hard] Do not use `--bg`, `--surface-*`, `--text-*`, `--border-strong` — legacy prototype vars.
- [hard] Do not use the old `rgba(var(--token-rgb), alpha)` opacity form — it's retired; DS tokens are HSL, so write `hsl(var(--token) / alpha)`.
- [hard] Do not declare `--chart-1..12` or any `-rgb` companion in your own `:root` — they all ship in `waldo-ds.css`; local copies go stale and ship wrong colors.
- [hard] Do not restate DS values (hex, radii, type scale, component CSS) in a prototype or in this doctrine — reference the source (`index.html`, `waldo-ds.css`, `token-catalog.yaml`).
- [hard] Do not use brand colors (`--brand-*`) in product dashboards.
- [hard] Do not add italic anywhere.
- [hard] Do not name a prototype class/variant after a DS atom (`.input`, `.badge`, bare `.output`…) — DS rules will land on it.
- [hard] Do not declare `html`/`body` with `height:100%` or `overflow:hidden` — breaks scroll.
- [hard] Do not put `overflow` other than `visible` on `body` — it silently kills `position: sticky` (the scroll override belongs on `html` only).
- [hard] Do not omit the required DS conflict overrides.
- [hard] Do not stack anything under the header identity — no subtitle, tagline, or descriptor below the logo/name; the header lockup is one line.

### Should — strong defaults

_Follow unless the specific design has a documented reason not to._

- [should] Do not put search, status/integration pills, badges, buttons, or "Powered by" in the app header — the header is identity + text navigation only. Search goes on the second line (right-aligned), except when the header has no navigation.
- [should] Do not build custom search containers — search always uses the canonical `.app-search` shell (360px, in `waldo-ds.css`).
- [should] Do not squeeze the toolbar line (filters/segmented control + search) against its neighbors — it keeps the grid's row rhythm: ~24px above and ~24px below, symmetric.
- [should] Do not render the Waldo mark as text or a colored box — the mark is always the SVG wordmark (the product name next to it is plain text, and may stand alone).
- [should] Do not hardcode actions in the page header — only what the design requires.
- [should] Do not let a list container grow past ~420px (~6 visible rows) — scroll inside the list container (`overflow-y: auto`), never on the card, and never push the row taller than its shortest sibling. Exception: a list that is the only content of its view.
- [should] Do not put a `border-bottom` on the topbar or a `border-right` on the sidebar — the shell is borderless; zones separate by surface + spacing (see Borderless shell).
- [should] Do not let a separator line appear below the page header — kill the injected border.
- [should] Do not divide page sections with an `<hr>`/divider line — use spacing + a muted label.
- [should] Do not split the sidebar identity chip and the nav into two separate boxes — one integrated `var(--popover)` panel, chip as transparent header.
- [should] Do not add a `border` to cards — elevation only.
- [should] Do not tint a card background with accent/status tokens (`--primary`, `--warning`, `--destructive`, `--highlight`, `--chart-*`) — in any state, hover included. Status color lives in pills and labels, not surfaces; neutral hover lightening is fine.
- [should] Do not put the KPI delta inline below the value — badge, top-right.
- [should] Do not use `--highlight` for HBar fills — HBars are always teal.
- [should] Do not use `--chart-*` colors in depth pills or single-metric bar charts — alpha system.
- [should] Do not mix alpha-highlight bars and chart-palette bars in the same visualization.
- [should] Do not use `--warning`/`--destructive` interchangeably: negative metric/trend = `--warning`; irreversible action / live-alert = `--destructive`.
- [should] Do not use custom buttons for time-range toggles — use `comp-segmented`.
- [should] Do not use the bare button variant (`btn-ghost`) in a card action row — primary = `btn-default`, secondary = `btn-outline`/`btn-secondary`.
- [should] Do not build a chart/component from scratch when the DS has it — read its markup in `index.html` and match it.
- [should] Do not use JetBrains Mono for numeric metric values — Inter only.

### Preference — taste & polish

_Guidance that raises quality; deviations are judgment calls, not violations._

- [pref] Do not render trend-line dots always-visible — hover only.
