# Notes for Steve — Typography refactor

**Date:** 19 May 2026
**Author:** Miguel (with Claude's help)
**Status:** Awaiting your review before applying to production site

---

## What changed and why

We audited the typography in the marketing Figma (Pitch, Strategize, Monitor product pages) and compared it to the current Design System. We found several divergences:

- Marketing was using **32 px and 40 px** sizes that didn't exist in the DS scale (which jumped 30 → 36 → 48).
- Marketing used **tracking -2% / -4%** while the DS had -2.5% / -5%.
- **Italic and weight 700** weren't loaded in the Inter `@import`, even though h1/h2 and the `<em>` in Pitch needed them.
- Several `medium` weight combinations (text-2xl Medium for card titles, etc.) that marketing used had no named token.

We standardized **Linear/Framer-style**: two parallel scales (`text-*` for UI/body, `text-display-*` for marketing hero/section titles) and simplified tracking to 3 values.

---

## The key naming decision — Tailwind-native

I initially named the display tokens `display-*`. That was wrong. Tailwind's font-size utility is always `text-*`, so for `<h1 className="text-display-md">` to work out of the box without tricks, the CSS variables need to be named `--text-display-*` (which Tailwind v4 reads automatically from `@theme`).

| Concept | JSON key | CSS var | Tailwind utility |
|---|---|---|---|
| Body 16 | `typography.fontSize.base` | `--text-base` | `text-base` |
| Hero 40 | `typography.fontSize.display-md` | `--text-display-md` | `text-display-md` |

The rule: **the `text-` prefix is added by Tailwind automatically** from the `fontSize` namespace. So the JSON key stays bare (`base`, `display-md`) and the CSS is prefixed for v4 (`--text-base`, `--text-display-md`).

## Compound syntax (Tailwind v4 idiomatic)

Each font-size token carries its paired line-height and letter-spacing on the same name via the `--` separator. This way a single utility class applies all three:

```css
:root {
  --text-display-md:                  2.5rem;     /* 40px */
  --text-display-md--line-height:     3rem;       /* 48px */
  --text-display-md--letter-spacing: -0.04em;
}
```

When Tailwind v4 picks this up from an `@theme` block, `text-display-md` becomes a one-shot utility — no need to also write `leading-…` or `tracking-…`.

---

## Files I touched

1. **`waldo-tokens.json`** — added font sizes `display-xs..display-2xl` (24/32/40/56/72/96), `fontStyle: italic`, `fontFamily: mono`, simplified tracking to 0 / -2% / -4%, and 39 named text styles (vs. 15 before). The text-* track now caps at `text-4xl` (36px); the old `text-5xl` was an orphan and was removed — Tailwind's stock `text-5xl=48` still works as a default utility if anyone uses it.
2. **`waldo-shadcn-theme.css`** — compound vars `--text-{name}` + `--text-{name}--line-height` + `--text-{name}--letter-spacing` for both tracks, `--font-mono` declared, `.text-display-*` helper classes, and the Inter `@import` now loads italic + 400/500/600/700.
3. **`waldo-design-system.html`** — Typography section rebuilt: each row's height grows with the specimen, real Waldo marketing copy in the display track ("Briefed before you ask", "Get everything you need", etc.).

---

## Questions for you

Please review and let me know:

### 1. Tailwind version on the waldo.fyi build — v3 or v4?

**If v4 (recommended path):** wrap the typography vars from `waldo-shadcn-theme.css` inside a `@theme { ... }` block. The compound syntax means `text-display-md` will auto-apply size + line-height + letter-spacing in a single utility — no extra config.

```css
@theme {
  --text-display-md:                  2.5rem;
  --text-display-md--line-height:     3rem;
  --text-display-md--letter-spacing: -0.04em;
  /* …rest of the typography tokens… */
}
```

**If v3:** mirror the tokens in `tailwind.config.js` using the compound tuple syntax. Snippet at the bottom of this file.

### 2. Anyone using `display-md` or `display-xs` (no `text-` prefix) in the existing codebase?

If yes, we need to rename to `text-display-*` to avoid conflicts with future Tailwind utilities and to disambiguate from CSS `display:` property mental model.

### 3. Migrating the live product pages (Monitor, Strategize, Pitch) to these utilities — worth doing?

Or do we leave them hardcoded and only apply `text-display-*` on new pages? My vote: gradual migration, starting with Pitch since it's the most recent.

### 4. Inter — Google Fonts CDN or self-hosted?

The current `@import` pulls `ital,wght@0,400;0,500;0,600;0,700;1,400;1,500` from Google Fonts. If we have Inter self-hosted, point me to the woff2s and I'll swap the import for `@font-face` rules.

### 5. `waldo-design-system.html` — editorial upgrade worth it?

This page is internal reference. It meets standard design-system practice (visible scale, specs per row, Tailwind-correct naming). It does **not** yet reach Linear/Framer editorial level — no scale-view overview at the top, no "use for X" caption per group, no tracking comparison demo, no Inter OpenType features showcase.

Do you think the editorial upgrade is worth a follow-up sprint, or is it good enough as a spec doc for the team?

### 6. Inter OpenType features — opt-in or default?

The numeric stats on Monitor ("20 hrs / $30K / 80%") would benefit from `font-variant-numeric: tabular-nums` so the digits align. Do we want to enable that globally on `.stat`, `.metric`, etc., or keep it opt-in?

### 7. Plan for the Figma Design System file

The CSS variables and JSON tokens are now in sync, but the **Figma Design System file** (`bgyz7RmoeEbnsqybjQveUy`) still has the older typography variables. Once you sign off on the naming, I'll update Figma's variables to match (`font-size/text-display-md` etc.) so designers see the same names you do in code.

---

## Tailwind v3 config snippet (if you need it)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // Track A — text-* (Tailwind ships these by default; redefining to bind tokens)
        xs:   ['var(--text-xs)',   { lineHeight: 'var(--text-xs--line-height)',   letterSpacing: 'var(--text-xs--letter-spacing)' }],
        sm:   ['var(--text-sm)',   { lineHeight: 'var(--text-sm--line-height)',   letterSpacing: 'var(--text-sm--letter-spacing)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--text-base--line-height)', letterSpacing: 'var(--text-base--letter-spacing)' }],
        lg:   ['var(--text-lg)',   { lineHeight: 'var(--text-lg--line-height)',   letterSpacing: 'var(--text-lg--letter-spacing)' }],
        xl:   ['var(--text-xl)',   { lineHeight: 'var(--text-xl--line-height)',   letterSpacing: 'var(--text-xl--letter-spacing)' }],
        '2xl':['var(--text-2xl)',  { lineHeight: 'var(--text-2xl--line-height)',  letterSpacing: 'var(--text-2xl--letter-spacing)' }],
        '3xl':['var(--text-3xl)',  { lineHeight: 'var(--text-3xl--line-height)',  letterSpacing: 'var(--text-3xl--letter-spacing)' }],
        '4xl':['var(--text-4xl)',  { lineHeight: 'var(--text-4xl--line-height)',  letterSpacing: 'var(--text-4xl--letter-spacing)' }],
        // text-5xl through text-9xl: Tailwind's defaults remain. Waldo's curated track caps at 4xl;
        // for sizes ≥ 40px use the display-* track below.

        // Track B — text-display-* (marketing only)
        'display-xs':  ['var(--text-display-xs)',  { lineHeight: 'var(--text-display-xs--line-height)',  letterSpacing: 'var(--text-display-xs--letter-spacing)' }],
        'display-sm':  ['var(--text-display-sm)',  { lineHeight: 'var(--text-display-sm--line-height)',  letterSpacing: 'var(--text-display-sm--letter-spacing)' }],
        'display-md':  ['var(--text-display-md)',  { lineHeight: 'var(--text-display-md--line-height)',  letterSpacing: 'var(--text-display-md--letter-spacing)' }],
        'display-lg':  ['var(--text-display-lg)',  { lineHeight: 'var(--text-display-lg--line-height)',  letterSpacing: 'var(--text-display-lg--letter-spacing)' }],
        'display-xl':  ['var(--text-display-xl)',  { lineHeight: 'var(--text-display-xl--line-height)',  letterSpacing: 'var(--text-display-xl--letter-spacing)' }],
        'display-2xl': ['var(--text-display-2xl)', { lineHeight: 'var(--text-display-2xl--line-height)', letterSpacing: 'var(--text-display-2xl--letter-spacing)' }],
      },
      letterSpacing: {
        tight:   'var(--tracking-tight)',     // -0.02em
        tighter: 'var(--tracking-tighter)',   // -0.04em
      },
    },
  },
}
```

> Note: the key in `fontSize` is `display-xs` (no `text-` prefix). Tailwind prepends `text-` automatically when generating utilities, so the final class is `text-display-xs`. ✅

---

## Quick reference — resulting utilities in JSX

```jsx
// Product / app UI — text-* track
<h1 className="text-4xl font-semibold">Page heading</h1>
<p  className="text-base">Body text</p>
<span className="text-xs text-muted-foreground">Caption</span>

// Marketing — text-display-* track
<h1 className="text-display-md">Get everything you need</h1>
<h2 className="text-display-sm">Why strategists never go back</h2>
<p  className="text-xl text-foreground/68">Subtitle here</p>
```

Ping me on Slack with anything. — Miguel
