---
rule: table-small-size
captured: 2026-09-09
where: waldo-labs / public/adveron/adveron-dahboard/Cases2/compact — the Try-Adveron result pages
---

## Said

> Es posible bajar la tamaño de la letra no sé si esto sigue el Design System pero está muy grande
> ya tenemos que tener dos tamaños si es que solo tenemos uno
> puedes bajarlo aun poco el de 14
> me gustaria que el header este tambien mas pequeño y sea el color mas ligero

## Context

Reading `GET /v1/brands/{id}/executives` and `/platforms` inside the result panel. The table is at
the DS size — `th` 12px/500/uppercase, `td` 14px/400, `h-8` rows — and it is correct, but it is
too big for a table sitting inside an answer panel. `Table` is the only component of its family
with no `size` prop: `Badge`, `Button` and `DataTable` all ship `sm`.

Values applied provisionally in the prototype's own sheet: head 11px at 45% foreground in a 28px
row, body 13px on 6px vertical padding.

## Draft — canon line

`Table` ships a `size` prop like the rest of its family. `sm` is head `11px` at 45% foreground in a
28px row, body `13px` on 6px vertical padding; `default` is today's `text-xs` head and `text-sm`
body on `h-8`.

## Scope

Product UI · React `Table` + vanilla `.wui-table`

## Tier

should

## Placement

- `waldo-ui/CLAUDE.md` → `### Table` (new section)
- `docs/usage-doctrine.yaml` → Table entry at :218, `notes`
- `waldo-ui/src/components/ui/table.tsx` — adding the variant is an atomic component change and
  needs his explicit approval per the GOLDEN RULE
- `tools/waldo-ds.styles.css` → a `.wui-table.is-sm` modifier, then `bash tools/build-waldo-ds.sh`

## Open question

11px and 13px are **off the token scale** — it runs 12 / 14 / 16 and has no step between. Either
the scale gains two steps, or the variant is written as the two off-scale values with that noted.
`/ds-add-token` is the right pipeline if he wants them as tokens.

## Enforcement

Documentation-only. There is nothing to forbid: the rule adds a capability rather than banning one.

## Violations today

None. Consumers that want a small table today hand-roll it — the Try-Adveron prototype does exactly
that, in `Cases2/compact/compact.css`, and that block is marked provisional so it can be deleted the
day the variant lands.

## Precedent

`Badge`, `Button` and `DataTable` all ship `sm`. `Table` is the only one of the family that does
not — `usage-doctrine.yaml:231` already records one Waldo extension to shadcn's Table
(`stickyHeader`), so extending it again is in keeping.
