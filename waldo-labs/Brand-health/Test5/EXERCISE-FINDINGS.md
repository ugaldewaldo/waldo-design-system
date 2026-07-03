# Poppi Health — reconstruction exercise findings

**Purpose of this exercise:** not to ship the dashboard, but to (1) surface which DS components are **missing** to render Poppi's data, and (2) surface where the **doctrine** fails an agent trying to follow it — so the doctrine can be improved and any agent can rebuild anything reliably.

Rules used: replicate ALL info/structure of `../poppi-health/index.html` · follow `docs/brand-api-dashboard-doctrine.md` · use DS components verbatim from `index.html`/`waldo-ds.css` · **doctrine/component beats pixel-fidelity** · missing components → built as raw material here.

---

## Files (versioned, nothing overwritten)

| File | What |
|------|------|
| `index.html` | First attempt — restructured to doctrine grid (rings→KPI). Kept for reference. |
| `index-test-1.html` | Faithful replica of the original on DS tokens (rings + pill tabs + hero preserved). 0 detect violations. |
| `index-test-2.html` | + doctrine **SVG Trend Line Chart** on all charts (8% area under primary series, 1px strokes). |
| `index-test-3.html` | + DS components verbatim: **Card titles** (sentence-case, not uppercase eyebrows) + **Tabs** (`.wtab-pill`). doctrine>pixel. |
| `index-test-4.html` | + **Badge** for sentiment chips, **Table** (`wui-table`) for the comparison table. |
| `index-test-5.html` | + Waldo app header (doctrine) + cards sin borde + font-sizes tokenizados `--fs-*`. |
| `index-test-6.html` | + limpieza sistemática: 0 uppercase en labels, font-weight ≤600, `.wrap` 1184px, borders fuera de todas las cards. **Versión más on-doctrine.** |
| `index-test-7.html` | + **todas** las cards sin borde (regla: bg card/secondary → sin border; solo form controls lo conservan). **Versión sin borders.** |
| `New components.html` | The components the DS is **missing** (raw, DS-token-based — to be formalized by the component team). |

DS components reused verbatim: Card, Card title, Tabs (pill), Badge, Table, Button, Separator, KPI Stat Card pattern.

---

## 1. Component inventory — CORRECTED (after consulting 🧰 COMPONENT LIBRARY)

**Correction:** my first pass claimed "the DS has no data-viz" — WRONG. I only inventoried the Components section (`comp-*`); the DS also has a full **Charts section** (`chart-page-*`) that I missed. All 5 data-viz I'd marked missing already exist.

### Already in the DS — use verbatim, do NOT rebuild
**Data-viz** (Charts section · `.chart-card` / `.chart-cards-grid` / `--chart-1..12`):
- Donut + legend → `#chart-page-donut` (+ `#chart-page-pie`)
- Score Ring / Gauge → `#chart-page-radial`
- Trend Line / Sparkline / Area → `#chart-page-trend` (+ `#chart-page-area`)
- Comparison / Horizontal Bar (incl. ticks) → `#chart-page-hbar`
- Sentiment Stacked Bar → `#chart-page-bar`
**Components** (`comp-*`): Card, KPI Stat Card, Badge, Tag, Table, Tabs, Button, Dialog, Sheet, Sonner, Separator, Leaderboard, Ad Copy Card, Live Badge, Alert list.

### Truly missing — build these (content cards; no generic DS equivalent)
1. **Mention Card** — social post (platform · author · sentiment · text)
2. **News Card** — press item (source · tag · title · snippet)
3. **Coach / Recommendation Card** — headline · body · evidence · actions
4. **Owned Post Tile** — media tile with overlays
5. **VoC Cluster** — verbatim quote + frequency
6. **Complaint Row** — label + example + dual freq/intensity bars (bars can reuse `#chart-page-hbar`)
7. **Trend Column** — ranked list by source (rank · tag · volume · delta)
8. **Theme Pill** — variant of Tag with a sentiment palette + size by volume

## 2. Doctrine fixes needed (why it was hard to follow)

These are the points where an agent following the doctrine literally produces wrong/broken output:

1. **Layout intent is unstated.** The Layout section prescribes topbar+page-header+dashboard-grid, but a *reconstruction* should preserve the source design. The doctrine never says which wins → agents flip-flop. **Fix:** add a rule — "reconstruction = preserve source IA/layout; the grid is the default only for *new* dashboards. In all cases components/tokens follow the doctrine."

2. **Opacity examples are invalid in the prototype token layer.** The doctrine uses `hsl(var(--primary) / 0.12)`, but in `waldo-ds.css` the prototype `:root` defines `--primary` as a **hex**, so `hsl(#32a9a9/…)` is invalid. **Fix:** change all examples to `rgba(var(--primary-rgb), a)`; document that only `--primary-rgb` and `--highlight-rgb` ship — agents must define helper `-rgb` vars (destructive/warning/etc.) themselves, or the DS should ship them.

3. **The validation command is misleading.** `detect.js` has `SKIP_PATH_SEGMENTS=['waldo-labs']`, so `node tools/detect.js waldo-labs/<proto>/index.html` reports **"0 files scanned"** — silently green. **Fix:** document the real way to validate a prototype (copy outside `waldo-labs/`, or add a flag to bypass the skip).

4. **Two sources of truth for component CSS.** The doctrine `.md` re-pastes component CSS (e.g. KPI card) that has drifted from `index.html #comp-*`. Following the `.md` snippet produced wrong casing. **Fix:** the `.md` should link to `index.html #comp-*` as the single source and stop pasting CSS that can drift. (Line 489 already says "copy from index.html" — make the whole doc obey it.)

5. **Undocumented DS-conflict gotchas.** Add a "DS conflict overrides" section:
   - `waldo-ds.css` resets `svg{display:block}` → SVGs collapse to height 0 in flex columns. Fix: `svg{flex:none}` + container `min-height:fit-content`.
   - `section{display:none}` hides any `<section>` → need `.section{display:block}`.
   - `body{display:flex}` collapses widths → `body{display:block!important}`.
   - White-alpha (`255,255,255,a`) is flagged by detect → use zinc `210,211,211,a` from the valid set (0.05/0.10/0.12/0.20/0.30/0.50/0.70).
   - **SVG var() in attributes:** the doctrine topbar example + `index-ds-test2` use `<path fill="var(--foreground)">` — invalid (var does not resolve in SVG presentation attributes), renders black, and detect flags it. Use `fill="currentColor"` + `style="color:var(--foreground)"`.
   - Off-scale radii: even the doctrine's own KPI card uses `14px` (not on the 4/6/8/12/16/20/24/32 scale).

6. **`up`/`down` semantics are written as universal but are domain-specific.** "up = destructive (more discounting = pressure)" is a Promo-Radar rule; for brand health, up = good = primary. **Fix:** mark these as per-dashboard, not global.

8. **Charts are not discoverable from the Components list.** The DS data-viz lives in a separate Charts section (`chart-page-*`), NOT the `comp-*` Components sidebar. An agent inventorying components concludes "no data-viz" and rebuilds charts that already exist (I did exactly this). **Fix:** the component map / doctrine must point agents to BOTH the Components AND Charts sections; prototypes should use `#chart-page-*` verbatim.

7. **No canonical element→component mapping.** Each agent re-derives which original element maps to which DS component vs. is new. **Fix:** ship a mapping table per prototype (or a generic one).

---

## Confirmed by the doctrine owner (🎛️ BRAND API - PROTOTYPES)
- **App header is the Waldo header, not the brand header** — logo WALDO + nav (Dashboard · Alerts · API coverage) + "Powered by Waldo API". Even when replicating a brand dashboard. (doctrine > pixel)
- **No borders on cards** — elevation only.
- **No hardcoded px font-sizes** — use `var(--fs-*)`. No uppercase on labels.
- **Flow:** read the component in `index.html` AND any existing `index-ds-*` before writing any class. Copy exact, do not invent variants.
- Applied in index-test-5.html (the corrected version).

---

## Conclusión clave
Un **re-skin del original nunca llega a 100% on-doctrine** porque el CSS original es inherentemente off-doctrine (borders, uppercase, weights 800 por todos lados) — cada review destapa más. La secuencia productiva es: **(1) crear los 13 componentes faltantes en el DS → (2) reconstruir Poppi desde esos componentes** (on-doctrine por construcción), en vez de parchar el re-skin indefinidamente. El valor de este ejercicio es el inventario de los 13 + los arreglos a la doctrina, no el HTML en sí.
