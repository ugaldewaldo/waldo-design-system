---
rule: source-cards-never-two-columns
captured: 2026-08-13
where: pulseU — newsletter/prospect source cards with expandable "Draft outreach" panel
---

## Said

> este tipo de componente nunca en 2 columnas

## Context

Screenshot of two newsletter source cards (Link in Bio, ICYMI) laid out side by side in a
2-column grid. The "Draft outreach" panel expands inside one column only, so the cards end up
with mismatched heights and the monospace draft text is squeezed into a narrow measure. Miguel's
call: this card type is always a single full-width stacked list, never a 2-column grid.

## Already fixed in pulseU (2026-08-13, on his instruction)

Partnerships was the only agent tab still on the two-up wrapper; every other agent card with a
draft (conversations, content-ideas, creative-ideas, offers, effectiveness) already used the
single-column one. Fixed in both copies — `partners.js` now calls `itemList`, and the `itemGrid`
helper plus the `.panels.duo` CSS were removed since nothing else used them. Verified in the
browser: one column, 862px, draft box full width.

## Draft — canon line

A source card that can expand a panel is always a single full-width stacked list — never a
two-column grid, which leaves the rows mismatched in height and squeezes the expanded panel into
half a measure.

## Scope

Product UI · Pulse agent surfaces · source / prospect cards with an expandable draft panel

## Tier

should

## Placement

- `docs/usage-doctrine.yaml` → that card's entry, under `dont_use_when`

## Enforcement

Documentation-only. The grid is a wrapper choice one level above the card, so the card's own markup
carries no trace of it.

## Violations today

None — fixed in pulseU on his instruction the day it was captured. Partnerships was the last agent
tab on the two-up wrapper; `partners.js` now calls `itemList`, and the `itemGrid` helper plus the
`.panels.duo` CSS were removed since nothing else used them.

## Precedent

None in canon. First rule about this card type.
