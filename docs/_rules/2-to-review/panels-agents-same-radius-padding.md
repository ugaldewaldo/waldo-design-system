---
rule: panels-agents-same-radius-padding
captured: 2026-08-13
where: pulseU — panel surfaces vs agent cards (screenshot crops of a panel corner and an agent card corner)
---

## Said

> el radio y los padings de los paneles y los de los agentes no parecen iguales , deben ser iguales en todos lados

## Context

Reviewing pulseU: two zoomed crops side by side — a panel corner (dark surface, "Ad volu…" label)
and an agent card corner (rounded surface, "Day 47 / Sprout S…"). The corner radius and the inner
padding read visibly different between the two surface types. He wants one radius and one padding
for every card/panel surface, no per-surface variation.

## Draft — canon line

Every card and panel surface shares one radius and one padding — a panel and an agent card are the
same surface and must not differ.

## Scope

Product UI · all card and panel surfaces

## Tier

should

## Placement

- `docs/brand-api-dashboard-doctrine.md` → the surfaces section (near :375, which already says
  separation is never a border and that radius, padding and gaps come from the scale), tagged
  `[should]`

## Enforcement

Documentation-only, and deliberately so: the values live in tokens, and the failure is two surfaces
picking different tokens — both legal in isolation. A regex sees one class at a time and cannot
compare two surfaces.

## Violations today

- not audited: the capture is pulseU, and the crops were visual

## Precedent

`docs/brand-api-dashboard-doctrine.md:375` already says radius and padding come from the scale;
this adds that two surfaces of the same kind must land on the same step of it.
