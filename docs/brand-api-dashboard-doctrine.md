# Brand API Dashboard Doctrine

Design rules for Brand API prototypes (Promo Radar, Prospector, Moodtape, Poppi Health, and any future dashboard built on the Waldo Brand Intelligence API).

**Read this before generating any dashboard. It overrides general intuition but does NOT override `CLAUDE.md` — that file is always the floor.**

---

## What these prototypes are

Vanilla HTML single-file dashboards. No framework, no build step. They link to `../../waldo-ds.css` and use Waldo DS tokens. They live in `waldo-labs/<prototype-name>/`. They are sales tools — the visual bar is high.

---

## Token rules

### Surfaces
Use DS semantic tokens only — never the prototype legacy vars.

| Use this | Not this |
|----------|----------|
| `var(--background)` | `--bg: #171819` |
| `var(--card)` | `--surface: #202123` |
| `var(--secondary)` | `--surface-2: #27282b` |
| `var(--accent)` | `--surface-3: #323539` |
| `var(--border)` | `--border: rgba(...)` |
| `var(--muted-foreground)` | `--text-2`, `--text-3` |
| `var(--foreground)` | `--text: #d2d3d3` |

### Data visualization — chart palette only
`--chart-1` through `--chart-12` are the **only** valid colors for bars, donut segments, and line series. Never hardcode hex in data-viz. Never use brand colors as chart colors.

| Token | Color | Name |
|-------|-------|------|
| `--chart-1` | #2DD4C4 | Cyan Teal |
| `--chart-2` | #8899AA | Slate |
| `--chart-3` | #F5A080 | Salmon |
| `--chart-4` | #F07080 | Rose |
| `--chart-5` | #9B88E0 | Lavender |
| `--chart-6` | #5599EE | Periwinkle |
| `--chart-7` | #F0A82A | Amber |
| `--chart-8` | #1AB8A8 | Teal |
| `--chart-9` | #99CC44 | Lime |
| `--chart-10` | #66BB80 | Sage |
| `--chart-11` | #BB77CC | Orchid |
| `--chart-12` | #E06699 | Hot Rose |

### Accent tokens for status/emphasis

| Semantic | Token | Use |
|----------|-------|-----|
| Brand teal | `var(--primary)` / `--accent-brand: #32a9a9` | Focus rings, active states, links |
| Highlight | `var(--highlight)` / `#f7d371` | Depth pill, decorative emphasis — never urgency |
| Destructive | `var(--destructive)` / `#de3a28` | Live/active promo badges, alert states |

`--highlight-rgb: 247,211,113` — use for `rgba(var(--highlight-rgb), alpha)` when you need opacity-based encoding.

### Typography
- UI text: **Inter** (default, no font-family declaration needed)
- Numbers, metric values, IDs: **Inter** — NOT JetBrains Mono
- Code snippets, promo codes, keyboard shortcuts, token documentation: JetBrains Mono only

---

## Layout

### Topbar

The topbar always uses the **Waldo SVG logo** — never text, never a placeholder square. It is available in the DS assets. Do not substitute with a colored box or the word "Waldo".

```html
<header class="topbar">
  <div class="topbar-inner">
    <div class="topbar-brand">
      <svg width="70" height="18" viewBox="0 0 69.75 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M63.2676 0C67.6298 0 69.75 2.26338 69.75 7.52148V10.6641C69.75 15.7985 67.6298 18 63.2676 18C58.8935 17.9984 56.7862 15.7968 56.7861 10.6641V7.52148C56.7861 2.26354 58.8934 0.000133701 63.2676 0ZM37.0039 14.6191L41.9775 13.9814V17.6562H32.4795V0.335938H37.0039V14.6191ZM5.47168 7.7832C5.68287 9.47803 5.78297 10.7646 5.85742 12.6689H6.10645C6.21888 10.7887 6.35555 9.37851 6.53027 7.7832L7.39062 0.335938H11.4912L12.4258 7.7832C12.6248 9.37852 12.7498 10.7902 12.8379 12.6689H13.1113C13.2116 10.7887 13.3102 9.47652 13.4971 7.7832L14.3193 0.335938H18.707L15.9277 17.6543H10.5449L10.0469 13.4609C9.79769 11.4328 9.62264 9.51443 9.49805 7.43652H9.23633C9.09958 9.51443 8.91281 11.4072 8.67578 13.4609L8.20215 17.6543H2.90332L0 0.335938H4.54883L5.47168 7.7832ZM31.6318 17.6543H26.8457L26.4961 15.5762H22.3086L21.959 17.6543H17.6094L21.6221 0.335938H27.5312L31.6318 17.6543ZM49.2207 0.335938C53.5328 0.335938 55.5898 2.67494 55.5898 7.61035V10.4062C55.5897 15.3172 53.5327 17.6543 49.2207 17.6543H43.2373V0.335938H49.2207ZM63.2676 3.55078C61.984 3.55097 61.3614 4.50431 61.3613 6.48242V11.6904C61.3613 13.5465 61.9839 14.449 63.2676 14.4492C64.5515 14.4492 65.1748 13.5452 65.1748 11.6904V6.48242C65.1748 4.5026 64.5515 3.55078 63.2676 3.55078ZM47.7617 14.1035H48.9717C50.3558 14.1035 51.0156 13.3613 51.0156 11.79V6.19824C51.0155 4.62735 50.3542 3.88577 48.9717 3.88574H47.7617V14.1035ZM24.2764 4.36816C24.1761 5.76588 23.989 7.03991 23.7656 8.53711L22.9043 12.7627L25.834 12.3721L25.0742 8.5498C24.8493 7.04039 24.65 5.76599 24.5254 4.36816H24.2764Z" fill="var(--foreground)"/></svg>
      <!-- NO product name, NO subtitle — only the SVG wordmark above -->
    </div>
    <nav class="topbar-nav">
      <a class="nav-link active">Dashboard</a>
      <a class="nav-link">Alerts</a>
      <a class="nav-link">API coverage</a>
    </nav>
    <span class="topbar-powered">Powered by Waldo API</span>
  </div>
</header>
```

```css
.topbar { position: sticky; top: 0; z-index: 50; backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
.topbar-inner { max-width: 1440px; margin: 0 auto; padding: 0 32px; height: 73px; display: flex; align-items: center; gap: 32px; }
.topbar-brand { display: flex; align-items: center; gap: 12px; }
.topbar-product { font-size: 16px; font-weight: 600; letter-spacing: -0.32px; }
.topbar-sub { font-size: 11px; font-weight: 500; letter-spacing: 0.06em; color: var(--muted-foreground); text-transform: uppercase; }
.topbar-nav { display: flex; gap: 24px; margin-left: auto; }
.nav-link { font-size: 14px; color: var(--muted-foreground); text-decoration: none; cursor: pointer; }
.nav-link.active { color: var(--foreground); font-weight: 500; }
.topbar-powered { font-size: 13px; color: var(--muted-foreground); white-space: nowrap; }
```

### Page header (below topbar, above grid)

Each dashboard has a full-width page header with the product name and, when the design calls for it, a one-line descriptor. It sits inside `.wrap`, above the card grid. The right side may include contextual actions (search, alerts, filters) — include only what the specific dashboard design requires, not a fixed set.

```html
<div class="page-header">
  <div class="ph-left">
    <h1 class="ph-title">Dashboard name</h1>
    <p class="ph-sub">One-line descriptor</p>  <!-- omit if the design doesn't call for it -->
  </div>
  <!-- right side: only add actions the specific design requires — do not invent generic ones -->
</div>
```

```css
.page-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 56px 0 40px; border-bottom: none !important; margin-bottom: 0 !important; } /* waldo-ds.css injects border-bottom on .page-header — always kill it */
.ph-left { display: flex; flex-direction: column; gap: 13px; }
.ph-title { font-size: 40px; font-weight: 600; line-height: 48px; letter-spacing: -1.6px; color: var(--foreground); }
.ph-sub { font-size: 16px; font-weight: 400; line-height: 24px; letter-spacing: -0.32px; color: var(--muted-foreground); }
```

The page title matches the prototype name (e.g. "Promo Radar", "Prospector"). The subtitle is a short product descriptor (e.g. "Discount intelligence", "Brand prospecting").

---

### Page shell
```css
/* content wrap — 1184px content area, centered */
.wrap { max-width: 1184px; margin: 0 auto; padding: 32px 0 80px; }

/* dashboard grid — rows stack vertically, gap 24px */
.dashboard { display: flex; flex-direction: column; gap: 24px; }

/* each row — equal-width columns, gap 16px, same height */
.dash-row { display: flex; gap: 16px; align-items: stretch; }
.dash-col { flex: 1; min-width: 0; }
```

**Grid rules:**
- All columns in a row are **equal width** (`flex: 1`). Never use proportional columns (no 1.35fr + 1fr).
- All cards in the same row are the **same height** — they stretch to match each other (`align-items: stretch`).
- If a card's content is taller than the row height → **scroll inside the card** (`overflow-y: auto`), never push the row taller. The card must have `height: 100%` and the scrollable inner container must have `flex: 1; min-height: 0; overflow-y: auto`.
- **Only lists and HBars can scroll** — SVG charts have fixed height and never scroll.
- Gap between rows: **24px**. Gap between columns: **16px**.
- The `.wrap` padding is `32px 0 80px` — zero horizontal padding. The 1184px max-width centers the content. Never add horizontal padding to `.wrap`.

### Card
```css
.card {
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: none !important; /* waldo-ds.css may inject a border via [class*=card] — this override kills it */
}
.card-title { font-size: 20px; font-weight: 500; line-height: 28px; letter-spacing: -0.4px; }
.card-subtitle { font-size: 14px; font-weight: 400; line-height: 20px; letter-spacing: -0.28px; color: var(--muted-foreground); margin-top: 4px; }
```

Card header: title (Inter Medium 20px) + subtitle (Inter Regular 14px muted), stacked with 4px gap. No flex row — always vertical.

---

## Custom dashboard components

These 5 components are specific to Brand API dashboards. They are not in the core DS. They live in `waldo-labs/<prototype>/` or `waldo-labs/brand-api/components/`. If they stabilize and become generic enough, promote to core DS with a Linear card.

### 1. KPI Stat Card

A 4-up grid of summary metrics. No equivalent in core DS.

```html
<div class="kpi-grid">
  <div class="kpi">
    <div class="kpi-top">
      <div class="k-label">Metric name</div>
      <span class="k-delta up">▲ +8pp</span>  <!-- badge top-right -->
    </div>
    <div class="k-value">36%</div>
    <div class="k-sub">context text</div>
  </div>
</div>
```

```css
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.kpi { background: var(--card); border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 8px; }
/* No border — elevation only */
.kpi-top { display: flex; align-items: flex-start; justify-content: space-between; }
.k-label { font-size: 14px; font-weight: 500; line-height: 20px; letter-spacing: -0.28px; color: var(--muted-foreground); text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em; }
.k-delta { font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 6px; }
.k-delta.up { color: var(--destructive); background: hsl(var(--destructive) / 0.12); }
.k-delta.down { color: var(--primary); background: hsl(var(--primary) / 0.12); }
.k-value { font-size: 30px; font-weight: 600; line-height: 36px; letter-spacing: -0.6px; }
.k-sub { font-size: 12px; font-weight: 400; line-height: 16px; letter-spacing: -0.24px; color: var(--muted-foreground); }
```

Rules:
- Max 4 cards per row. Collapse to 2 on mobile.
- Delta badge sits **top-right** of the card — never inline below the value.
- Value is always the dominant element — large, bold, tight tracking.
- Up = destructive (red) because more discounting = pressure signal. Down = primary (teal) because less discounting = relief signal.
- Use `comp-segmented` from DS for any time-range toggle (This week / 30 days / 90 days) — never custom buttons.

---

### 2. Horizontal Bar Chart Row

Used for category/brand comparisons. Encodes significance via fill opacity, not color hue.

```html
<div class="hbars">
  <div class="hbar-row" onclick="...">
    <div class="hbar-name">Apparel &amp; Fashion</div>
    <div class="hbar-track">
      <div class="hbar-fill" style="width:80%;background:rgba(var(--highlight-rgb),0.85);"></div>
    </div>
    <div class="hbar-val">48%</div>
  </div>
</div>
```

```css
.hbars { display: flex; flex-direction: column; }
.hbar-row { display: flex; flex-direction: column; gap: 4px; padding: 8px 12px; border-radius: 8px; cursor: pointer; }
.hbar-row:hover { background: var(--secondary); }
.hbar-name { font-size: 14px; font-weight: 400; line-height: 20px; letter-spacing: -0.28px; color: var(--muted-foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 180px; }
.hbar-inner { display: flex; align-items: center; gap: 12px; }
.hbar-track { flex: 1; height: 6px; background: var(--secondary); border-radius: 12px; overflow: hidden; }
.hbar-fill { height: 100%; border-radius: 15px; background: linear-gradient(to left, hsl(var(--primary)), hsl(var(--primary) / 0.15)); }
.hbar-val { font-size: 12px; font-weight: 400; line-height: 16px; letter-spacing: -0.24px; color: var(--muted-foreground); text-align: right; width: 46px; }
```

**Alpha-fill encoding rule:** the fill color is `hsl(var(--primary) / alpha)` where alpha = `0.30 + (value/max * 0.70)`. The highest value gets full opacity, the lowest gets 30%. This encodes magnitude without introducing multiple hues. Use this system consistently across all bars in a chart — never mix with `--chart-*` colors in the same bar set.

**HBars are always teal (`var(--primary)`) — never yellow.** The highlight/yellow color (`--highlight-rgb`) is reserved exclusively for the Depth Pill. Do not use it for bars.

**Default is monochromatic.** Use a single color (teal) for all bars in a chart. Only switch to `--chart-N` multi-color when there is a legend that needs to reference distinct series — e.g. a multi-line trend chart where each line represents a different category. If there is no legend, there is no multi-color.

---

### 3. Leaderboard Row

Ranked list of brands or categories. Combines rank number, name+meta, and a depth pill.

```html
<div class="lb">
  <div class="lb-row" onclick="...">
    <div class="lb-rank">1</div>
    <div class="lb-main">
      <div class="lb-brand">Zara</div>
      <div class="lb-meta">
        <span class="type-tag">Sitewide sale</span>
        <span class="lb-offer">Up to 50% off</span>
      </div>
    </div>
    <div class="depth-pill" style="color:rgba(var(--highlight-rgb),0.95);background:rgba(var(--highlight-rgb),0.10);">50%</div>
  </div>
</div>
```

```css
.lb { display: flex; flex-direction: column; }
.lb-row { display: flex; gap: 14px; align-items: flex-start; padding: 12px 8px; border-radius: 8px; cursor: pointer; transition: background 0.12s; }
.lb-row:hover { background: var(--secondary); }
.lb-rank { font-size: 18px; font-weight: 600; line-height: 28px; letter-spacing: -0.36px; color: var(--foreground); text-align: center; width: 24px; flex: none; padding: 10px; }
.lb-main { flex: 1; min-width: 0; border-bottom: 1px solid var(--border); padding-bottom: 12px; display: flex; flex-direction: column; gap: 3px; }
.lb-row:last-child .lb-main { border-bottom: none; }
.lb-top { display: flex; gap: 10px; align-items: center; }
.lb-brand { font-size: 14px; font-weight: 600; line-height: 20px; letter-spacing: -0.28px; flex: 1; }
/* type tag — use .badge.secondary from DS */
/* depth pill — use .badge.highlight with variable opacity */
.lb-meta { font-size: 12px; font-weight: 400; line-height: 16px; letter-spacing: -0.24px; color: var(--muted-foreground); display: flex; gap: 8px; }
.lb-category { font-size: 11px; letter-spacing: -0.22px; color: var(--muted-foreground); }
```

Rules:
- Rank number is always muted — it's structural, not the focus.
- Brand name is the dominant element.
- Depth pill is always right-aligned, uses the alpha-encoding system (see below).
- Last row has no bottom border.

---

### 4. Depth Pill

A badge that encodes discount magnitude via opacity. Higher depth = more opaque. The system uses `--highlight` as the base color.

```js
function depthAlpha(d) { return Math.max(0.30, Math.min(1, 0.30 + (d / 60) * 0.70)); }
function depthPillStyle(d) {
  return `color:rgba(var(--highlight-rgb),${depthAlpha(d).toFixed(2)});background:rgba(var(--highlight-rgb),0.10);`;
}
```

```css
.depth-pill {
  font-size: 13px; font-weight: 700;
  padding: 4px 10px; border-radius: 8px; white-space: nowrap;
}
```

Rules:
- Base color: always `var(--highlight)` / `--highlight-rgb: 247,211,113`
- Alpha range: 0.30 (10% off) → 1.0 (60%+ off). Clamp at both ends.
- Background is always `rgba(var(--highlight-rgb), 0.10)` — fixed, not variable.
- **Opacity encodes depth — this is intentional.** A 70% discount pill must look visually heavier than a 20% pill. Do not flatten all pills to the same opacity.
- The Figma mockup shows uniform pills — that is a placeholder. The live implementation must use variable opacity.
- Use only for discount depth or comparable magnitude metrics. Do not repurpose for status.
- Never use `--chart-*` colors in a depth pill.

---

### 5. SVG Trend Line Chart

Multi-series SVG line chart. No external library. Used for time-series overlays (e.g. discount share over 12 weeks).

Structure:
- Grid lines: `rgba(255,255,255,0.05)` stroke — subtle, never distracting
- Line stroke: **1px** — thin, not thick
- Area fill: 8% opacity under the primary series only
- **Dots: hidden by default** — only appear on hover over a data point. Never render dots as always-visible circles.
- Secondary series: 1px stroke, no area, no dots
- Y-axis labels: left-aligned, muted
- X-axis labels: evenly sampled (not every point), bottom of chart
- Legend: inline color swatch (14×3px pill) + label, flex row below chart

Color assignment for series:
- Primary / "all brands" series: `var(--primary)` (brand teal)
- Additional series: `--chart-4` (rose), `--chart-6` (periwinkle), `--chart-7` (amber) — pick from chart palette in order, skip already-used

```js
// area path for primary series
const area = `M${x(0)},${y(0)} L` + data.map((v,i) => `${x(i)},${y(v)}`).join(' L') + ` L${x(n-1)},${y(0)} Z`;
```

Always render with `width="100%"` and `preserveAspectRatio="xMidYMid meet"` for responsive scaling.

---

## Interior page patterns

### Page header (category / brand detail)
```
< Dashboard          [breadcrumb — var(--highlight)]
Brand Name           [H1 — Inter SemiBold ~36px, left-aligned]
Category · link      [subtitle — muted, "view category" is a primary link]
                                          [Discounting now •]  ← badge top-right
```
- Breadcrumb `< Dashboard` uses `var(--highlight)` — not muted, not primary
- Status badge "Discounting now" = destructive color + animated filled dot, floated top-right of header
- "No active discount" = muted badge, no dot

### Brand detail — promo cards
Full-width cards (not two columns). Each active promo gets its own card:
```
[Promo value — large bold]   [Live since date — muted right]
┌─────────────────────┐  ┌─────────────────────┐
│ "ad copy with       │  │ landing page offer  │
│  highlighted terms" │  │ highlighted terms"  │
│ meta · CTA: Shop    │  │ confidence 90%      │
│ [Detected in ad copy]   [Detected in ad copy]│
└─────────────────────┘  └─────────────────────┘
```
- Discount terms inside quotes are highlighted inline: `color: var(--highlight)`
- "Detected in ad copy" = secondary badge
- Evidence cards have darker background (`var(--secondary)`) inside the promo card

### Timeline / Gantt chart (discount history)
- Label on left, teal bar showing time period, x-axis month labels below
- Bars: solid `var(--primary)` — no gradient, no opacity variation
- Month labels: muted, uppercase, small — NOV · FEB · MAY · JUN

### Alerts page — form patterns
- Form section labels ("What to watch", "Brand", "Trigger when…") use `var(--primary)` — teal, not muted, not uppercase
- Segment controls: pill-shaped options, active = filled dark background, inactive = plain text
- CTA button "Create alert" = large pill shape, high contrast — primary action, right-aligned

#### New Alert form — progressive disclosure
The form has two states. Fields appear progressively — never show everything at once.

**Initial state (always visible):**
- "What to watch" segment: A brand · A category
- Brand/category text input (empty)
- Condition segment: Any discount is live · A new discount starts · Discount deeper than…
- "Create alert" button — visible, disabled

**Filled state (appears after user completes the above):**
- "Trigger when…" text input
- "Deliver to" dropdown (Email / Text)
- Destination field (Email Address or Phone Number)
- "Create alert" button — becomes active

Fields animate in as they appear. Never jump — transition smoothly.

---

## Interactive patterns

### Search / autocomplete dropdown
- Input + dropdown as a unit inside `.search-wrap` (position: relative)
- Dropdown appears below input, `top: calc(100% + 8px)`, `z-index: 40`
- Group results by type (Categories / Brands) with a group label
- Status dots: colored circle 8px to indicate live/active state

### Segment controls (toggle buttons)
```css
.seg { display: flex; gap: 8px; flex-wrap: wrap; }
.seg button { background: var(--secondary); border: 1px solid var(--border); color: var(--muted-foreground); border-radius: 10px; padding: 10px 14px; font-size: 13px; font-weight: 600; }
.seg button.on { background: hsl(var(--primary) / 0.12); border-color: hsl(var(--primary)); color: hsl(var(--primary)); }
```

### Toast notification
Fixed bottom-center. Appears on user action. 2.6s auto-dismiss. Never use for errors — only confirmations.

### Live badge
```html
<span class="badge-live">
  <span class="pulse"></span>Discounting now
</span>
```
`background: hsl(var(--destructive) / 0.12)` + animated dot. Use only for genuinely real-time states.

---

## File structure

```
waldo-design-system/
  waldo-labs/
    <prototype-name>/
      index.html          ← Justin's original
      index-ds.html       ← DS-applied version
  waldo-ds.css            ← shared DS shell, linked by all prototypes
  docs/
    brand-api-dashboard-doctrine.md  ← this file
    token-catalog.yaml               ← VALIDATOR owns — source of truth for all tokens
    usage-doctrine.yaml              ← Intelligence Layer owns — core DS components
```

Do not copy CSS between prototype files — always link to `../../waldo-ds.css`.

---

## What to do when detect.js flags a violation

```bash
node tools/detect.js waldo-labs/<prototype>/index-ds.html
```

Common violations in dashboards:
- Hardcoded hex in JS-generated inline styles → replace with `var(--token)` or `rgba(var(--token-rgb), alpha)`
- Using `--bg`, `--surface`, `--text-2` → replace with semantic tokens (see table above)
- Hex color in a bar fill → replace with `--chart-N` or `rgba(var(--highlight-rgb), alpha)`

---

## Do not

- Do not hardcode hex values anywhere in the HTML or JS
- Do not use `--bg`, `--surface-*`, `--text-*`, `--border-strong` — these are prototype legacy vars, not DS tokens
- Do not use JetBrains Mono for numeric metric values — Inter only
- Do not use `--chart-*` colors in depth pills or single-metric bar charts — those use the alpha-highlight system
- Do not mix alpha-highlight bars and chart-palette bars in the same visualization
- Do not add italic anywhere
- Do not use brand colors (`--brand-green`, `--brand-yellow`, etc.) in product dashboards
- Do not use the word "Waldo" or a colored box in the topbar — always use the SVG logo
- Do not put the KPI delta inline below the value — it goes as a badge top-right of the card
- Do not render trend line dots as always-visible — dots only on hover
- Do not use custom buttons for time-range toggles — use `comp-segmented` from DS
- Do not use yellow/highlight color (`--highlight-rgb`) for HBar fills — HBars are always teal (`hsl(var(--primary) / alpha)`)
- Do not add `border` to cards — ever. Cards are distinguished by background elevation (`var(--card)` vs `var(--background)`), not by borders
- Do not let a separator line appear below the page header — `waldo-ds.css` injects `border-bottom` on `.page-header`; always override with `border-bottom: none !important`
- Do not hardcode actions in the page header (search pill, alert button, etc.) — include only what the specific dashboard design requires
- Do not declare `html` or `body` with `height: 100%` or `overflow: hidden` — this breaks page scroll. Use `min-height: 100vh` on body only
- Do not declare `--chart-1` through `--chart-12` in your own `:root` — they are already in `waldo-ds.css`. If you override them you may introduce hex values. Trust the DS file
- Do not invent a chart component that already exists in the DS — copy the exact HTML/CSS from `index.html`
