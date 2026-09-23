# <Pattern name> — doctrine template

Copy this file to `<pattern>.md` when a pattern ships. Every section is mandatory; delete the guidance comments.

## What it is

One paragraph: the asset this pattern produces and the shape it takes (e.g. "A 1200×630 landscape image announcing a partnership, built on the partnership master: two logos in lock-up over the brand texture").

## Canonical source

| Field | Value |
|---|---|
| Design master | Figma node link (the editing surface — layout truth lives here) |
| Render template | `social/<pattern>/template.html` (what the generator/app renders — must match the master) |
| Samples | `social/<pattern>/samples/` (2–3 rendered PNGs, approved) |
| Formats | Which of the 5 master formats this pattern supports (feed 4:5, square, OG/landscape, video 16:9, carousel) |

Social/backgrounds/collateral are **Figma-first**: the master is truth, the render template mirrors it. Emails are **code-first**: the HTML skeleton is truth.

## Use when

- 2+ concrete situations that call for this pattern.

## Don't use when

- 2+ situations where a neighbouring pattern is the right call, naming it (e.g. "a product feature ship → use `launch`, not `partnership`").

## Slots (what varies)

| Slot | Type | Constraints |
|---|---|---|
| headline | text | max chars, display size from the master |
| supporting | text | optional? max lines |
| visual | image upload / screenshot / logo | aspect, treatment (framed, masked) |
| meta | text | date, handle, CTA chip |

Everything not listed here is FIXED by the master: background, texture, margins, logo zone, footer, type ramp.

## Rules

- Accent family for this pattern (one of the marketing palette) and why.
- Copy guidance: voice, length, what the headline must contain.
- Any per-format deviations.

## Don'ts

- Pattern-specific traps beyond `model-default-traps.md` (which always applies — don't restate it here).
