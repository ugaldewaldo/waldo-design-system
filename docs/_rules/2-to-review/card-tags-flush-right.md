---
rule: card-tags-flush-right
captured: 2026-08-13
where: pulseU / pulse-next — agent item cards, `.acard .ph` (title line with `.role` tags)
---

## Said

> los tags siempre a la derecha no seguido del titulo

## Context

Reviewing the Conversations agent cards in pulse-next. `.acard .ph` had been set to
`justify-content:flex-start`, so the `r/FacebookAds` tag rendered immediately after the
thread title instead of sitting flush right on the same line.

## Draft — canon line

On a card's title line, tags sit flush right — never immediately after the title.

## Scope

Product UI · any card whose header line pairs a title with tags or chips

## Tier

should

## Placement

- `waldo-ui/CLAUDE.md` → `### Card` (new section — no Card section exists yet)

## Enforcement

Documentation-only. The failure is `justify-content: flex-start` on a header row, and that property
is legitimate on most rows in the kit; a regex for it would fire on dozens of correct uses and say
nothing about whether the row holds a title and a tag.

## Violations today

- fixed in pulseU at capture time (`.acard .ph`)
- not audited elsewhere

## Precedent

None in canon. This is the first rule about card header composition.
