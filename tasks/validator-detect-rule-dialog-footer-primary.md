# Change request — detect.js rule: no green primary CTA in dialog footers

**From:** Brand API Prototypes session · 2026-07-17
**To:** VALIDATOR
**Status:** todo

## Problem

Agents keep putting the green primary button (`btn-default` / `bg-primary` fill) as the CTA inside dialog footers. The DS rule is the opposite: dialog footer primary CTA = `btn-white` (usage-doctrine.yaml → Button notes + Dialog STRUCTURE). It happened again on 2026-07-17 (Create API Key modal in another session; 6 more instances found and fixed across waldo-labs prototypes).

Docs alone don't stop it — root CLAUDE.md now carries the exception, but we want a mechanical gate.

## Requested rule

New detect.js rule (suggested id: `dialog-footer-green-cta`):

- **Flag** any button with primary green fill inside a dialog footer container:
  - HTML: `class` containing `btn-default` (or `btn` with no variant resolving to primary) as a descendant of `.wdialog-footer`, `.dialog-footer`, or `DialogFooter`
  - Tailwind/tsx: `bg-primary` button inside `<DialogFooter>`
- **Allowed** in footers: `btn-white` (primary CTA), `btn-outline` / `btn-ghost` / `btn-bare` / `btn-secondary` (secondary), `btn-destructive` (destructive confirmations only)
- Severity: error (same tier as svg-var-attr) so guard + CI block the commit.

## Reference

- usage-doctrine.yaml → Button: "white variant for dialog footers (44px, 192px wide)"
- usage-doctrine.yaml → Dialog STRUCTURE: "Footer: space-between layout. Primary CTA = btn-white 44px × 192px (right)."
- Canonical recipes in index.html (all 15 dialog recipes use btn-white / btn-destructive).
