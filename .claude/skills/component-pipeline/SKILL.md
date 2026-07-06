---
name: component-pipeline
description: Process the waldo-labs/_pipeline/ folder state machine — build missing components to the Waldo line, integrate approved ones into index.html, recreate approved ones in Figma. Invoke when Miguel says "pipeline" or asks to process pending/missing components.
---

# Component Pipeline

Folder-based state machine at `waldo-labs/_pipeline/`. The state lives in the filesystem, so any session can run this.

**Approval model: Miguel moving a file into a folder IS his explicit approval for that folder's action. Do not re-ask in chat.** (Committing/pushing still requires his separate OK.)

## States

| Folder | Meaning | Who puts files here |
|--------|---------|---------------------|
| `1-todo/` | Specs of missing components | Auto (prototype sessions) or Miguel |
| `2-done/` | Processed specs (archive) | Pipeline |
| `3-to-review/` | Built components awaiting Miguel's browser review | Pipeline |
| `4-to-integrate/` | Approved → integrate into `index.html` | **Miguel (= approval)** |
| `5-to-figma/` | Approved → recreate in Figma | **Miguel (= approval)** |
| `6-shipped/` | Integrated and validated | Pipeline |

## Run

Process ALL pending items in one run, in this order: **4-to-integrate → 5-to-figma → 1-todo**. If a folder is empty, skip it silently.

### Stage A — `4-to-integrate/` → index.html

For each file:

1. Invoke `/ds-demo` BEFORE writing any demo HTML — never from memory.
2. Add the demo to the **Brand API section** of `index.html` (English only, tokens only, no `style=` except layout-only on `demo-canvas`/`demo-block`).
3. If the component needs canonical CSS consumable by prototypes: add it to `tools/waldo-ds.styles.css`, then run `bash tools/build-waldo-ds.sh` (never edit `waldo-ds.css` by hand).
4. Vanilla path (no `.tsx`): add the component id to `EXEMPT` in `tools/lint-index.js` with a one-line justification (`// vanilla-only ..., no React wrapper needed`). Keep the edit to the EXEMPT list only — anything deeper in that file is a change request to VALIDATOR.
5. Add the entry to `docs/usage-doctrine.yaml` (use_when / dont_use_when / prefer_over).
6. Validate — all must pass:
   - `node tools/build-component-index.js` (regenerates the index)
   - `node tools/lint-index.js`
   - `node tools/detect.js index.html` (or the touched files)
   - `bash tools/build-waldo-ds.sh --check`
7. Verify visually: preview `index.html`, navigate to the new demo, screenshot. Charts/data-viz: assert data elements measure >0px via `preview_eval`.
8. Move the file to `6-shipped/`.

### Stage B — `5-to-figma/` → BRAND API Figma file

For each file:

1. Load the `figma-use` skill first (mandatory before `use_figma`); load `figma-generate-library` when creating components.
2. Recreate the component in the **BRAND API** Figma file — NOT the Master DS file:
   `https://www.figma.com/design/fhMSanQJ5E5ujEzWnuE0W1/BRAND-API` (key `fhMSanQJ5E5ujEzWnuE0W1`).
   Bind every fill/text/border to variables and `textStyles/*`, never hardcoded values. Pages UPPERCASE without emoji, sets lowercase. Font weights are named strings ("Semi Bold").
3. Verify with `get_screenshot`; report any token drift found.
4. The file **stays in `5-to-figma/`** while Miguel iterates in Figma. When he's happy he moves it to `4-to-integrate/` himself.
5. If the Figma MCP is not connected in this session, report that and skip the stage — don't fail the run.

### Stage C — `1-todo/` → build → `3-to-review/`

For each spec (batch specs contain several components — handle each component individually):

1. **Duplicate guard (mandatory):** look the component up in `docs/component-index.json` and `docs/component-index.md` — ALL THREE sections (core, Brand API, charts). If it already exists, do NOT build; annotate the spec with the existing selector and move it to `2-done/`.
2. Read `docs/brand-api-dashboard-doctrine.md` before building.
3. Build the Waldo-line version as a standalone HTML, **one component per file**: `_pipeline/3-to-review/<component-name>.html` (kebab-case). Head links (theme FIRST):
   ```html
   <link rel="stylesheet" href="../../../waldo-ui/waldo-shadcn-theme.css">
   <link rel="stylesheet" href="../../../waldo-ds.css">
   ```
4. Rules: HSL convention (`hsl(var(--token))`, opacity `hsl(var(--token) / 0.12)`), no hardcoded hex, no `-rgb` tokens, `var(--chart-1..12)` for data colors, Inter only, English only, SVG colors via `style=` or `currentColor` (never `fill="var()"` attributes).
5. Include in the file a short header (component name, source prototype, intended use_when) so Miguel has context when reviewing.
6. Validate: `node tools/detect.js waldo-labs/_pipeline/3-to-review/<file>` must be clean; verify visually with preview (screenshot; >0px check for data-viz).
7. Move the processed spec to `2-done/`.

## Spec format (for `1-todo/`)

Prototype sessions auto-generate specs named `new-component--<name>.html`: a self-contained HTML that renders the component as found in the prototype (verbatim markup + CSS, DS linked), with a metadata comment at the top:

```html
<!--
component: Scrubber Timeline
source: waldo-labs/Brand-health/Test3/index.html
date: 2026-07-03
use_when: scrubbing a metric across a date range with event ticks
notes: built ad-hoc in the prototype; needs DS-line pass
-->
```

Plain notes (.rtf, .md, screenshots) from Miguel are also valid specs — interpret them.

## Reporting

Show ALL results at the end in ONE message: what happened per component (built / integrated / sent to Figma / skipped-duplicate), all screenshots together, then ask "Done — commit and push?" (never commit without Miguel's OK), and end with clickable localhost links to what shipped.
