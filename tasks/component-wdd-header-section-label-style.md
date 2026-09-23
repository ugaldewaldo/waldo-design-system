# DropdownMenu section label (`.wdd-header`) looks wrong — teal lowercase

- **What:** The dropdown/menu section label class `.wdd-header` renders in `hsl(var(--primary))` (teal) at `--fs-sm`, sentence case. That reads like an interactive/active item, not a section label. The expected pattern for a menu section heading (shadcn `DropdownMenuLabel`, and Waldo's own table column headers `.wui-table th`) is **uppercase, muted, small, with letter-spacing** — quiet, non-teal.
- **Where:** `waldo-ds.css` (`.wdd-header`, ~line 872) and its source in `tools/waldo-ds.styles.css`. Regenerate `waldo-ds.css` via `bash tools/build-waldo-ds.sh` after the fix. Also review the `.wdd-header` demo in `index.html` and the `DropdownMenu` `.tsx` if it exposes a label sub-component.
- **Proposed fix:** restyle `.wdd-header` to match the section-label convention — `text-transform: uppercase; letter-spacing: 0.06em; font-size: var(--fs-xs); font-weight: 500; color: hsl(var(--muted-foreground));` (mirrors `.wui-table th`). Keep teal reserved for active/interactive states, not static labels.
- **Why:** Surfaced while building the Team management drawer mockup (`team-mockup-drawer.html`, 2026-07-29). Miguel did not recognize the teal-lowercase label as a Waldo pattern; it's near-unused and off-convention. The mockup currently side-steps it with a local `.wdd-sectlabel` (uppercase muted) — remove that local override once `.wdd-header` is fixed at the DS level.
- **Status:** todo
- **Owner:** Component Library (`.tsx` + globals) / Validator (waldo-ds.css sync)
- **Reported by:** Brand API Prototypes session
