---
rule: badge-weight-medium
captured: 2026-09-09
where: waldo-labs / public/adveron/adveron-dahboard/Cases2/compact — the Try-Adveron result pages
---

## Said

> cuál es la puta cuerpo de la tipografía de los badges es así de gruesa o es más ligera no lo entiendo
> puedes ajustar el Design System a que sea más baja, quizá 500 u 400
> esto me parece correcto se puede cambiar al Design System

## Context

Reviewing the compact result layer over the captured Adveron dashboard. The taxonomy chips on
`GET /v1/brands/{id}/creative-patterns` carry long hyphenated tokens — `customer-success-proof`,
`social-proof-case-study` — and at `text-xs` / 600 they read too heavy. Shown 600 / 500 / 400 side
by side, he picked 500 and confirmed it should go into the DS. He then checked that the outline
variant carries the same weight as the filled one: it does — every badge on the page computes to
500, 12px, Inter.

Currently 600 in three places: `waldo-ds.css` `.badge` (147, 408),
`tools/waldo-ds.styles.css` (139, 400), and `waldo-ui/src/components/ui/badge.tsx` base classes
(`font-semibold`).

## Draft — canon line

Badges are `font-medium` (500) at `text-xs` on `tracking-[-0.01em]`, and `rounded-full` at every
size. Colour and fill carry the variant; weight and shape never vary between variants.

## Scope

Product UI · React `Badge` + vanilla `.badge`

## Tier

should

## Placement

- `waldo-ui/CLAUDE.md` → `### Badge` (new section, mirroring `### Button`)
- `tools/waldo-ds.styles.css` → `.badge` (source; `waldo-ds.css` regenerated)
- `waldo-ui/src/components/ui/badge.tsx` → base classes

## Enforcement

Documentation-only. `font-semibold` on a Badge is a `className` override or a variant edit, and a
regex over `className` composition would either miss it or fire on every other component that
legitimately uses `font-semibold`. The `### Button` rule next to it is documentation-only for the
same reason.

## Violations today

- `waldo-ui/src/components/ui/badge.tsx` — base was `font-semibold`, `size="sm"` was `rounded-sm`
  (both fixed in this pass, since they are the component itself, not a consumer)
- consumers not audited in this pass

## Precedent

`### Button` already reads "Never use `font-semibold` on buttons" — the same law, one component
over.

## Landed

Approved in chat, 2026-09-09: "vamos a cambiar el Design System, que todos los badges tengan 500
no 600".

- `waldo-ui/CLAUDE.md:64` — `### Badge`
- `tools/waldo-ds.styles.css:139,400` — `.badge { … font-weight: 500 }`
- `waldo-ds.css:147,408` — regenerated via `tools/build-waldo-ds.sh`
- `waldo-ui/src/components/ui/badge.tsx:6` — `font-semibold` → `font-medium`
- `waldo-ui/src/components/ui/badge.tsx:20` — `size="sm"` no longer overrides the pill with
  `rounded-sm`

`bash tools/pre-commit.sh` → 0 errors.
