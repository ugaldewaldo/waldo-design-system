# Rule Pipeline

Folder state machine for DS rules — the laws, not the components. Run it by telling any session
**"rule pipeline"** (skill: `/ds-rule`). Stating a rule in any session captures it here
automatically, from any repo.

**Moving a file into a folder = your approval for that folder's action.**

| Folder | What it means | Who moves files in |
|--------|---------------|--------------------|
| `1-captured/` | A rule you stated, saved verbatim before it gets lost | Claude (any session, any repo) or you |
| `2-to-review/` | Drafted as canon: English wording, tier, placement, regex, violations found — read it | Claude |
| `3-to-canon/` | You approved → Claude writes it into the doctrine files and turns on enforcement | **You** |
| `4-shipped/` | Landed in canon — records the file + line and the detect rule id | Claude |
| `0-dropped/` | You rejected it → Claude leaves it alone forever | **You** |

Typical loop:

1. You say "cards never carry a border" while working in Pulse or the API console → the rule lands
   in `1-captured/` in seconds, with the context of where you said it.
2. You say "rule pipeline" → Claude drafts it: English canon line, tier, which doctrine file it
   belongs in, whether a detect regex can catch it, and which files violate it today. Result
   appears in `2-to-review/`.
3. You read the draft and drag it to `3-to-canon/` (make it law) or `0-dropped/` (never mind).
4. You say "rule pipeline" again → Claude writes it into `CLAUDE.md` / `waldo-ui/CLAUDE.md` /
   `usage-doctrine.yaml` / `token-catalog.yaml`, runs the guard, and the file ends in `4-shipped/`.

Two things this pipeline never does on its own:

- **Fix the violations it finds.** It reports them. Fixing components is `/ds-component`, and the
  GOLDEN RULE still applies — no atomic component changes without your explicit approval.
- **Commit or push.** It asks first, like everything else here.

## Tiers

Same three tiers the `doctrines/` console uses, so a rule triaged here shows up triaged there:

- `hard` — violating it is a defect. Gets a detect rule at `severity: error` when a regex is honest.
- `should` — the default choice; deviating needs a stated reason. Detect at `severity: warning`.
- `pref` — taste, documented so sessions don't re-litigate it. Documentation only, never enforced.
