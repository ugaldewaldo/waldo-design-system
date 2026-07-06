# Doctrine Severity Panel

A local kanban tool to triage the **"Do not"** rules of
`docs/brand-api-dashboard-doctrine.md` into severity tiers.

- Drag each rule between **Hard / Should / Preference** columns.
- Order within a column = its hierarchy (top = most important).
- **Save to document** writes the section back to the `.md` in place — rules get an
  inline `[hard]`/`[should]`/`[pref]` tag and are regrouped under tier subheadings.
  Those tags are the persistence layer, so reopening the panel restores your triage.

A `.bak` of the doctrine is written before every save.

## Run

```bash
node waldo-labs/doctrine-panel/server.js
# → http://localhost:4174
```

Zero dependencies (Node stdlib). Reads/writes the doctrine live; no build step.

## Scope

V1 operates on the `## Do not` section (the atomic rules). The parser and writer are
scoped to that section only — the surrounding prose is never touched.
