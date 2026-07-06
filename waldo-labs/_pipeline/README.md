# Component Pipeline

Folder state machine for missing DS components. Run it by telling any session **"pipeline"** (skill: `/component-pipeline`).

**Moving a file into a folder = your approval for that folder's action.**

| Folder | What it means | Who moves files in |
|--------|---------------|--------------------|
| `1-todo/` | Missing-component specs waiting to be built | Auto (prototype sessions) or you |
| `2-done/` | Processed specs (archive) | Claude |
| `3-to-review/` | Built to the Waldo line — open in browser and review | Claude |
| `4-to-integrate/` | You approved → Claude integrates into `index.html` | **You** |
| `5-to-figma/` | You approved → Claude recreates it in the Figma Master DS | **You** |
| `6-shipped/` | Integrated and validated | Claude |

Typical loop:

1. A prototype session hits a missing component → spec lands in `1-todo/` automatically.
2. You say "pipeline" → Claude builds it → HTML appears in `3-to-review/`.
3. You review in the browser, then drag the file to `4-to-integrate/` (straight to the index) or `5-to-figma/` (you want to work it in Figma first).
4. Files in `5-to-figma/` stay there while you iterate in Figma; when done, drag to `4-to-integrate/`.
5. You say "pipeline" again → Claude integrates (demo + EXEMPT + usage-doctrine + component-index, all validators green) → file ends in `6-shipped/`.
