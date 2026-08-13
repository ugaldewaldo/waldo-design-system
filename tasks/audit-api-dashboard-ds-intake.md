# Audit — API Dashboard → Waldo DS intake

**Audited:** `~/GitHub/API-Dashboard` (Adveron API / Brand API dashboard), commit `d9e61a8`, last touched 2026-07-30.
**Date:** 2026-08-13 · **Auditor:** Waldo DS session
**Method:** full source read of `src/` + vendored `packages/waldo-ui/` diffed against `waldo-ui/src/`, `node tools/detect.js` on `src/`, cross-checked against `docs/component-index.md` (all three sections), plus a live pass of the running app at `localhost:5173` (`#/`, `#/org`, `#/org/usage`, `#/org/entities`, get-started scenario).

Nothing in the DS has been changed by this audit. This is the intake list awaiting Miguel's approval.

---

## 1. Promote — new, no DS equivalent

| # | Piece | Source | Why it is new | Target |
| --- | --- | --- | --- | --- |
| 1 | `EntityChip` / `EntityChipAdd` | `ds-candidates/entity-chip.tsx` | Two-line chip (favicon 24px + name + type). `FilterChip`, `Tag` and `Badge` are all single-line; `ListItem` is a row, not a chip. Dashed `+ Add` sibling has no equivalent. | Core component |
| 2 | `SparkBars` | `ds-candidates/spark-bars.tsx` | DS `Sparkline` is a line; `TrackerItem`'s inline chart is a line. This is 2px bars with stacked error/warning segments and a status-code hover tooltip. | Charts / Data-viz |
| 3 | `SearchTrigger` | `ds-candidates/search-trigger.tsx` | Button shaped like an input that opens the ⌘K palette. Overlaps `FilterTrigger` in spirit only. Should consume `Kbd` for the shortcut slot. | Core component |
| 4 | `DayColumnChart` | `components/DayColumnChart.tsx` | Thin capsule columns, stacked per series, that **widen on hover** while a tooltip shows the per-series breakdown + total. No DS chart does the hover-widen. Verified live on `#/org` and `#/org/entities`. | Charts / Data-viz |
| 5 | Scope switcher (org / project) | `components/TopBar.tsx` | Split control: the name navigates, the chevron opens a switcher dropdown; plus a ✕ that closes the project back to the org (Supabase model). Neither `Breadcrumb` nor `App Header` covers it. | Brand API / core |
| 6 | `PageShell` + `ScopeSuffix` | `components/PageShell.tsx` | Page header: 30px title, muted scope suffix inline, subtitle, right-hand actions, fixed 1136px content column. The DS has no page-header component, so every prototype re-invents it. | Core component |
| 7 | `NavRail` | `components/Sidebar.tsx` | Collapsed icon rail that expands to labels on hover **over** the content, so the layout never shifts; a `gap` item splits "surfaces in this scope" from "ways out of it". DS shadcn `Sidebar` collapses to icons but shifts content and has no hover-expand. | Core component |
| 8 | API key field | inside `components/SetupPrompt.tsx` | Masked value + reveal toggle + copy, in one bordered row. Small and obviously reusable; nothing equivalent. Extract as its own component (working name `SecretField`). | Core component |
| 9 | `SpecNote` | `components/SpecNote.tsx` | PRO-2816 spec annotation: `SPEC` kicker + rich text on `highlight/[0.07]`, globally toggleable. Useful to every prototype as a prototyping aid. | Brand API / prototyping |

## 2. Fold into an existing component — do NOT add a new one

| # | Piece | Folds into | Note |
| --- | --- | --- | --- |
| 10 | `TimeRangeTabs` | `Tabs variant="pill"` | Identical except `rounded-lg` instead of `rounded-full`, 12px text, `bg-muted` active. Either a 4th variant (`pill-square`) or a `size="sm"` on `pill`. Asked the dashboard session whether the squared corners are load-bearing. |
| 11 | `SegmentShareBar` | Charts → **Segmented Bar** / **Proportion Bar** | The bar itself already exists. What is new is the **per-segment hover tooltip** (name + share % + absolute value) and the sibling-dimming to 45%. Add that behavior to the existing segbar. |
| 12 | `EntityAvatar` | `Avatar` | Adds a fallback chain: favicon → type icon (Users/Tag) → first initial, at two sizes. An Avatar extension, not a component. |
| 13 | Split-gradient trend line | `Chart Line` / **Trend Line** | `components/TokenChart.tsx`: the segment after the cursor drops to 28% opacity via a `linearGradient` whose stop offset tracks `activeTooltipIndex` (Revolut-style). A recipe worth documenting on the line-chart page, not a component. |

## 3. Drift — decisions needed, not contributions

**D1 — Vendored surface tokens are forked.** `packages/waldo-ui/src/globals.css` differs from the DS in exactly two lines:

| Token | DS | API Dashboard | Comment in file |
| --- | --- | --- | --- |
| `--background` | `23 24 25` (zinc-950 `#171819`) | `13 13 13` (`#0d0d0d`) | — |
| `--card` | `32 33 35` (zinc-900 `#202123`) | `19 19 20` (`#131314`) | "near-black elevated surface — matches Sana" |

Two mutually exclusive outcomes: either this is an Adveron skin, in which case the override must move out of the vendored package into the app's own layer, or it is a taste change the DS should adopt for everyone. Needs Miguel's call. Asked the dashboard session for its intent.

**D2 — Vendored `dialog.tsx` is stale.** The DS shipped scroll containment in `a3e51a6` (`max-h-[calc(100dvh-2rem)]` + flex column, `shrink-0` header/footer, scrollable `DialogBody`). The vendored copy predates it. The app should re-vendor; no DS action.

**D3 — Adveron brand ≠ Waldo product palette.** The app is Adveron-branded (red mark; `text-destructive` used for command syntax highlighting and inline emphasis in `SetupPrompt`). Waldo product doctrine is "no red in product UI". Nothing to import — flagged so the red does not travel into the DS with the components. Separately, the `adveron` session reports that repo's `:root` sets `--font: Geist` while DS product type is Inter; that disagreement is Adveron's to resolve, not a DS change.

## 4. DS gap this audit exposed (our fault, fix on our side)

`--chart-1..12` ships only in `waldo-ui/waldo-shadcn-theme.css` (HSL), **not** in `waldo-ui/src/globals.css`. Every React consumer therefore has to redeclare the whole ramp — the dashboard duplicates all 12 canonical triplets in `src/index.css` with a comment saying exactly that. The ramp should ship in `globals.css` so `hsl(var(--chart-N))` just works. Owner: Component Library (+ Validador for the catalog).

## 5. `detect.js` on `src/` — 36 errors / 35 warnings

Three rules only, and none of them block promotion (the `ds-candidates/` folder itself is clean):

| Rule | Count | Note |
| --- | --- | --- |
| `arbitrary-radius` | 35 | Almost all `rounded-[20px]` — the app's card radius. DS `.wcard` canon is 16. If 20 is intentional it needs a token; if not, the app should move to `rounded-2xl`. |
| `font-mono-class` | 22 | Mono on non-code UI (Playground, Webhooks). Some are legitimately code/keys. |
| `font-semibold` | 13 | DS caps `text-*` at `font-medium`. |

## 5b. What was actually done (2026-08-13, approved by Miguel)

**Surface ramp — the DS adopts the darker values.** Two new zinc steps added rather than overwriting
the existing ones, so nothing referencing zinc-950/900 moves: `--zinc-990` (#0d0d0d) → `--background`
/ `--surface-default`, `--zinc-975` (#131314) → `--card` / `--surface-elevated`. Landed in
`globals.css` (RGB triplets + the `@theme` block), `waldo-shadcn-theme.css` (`0 0% 5%` and
`240 3% 7.6%` — both round-trip to the exact hexes), `tailwind.config.ts`, `figma/waldo.tokens.json`,
and the surface table in root `CLAUDE.md`.

**Two consequences of the ramp, both measured, both still open — Miguel's call:**

| Cue | Before | After | Loss |
| --- | --- | --- | --- |
| background↔card delta (the ONLY thing drawing a card: `.wcard` has no border, no shadow) | 9 RGB steps · contrast 1.103 | 6 steps · 1.047 | ~43% |
| `shadow-surface` darkening (rgba(0,0,0,0.30) over the page) | 7 steps | 4 steps | ~43% |

`shadow-surface` has four real consumers — tabs (active pill), slider (thumb), tooltip, toast — not
cards, and all four cast onto the page or a card, so none get a reprieve. Text contrast went *up*
(zinc-200 on the background: 11.85 → 12.96). Recommended fix if he wants one: swap the black shadow
for a top inset highlight (`inset 0 1px 0` in a foreground alpha) — on a dark ramp elevation reads
better as a light edge than a dark shadow, and it scales *with* the background getting darker.
Not applied: it would put a visible light edge on every card, which is a look change, not a fix.

**Also generalisable, from the dashboard session:** any `bg-<surface>/<alpha>` hover is a latent bug
on a dark ramp — alpha on a surface token composites toward the backdrop, and the backdrop is now
closer to black, so the hover can *reduce* the affordance. Lighten with `bg-foreground/[…]`. Worth a
line in the surface docs.

**Promoted (10 new components):** PageHeader · EntityChip/EntityChipAdd · SearchTrigger (composes
Kbd) · SecretField · KvPill · ChartTooltipPanel (+ Label/Rows/Row/Total/Caption) · ChartLegendRow ·
DayColumnChart · SparkBars · ShareBar. All in `waldo-ui/src/components/ui/`, exported from
`index.ts`, with `index.html` demos and `usage-doctrine.yaml` entries.

**Folded into existing components:** `Tabs` gained `size="sm"` (12px, py-[7px]) — a time-range row is
`variant="pill" size="sm"`, not a component; radius stays `rounded-full` and the active fill stays
`bg-secondary`, because `bg-muted` is the recessed/disabled role and using it for an active state
inverts the token's meaning. `Avatar` gained `EntityAvatar` (image → type icon → initial chain).
Vanilla: `.wtabs-pill.sm`.

**Deliberately held for wave two:** the breadcrumb scope switcher, NavRail, and SpecNote. Each is a
real pattern but needs an API designed rather than lifted — the switcher is entangled with routing
and scenario state, NavRail hardcodes its nav items and the gap-item grouping, and SpecNote is
coupled to the dashboard's own spec-notes data (it must ship prop-driven, with no content).

**Verification:** `detect.js` 0 errors on all 12 new/changed component files (one accepted warning:
mono type in SecretField, where the value is a credential). `index.html` sits at exactly its
pre-existing 50 errors / 52 warnings — the new demos added none. `tsc` clean on all new files.
`lint-index` 0 orphans, `lint-doctrine` 0 errors, `build-waldo-ds --check` and
`build-component-index --check` both in sync. Every demo verified in the browser with measured
geometry, not just eyeballed: DayColumnChart 22 columns at 6px wide and 62–95px tall with 44 non-zero
stacked segments and a working hover-widen to 24px, SparkBars 30 non-zero bars, ShareBar 4 segments,
and all five component demos non-zero.

Two bugs found and fixed during that verification, both invisible to the linters: the five component
demos had been inserted into a pre-existing unbalanced `<div>` inside `#comp-code-block`, so they
parsed as its children and rendered at zero size (moved to a confirmed direct child of
`#wb-brand-api-main` — the unbalanced div in `comp-code-block` is pre-existing and untouched); and
the DayColumnChart tooltip overflowed 118px above its demo block, fixed by giving the demo the same
card headroom the chart has in production.

**Still owed elsewhere:** `docs/token-catalog.yaml` needs the two new surface hexes (Validador owns
it), and Figma needs the new variables written via MCP (Figma Master, and Miguel's explicit approval).

## 6. Recommended intake order

1. Answer D1 (surface tokens) — it changes what "match the DS" means for everything else.
2. Promote the 4 documented candidates (#1, #2, #3, and #10 folded into Tabs) — the app already keeps them promotion-ready (semantic tokens only, `cn()`, `forwardRef`, Figma node in the header).
3. Promote the shell trio (#5, #6, #7) — highest leverage, since every prototype re-invents them today.
4. Fold in the behaviors (#11, #12, #13) and extract #8.
5. Fix the `--chart-*` gap (§4).

Each promoted piece needs, per protocol: the `.tsx` in `waldo-ui/src/components/ui/`, exports in `index.ts`, `/ds-verify` clean, an `index.html` demo (via the `ds-demo` skill), a `docs/usage-doctrine.yaml` entry, and a regenerated `docs/component-index.md`.
