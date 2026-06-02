# waldo-ui — Shadcn Component Library

Everything in this folder is the React/shadcn component package for Steve.

## What's here

| File/Folder | What |
|-------------|------|
| `src/globals.css` | shadcn CSS variables — import this in the app |
| `src/components/ui/` | All components (Button, Input, Badge, Avatar…) |
| `src/lib/utils.ts` | `cn()` helper |
| `tailwind.config.ts` | Tailwind config with Waldo tokens |
| `package.json` | Package definition — install as `@waldo/ui` |
| `CLAUDE.md` | Rules for AI agents working on this package |

## Install

```bash
# "dependencies": { "@waldo/ui": "file:../waldo-ui" }
npm install
```

```tsx
import { Button, Input, Field, Badge, Avatar } from '@waldo/ui'
import '@waldo/ui/globals.css'
```

## Rule

Component code, CSS variables, Tailwind config → here.
Figma files → `/figma`
