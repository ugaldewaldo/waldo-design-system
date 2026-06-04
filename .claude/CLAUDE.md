# Waldo Design System — Claude Code Config

## Skills

- `/ds-add-token` — Add or update a token keeping all 4 layers in sync
- `/ds-component` — Implement or fix a component from Figma
- `/ds-verify` — Audit a component for DS violations (run before finishing ANY component)

**Always use a skill before touching tokens or components.**

## Mandatory workflow — NO EXCEPTIONS

```
1. Implement component          → /ds-component
2. ⛔ VERIFY before finishing   → /ds-verify <filename>
3. Fix all violations           → repeat until clean
4. Update index.html demo       → required
5. Commit                       → only after verification passes
```

**Never deliver a component that hasn't passed /ds-verify.**

## What /ds-verify checks

1. No hardcoded hex (`#xxxxxx`, `bg-[#...]`, `text-[#...]`)
2. No hardcoded rgba (except inside SVG paths)
3. No wrong fonts (only Inter — no JetBrains Mono, SF Mono, etc. in UI)
4. No legacy CSS vars (`--txt-high`, `--fill-low`, `--bg`, `--line-low` etc.)
5. No hardcoded px radii when token exists (`rounded-[20px]` → `rounded-2-5xl`)
6. No recreating atoms that already exist (Badge, Separator, Icon, Button etc.)

## Critical rules

See root `CLAUDE.md` for full token rules.

- **Single source of truth**: `figma/waldo.tokens.json`
- **Never hardcode anything** — tokens only
- **Never use brand.* in product** — marketing only
- **4 layers always in sync**: JSON → globals.css → tailwind.config.ts → components
- **English only** — no Spanish in any DS file
- **Inter only** — no other fonts in UI components
