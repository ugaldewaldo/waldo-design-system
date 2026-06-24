---
name: ds-demo
description: Write or fix a component demo in index.html. MANDATORY to invoke before writing any demo HTML. Enforces doctrine-first workflow — no code until doctrine is read.
argument-hint: "<component-name>"
---

# DS Demo — Doctrine-First Workflow

**STOP. Do not write any HTML yet.**

This skill forces a doctrine-first workflow. Every step is mandatory. Skipping any step is a DS violation.

---

## Step 1 — Read the doctrine entry

```bash
grep -A 40 "component: <COMPONENT_NAME>" /Users/miguelugalde/Desktop/waldo-design-system/docs/usage-doctrine.yaml
```

Extract and internalize:
- `use_when` — when this component is appropriate
- `dont_use_when` — what NOT to use it for
- `notes` — rendering rules, sizing, variants, composition rules

**If no doctrine entry exists → stop and create it first. Do not write demo code.**

---

## Step 2 — Inventory available DS classes

Before writing a single line, answer all of these from the doctrine + existing demos:

| Need | DS class to use |
|---|---|
| Button (primary action) | `class="btn"` |
| Button (secondary) | `class="btn btn-ghost"` or `class="btn btn-outline"` |
| Button (small) | `class="btn btn-sm"` |
| Text input | `class="input"` |
| Dropdown/popover surface | `class="wdd"` + `class="wdd-item"` |
| Segmented control | `class="wseg"` + `class="wseg-opt active\|inactive"` |
| Badge | `class="badge badge-active\|badge-secondary\|badge-outline"` |
| Separator | `<hr class="sep">` |

**Never invent a new pattern if a DS class exists.**

---

## Step 3 — Apply the hard rules before writing

Check each rule. If you cannot satisfy it, fix the root cause first:

### ONE PRIMARY PER SURFACE
Only one `class="btn"` (without `btn-ghost`, `btn-outline`, `btn-secondary`) per `demo-canvas`. Two primary buttons = hierarchy tie = violation.

If you need multiple choices between options → use `.wseg` (segmented control), not multiple buttons.

### NO DIV/SPAN AS BUTTON
`<div style="...cursor:pointer">` is never a button. Use `<button class="btn ...">`.

### NO INLINE STYLES FOR ATOMIC COMPONENTS
- Input field with `style="background:..."` → wrong. Use `class="input"`.
- Button with `style="background:var(--primary)..."` → wrong. Use `class="btn"`.
- Dropdown with custom `background/shadow/border-radius` → wrong. Use `class="wdd"`.

### COMPOSITION RULE — .wdd
`.wdd` IS the complete popover (bg, shadow, radius). Never nest `.wdd` inside `.dropdown-menu`. Trigger → `.wdd` directly via `position:absolute`.

### NO AVATARS ON TRIGGER BUTTONS
Trigger buttons show label + chevron only. Avatars go inside the `.wdd` list items, never on the trigger.

### WALDO CONTENT ONLY
Demos must use Waldo-relevant content:
- Brands: Nike, Apple, Adidas, Tesla, Spotify
- Metrics: Share of Voice, Sentiment, Active Ads, Reach
- Actions: Analyze brand, Export report, Add to watchlist, View intelligence

Never: "Move Goal", "Click me", "Submit form", lorem ipsum, generic placeholder copy.

---

## Step 4 — Write the demo

Only now write the HTML. After writing:

1. Run the verify hook mentally — scan for hex colors, rgba, inline-styled inputs/buttons, multiple primaries.
2. If anything fails → fix it before reporting done.

---

## Step 5 — Confirm with a checklist

Before saying "done", confirm every item:

- [ ] Doctrine entry was read before writing
- [ ] All buttons use `.btn` (no div-as-button)
- [ ] All inputs use `.input`
- [ ] All dropdowns/popovers use `.wdd`
- [ ] Segmented controls use `.wseg` / `.wseg-opt`
- [ ] Only one primary button per demo-canvas
- [ ] Content is Waldo-relevant (brands, metrics, actions)
- [ ] No hardcoded hex colors
- [ ] No `rgba(number...)` — use `color-mix(in srgb, var(--token) X%, transparent)`
- [ ] No inline border on demo containers
