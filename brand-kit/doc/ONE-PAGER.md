# Waldo Brand Kit · Social — one-pager

**A pattern library for Waldo's social posts, and an app that turns company signals into ready-to-post content.**

## The problem

Every social post is hand-made from scratch. Output drifts off-brand, quality depends on who makes it, and AI tools produce generic results (purple gradients, glassmorphism, serif headlines) because nothing tells them what Waldo looks like.

## What we're building

**1. The social patterns** — one reusable pattern per post type (teaser, launch, partnership, stats, event, reactive…). Each pattern ships as four artifacts:

| Artifact | Role |
|---|---|
| Figma master | Where a human designs and edits — layout truth |
| HTML render template | How software produces the asset at scale — mirrors the master |
| 2–3 approved samples | What "right" looks like — examples carry what rules can't |
| Doctrine entry | When to use it, what varies (slots), what's fixed, what to avoid |

Fixed anatomy across all patterns: dark `#171819` base, single brand texture, Inter display type, fixed logo zone, 80px margins, `waldo.fyi` footer. Variety comes from the marketing-only palette (one accent family per asset) — the palette that's forbidden in product UI is expected here. A **model-default-traps table** vaccinates AI generation against generic output.

**2. The app** — a radar + generator that closes the loop:

- **Watches** Fathom meetings, Linear, and relevant news (via Waldo's own intelligence — dogfooding).
- **Proposes** post ideas, each mapped to a pattern. User selects, saves, or discards — or creates a new post from a link or text.
- **Generates** on selection: copy in LinkedIn/Twitter variants + the image, rendered deterministically from the pattern's HTML template (no AI image gen — on-brand by construction).
- **Editable until right:** tweak copy, switch pattern, adjust image text, upload own images (screenshots, partner logos) into the pattern's visual slot — the branded frame never breaks.
- **Human approves.** Nothing publishes itself.

## Why it works

- **Figma-first for design, code-first for tokens.** Humans iterate in Figma; every color/type value traces to the drift-checked `DESIGN.md`. No invented colors.
- **Real consumers from day one.** The first two patterns ship for the open call (~Jul 13); the app consumes everything after. No pattern is built without someone needing it.
- **One source of intelligence.** The doctrine files serve a designer in Figma, a Claude session, and the app equally.

## Timeline

| When | What |
|---|---|
| ~Jul 13 | Teaser + launch patterns live (open call) |
| Week of Jul 14 | Volume patterns (reactive/news, partnership, stats, event) + fire test; app v0 (idea radar) starts |
| Week of Jul 21 | App v1 (generate + edit loop) |
| Then | New-post flow (v2); other content types (emails, backgrounds, collateral) get their own slices |

**Where:** `waldo-design-system/brand-kit/` · **Linear:** [Marketing Brand Kit](https://linear.app/waldofyi/project/marketing-brand-kit-998c0ffe9a0d) (MAR-2279) · **Lead:** Miguel
