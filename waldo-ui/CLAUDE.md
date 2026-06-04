# Waldo UI — shadcn Component Library

Read the root `CLAUDE.md` first for DS fundamentals. This file covers component-specific rules only.

---

## Stack

React + TypeScript · Tailwind CSS v3 · shadcn/ui · Radix primitives · CVA · lucide-react · Sonner

---

## Token reference — component layer

All values come from `globals.css` → `tailwind.config.ts`. Use Tailwind classes, never hex.

| Concept | Tailwind class |
|---------|---------------|
| App background | `bg-background` |
| Card / panel | `bg-card` |
| Dropdown / popover | `bg-popover` |
| Input / sunken surface | `bg-muted` |
| Secondary fill | `bg-secondary` |
| Hover fill in menus | `bg-accent` |
| Brand CTA fill | `bg-primary` |
| Text on brand fill | `text-primary-foreground` |
| Destructive | `bg-destructive` / `text-destructive` |
| Warning | `bg-warning` / `text-warning` |
| Highlight | `bg-highlight` / `text-highlight` |
| Primary text | `text-foreground` |
| Secondary text | `text-foreground/70` |
| Tertiary text | `text-muted-foreground` |
| Placeholder | `text-foreground/50` |
| Border subtle | `border-foreground/[0.12]` |
| Border default | `border-foreground/20` |
| Input hover/focus border | `border-waldo-green-800` |
| Focus ring | `ring-ring` |
| Zinc scale | `bg-zinc-700` … `bg-zinc-950` (mapped to globals.css via CSS vars) |

---

## Component status

### ✅ Atomic
Button, Input/Field, Badge, Avatar, Checkbox, Switch, Select, SegmentedControl, Tag/TagInput, FileInput, Separator, Tooltip, Table, Tabs, Toast, Alert, EmptyState, Icon, ListItem/ListView

### ✅ Overlay
Dialog, DropdownMenu, Command

### ⏳ Pending
Skeleton, Sheet/Drawer, Card/ResultCard, DataTable, Combobox, Popover, DatePicker, RadioGroup, Slider, AlertDialog, NavigationSidebar

---

## Component-specific rules

### Button
- Shape: `rounded-full` (pill). Font: `font-medium` (500), 14px, `tracking-[-0.02em]`
- Sizes: `sm`=28px · `default`=36px · `lg`=44px
- Never use `font-semibold` on buttons
- Never use `default` and `white` variants together in the same view

### Input / Field
- Shape: `rounded-full` (pill), matches button language
- Hover/focus border: `border-waldo-green-800` — single border, NO ring
- Field label: `text-primary`
- Textarea: same border rules as Input, no ring

### Checkbox
- Shape: **circular** (`rounded-full`) — NOT square
- Variants: `green` (brand) and `mono` (neutral)

### Select / Dropdown
- Container: `bg-popover` · `rounded-2-5xl` (20px) · `shadow-popover`
- Search bar: `bg-muted` · flush top
- Item hover: `bg-foreground/[0.07]`
- Separator: `bg-foreground/[0.12]`

### Avatar
- Round: `rounded-full` — people, users
- Square: `rounded-sm` (4px) — brands, logos

### FileInput
- Zone radius: `rounded-4xl` (32px) — NOT larger
- Zone bg: `bg-muted`
- Error text: `text-warning`

### Icon
- Canvas 16px → `h-3.5 w-3.5` (14px) — inline, table, button-sm
- Canvas 24px → `h-4 w-4` (16px) or `h-[18px] w-[18px]` — default buttons, nav
- strokeWidth: always `1.5`

---

## ⛔ Never do this

- Hardcode any hex, rgba, or CSS variable not in `globals.css`
- Use `--txt-high`, `--fill-low`, `--bg`, `--line-low` etc. — these don't exist
- Use square checkboxes
- Add `font-semibold` to buttons
- Add `box-shadow` ring to inputs
- Use `brand.*` colors in product UI
- Use italic anywhere
