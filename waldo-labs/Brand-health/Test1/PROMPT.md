# Build "Poppi · Brand Health" — a single-page brand-health dashboard

Build a single-page **brand-health dashboard for Poppi** (the prebiotic-soda brand) as one
self-contained `index.html` — vanilla HTML/CSS/JS, no framework, no build step. All copy in
**English**. Dark, high-density, tool-aesthetic product UI. Follow this brief exactly — do not
add, remove, or reorder sections, and do not invent data beyond what is specified.

---

## 0 — Doctrine & components — MUST / MUST NOT

**MUST**
- **MUST read `docs/brand-api-dashboard-doctrine.md` before writing a single line** and
  obey it in full — DS linking, tokens, color and opacity rules, component discovery &
  reuse, the missing-component procedure, the validation gate. Take all styling mechanics
  from there — never from memory.
- **MUST read `docs/component-index.md` before building any element** and reuse the
  existing component/chart for every piece of this brief — **including the hero rings
  and the scrubber** — per the doctrine's resolution order. This brief makes no claims
  about what exists in the DS; the index is the only authority on that. Report whatever
  you end up creating.
- **MUST pass the doctrine's validation gate** on `waldo-labs/brand-health-x/` before
  reporting done, and **report any component you had to create as a DS gap**.

**MUST NOT**
- **MUST NOT invent extra widgets, sections, data, or color semantics** beyond this brief
  and the doctrine.
- **MUST NOT deviate from the doctrine's token and reuse rules** — if this brief and the
  doctrine ever seem to conflict on styling mechanics, the doctrine wins; this brief only
  owns the design (structure, content, geometry, interactions).

---

## 1 — The core concept

The dashboard resolves the brand's health into three scores with an explicit formula:

> **Resonance = (Reputation + Presence) / 2**

- **Reputation** (input) — how the world *feels* about the brand: sentiment across social + news. 0–100.
- **Presence** (input) — the brand's *share of voice* in its category conversation. Shown as **% SOV**.
- **Resonance** (outcome) — the headline number, the hero of the page.

"Two inputs → one outcome" must be legible at a glance and reinforced everywhere
(hero rings, tab order, coach impact tags).

---

## 2 — Data model (synthetic but deterministic)

Generate all time-series from a **seeded PRNG** (e.g. mulberry32 with a fixed seed) so the
numbers are identical on every reload.

- **90 days of daily data** for **Poppi + 3 competitors + a category median**. Competitors:
  **Olipop** (bigger — more mentions/SOV), **Liquid Death** (smaller, highest sentiment),
  **Recess** (smallest). Per brand per day: `reputation` (~76–84), `presence` (SOV 0–1),
  `resonance` (derived via the formula), `mentions`, `sentiment_pos` (%), `ad_count`.
  Poppi trends gently upward; inject 1–2 event spikes (Pepsi-Prebiotic launch ≈May 11;
  an Olipop flavor drop).
- Support **aggregation by day / week / month**.
- Anchor "now" to a **fixed datetime (May 18, 2026, 2pm)**; compute all relative
  timestamps ("3d ago") from it.
- Presence-as-score for the ring: `min(100, SOV × 250)`.

### Fixed content (the actual Poppi story — use exactly this)

**Discussion themes** (volume + sentiment): Gut health / prebiotic (pos, biggest),
Soda alternative (pos), Mini-can flavors (pos), BÉIS × Poppi collab (pos),
Lawsuit / settlement (neg), Pepsi Prebiotic entrant (mixed), Walmart pricing (mixed),
Category saturation (mixed), Stevia aftertaste (neg).

**Complaint clusters** (frequency × intensity → risk): Price creep at retail (0.31 / 0.62),
Too sweet for daily (0.24), Stevia aftertaste (0.19), Class-action lawsuit confusion
(0.18 / **0.71 — highest intensity**), Pepsi-knockoff perception (0.14),
Category-saturation fatigue (0.11).

**Sentiment by platform** (pos/neu/neg/mix + volume): TikTok (72% pos, 3.1k),
Instagram (68%, 2.2k), News (78%, 620), YouTube (71%, 500), Reddit (61%, 980, more neg),
X (54%, 1.48k, most neg).

**Competitor compare table**: Poppi (`you`) — 8,940 mentions, 69.4% sent, 124 posts,
4.2% eng, 47 ads, 32% SOV; Olipop — 11.4k, 62%, 142 posts, 3.6%, 52 ads, 41% SOV;
Liquid Death — 5.8k, 71.5%, 98 posts, 5.4%, 38 ads, 18% SOV; Recess — 2.4k, 64%,
56 posts, 3.0%, 18 ads, 9% SOV; + a Category median row.

**Voice-of-customer** — Loves: "Replaced my Diet Coke habit" (0.42), "Doesn't make me
feel bloated" (0.34), "Mini cans are perfect" (0.26), "Aesthetic for the fridge" (0.18).
Pains: "Price creep" (0.31), "Too sweet for daily" (0.24), "Lawsuit confusion" (0.18),
"Pepsi just copied them" (0.14). Each with a short verbatim quote.

**Switch-from sources**: Diet Coke (0.34 — gut issues + aspartame anxiety + flavor variety),
Kombucha (0.18), LaCroix (0.14), Olipop (0.11), Energy drinks (0.08).

**8 mentions** (Reddit r/Soda + r/classactions; TikTok founder @asellsworth 6.4M-view
Scotland post; @michael.dicostanzo taste-test 5M views; @jamescharles advent-calendar
post): each with platform, user, text, sentiment, reach, comments, theme, url, timestamp.

**8 news items** (AdAge, Beverage Industry, CNBC, WWD, Reuters, Modern Retail,
Marketing Brew, Food Dive): each with source, domain, tag (brand/product/category/legal),
headline, snippet, url, date. Coverage: BÉIS collab (May 20 drop), mini-can launch at
Walmart, Pepsi Prebiotic national launch, founder profile, lawsuit-settlement notices,
Circle K B1G1 push, category tightening.

**Trending** — 3 columns:
- **TikTok hashtags**: #drinkpoppi (2.1M, +18%), #guttok (4.4M, +34%), #sodaswap (780k, +62%),
  #beispoppi (220k, NEW), #shirleytemple (1.6M, +22%), #prebioticsoda (910k, +11%),
  #5gsugar (340k, +8%).
- **X trends**: Pepsi Prebiotic (48k, +212%), Poppi (22k, +47%), BÉIS x Poppi (6.8k, NEW),
  Allison Ellsworth (4.2k, +31%), class action soda (3.1k, +18%), gut health (19k, +9%),
  Olipop (15k, −6% down).
- **Google search terms**: poppi mini cans where to buy (Breakout, +1,400%), is poppi
  healthy (110k/mo, +38%), poppi vs olipop (90k/mo, +24%), pepsi prebiotic review
  (74k/mo, +550%), beis poppi launch (22k/mo, Breakout), poppi lawsuit settlement
  (45k/mo, +71%), shirley temple poppi (34k/mo, +180%).
  Each item: term, volume, delta, direction, one-line context.

**Owned posts** (Instagram @drinkpoppi + TikTok): thumbnail, caption, engagement, sentiment.
**Active ads** (Meta): "soda's back, but better" (category reframe, Circle K B1G1),
"A new bombshell has entered the villa" (Love Island × Target), "One Sip and You're
Starstruck" (Shirley Temple), bilingual "Refresco, pero mejor", price-anchor
"Get 2 Poppi for $4.50", "Soda made with ingredients you can love" — each with angle,
subtext, days-active.

**Coach suggestions** (4, ranked by predicted impact) — each with headline, body,
`impact:{ring, delta}`, evidence line, API-source list, tag:
1. *Get ahead of the lawsuit narrative this week — before it ossifies* → **+7 Reputation** (comms).
2. *Frame Pepsi Prebiotic as the proof point — you invented this* → **+5 Presence** (campaign).
3. *Double-down on mini-cans through summer — flavor is your moat* → **+4 Resonance** (product).
4. *Run a "switch from Diet Coke" test on Meta this week* → **+3 Presence** (creative).

---

## 3 — Global chrome + exact geometry

- **Sticky top bar** (blurred backdrop): circular brand logo with a soft glow, "Poppi"
  wordmark + eyebrow "PREBIOTIC SODA"; right side: current date + a "Powered by **Waldo**" pill.
- **Hero — three asymmetric ring cards** in one row, grid columns **`1fr 1.6fr 1fr`**:
  - Left: **Reputation** (small, input) — ring SVG ~130px, arc stroke ~9, score ~38px.
  - Center: **Resonance** (large, the outcome) — ring SVG ~220px, arc stroke ~11,
    score ~68px. Card + label **recolor by zone**: good (high) / **mid = "Watch" (≥65)** /
    low (<65), with a matching zone-tag pill.
  - Right: **Presence** (small, input) — same size as left, shows `% SOV` under the number.
  - Each ring: subtle track + animated progress arc + big score + a "7D AVG" delta
    (up/down/flat, colored by direction).
- **Tab nav** directly below the rings (pill style, active tab filled):
  `Resonance · Reputation · Presence · Tracker · Coach · News · Trending`.
- **Hero extras** (visible **only on the Resonance tab**): a 3-tile **pulse strip**
  (Mentions L30d, Sentiment L30d, Active creatives L30d), each with a mini **sparkline**;
  then a centered compact **legend** (Poppi + Olipop + Liquid Death + Recess + dashed
  "Category median").
- **Scrubber timeline** in the hero: a grain toggle (**Day / Week / Month**) + a range
  slider with **event ticks** marking notable days.

---

## 4 — The seven tabs (exact section inventory)

1. **Resonance** (default — synthesis view): a two-up row → "Recent mentions" preview card
   (3 of 8,940, clickable → jumps to Reputation) | "Audience themes" pill cloud colored by
   sentiment. Below: a 3-up row with the **top-3 Coach suggestions** ("see all in Coach →").
2. **Reputation** — "How the world feels about Poppi" (trailing 30d · 8,940 mentions):
   sentiment-by-platform **stacked bars** | top-themes **donut** (two-up); full-width
   recent high-reach **mentions list**; a 3-up row with owned-content **engagement-rate
   chart**, **post-launch pulse** (mini-cans, 72h: 12.1k mentions, 68% positive), and
   sentiment **percentile vs category**; full-width **complaint clusters** (frequency ×
   intensity risk bars); full-width **audience voice** (loves/pains columns with quotes);
   full-width **reputation percentile bars** (net sentiment, mention volume, engagement
   rate, audience fit — each with median and leader markers).
3. **Presence** — "Your share of the prebiotic-soda conversation": SOV headline;
   **channel donut**; posting **cadence** by platform; **theme mix**; competitor
   **compare table**; **over-indexed / under-indexed** themes; **switch-from** sources;
   a full-width **presence area chart** over time (brand vs competitors vs dashed
   category median).
4. **Tracker** — "what you're watching": two-column layout (main list + aside with
   counters). User-created watches; a **"+ Tracker" button opens a modal** to create one
   (kinds: search/keyword, brand, competitor, theme — radio-grid selectors + a check
   frequency). Items have status **active / paused / archived**, a per-item **trend
   chart**, and open a detail drill. Persist to **localStorage**. Empty state when none.
5. **Coach** — "Next moves · ranked by predicted impact": two-column layout (ranked list
   + aside). Cards show rank #, headline, body, impact chip (ring + delta), evidence
   line, API sources, category tag. Per-card actions: **save / helpful / not-helpful**;
   a status banner reflects the chosen state; a **toast with Undo** confirms; persist to
   localStorage. Cards open a drill with full evidence.
6. **News** — vertical list of press cards: source favicon + name, tag chip, headline,
   snippet, relative time, external link.
7. **Trending** — 3-column grid: TikTok hashtags | X trends | Google search terms.
   Each item: favicon, term, volume, delta (up / down / NEW / Breakout), context line.

Footer note (verbatim): *"Prototype · partial real data via Waldo API (Meta ads, Reddit,
TikTok, Instagram @drinkpoppi) · built on the Brand × Culture API."*

---

## 5 — Interactions

- **Hash-based tab routing** (`#reputation` etc.); clickable cards and inline links jump
  between tabs.
- **Right-slide drill-down panel** (overlay + panel with eyebrow, title, body) for: each
  ring, a mention, a theme, an owned post, an ad, a coach card, a tracker item. Close via
  ✕ / overlay click / Esc.
- **Scrubbing** the timeline changes the "as of" date and **recomputes the rings, pulse
  tiles, and deltas live**; the grain toggle re-aggregates the series.
- **Tracker**: create / edit / delete watches via the modal, persisted to localStorage.
- **Coach**: save / like / dislike persisted, with toast + undo; the Resonance-tab top-3
  stays in sync with coach state.

---

## 6 — Visual language

- Dark, near-black background; elevated cards with subtle 1px borders and generous
  radius; **tabular numerals** on all numbers.
- **Data-viz reads light**: thin chart strokes, non-bold numbers and labels, delicate
  gridlines. No heavy/bold data ink.
- **Color carries meaning**: the Poppi/"you" series and positive states share one
  positive accent; negative trends and risk read as a warning/negative accent;
  competitors are neutral grays; the category median is a dashed neutral reference line.
- Platform/source chips use small favicons via a favicon service; degrade gracefully if
  they fail to load.
- Rings and charts animate in on load; transitions are quick and subtle.

---

## Success criterion

A reviewer who knows the original dashboard recognizes this one instantly: same
three-ring Reputation + Presence → Resonance model, same 7 tabs in the same order, same
Poppi narrative (lawsuit, Pepsi entrant, mini-cans, BÉIS collab, Diet Coke switchers,
Olipop / Liquid Death / Recess set), same drill + scrubber + tracker + coach
interactions — with nothing invented beyond this brief.
