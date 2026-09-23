---
rule: cards-no-border
captured: 2026-08-13
shipped: 2026-08-13
where: pulseU — while setting up this pipeline
outcome: already canon DS-wide · promoted to [hard] for the Brand API dashboard surface
---

## Said

> las cajas nunca deben llevar borde

Then, on reviewing the draft:

> en el dashboard esa regla es sagrada en los bloques

## Outcome

**Nothing rewritten.** The rule was already canon DS-wide and better worded than any new draft:

- `docs/usage-doctrine.yaml:1884` — `token_rules.surface_elevation`: elevation is carried by surface,
  not shadow; a card or panel is flat, `--card` over `--background`, radius 16, no border, no shadow.
- `docs/usage-doctrine.yaml:755` / `:761` — the Card entry, vanilla `.wcard` and the React `card.tsx`
  alignment of 2026-07-17.
- `docs/brand-api-dashboard-doctrine.md` → `### Card` — "never by a border — kill any injected border".

A fourth wording in `CLAUDE.md` was rejected as drift.

## What changed

`docs/brand-api-dashboard-doctrine.md` — the rule moved tier on Miguel's ruling that it is sacred in
the dashboard's blocks:

- **Removed** from `### Should — strong defaults`: `[should] Do not add a border to cards — elevation only.`
- **Added** to `### Hard — blocking violations` (line 657):
  `[hard] Do not add a border to a card or to any block nested on a card — the whole surface ladder
  separates by elevation, never by a line. Kill injected borders instead of overriding their color.`

Scope widened from cards to cards **plus nested `on-card` blocks**, which is what "los bloques" means
on this surface — the `--background → --card → --muted → --secondary` ladder in full.

Guard: `tools/pre-commit.sh` passed.

## Still open — not part of this ship

1. **`Dialog` carries an undocumented border** (`dialog.tsx:54`, `bg-card border border-border/[0.08]`
   + `shadow-dialog`). A dialog sits over a scrim, not over `--background`, so the surface delta may
   not carry it alone. Either the border is correct and `surface_elevation` needs an overlay
   exception, or it is drift. Captured separately as `dialog-border-exception`.
2. **`CodeBlock`'s border is legitimate and documented** (`usage-doctrine.yaml:526`) but
   `surface_elevation` doesn't name it as an exception, so sessions re-derive it. Folded into the
   same open item.
3. **Enforcement not added.** Proposed but unapproved: a `wcard-border` pattern in
   `token-catalog.yaml` (`match: '\.wcard[^{]*\{[^}]*\bborder\s*:'`, 0 hits today) to catch a
   prototype re-declaring the card class with a line. The React-side regex was tested and rejected —
   `border` + `bg-card` in one class string returns 5 hits, 2 of them the legitimate `CodeBlock` and
   `Dialog` surfaces.
4. **Two live violations in the console app**, now `hard` rather than `should`:
   - `~/GitHub/API-Dashboard/src/pages/Onboarding.tsx:248`
   - `~/GitHub/API-Dashboard/src/pages/Onboarding.tsx:283`

   Both `rounded-xl border border-border/[0.14] bg-card`. Not fixed — different repo, and fixing is
   not this pipeline's job.
   `src/components/DemoSettings.tsx:29` is a warning callout, not a card — left alone deliberately.

Pulse (`pulse-next`) and the DS itself are clean.

## Precedent

- `0e5e5d7` — "Align Card surface with .wcard canon: no border, radius 16"
- `usage-doctrine.yaml:761` — React Card surface aligned 2026-07-17 with Miguel's approval
