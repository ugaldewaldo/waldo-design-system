# Bugs & findings — PROTOTYPES rebuild QA (2026-07-07)

Everything found while rebuilding the six `waldo-labs/PROTOTYPES/` dashboards
(moodtape, poppi-health, promo-radar, prospector, reception, seddit) and during
Miguel's visual review. One line of truth per bug: where it lives, who owns it,
current status.

## 1. Theme ships no `--fs-3xl` / `--fs-4xl` — KPI numbers render tiny

- **What:** `waldo-ui/waldo-shadcn-theme.css` ends its `--fs-*` ramp at `--fs-2xl` + `--fs-5xl`. `waldo-ds.css` `.k-value` (KPI Stat Card) uses `var(--fs-4xl)` (canonical 30px, `globals.css:219-221`) → falls back to body size (~14px) in every theme-consuming prototype.
- **Found by:** two rebuild agents independently (moodtape, prospector); hit visually by Miguel on reception's KPI strip.
- **Status:** worked around — local guard `.k-value { font-size: var(--fs-5xl) }` (32px) in all 5 affected prototypes. Root fix = VALIDATOR adds the tokens to the theme, then guards come out.
- **Task:** `tasks/validator-add-fs-3xl-4xl-to-theme.md` · **Owner:** VALIDATOR

## 2. Theme defaults to LIGHT mode — prototypes must set `class="dark"`

- **What:** the theme's `:root` block is light; Waldo dark tokens live under `.dark`. 3 of 6 rebuild agents (poppi-health, promo-radar, prospector) shipped `<html lang="en">` without the class → whole dashboard rendered light.
- **Status:** fixed — `class="dark"` added to all 10 affected files. Doctrine gap remains: nothing tells a builder to add the class.
- **Follow-up:** add one doctrine line ("prototypes set `class=\"dark\"` on `<html>`") · **Owner:** Brand API Prototypes (this session, pending Miguel OK)

## 3. Doctrine reference-gallery paths were stale

- **What:** doctrine pointed at `waldo-labs/prospector/` etc. — folders that had moved; the linked files were the originals, not DS versions.
- **Status:** fixed externally (doctrine now links `waldo-labs/PROTOTYPES/…`). No action left.

## 4. Compliance misses in the rebuilt prototypes (all fixed in place)

Agent output violated existing doctrine; caught in review, fixed + verified:

| # | Bug | Where | Fix |
|---|-----|-------|-----|
| 4a | Search left-aligned in a custom 560px shell (doctrine: right-aligned, canonical `.app-search` 360px) | moodtape | Rebuilt as toolbar line: quick links left, `.app-search` right. Doctrine gained the explicit "always `.app-search`, never custom" line |
| 4b | List card pushed its row taller instead of scrolling inside (Biggest movers, 10 rows vs 6-row sibling) | moodtape | `.lb-scroll` cap + inner scroll; both row cards now equal height |
| 4c | Sidebar roster 520px tall, no scroll (doctrine cap ~420px) | seddit (chipotle + glossier) | `max-height: 420px; overflow-y: auto` + `flex: none` on rows (they compressed instead of scrolling) |
| 4d | Toolbar line squeezed: 4px above / 16px below (moodtape had 26/6) | reception, moodtape | Symmetric `24px 0` per the new row-rhythm doctrine rule |

## 5. Doctrine rules added during this QA (so agents stop re-making 4a–4d)

- Search always uses canonical `.app-search` (360px) — never a custom container. (+ `[should]` rule)
- Toolbar line keeps the grid row rhythm: ~24px above/below, symmetric. (+ `[should]` rule)
- List cap made numeric: ~6 visible rows (~420px) is the general scroll trigger. (+ `[should]` rule)
