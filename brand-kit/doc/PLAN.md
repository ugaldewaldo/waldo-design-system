# Brand Kit — Social Plan

Working plan for the **social slice** of the Marketing Brand Kit: the social post patterns and the post-generator app that consumes them. Other content types (emails, backgrounds, collateral) are out of scope here and get their own slice later. Owner: Miguel (Brand Kit session). Linear: [Marketing Brand Kit](https://linear.app/waldofyi/project/marketing-brand-kit-998c0ffe9a0d), parent card MAR-2279.

## Architecture decisions (settled)

| Decision | Choice | Why |
|---|---|---|
| Canonical source | **Figma-first** — the Figma master is layout truth; an HTML render template mirrors it; samples are exported renders | A social post has no component code layer; the artifact is an image. Figma is where a human designs and iterates |
| Token vocabulary | Always from `DESIGN.md` (vendored, drift-checked) | Figma decides *how it composes*; code decides *with which tokens*. No color is ever invented in Figma |
| Image generation | **Deterministic HTML/CSS render → PNG**, no AI image generation | On-brand by construction, testable, and slots can accept user-uploaded images — impossible with AI image gen |
| Pattern artifact | Figma master + `social/<pattern>/template.html` + 2–3 approved samples + `doctrine/<pattern>.md` | A pattern isn't done until all four exist |
| Doctrine method | Per-pattern format (`doctrine/_pattern-template.md`) + traps table (`doctrine/model-default-traps.md`) read first, always | Vaccines against model defaults, not just rules for the right |
| Approval | A human approves before anything is published | Same rule at every layer: kit, fire test, app |

## Phase 1 — Foundation + open-call slice (now → ~Jul 13)

The open call (~Jul 13) is the first real consumer. It needs **teaser (MAR-2293)** and **launch (MAR-2284)** posts.

1. **Figma masters (Miguel, ~half day).** The 5 shared formats — feed 4:5, square, OG/landscape, video 16:9, carousel — with the fixed anatomy: background `#171819`, single brand texture, logo zone, 80px margins, footer `waldo.fyi`, type ramp on the display track. Spec lives as a comment on MAR-2279. **Golden rule: no individual pattern before this common base.**
2. **Doctrine foundation (done).** `doctrine/model-default-traps.md` (16 traps + the product/marketing inversion) and `doctrine/_pattern-template.md`.
3. **Slice 1: teaser + launch.** For each: derive from the masters → `social/<pattern>/template.html` → 2–3 rendered samples → `doctrine/<pattern>.md`.
4. **Pings:** Justin/Valentina — exact open-call date + expected assets; Valentina — the use-case list (orders Phase 2).
5. **Validation:** the open call itself. Every rework request becomes a doctrine rule.

## Phase 2 — Volume patterns + fire test (week of Jul 14)

6. **3–4 highest-frequency patterns**, ordered by Valentina's list once it lands. Best guess (biased toward what the app's sources will trigger most): **reactive/news, partnership, stats, event**. The remaining patterns of the original 12 get scaffolded on demand — not built speculatively.
7. **Fire test** after this phase: clean Claude session, repo only, a bare prompt like "create a partnership post for LinkedIn". Every failure becomes a doctrine rule. Repeat until output is approvable without rework.

## Phase 3 — The app (parallel from week of Jul 14; does not block 1–2)

The app is MAR-2297 (generation skill) materialized as a product. Lives in `brand-kit/app/`; its own UI uses the product DS (canonical markup, same bar as any internal tool).

```
Sources → Ideas → Human triage → Generate + edit → Ready to post
```

- **Sources:** Fathom (MCP), Linear (MCP), relevant news via Waldo's own intelligence (discover_trends / category_news / search_web) — dogfooding.
- **v0 — Idea radar.** Ingest sources → feed of post-idea cards, each classified to a pattern ("this is a partnership", "this is stats"). User actions: **select / save / discard / new post**.
- **v1 — Generate + edit loop.** Select → first draft (copy in LinkedIn and Twitter variants + image rendered from the pattern's `template.html`) → editor: edit copy directly or by instruction ("shorter", "less formal"), switch pattern, adjust image texts (headline/supporting/meta), **upload own images** (screenshot, partner logo, photo) into the pattern's visual slot — frame, texture, typography, logo zone stay fixed. Live preview, regenerate freely, approve when satisfied → copy text + download PNG.
- **v2 — New post.** Paste a link or text → app classifies the pattern → generates post + image → same edit loop.
- **Later:** direct posting to LinkedIn/X (their APIs require app approval; v1 "ready to paste" already removes most friction).

Gate: v1 generation quality depends on Phase 1–2 patterns existing. v0 (ingestion + triage) has no such dependency and can start first.

## Risks

| Risk | Mitigation |
|---|---|
| **Museum risk (#1):** patterns nobody uses | Every phase validates against a real need with a date: open call (Phase 1), the app (Phase 3) |
| Valentina's use-case list still pending | Chase in Phase 1; Phase 2 order is a best guess until it lands |
| Figma masters and HTML templates drift apart | Doctrine entry links both; samples are re-exported on master changes; fire test catches divergence |
| Shared repo checkout (multi-session) | Brand Kit commits only its own paths; holds commits while another session owns the branch |

## Status log

- **Jul 9:** Kit relocated into `waldo-design-system/brand-kit/` (old standalone repo deleted). Ownership registered. Doctrine foundation written (traps table + pattern template + read-order README). Social plan + one-pager drafted.
- **Jul 9 (later):** Miguel laid out all 12 social patterns in Figma ([WALDO — BRAND KIT](https://www.figma.com/design/3ABAnqhbpBRSFrE9PTX7x2/), page SOCIAL) — each with its 4:5 visual (video card 16:9) + X and LinkedIn captions. Division of labor settled: **Miguel designs in Figma; when a pattern is ready he flags it and the Brand Kit session extracts it** (template.html + doctrine entry + rendered samples). Priority: teaser + launch by Jul 10 for the open call (~Jul 13). One primary format per pattern; other formats derived on demand.
