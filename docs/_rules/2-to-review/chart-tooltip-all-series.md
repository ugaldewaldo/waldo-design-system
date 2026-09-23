---
rule: chart-tooltip-all-series
captured: 2026-08-13
where: pulseU — stacked bar chart tooltips (pulse-next/core.js, pulse-next/index.html)
---

## Said

> los tooltips en estas graficas no deben mostrar solo la seccion del hover deen mostrar todas las secciones con sus labels de colores y hacer algun enfasis en la que se esta haciendo el hover

## Context

Looking at the Pulse topic/stacked bar charts. Hovering a segment showed a tooltip with only that
one series ("productivity → OpenAI: 15 posts"), so the reader loses the composition of the bar and
can't compare segments without hovering each one. He wants the full breakdown — every series with
its color swatch and label — with the hovered segment visually emphasized.

## Draft — canon line

A stacked or grouped chart's tooltip shows every series in the hovered column — each with its
colour swatch, label and value — and emphasises the hovered one. Never the hovered series alone,
which hides the composition the chart exists to show.

## Scope

Product UI · Brand API charts · stacked and grouped bar/area charts

## Tier

should

## Placement

- `docs/brand-api-dashboard-doctrine.md` → the charts section, tagged `[should]`

## Enforcement

Documentation-only. Tooltip content is assembled in a render callback; there is no honest pattern to
match, and a regex that looked for one would need to understand what the callback returns.

## Violations today

- fixed in pulseU at capture time (`pulse-next/core.js`)
- not audited in the console

## Precedent

`docs/usage-doctrine.yaml:997` already carves out numeric tooltip values as the documented mono
exception, so tooltips are a surface canon already speaks about.
