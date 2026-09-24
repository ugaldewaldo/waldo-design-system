# Adveron Design System — CLAUDE.md

cwd inside `adveron-ds/` → you are **Adveron DS**. Read the root `CLAUDE.md` too;
its rules (English deliverables, no hardcoded styles, never delete, commit small)
apply here unchanged.

## Why this exists

Adveron (Waldo's sister brand) has **no design source of truth**. What ships is
whatever sits in `waldo-agentic/packages/adveron-web`, and it is three layers
stacked on top of each other, none of them owned by design:

| Layer | File in adveron-web | Came from | Who changes it |
|---|---|---|---|
| Base (type, zinc scale, radii) | `src/app/waldo-theme.css` | A vendored copy of the Waldo theme — already drifted (ENG-13888) | Nobody keeps it current |
| Brand colors ("Arcade": mint, yellow) | `src/app/adveron-theme.css` | Ported from the Adveron brand kit (`waldo-labs/public/adveron/brand/brand-kit.css`, `[data-palette="arcade"]`) | Mostly Justin |
| Components (24 files) | `src/components/ui/*.tsx` | Forked from the Waldo registry, then edited (button alone differs ~175 lines) | Tyler, Justin, Jesse |

Since August: Tyler ~144 commits in adveron-web, Justin ~130, Jesse ~60. No designer.

## Goal

Miguel governs Adveron's UI the way he governs Waldo's: this folder becomes the
source of truth, and every change — a new component Claude generates, or a change
someone makes directly in adveron-web — reaches him for approval in a **visual
review app** (not a folder pipeline; he explicitly dislikes the folder system).

## Phases

1. **Baseline + comparison (read-only, needs nobody).**
   - Snapshot what adveron-web ships TODAY into this folder (themes + components +
     whatever they import), from `origin/main` via `git show`, not the working copy.
     Record the waldo-agentic SHA in an `UPSTREAM` file. This is version zero: the
     starting point is reality, not an ideal.
   - A visual page: each Adveron component next to its Waldo counterpart, with its
     change history (author, date, Linear card) and a provenance tag (see below).
2. **Review app.** Every change is a card: before/after rendered with the real
   component, who/when/card, and three actions — **Approve** (becomes official),
   **Edit** (adjust, then approve), **Talk to author** (Claude drafts the message;
   never sent without Miguel's explicit yes). Sources: new components from Claude,
   and changes detected in adveron-web. The rule pipeline and component pipeline
   should eventually live in the same inbox.
3. **Wire adveron-web to consume this folder** the way waldo-agentic already
   vendors the Waldo registry (`packages/design-system/scripts/sync-upstream.sh`),
   so a direct edit there fails their drift guard. Needs Steve's buy-in — arrive
   with Phase 1 done. Because the baseline equals prod, the switch is visually a no-op.

## Decision rule (Miguel, 2026-09-24)

- Miguel must **always find out** when anyone (especially Justin) changes Adveron UI.
- Justin is the boss (~70% weight). If he deliberately decided a change, it is
  negotiated and he probably wins.
- Much of what ships was done by Claude automatically inside unrelated work, not
  decided by anyone. For those, Miguel decides.
- Who decided is usually **unknowable** — so the app shows evidence, never claims
  authorship. Tag each change:
  - **Asked for** — the card or PR title names that visual change
    (e.g. ENG-13442 "drop the backdrop blur from the Adveron dialog overlay").
  - **Side effect** — the visual change rode inside an unrelated PR
    (e.g. `adveron-theme.css` edited in ENG-13089 "request-level usage telemetry").

## Existing pieces to build on

- `../adveron-preview/` — Vite gallery (port 4500) rendering adveron-web's real
  components through a symlink (`adveron-src` → the waldo-agentic working copy).
  Tailwind v4.
- `../waldo-ui/preview/` — Waldo's real-component gallery (port 4400, `npm run preview`).
  Tailwind v3 — so Waldo and Adveron cannot share one page; compare them in iframes.
- Both galleries are section-based (`id`, `title`, `specs`); an `?embed=1&only=<id>`
  mode on each is the simplest way to put them side by side.
- Related Linear context from Steve: ENG-13888 (theme drift), ENG-13894 (upstream
  fixes, landed in ea19548), ENG-12092 (artifact publishes gated on detect.js).

## Status

- 2026-09-24: folder created, context written. Phase 1 approved by Miguel.
- 2026-09-24: Phase 1 built.
  - `baseline/` — verbatim snapshot of adveron-web at the SHA in `UPSTREAM`. Never edit;
    the Waldo detector skips it on purpose.
  - `tools/build-history.js` → `app/history.json` — every change per file, with
    author/date/card/PR and the evidence tag. Re-run after moving `UPSTREAM`.
  - `app/index.html` — the compare page: http://localhost:4501/adveron-ds/app/
    Needs three servers from `.claude/launch.json`: `waldo-ds` (4501, the page),
    `adveron-baseline` (4510), `waldo-ui-preview` (4400).
  - Both galleries accept `?embed=1&only=…&theme=…` (Waldo also `spec=`) and post
    their content height to the parent.
  - Tag heuristic reads commit titles only; it is evidence, not authorship.
