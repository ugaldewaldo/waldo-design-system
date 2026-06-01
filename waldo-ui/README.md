# @waldo/ui

Waldo UI — shadcn-based component library, dark-first, product-grade.

## Stack

- React 18/19 + TypeScript
- Tailwind CSS v3
- Radix UI primitives
- class-variance-authority (CVA) for variants
- lucide-react for icons

---

## Install in a Next.js project

### 1. Copy or link the package

```bash
# If using a monorepo (recommended), add as a workspace dep:
# packages/ui → linked automatically

# Or copy the folder and reference it locally:
# "dependencies": { "@waldo/ui": "file:../waldo-ui" }
```

### 2. Install dependencies

```bash
npm install @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select \
  @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip \
  class-variance-authority clsx cmdk lucide-react tailwind-merge tailwindcss-animate
```

### 3. Add the theme CSS to your app

In your `app/globals.css` (or `styles/globals.css`):

```css
/* Replace your existing globals with: */
@import "@waldo/ui/globals.css";
```

Or if you need to keep your own globals, import it first and add your overrides below.

### 4. Extend your Tailwind config

```ts
// tailwind.config.ts
import { type Config } from "tailwindcss";
import baseConfig from "@waldo/ui/tailwind.config"; // if sharing directly

const config: Config = {
  presets: [baseConfig],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    // Include the UI package so Tailwind picks up its classes:
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};
export default config;
```

### 5. Use components

```tsx
import { Button, Badge, Input, Field } from "@waldo/ui";

export function Example() {
  return (
    <Field label="Search" hint="Search across all brands">
      <Input placeholder="Nike, Adidas…" />
    </Field>
    <Button variant="default">Run briefing</Button>
    <Badge variant="default" dot>Active</Badge>
  );
}
```

---

## Components — Phase 1

| Component | Variants / Notes |
|-----------|-----------------|
| `Button` | default · secondary · ghost · outline · destructive · destructive-solid · link — sizes xs/sm/default/lg/xl + icon sizes — `loading` prop |
| `Input` | prefix/suffix slots — `Field` wrapper with label, hint, error |
| `Textarea` | resizable, same Field wrapper |
| `Badge` | default · secondary · outline · destructive · warning · highlight · success — `dot` prop |
| `Avatar` | xs/sm/md/lg/xl/2xl — `AvatarGroup` with max+overflow |
| `Checkbox` | checked · unchecked · indeterminate |
| `Switch` | compact (16px height), Linear-style |
| `Select` | full Radix Select — label groups, separator |
| `Dialog` | sm/md/lg/xl — `DialogHeader` · `DialogBody` · `DialogFooter` |
| `DropdownMenu` | items · checkbox items · radio items · sub-menus · shortcuts · destructive variant |
| `Command` | cmdk-based — input, groups, empty state, shortcuts |
| `Tooltip` | arrow, popover surface |
| `Table` | sortable headers — row selection — responsive overflow |

---

## Design tokens

All components use CSS variables defined in `globals.css`. The token model follows a 3-layer system:

```
primitives (zinc-950, green-500…)
  → alpha variants (zinc-200/12%)
    → semantic tokens (--surface-*, --text-*, --border-*)
      → shadcn vars (--background, --foreground, --primary…)
```

Never reference primitives directly from components — always go through semantic tokens.

---

## Roadmap (Phase 2 — Waldo custom)

- `ResultCard` — feed content cards (articles, social posts)
- `SidePanel` — lateral panel with header/scroll/footer
- `TagInput` — multi-value input
- `AgentRow` — agent/task list item
- `EmptyState` — empty state with icon + CTA
- `StatusBadge` — live status indicator
