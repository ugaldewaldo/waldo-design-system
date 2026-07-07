# Doctrines

Local governance console for Waldo doctrine files. Always a view/editor over the
files — the files stay the single source of truth; agents read them directly and
never see this UI.

**Navigation** — one canonical nav-kit sidebar (NavPanel plain). The switcher chip
at the top changes section:

- **Components** — per-component usage doctrine (one, DS-wide). The sidebar lists
  every component (searchable, with thin-entry warning dots).
- **One entry per surface doctrine** — auto-discovered: every `docs/*-doctrine.md`
  containing a `## Do not` section becomes a switcher option (label = the doc's H1).
  To add a future surface (FYI reports, Marketing…), create the `.md` with the
  standard sections — no panel changes needed. The sidebar lists the surface's views:

- **Principles** — the aesthetic thesis, editable.
- **Rules** — kanban triage of the "Do not" rules into **Hard / Should / Preference**
  tiers. Order within a column = hierarchy. **Save to document** writes the section
  back with inline `[hard]`/`[should]`/`[pref]` tags — the tags are the persistence
  layer, so reopening the panel restores the triage.
- **Calibration** — the Gold vs Slop table per dimension.
- **Gallery** — reference gallery.

**Components tab** (`docs/usage-doctrine.yaml`):

- Per-component usage rules — `use_when` / `dont_use_when` / `prefer_over` / `notes`.
- Sidebar lists every doctrine entry plus index components with no rules yet
  (from `docs/component-index.json`); a warning dot marks thin entries
  (same standard as `tools/lint-doctrine.js`).
- Edits change rule **content only** — the YAML structure, header comments,
  `token_rules` footer, and non-standard keys (e.g. `variants:`) are preserved
  verbatim. Untouched entries are re-emitted byte-for-byte.

A `.bak` of the target file is written before every save.

## Run

```bash
node doctrines/server.js
# → http://localhost:4174
```

Zero dependencies (Node stdlib). Reads/writes the doctrine live; no build step.

## Scope

V1 operates on the `## Do not` section (the atomic rules). The parser and writer are
scoped to that section only — the surrounding prose is never touched.
