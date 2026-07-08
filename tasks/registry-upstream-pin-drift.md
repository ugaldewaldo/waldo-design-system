# Re-pin the vendored DS registry's UPSTREAM stamp (drifted past cd6a74e)

- **What:** Steve's registry (waldo-agentic side, vendored DS layer from PR #2435 / PRO-2741) has an `UPSTREAM` stamp pointing at `cd6a74e`, but the vendored files have drifted past it: `tabs.tsx` is at upstream main, `theme.css` matches no upstream version, and the doctrine sits between `eb5a0cb` and main. The snapshot is no longer cleanly pinned to a single waldo-design-system commit.
- **Where:** Steve's registry in waldo-agentic — not this repo. Our side only needs to coordinate the re-pin and confirm which commit the stamp should point to.
- **Why:** Flagged by Steve in PRO-2772 (closing comment, 2026-07-07) as a future cleanup pass. An unpinned snapshot makes the next "sync up DS commit" issue impossible to diff cleanly.
- **Status:** todo
- **Owner:** Steve (registry) — coordinate via Linear when picked up
