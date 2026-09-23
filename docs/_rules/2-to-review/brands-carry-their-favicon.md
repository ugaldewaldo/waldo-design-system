---
rule: brands-carry-their-favicon
captured: 2026-08-26
where: waldo-agentic / packages/adveron-web — the Subscriptions cards on the Adveron console overview, drawn by ResourceIdentityCell + ResourceMark (components/resource-identity.tsx)
---

## Said

> Recuerda que las marcas tienen que llevar el Favicon

## Context

The overview's Subscriptions cards list three brands (Blue Bottle, Stumptown, Onyx Coffee Lab) beside
a category and an audience. The brand rows were rendering the lettered fallback square — a grey "B",
"S", "O" — because the preview fixture carried `logo_url: null`, so three brands read as three
placeholders rather than three recognisable companies.

Said while looking at those cards. The mark component already supports an image with a lettered
fallback on load failure; the rule is about which of the two is the INTENDED look for a brand, and
that the icon is the site's own favicon rather than an uploaded logo asset.

Categories and audiences have no such icon and are lettered by design — the rule is brand-scoped.

## Draft — canon line

A tracked brand is drawn with its own favicon; the lettered square is the failure state, not the
resting look. Categories and audiences have no icon and stay lettered by design.

## Scope

Product UI · Brand API console · `ResourceIdentityCell` / `ResourceMark`

## Tier

should

## Placement

- `docs/usage-doctrine.yaml` → the resource-identity entry at :134, which already describes the
  three levels of available art — add which level a **brand** is expected to reach, and that the
  letter is a fallback

## Enforcement

Documentation-only. Whether a mark renders as an image or a letter depends on the row's data
(`logo_url`), not on the markup, so no regex over source can see it. The failure in the capture was
a fixture with `logo_url: null`, which is a fixture bug a linter would never catch.

## Violations today

- not audited: the consumer is `waldo-agentic / packages/adveron-web`, outside this repo

## Precedent

`docs/brand-api-dashboard-doctrine.md:547` already sanctions favicons as remote assets and gives the
service and size — this names when a brand is *expected* to carry one.
