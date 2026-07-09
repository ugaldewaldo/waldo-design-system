# Waldo Brand Kit

Reusable branded pattern library per marketing content type — social post images, lifecycle emails, video covers, collateral — consumable by both humans and Claude. Lives inside `waldo-design-system` as `brand-kit/`.

**How it works:** Figma is the editing surface; this repo is the consumable artifact. A Claude skill reads `doctrine/` + the samples here to generate new on-brand assets from a prompt, with a human approving before anything is published.

Tracked in Linear: [Marketing Brand Kit](https://linear.app/waldofyi/project/marketing-brand-kit-998c0ffe9a0d) (parent card MAR-2279).

## Structure

| Folder | Contents |
|---|---|
| `DESIGN.md` | Brand tokens + rules, vendored verbatim from the canonical theme in `waldo-agentic` — do not hand-edit; see drift check below |
| `doctrine/` | Usage doctrine per content type: when to use which pattern, what varies, what's fixed |
| `emails/` | Sending-ready HTML templates: base skeleton, welcome, feature announcement / newsletter |
| `social/` | One folder per post pattern: template spec + rendered samples (partnership, launch, stats, quote, event, case study, article, carousel, teaser, video card, recap, reactive) |
| `backgrounds/` | Branded frames for screenshots & screen recordings |
| `collateral/` | Deck slide + one-pager templates |
| `assets/` | Wordmark, textures, fonts — official assets only, never recolored |

## Ground rules (non-negotiable, from DESIGN.md)

- Dark-first: base background `#171819`; teal `#32a9a9` is the product accent
- The marketing-only palette (brand-green/yellow/pink/purple/chrome) lives here and **must never appear in product UI**
- Inter only, no italics; marketing headlines use the `text-display-*` track
- Never white text on `#32a9a9`; CTA chips are green-700 `#2a6c6d` + white, pill-shaped

## Drift check

`DESIGN.md` is a copy of `waldo-agentic/packages/design-system/DESIGN.md`. To verify it hasn't drifted from the canonical source (the script looks for the `waldo-agentic` checkout in `$WALDO_AGENTIC_DIR`, as a sibling of `waldo-design-system`, or under `~/GitHub`):

```bash
node scripts/check-design-drift.mjs
```

Re-copy the file whenever the canonical theme changes.
