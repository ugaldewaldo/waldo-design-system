# API gaps surfaced by the Poppi Brand Health prototype

Building this dashboard on the current [Brand x Culture API](../bxcapi/index.html) revealed eight endpoint/parameter additions that would materially simplify the client. Listed in rough order of leverage.

---

## 1. `GET /brands/{id}/health` — composite health score

Today the three hero rings (Reputation / Resonance / Presence) are composed client-side from 6+ calls. To productize "brand health as a number," this should be a first-class endpoint.

```http
GET /brands/{id}/health?window=30d
```

Response shape:

```json
{
  "brand_id": "brand_poppi_001",
  "as_of": "2026-05-17",
  "scores": {
    "reputation": { "score": 84, "delta_1d": 1, "delta_7d": 2, "contributors": [...] },
    "resonance":  { "score": 71, "delta_1d": -3, "delta_7d": -6, "contributors": [...] },
    "presence":   { "score": 32, "unit": "pct_sov", "delta_1d": 2, "delta_7d": 5, "contributors": [...] }
  },
  "methodology_version": "2026.05.01"
}
```

The `contributors` array enumerates the sub-metrics that fed each score with their weights — so the dashboard can show *why* the ring moved, not just *that* it did. Methodology version lets clients pin a definition for reporting consistency.

---

## 2. `GET /brands/{id}/recommendations` — Coach rollup

The Coach section synthesizes `analysis/whitespace` + `analysis/trend-fit` + `customer-complaints` + `category/sentiment-shifts` + `audiences/voice-of-customer` into ranked actions. Today that's five separate calls and a non-trivial synthesis step on the client.

```http
GET /brands/{id}/recommendations?window=30d&limit=5
```

Each recommendation should ship with: a directive headline, a suggestive body, an `expected_impact: { ring, delta, confidence }`, evidence references (cluster IDs, ad IDs, audience cluster IDs), and the source endpoints used. The client renders; it doesn't re-derive.

---

## 3. `GET /brands/{id}/audience-overlap` — competitor audience overlap

`/brands/compare` mentions audience overlap conceptually but the example response doesn't include it. To answer "who shares customers with Poppi?" — central to switch-from creative briefs — a dedicated endpoint:

```http
GET /brands/{id}/audience-overlap?competitor_brand_ids=olipop,diet_coke,...
```

Returns Jaccard or weighted overlap per competitor, with breakdown by audience segment. Powers the "switch from Diet Coke" framing without forcing the client to compute it from raw audience IDs.

---

## 4. Percentile time-series on `/benchmark`

`benchmark` returns *current* percentile only. For benchmarking conversations the trend is more useful than the absolute — "you were 60th percentile in sentiment 30 days ago, you're 75th now."

```http
GET /brands/{id}/{dataset}/benchmark?window=90d&grain=week
```

Returns the same metrics but with a per-week percentile series so clients can chart movement against the peer set over time.

---

## 5. `GET /brands/{id}/anomalies` — rolled-up alert digest

Alerts are subscribed one event-type at a time today. For a dashboard you want "what's weird this week" as a single read.

```http
GET /brands/{id}/anomalies?window=7d
```

Returns the union of triggered alert types (mention.spike, sentiment.drop, creative.fatigue, sov.shift, etc.) sorted by recency × severity, each with a one-line cause and a link back to the underlying signal.

---

## 6. `?include=sample_content` on aggregate endpoints

`mentions/summary` returns sentiment-distribution percentages but no examples — to render a drill-in you need a second filtered `mentions` call per sentiment bucket. Repeat the pattern for every aggregate (themes, by_source, by_platform) and you have an N+1 problem.

```http
GET /brands/{id}/mentions/summary?include=sample_content&sample_per_bucket=3
```

Returns 3 sample mentions per sentiment bucket / theme / platform alongside the counts. Should generalize across `mentions/summary`, `mentions/analysis`, `owned-media/summary`, `customer-complaints`, and the audience VoC endpoints.

---

## 7. `GET /brands/{id}/voice-of-customer` — brand-scoped VoC

`voice-of-customer` is currently `/audiences/{id}/voice-of-customer` — audience-scoped. For a dashboard you want "what *Poppi's* customers specifically say" without first having to pick which audience to query.

Brand-scoped version unions across all linked audiences and weights by signal volume. Keep the audience-scoped endpoint for cross-brand audience research.

---

## 8. `GET /brands/{id}/launches` — known event timeline

The 90-day playback scrubber annotates the timeline with launch events (Doc Pop, Hailee renewal, Walmart rollout). Today the client has to know these dates and call `post-launch-pulse` separately per event.

```http
GET /brands/{id}/launches?window=90d
```

Returns detected and curated launch events with auto-attached `post-launch-pulse` summaries — so any dashboard or report can render an annotated timeline without external event data.

---

## Honorable mentions (lower priority)

- **`/brands/{id}/competitive-set/timeseries`** — competitive set composition can change month to month (new entrants). Today you'd refetch `competitive-set` and diff yourself.
- **`pulse_note` field on `/overview`** — the one-line "today's note" the dashboard surfaces. Today the client has to synthesize it from spike-detection + deltas. A natural-language summary field returned by the server would unify the framing across all client surfaces.
- **`status: "stale"` on responses** — for inactive entities with historical coverage gaps, a top-level `data_freshness` field would let the dashboard render a banner without having to inspect `data_coverage` periods.
