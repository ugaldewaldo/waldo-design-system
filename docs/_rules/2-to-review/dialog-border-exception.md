---
rule: dialog-border-exception
captured: 2026-08-13
where: surfaced while shipping cards-no-border
---

## Said

Not stated by Miguel — surfaced as an open question and left for him.

## Context

`token_rules.surface_elevation` (`docs/usage-doctrine.yaml:1884`) says a card or panel is flat: no
border, no shadow, the `--background`↔`--card` delta is the whole affordance. Two components use
`bg-card` **with** a border:

- `waldo-ui/src/components/ui/code-block.tsx:34` — `border border-border/[0.08]`.
  **Documented** at `usage-doctrine.yaml:526`, so it is a legitimate exception the rule doesn't name.
- `waldo-ui/src/components/ui/dialog.tsx:54` — `border border-border/[0.08]` + `shadow-dialog`.
  **Not documented anywhere.** A dialog sits over a scrim rather than over `--background`, so the
  surface delta that carries a flat card may genuinely not carry it here.

Two possible rulings, both need Miguel:

1. The dialog border is correct → `surface_elevation` gets an overlay exception naming Dialog and
   CodeBlock, and the rule stops reading as absolute when it isn't.
2. It is drift → the border comes out of `dialog.tsx`, which is an atomic component change and needs
   his explicit approval per the GOLDEN RULE.

Either way the exceptions belong written down: right now every session re-derives whether a bordered
`bg-card` surface is legal, and that ambiguity is what made a React-side detect regex unusable
(2 of 5 hits were these two components).

## ⚠ CONFLICT — needs Miguel, this is a question and not a rule he stated

Two canon lines disagree and nothing in the repo settles it.

- `docs/usage-doctrine.yaml:1884` (`token_rules.surface_elevation`) — a card or panel is flat: no
  border, no shadow; the `--background` ↔ `--card` delta is the whole affordance.
- `waldo-ui/src/components/ui/dialog.tsx:54` — `bg-card` **with** `border border-border/[0.08]` and
  `shadow-dialog`. Undocumented.
- `waldo-ui/src/components/ui/code-block.tsx:34` — `bg-card` with a border, and this one **is**
  documented, at `usage-doctrine.yaml:526`.

## Draft — canon line, ruling A (the dialog border is correct)

Surfaces are flat, with two named exceptions: a Dialog and a CodeBlock carry
`border-border/[0.08]`, because neither sits over `--background` — a dialog sits over a scrim and a
code block over a card — so the surface delta that carries a flat panel does not carry them.

## Draft — canon line, ruling B (it is drift)

Surfaces are flat, with one named exception: CodeBlock. The Dialog border comes out of
`dialog.tsx`.

## Scope

Product UI · React `Dialog` + `CodeBlock` and their vanilla equivalents

## Tier

hard — `surface_elevation` is already hard, and an unnamed exception makes it read absolute when it
is not

## Placement

- `docs/usage-doctrine.yaml` → `token_rules.surface_elevation` (edit in place, either ruling)
- Ruling B additionally: `waldo-ui/src/components/ui/dialog.tsx:54` — an atomic component change,
  which needs his explicit approval per the GOLDEN RULE

## Enforcement

Ruling A unblocks a React-side regex for a bordered `bg-card`: today 2 of its 5 hits are these two
components, so the rule cannot be enforced while the exceptions are unwritten. Propose the regex
only once the ruling lands.

## Violations today

Not violations — the two components above are the ambiguity itself.

## Precedent

`cards-no-border` shipped without settling this; it is what surfaced the question.
