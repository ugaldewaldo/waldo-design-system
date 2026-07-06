# index.html Layout Doctrine

Every component page in `index.html` must follow this structure exactly. No other layout classes are allowed.

---

## Page structure

```html
<div id="comp-{name}" class="waldo-page">

  <!-- 1. Page header — exactly one per page -->
  <div class="page-header">
    <div class="page-title">Component Name</div>
    <div class="page-desc">One-line description of the component's purpose and key traits.</div>
  </div>

  <!-- 2. One or more sections -->
  <div class="section">
    <div class="section-title">Subsection name</div>
    <!-- optional: one-line clarification -->
    <div class="sub">Sizing rule, token note, or contextual hint.</div>

    <!-- 3. Demo block — wraps one demo -->
    <div class="demo-block">
      <div class="demo-canvas">
        <!-- live component HTML here -->
      </div>
      <!-- optional: code snippet shown below the canvas -->
      <div class="demo-code-bar">
        <span class="demo-code-label">…snippet…</span>
        <button class="copy-btn" onclick="copyCode(this,'…snippet…')">Copy</button>
      </div>
    </div>
  </div>

</div>
```

---

## Rules

### page-header
- Every `comp-*` page has **exactly one** `page-header`.
- `page-title`: component name only — no emoji, no parentheses.
- `page-desc`: one sentence, plain English, no code formatting.

### section
- Use `<div class="section">` to group a subsection (e.g. "Variants", "Sizes", "States").
- Never nest sections.
- `section-title` is optional when the page has only one section with an obvious meaning.
- `sub` is for a short annotation (sizing, token, note) — not a second title.

### demo-block / demo-canvas
- **Every visible demo lives inside `demo-block > demo-canvas`.** No bare component HTML outside this structure.
- `demo-canvas` uses flex-row by default. Add `.col` for vertical stacking.
- `style=` on `demo-canvas` is allowed **only** for layout-only properties: `gap`, `align-items`, `flex-wrap`, `max-width`, `padding` (canvas padding only, not component padding). Never colors, backgrounds, or component-specific styles.
- `demo-block` has no `style=` attribute.

### Forbidden patterns
| Pattern | Replace with |
|---|---|
| `<div class="comp-section">` | `<div class="section">` |
| `<div class="comp-section-title">` | `<div class="section-title">` |
| `<div class="comp-group">` | `<div class="section">` |
| `<div class="comp-label">` | `<div class="section-title">` |
| `<div class="comp-row">` | `<div class="demo-canvas">` inside a `demo-block` |
| `<h3 class="section-title" style="…">` | `<div class="section-title">` (no inline size overrides) |
| Bare `<input>`, `<button>`, etc. outside `demo-block` | Wrap in `demo-block > demo-canvas` |

### Code snippets
- Show the minimal React/TSX snippet that represents the demo.
- Place `demo-code-bar` immediately after `demo-canvas`, inside the same `demo-block`.
- `demo-code-label` holds the snippet text. `copy-btn` triggers `copyCode(this, '…')`.
- Both `demo-code-bar` and `demo-code-label` have canonical CSS in `waldo-ds.css` — do not style them inline.

---

## Example: correct page

```html
<div id="comp-switch" class="waldo-page">

  <div class="page-header">
    <div class="page-title">Switch</div>
    <div class="page-desc">32×18px toggle. Green-700 fill when ON. Three states: off, on, disabled.</div>
  </div>

  <div class="section">
    <div class="section-title">States</div>
    <div class="demo-block">
      <div class="demo-canvas" style="gap:24px">
        <label class="wswitch">…</label>
        <label class="wswitch">…</label>
        <label class="wswitch" disabled>…</label>
      </div>
      <div class="demo-code"><code>&lt;Switch /&gt;</code></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">With label</div>
    <div class="demo-block">
      <div class="demo-canvas col" style="gap:12px">
        …
      </div>
    </div>
  </div>

</div>
```

---

## Reference — canonical CSS classes

| Class | Defined in | Purpose |
|---|---|---|
| `waldo-page` | waldo-ds.css | Page wrapper, handles show/hide |
| `page-header` | waldo-ds.css | Top header with border-bottom |
| `page-title` | waldo-ds.css | xl semibold, -2% tracking |
| `page-desc` | waldo-ds.css | sm, 68% foreground |
| `section` | waldo-ds.css | mb-36 group wrapper |
| `section-title` | waldo-ds.css | xl semibold section heading |
| `sub` | waldo-ds.css | xs 45% annotation under title |
| `demo-block` | waldo-ds.css | Border + radius container |
| `demo-canvas` | waldo-ds.css | Padded flex-row render area |
| `demo-canvas.col` | waldo-ds.css | Vertical stacking variant |
| `demo-code-bar` | waldo-ds.css | Code snippet bar (flex row, muted bg) |
| `demo-code-label` | waldo-ds.css | Monospace snippet text inside code bar |
| `copy-btn` | waldo-ds.css | Copy button inside code bar |

**Do not use:** `comp-section`, `comp-section-title`, `comp-group`, `comp-label`, `comp-row` — these are legacy patterns with no CSS definition and must be migrated to the canonical classes above.
