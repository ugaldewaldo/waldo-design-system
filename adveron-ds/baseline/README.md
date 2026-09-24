# Baseline — what Adveron ships today

A verbatim copy of `waldo-agentic/packages/adveron-web` at the commit pinned in
`../UPSTREAM`. This is version zero: the starting point is reality, not an ideal.

**Do not edit anything in this folder.** It is a record. Changes to Adveron's UI
become review cards; once approved they land in the official layer, never here.
To move the baseline forward, re-snapshot from a newer `origin/main` and update
`UPSTREAM`.

Contents (paths mirror adveron-web):

| Path | What |
|---|---|
| `src/app/waldo-theme.css` | Base layer — the vendored Waldo theme (type, zinc scale, radii) |
| `src/app/adveron-theme.css` | Brand layer — the Arcade palette and the Plex/Inter split |
| `src/app/globals.css` | How the two themes are wired into Tailwind v4 |
| `src/components/ui/*.tsx` | The 20 components (plus their 4 tests) |
| `src/lib/utils.ts`, `src/test/chart-layout.ts` | The only local files the components import |
| `components.json`, `package.json` | shadcn config and dependency versions |

The Waldo detector skips this folder on purpose (`tools/pre-commit.sh`, CI): it is
another brand's palette, recorded as-is.
