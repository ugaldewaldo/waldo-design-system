# Model-default traps — assets edition

What an AI model emits by default for a "nice marketing asset" vs. what Waldo requires. Read this BEFORE generating any social image, email, background, or collateral. These are vaccines against the wrong, not just rules for the right — every entry is a failure mode observed in real generated output.

All values trace to `../DESIGN.md` (vendored, drift-checked). Never invent a color, weight, or size that isn't there.

| # | Model default (trap) | Waldo requirement |
|---|---|---|
| 1 | Purple/blue gradient backgrounds | Near-black base `#171819`, flat or with the single approved brand texture. Purple `#813aef` exists in the marketing palette but as a deliberate accent, never a gradient wash |
| 2 | Glassmorphism, frosted blur cards | Flat elevated surfaces (`#202123`), hairline borders. No blur, no translucency stacks |
| 3 | Elegant serif or italic for headlines | Inter only, no italics anywhere. Headlines use the display track (`text-display-*`, tracking -0.04em) |
| 4 | Neon glow / cyan bloom around accents | Teal `#32a9a9` used sparingly as a solid accent. No glows, no outer shadows as decoration |
| 5 | White text on teal fills | Dark `#171819` text on teal `#32a9a9` (6.25:1). White only on green-700 `#2a6c6d` (6.06:1). Never cross them |
| 6 | A different color per element ("rainbow dashboard") | ONE accent family per asset, chosen from the marketing palette (brand-green `#63dbdb` / brand-yellow `#fac034` / brand-pink `#d40a60` / brand-purple `#813aef` / brand-chrome `#bdd8d8`) by content family — see per-pattern doctrine |
| 7 | Everything centered, symmetric hero composition | Editorial left-aligned grid, fixed 80px margins, generous negative space. One message per asset |
| 8 | Generic stock photography / 3D blob illustrations | Real product screenshots inside branded frames (`../backgrounds/`), textures, or typography-led compositions. No stock imagery |
| 9 | Emoji in headlines and body | No emoji in rendered assets. Plain typographic hierarchy carries the tone |
| 10 | Logo recolored, stretched, or dropped anywhere | Official wordmark from `../assets/` only, never recolored, placed in the fixed logo zone defined by the Figma masters |
| 11 | Red for urgency / alerts | No red. Coral `#de3a28` is a product-destructive token, not a marketing color. Urgency is carried by copy and hierarchy, not color |
| 12 | Rounded-everything + heavy drop shadows | Restrained radii per the masters; shadows only where the master defines elevation |
| 13 | Busy layouts that fill every corner | If it doesn't serve the one message, remove it. Density is a product-UI virtue, not a marketing one |
| 14 | Tiny illegible footer / missing attribution | Fixed footer with `waldo.fyi` per the master spec — always present, always legible |
| 15 | Product-UI accent habits carried over (teal on every interactive-looking element) | Marketing assets are not product UI. Teal stays the brand thread; variety comes from the marketing palette, which is FORBIDDEN in product but expected here |
| 16 | Bold-everything numbers and labels | Data reads light: thin strokes, regular (400) weights for figures, bold reserved for the single headline |

## The inversion to remember

The product DS and the brand kit share DNA but invert two rules:

- **Marketing palette** (brand-*): forbidden in product UI → expected here (one family per asset).
- **Display typography** (`text-display-*`): forbidden in product UI → the headline track here.

Everything else — Inter only, no italics, no red, dark-first, contrast marriages, official wordmark — is identical on both sides.
