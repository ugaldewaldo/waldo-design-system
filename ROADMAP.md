# Waldo Design System — Roadmap

## Vision

Build a design system that allows any AI agent or developer on the team to produce Waldo-quality UI without supervision. Not just "consistent" — actually good-looking, intentional, and on-brand.

This requires two things working together:
1. **A real component library** (waldo-ui) that enforces tokens, patterns, and accessibility
2. **A design intelligence layer** that teaches Claude what "Waldo" means aesthetically — so it makes good decisions on new patterns, not just the ones already built

---

## What we've built so far

In approximately **1 week of work**, we went from zero to a production-ready design system foundation. Here's what exists today.

### The infrastructure

- **`waldo-ui/`** — A fully installable React package (`@waldo/ui`) with 30+ components, Tailwind v3, Radix primitives, CVA, and Sonner. Steve can install it today with a single `file:` dependency.
- **`figma/waldo.tokens.json`** — Single source of truth for all design tokens in Tokens Studio format, synced bidirectionally with Figma.
- **`waldo-ui/src/globals.css`** — 3-layer CSS variable architecture (primitives → semantic → shadcn) that makes every Tailwind opacity modifier work correctly across all components.
- **`index.html`** — Live documentation site (published at [ugaldewaldo.github.io/waldo-design-system](https://ugaldewaldo.github.io/waldo-design-system/)) with interactive demos, copy-paste code, and recipes for every component.

### The quality system

- **DS verification script** (`.claude/hooks/verify-component.sh`) — Runs automatically on every file edit. Catches hardcoded hex, rgba, legacy CSS vars, wrong fonts, and raw HTML inputs before they reach a commit.
- **PostToolUse hook** — Wired into Claude Code settings so verification is automatic, not manual.
- **`/ds-verify` skill** — Manual audit command with a 7-point checklist.
- **`/ds-component` skill** — Step-by-step protocol for implementing any component from Figma with correct tokens.
- **`/ds-add-token` skill** — Protocol for adding new tokens across all 4 layers (JSON → CSS → Tailwind → component) in sync.
- **Steve audit (ENG-11390)** — External developer review confirmed the architecture is solid. All findings addressed: zinc CSS vars, CLAUDE.md rewrite, hardcoded values, skill deduplication, absolute paths, Spanish comments.

### Components shipped

**Atomic (22 components):**
Button · Input / Field · Textarea · Badge · Avatar / AvatarGroup · Checkbox · Switch · Select · SegmentedControl · Tag / TagInput · FileInput · Tooltip · Separator · Table · Tabs · Toast · Alert · Empty State · ListItem / ListView · RadioGroup · Slider · Loader (DotsLoader + ShimmerText)

**Icons:**
Lucide wrapper with 2-canvas sizing system (16px / 24px) · 14 custom Waldo icons from Figma (exported, optimized, converted to React components with `currentColor`)

**Modular (2 components + 15 recipes):**
Dialog (shell · anatomy · sizes · 15 documented recipes covering every Figma modal pattern) · WizardDialog (split layout · progress dots · step navigation)

### Documentation quality

The `index.html` reference site covers every component with:
- Live interactive demos
- States (hover, active, disabled, error)
- DS token references (no hardcoded values anywhere)
- Copy-paste React code for every recipe
- All English, all correct token usage

---

## Phase 1 — Foundation ✅ Complete

Token architecture, CSS variables, Tailwind config.

- 3-layer model: primitives → semantic → shadcn vars
- Dark-first theme (zinc palette, green-500 brand, coral-500 destructive)
- Single source of truth: `figma/waldo.tokens.json`
- Figma ↔ code sync via Tokens Studio

---

## Phase 2 — Atomic Components ✅ Complete

The building blocks every other component is assembled from.

| Component | Status |
|-----------|--------|
| Button (8 variants, 3 sizes) | ✅ |
| Input / Field / Textarea | ✅ |
| Badge | ✅ |
| Avatar / AvatarGroup | ✅ |
| Checkbox (circular) | ✅ |
| Switch | ✅ |
| Select / Dropdown | ✅ |
| SegmentedControl | ✅ |
| Tag / TagInput | ✅ |
| FileInput | ✅ |
| Tooltip | ✅ |
| Separator | ✅ |
| Table (sortable, row selection) | ✅ |
| Tabs (text + pill variants) | ✅ |
| Toast / Banner (Sonner) | ✅ |
| Alert (inline feedback) | ✅ |
| Empty State (3 sizes) | ✅ |
| ListItem / ListView | ✅ |
| RadioGroup | ✅ |
| Slider | ✅ |
| Loader (DotsLoader, ShimmerText) | ✅ |
| Icon wrapper + 14 custom icons | ✅ |
| Skeleton | ⏳ 1 day |

---

## Phase 3 — Modular / Compound Components 🔨 In Progress

Patterns that combine atoms into full product surfaces.

| Component | Status | Notes |
|-----------|--------|-------|
| Dialog (shell + 15 recipes) | ✅ | All Figma patterns documented |
| WizardDialog (split layout, steps) | ✅ | Onboarding flows |
| Card / ResultCard | ⏳ 2 days | Most-used in product. Waldo-specific. |
| Sheet / Drawer | ⏳ 1 day | Side panels |
| Alert Dialog | ⏳ 0.5 days | Destructive confirmation |
| Combobox | ⏳ 1 day | Searchable select |
| Popover | ⏳ 0.5 days | Positioned overlay |
| Date Picker | ⏳ 1.5 days | Calendar + range |
| Navigation Sidebar | ⏳ 2 days | App shell |
| Data Table | ⏳ 1.5 days | Extends Table + pagination |

**Estimated: ~10 days**

---

## Phase 4 — Design Intelligence Layer 🔮 Planned

This is the layer that takes the system from "technically correct" to "actually looks great without supervision."

**The problem:** waldo-ui solves component correctness. It doesn't teach Claude how to make good aesthetic decisions on new patterns — layout hierarchy, density, visual rhythm, what to avoid.

**The solution:** Layer Impeccable (impeccable.style) on top of what we have.

Impeccable is designed to be layered on existing design systems — it inherits tokens and components rather than replacing them. It adds:
- 41 anti-pattern detections (prevents AI slop)
- Design vocabulary / commands for aesthetic decisions
- Quality enforcement before shipping

Our combination would be:
```
waldo-ui         → real components + tokens (nobody else has this)
Impeccable       → aesthetic quality + anti-slop
DESIGN.md Waldo  → brand identity (what makes Waldo, Waldo)
```

This is stronger than anything available in the market individually.

**What DESIGN.md needs to capture:**
- Waldo's visual density (Linear-level, not Material-level)
- What Waldo UI feels like (dark, precise, confident)
- Patterns to avoid (light backgrounds, rounded corners everywhere, shadows on everything)
- Typography hierarchy specific to Waldo
- When to use each dialog pattern, each icon, each layout

**Estimated: 3–5 days once Phase 3 is complete**

---

## Phase 5 — Steve Integration 🔌 Parallel

Steve's side: consuming the package in `packages/frontend`.

**Status:** Package is installable. Pending:
- Wire up `packages/design-system` registry to consume from this repo
- Tailwind v3 (waldo-ui) vs v4 (frontend) compatibility — noted by Steve, not a blocker for copy-source approach
- shadcn CLI integration

**Estimated: 2–3 days with Steve**

---

## Open Questions

1. **DESIGN.md scope** — How prescriptive should the Waldo aesthetic guide be? What's in vs out?
2. **Card / ResultCard** — Need Figma node. Most critical missing component.
3. **Navigation Sidebar** — Is this in scope for Phase 3 or can Steve build it from ListItem + Dialog patterns?
4. **Impeccable integration** — Install as-is or fork and customize?
5. **Publishing** — Should waldo-ui eventually be published to npm (private) or stay as a local `file:` dependency?

---

## Current Status

The foundation and atomics are solid. Steve's audit confirmed the architecture holds up. Phase 3 is the current focus — compound components and recipes.

The system already exceeds what any off-the-shelf design skill provides at the component level. What's missing is the aesthetic intelligence layer (Phase 4) — that's what completes the original vision.

**Rough total remaining: ~15–18 days**
