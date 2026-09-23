---
rule: modals-follow-console-dialog
captured: 2026-08-13
where: pulseU/pulse-next/index.html (Remix + Settings modals) vs API-Dashboard AddEntityDialog
---

## Said

> los modals no siguen el standard de los modales del dasboard
>
> el de la dreche deberia de ser el nuevo estandard el correcto

## Context

Comparing two screenshots side by side: Pulse's "Remix this dashboard" modal (left) against the
console's "Add entity" dialog (right). The right one — the `Dialog` component in
`API-Dashboard/packages/waldo-ui/src/components/ui/dialog.tsx` — is the standard every modal on every
Waldo surface should follow: 32px radius, 32px side padding with 28 top/bottom, a 20px/500 title over
a 14px muted description, a 24px round close at 20/20, and actions in a right-aligned footer
(secondary `outline` first, primary `white`, both 44px pills) instead of a full-width fill.

Pulse's five modals were rebuilt to that anatomy in the same session (`pulse-next/index.html`
`.dialog` block + the new `.dlg-foot` wrapper, logged in `pulse-next/RESTYLE.md`).

## Draft — canon line

Every modal on every Waldo surface is the console `Dialog`: 32px radius, 32px side padding with
28 top and bottom, a 20px/500 title over a 14px muted description, a 24px round close at 20/20, and
a right-aligned footer — secondary `outline` first, primary `white`, both 44px pills. Never a
full-width fill.

## Scope

Product UI · every modal, every surface — console, Pulse, prototypes

## Tier

hard

## Placement

- `docs/usage-doctrine.yaml` → Dialog `notes` (extend :388, which already gives the footer)
- `CLAUDE.md` → `## ⛔ ABSOLUTE RULES` — one line pointing at Dialog as the single modal anatomy

## Enforcement

Documentation-only. A modal that ignores the standard is usually hand-rolled markup rather than a
misused component, and matching "a div that behaves like a dialog" is not something a regex can do.
The honest gate is the existing `lint-index.js` rule that every demo be backed by a real `.tsx`.

## Violations today

- fixed in pulseU at capture time — five modals rebuilt to the anatomy (`pulse-next/index.html`
  `.dialog` + the new `.dlg-foot`, logged in `pulse-next/RESTYLE.md`)
- not audited elsewhere

## Precedent

`usage-doctrine.yaml:388` already fixes the footer; `CLAUDE.md:228` already makes the dialog footer
the one place the primary is `btn-white`. This generalises the rest of the anatomy.
