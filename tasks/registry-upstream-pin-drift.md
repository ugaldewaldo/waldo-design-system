# Re-pin the vendored DS registry's UPSTREAM stamp (drifted past cd6a74e)

- **What:** Steve's registry (waldo-agentic side, vendored DS layer from PR #2435 / PRO-2741) had an `UPSTREAM` stamp pointing at `cd6a74e`, but the vendored files had drifted past it: `tabs.tsx` at upstream main, `theme.css` matching no upstream version, doctrine between `eb5a0cb` and main.
- **Where:** Steve's registry in waldo-agentic — not this repo.
- **Why:** Flagged by Steve in PRO-2772 (closing comment, 2026-07-07) as a future cleanup pass.
- **Status:** done — resolved by waldo-agentic PR #2482 (merged 2026-07-08): all registry artifacts re-vendored from waldo-design-system@`9d42f62` and the UPSTREAM stamp updated to that commit; `brand-api-dashboard-doctrine.md` also added to the sync-upstream allow-list so it can't silently drift again.
- **Owner:** Steve (registry) — Brand Kit session tracks the waldo-agentic bridge going forward.
