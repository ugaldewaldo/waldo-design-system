# Change request — detect.js: typography drift rules + ship detector with @waldo/ui

**From:** Brand Kit session · 2026-07-17
**To:** VALIDATOR
**Status:** todo

## Problem

The Brand Kit calendar app (`~/GitHub/Brand-kit`, external consumer of `@waldo/ui`) consumes the DS correctly at the token/component level — imports `globals.css`, the Tailwind preset, and real components (Button, Badge, Card, NavItem, SegmentedControl) — yet visually reads as a different product. The drift is entirely typographic, and detect.js is blind to it:

- 11× `font-mono` on UI labels (sidebar, section titles, tags) — DS allows mono only for code, shortcuts, hex values, token names
- 39× arbitrary pixel sizes (`text-[9.5px]`, `text-[13.5px]`, `text-[10px]`…) instead of the `text-*` ramp
- 2× `font-black` (900) — DS weight cap is bold, and `text-*` styles cap at semibold

Colors were clean, so the current detector passes the file untouched. Typography is now the biggest unguarded drift vector.

## Requested rules

Three new detect.js rules (Tailwind-class level, apply to `.tsx`/`.html`):

1. `font-mono-ui` — flag `font-mono` (or `font-family` mono values in CSS) outside allowed contexts (code snippets, kbd shortcuts, hex swatches, token-name docs). Severity: error.
2. `arbitrary-text-size` — flag `text-[Npx]` / `text-[N.Npx]` when a `text-*` ramp step exists. Severity: error. (Consider a warning tier for values with no near ramp step.)
3. `font-weight-cap` — flag `font-black` / `font-extrabold` (and CSS `font-weight: 800|900`) in UI context. Display track for marketing heros stays allowed per typography rules. Severity: error.

## Second half — the guard only protects this repo

External consumers (like `~/GitHub/Brand-kit`) never run the pre-commit guard or CI. Request: ship the detector with the `@waldo/ui` package (bin entry, e.g. `npx waldo-ds-lint <dir>`) so any repo that installs the package can run the same checks and wire them into its own pre-commit. Rules should keep coming from `token-catalog.yaml` (bundled or fetched) so there is one rule source.

## Reference

- Root CLAUDE.md → "Typography — Inter only, no exceptions" + "Two tracks — never mix"
- waldo-ui/CLAUDE.md → Button: "Never use font-semibold on buttons" (weight discipline precedent)
- Live example of all three violations: `~/GitHub/Brand-kit/src/App.tsx` (as of 2026-07-17, pre-cleanup)
