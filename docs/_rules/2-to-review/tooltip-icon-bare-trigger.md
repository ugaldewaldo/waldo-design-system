---
rule: tooltip-icon-bare-trigger
captured: 2026-08-13
where: pulseU session — stated while testing the rule pipeline
---

## Said

> los iconos de tooltip nunca lleven fill o borde en el contenedor del boton

## Context

The icon that triggers a tooltip (info / help affordance) sits in a bare button — the trigger
container gets no fill and no border. Miguel did not name a specific surface; verify on drafting
whether this is DS-wide or the Brand API dashboard surface, and whether it covers hover/active
states or only the resting state.

## Draft — canon line

A tooltip's icon trigger is a bare button — no fill and no border on the container, in any state.
The icon alone carries the affordance.

## Scope

Product UI · every surface · the info/help icon that opens a Tooltip

## Tier

should

## Placement

- `docs/usage-doctrine.yaml` → Tooltip entry, `notes`

## Open question

He did not name a surface, and the captured note asks whether this is DS-wide or console-only, and
whether it covers hover and active or only rest. Drafted as DS-wide and all states, since a trigger
that grows a fill on hover is the same visual noise the rule is removing. If he means rest only, the
line loses "in any state".

## Enforcement

Documentation-only. The trigger is composed — `TooltipTrigger asChild` wrapping a `Button`
— so the fill would come from a variant on the child, and a regex would have to know that the
child is a tooltip trigger.

## Violations today

- not audited: the rule was stated while testing the pipeline, with no surface named

## Precedent

`usage-doctrine.yaml:209` already says required information belongs in the UI and not in a tooltip
— canon treats the tooltip as a quiet affordance, which this is consistent with.
