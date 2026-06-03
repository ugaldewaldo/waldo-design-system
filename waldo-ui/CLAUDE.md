# Waldo UI — shadcn Component Library

Read the root `CLAUDE.md` first for DS fundamentals. This file covers component-specific rules.

---

## Stack

React + TypeScript · Tailwind CSS v3 · shadcn/ui · Radix primitives · CVA · lucide-react

---

## Critical color rules

```
green-700 #1b8c8c  → button fill (default variant). White text on top. ✓
green-600 #2db4b4  → field labels. Always.
green-500 #63dbdb  → text, accents, focus rings, badges. NEVER button fill with white text. ✗
green-800 #265152  → input hover/focus border.
coral-500 #e8533a  → destructive. Not red, not pink.
orange-500 #e76638 → warning.
brand-pink #d40a60 → marketing only. Never in product UI.

zinc-750  #2d2f33  → dropdown/select container bg. Tags bg.
zinc-800  #27282b  → solid button, file upload zone.
zinc-850  #242528  → file upload hover bg. Avatar bg.
```

---

## Component status

### ✅ Done — Atomics
| Component | File | Notes |
|-----------|------|-------|
| Button | `button.tsx` | 8 variants, 3 sizes (28/36/44px), pill |
| Input / Field | `input.tsx` | Pill, teal label, green-800 hover border |
| Badge | `badge.tsx` | shadcn-style, no borders on most |
| Avatar | `avatar.tsx` | shape: round/square, sizes: 16/24/32/40px |
| Checkbox | `checkbox.tsx` | Circular (not square!), green + mono variants |
| Switch | `switch.tsx` | 32×18px, green-700 ON |
| Select | `select.tsx` | zinc-750 container, rounded-20px |
| SegmentedControl | `segmented-control.tsx` | zinc-950 container, zinc-800 active |
| Tag / TagInput | `tag.tsx` | zinc-750 bg, font-medium 500 |
| FileInput | `file-input.tsx` | 2 sizes (68px/52px), error state, drag & drop |

### ✅ Done — Overlays
| Component | File | Notes |
|-----------|------|-------|
| Dialog | `dialog.tsx` | sm/md/lg/xl + Header/Body/Footer |
| DropdownMenu | `dropdown-menu.tsx` | zinc-750 container, rounded-20px, separator rgba/12% |
| Command | `command.tsx` | cmdk ⌘K palette |
| Tooltip | `tooltip.tsx` | |
| Table | `table.tsx` | sortable headers + row selection |

### ⏳ Pending
- Dialog/Modal — review against Figma
- Cards / Result cards (Waldo-specific)
- Panels / Side panels
- SKILL.md — AI design skill

---

## Key component values (Figma DS)

### Input
- Shape: `rounded-full` (pill)
- Border default: `rgba(210,211,211,0.12)`
- Border hover/focus: `#265152` (green-800) — single line, NO ring
- Label: `#2db4b4` (green-600) — always teal
- Placeholder: `rgba(210,211,211,0.50)`
- Error text: `#e8533a` (coral-500)

### Dropdown / Select
- Container: `bg-[#2d2f33]` zinc-750 · `rounded-[20px]` · shadow
- Search: `bg-[#323539]` zinc-700 · flush top (no pt) · overflow:hidden clips corners
- Item: `px-4 py-2 h-8` · zinc-200/70% → zinc-700 bg on hover
- Separator: `rgba(210,211,211,0.12)` · 1px · no margin
- Header label: `#63dbdb` green-500

### Avatar
- Round (people): `border-radius: 999px`
- Square (brands): `border-radius: 4px`
- Sizes: 16 / 24 / 32 / 40px
- Background: `#171819` zinc-950

### Tag
- Background: `#2d2f33` zinc-750
- Font: 500 medium, 14px, -0.02em
- X icon: strokeWidth 1.5

### FileInput
- Zone bg: `#242528` zinc-850
- Zone radius: `24px` (NOT 32px)
- Zone text: `#2db4b4` green-600
- Default height: 68px (via py-6) · Slim: 52px (via py-3)
- File hover: icon + name → `#2db4b4`
- Error text: `#e76638` orange-500 (warning, not coral)

---

## Button system

Shape: `rounded-full` (pill). Font: `font-medium` (500), 14px, tracking-[-0.02em].

| Variant | Fill | Text |
|---------|------|------|
| `default` | green-700 `#1b8c8c` | white |
| `secondary` | zinc-200/5% | zinc-200/70% |
| `ghost` | transparent + border zinc-200/20% | zinc-200 |
| `bare` | transparent | zinc-200/70% |
| `solid` | zinc-800 `#27282b` | zinc-200 |
| `white` | zinc-200 | zinc-950 |
| `destructive` | coral/10% + border | coral |
| `destructive-solid` | coral | white |

Sizes: `sm`=28px · `default`=36px · `lg`=44px

**`default` and `white` are never used together.**

---

## ⛔ NEVER hardcode values — always use DS tokens

Every color, spacing, and typography value MUST come from the DS token system.
If you find yourself writing a hex value or rgba() directly in a component, STOP — find the correct token first.

| ❌ WRONG (hardcoded) | ✅ RIGHT (token) |
|---------------------|-----------------|
| `#d2d3d3` | `var(--txt-high)` or `text-[#d2d3d3]` only if token doesn't exist |
| `rgba(210,211,211,0.12)` | `var(--line-low)` |
| `rgba(210,211,211,0.20)` | `var(--line-reg)` |
| `#27282b` | `var(--fill-low)` |
| `#2d2f33` | `var(--fill-reg)` or `zinc-750` |
| `#323539` | `var(--fill-menu)` |
| `#171819` | `var(--bg)` |
| `#202123` | `var(--bg-card)` |
| `#1b8c8c` | `var(--green)` (button fill) |
| `#63dbdb` | `var(--green)` (text/accents) |
| `#2db4b4` | field label color |
| `#e8533a` | `var(--destructive)` |
| `#e76638` | `var(--warning)` |

This rule applies to EVERY component — buttons, inputs, badges, table rows, list items, everything.

---

## What NOT to do

- Don't use `green-500` as button fill — contrast fails
- Don't use `rounded-[32px]` for file upload — it's `24px`
- Don't use box-shadow ring on inputs — single border only
- Don't use `default` and `white` button variants together
- Don't use `destructive-solid` as first-touch action
- Don't use `brand-pink` in product UI
- Don't add `font-semibold` to buttons — spec is `font-medium` (500)
- Don't use square checkbox — Waldo uses circular
