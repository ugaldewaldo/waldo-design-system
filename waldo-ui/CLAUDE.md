# Waldo UI — shadcn Component Library

Read the root `CLAUDE.md` first for DS fundamentals. This file covers component-specific rules.

---

## Stack

React + TypeScript · Tailwind CSS v3 · shadcn/ui · Radix primitives · CVA · lucide-react

---

## Critical color rules

```
green-700 #1b8c8c  → button fill (default variant). White text on top. ✓
green-500 #63dbdb  → text, accents, focus rings, badges. NEVER button fill with white text. ✗
coral-500 #e8533a  → destructive. Not red, not pink.
orange-500 #e76638 → warning.
brand-pink #d40a60 → marketing only. Never in product UI.
```

---

## Button system

Shape: `rounded-full` (pill). Font: `font-medium` (500), 14px, tracking-[-0.02em].

| Variant | Class | Fill | Text |
|---------|-------|------|------|
| default | `btn-default` | `#1b8c8c` green-700 | white |
| secondary | `btn-secondary` | zinc-200/5% | zinc-200/70% |
| ghost | `btn-ghost` | transparent + border zinc-200/20% | zinc-200 |
| bare | `btn-bare` | transparent | zinc-200/70% |
| solid | `btn-solid` | zinc-800 `#27282b` | zinc-200 |
| white | `btn-white` | zinc-200 | zinc-950 |
| destructive | `btn-destructive` | coral/10% + border | coral |
| destructive-solid | `btn-destructive-solid` | coral | white |

Sizes: `sm` = 28px · `default` = 36px · `lg` = 44px  
Icon-only: `icon-sm` = 28×28 · `icon` = 36×36 · `icon-lg` = 44×44

**`default` and `white` are never used together in the same context.**

---

## CSS variables (`globals.css`)

```css
--primary: 27 140 140;          /* green-700 — CTA button fill */
--primary-foreground: 255 255 255; /* white text on green-700 */
--destructive: 232 83 58;       /* coral-500 */
--ring: 99 219 219;             /* green-500 — focus rings only */
```

---

## Component files

```
src/
  globals.css          ← import this in the consuming app
  lib/utils.ts         ← cn() helper
  components/ui/
    button.tsx         ← 8 variants, 6 sizes, loading state
    input.tsx          ← Input + Textarea + Field wrapper
    badge.tsx          ← 6 variants, 3 sizes, dot prop
    avatar.tsx         ← 6 sizes + AvatarGroup
    checkbox.tsx
    switch.tsx
    select.tsx
    dialog.tsx         ← sm/md/lg/xl + Header/Body/Footer slots
    dropdown-menu.tsx
    command.tsx        ← cmdk-based ⌘K palette
    tooltip.tsx
    table.tsx          ← sortable headers + row selection
```

---

## Usage

```tsx
import { Button, Badge, Input, Field } from '@waldo/ui'
import '@waldo/ui/globals.css'

// CTA
<Button variant="default">Run briefing</Button>

// Destructive — soft first touch
<Button variant="destructive">Delete</Button>

// Destructive — confirmation only
<Button variant="destructive-solid">Confirm delete</Button>

// With icon
<Button variant="ghost">
  <Plus className="h-3.5 w-3.5" /> New space
</Button>

// Field with error
<Field label="Email" error="Invalid address">
  <Input className="error" />
</Field>
```

---

## What NOT to do

- Don't use `green-500` as button fill — contrast fails with white text
- Don't use `default` and `white` variants together in the same UI
- Don't use `destructive-solid` as a first-touch action — confirmation dialogs only
- Don't use `brand-pink` anywhere in product UI
- Don't reference primitive tokens directly — always go through semantic layer
- Don't add `font-semibold` to buttons — spec is `font-medium` (500)
- Don't use `rounded-md` on buttons — spec is `rounded-full` (pill)
