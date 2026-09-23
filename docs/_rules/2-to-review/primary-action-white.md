---
rule: primary-action-white
captured: 2026-08-13
where: pulseU — asked which surfaces get the green button, right after reviewing a green "Remix dashboard" primary
---

## Said

> la accion principal debe ir en blanco

## Context

Reviewing a teal/green primary button ("Remix dashboard") in pulseU and asking when green buttons
apply. Canon today makes green-700 the default primary fill and `btn-white` only the dialog-footer
exception — this generalizes white to the primary action everywhere. Potential conflict with
`CLAUDE.md` brand-green section and `docs/usage-doctrine.yaml` → Button notes.

## ⚠ CONFLICT — needs Miguel

This generalises what canon currently scopes to one place.

- `CLAUDE.md:227` — `green-700: #2a6c6d` → **default button fill + white text** (6.06:1 AA)
- `CLAUDE.md:228` — "⚠ **Dialog footers are the exception:** the primary CTA inside a dialog/modal
  footer is `btn-white`, never the green primary fill."
- `docs/usage-doctrine.yaml:22` — "DEFAULT FILL: green-700 #2a6c6d + white text (6.06:1 AA)."

The captured rule — "la acción principal debe ir en blanco" — makes white the primary everywhere,
which inverts the default and turns the dialog footer from an exception into the norm.

## Draft — canon line, if he confirms

The primary action is `btn-white` on every surface. Green-700 stops being the default button fill
and becomes a variant.

## Scope

Product UI · React `Button` + vanilla `.btn`

## Tier

hard — it decides what "primary" means, and every surface reads it

## Placement

- `CLAUDE.md:227–228` — edit in place; the dialog-footer exception dissolves into the general rule
- `docs/usage-doctrine.yaml:22` — Button notes, edit in place
- `waldo-ui/src/components/ui/button.tsx` — `defaultVariants`; an atomic component change, so his
  explicit approval is needed per the GOLDEN RULE

## Enforcement

Documentation-only at first. Flipping a default variant makes every existing green primary a
violation on the same day, and a new `error` that blocks everyone's pre-commit is worse than a
warning that gets fixed. Promote once the consumers are clean.

## Violations today

Every green primary in the kit and in both consumer repos — uncounted, because the count only
means something after he rules.

## Precedent

`CLAUDE.md:235` already rejects `#1b8c8c` as a product fill on contrast grounds, so the green
default has been narrowed once before.
