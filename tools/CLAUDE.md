# tools/ — DS validation & build (VALIDATOR lane)

Local guide to the tooling in this folder. **Not** a scope file — the cross-cutting
rules (waldo-ds.css is generated, never edit without approval, English-only, etc.)
live in the root `CLAUDE.md` and apply to everyone. This just explains how the
pieces here work so you can change them safely.

## What lives here
- **`detect.js`** — the deterministic DS violation scanner (pure Node, zero-dep).
  Reads rules from `docs/token-catalog.yaml`. `node tools/detect.js <file|dir> [--json] [--include-labs]`.
  Exit 1 on errors (warnings don't fail). An **explicit** `waldo-labs/…` path is scanned;
  broad scans (`detect.js .`) skip `waldo-labs/` to keep the guard fast.
- **`build-waldo-ds.sh`** — generates `waldo-ds.css`. `--check` diffs against sources for the guard/CI.
- **`build-component-index.js`** — generates `docs/component-index.md` (flat list of every
  `comp-*` + `chart-page-*`). `--check` for drift.
- **`lint-doctrine.js`** — every `.tsx` needs a `usage-doctrine.yaml` entry (errors on gaps).
- **`lint-index.js`** — every `index.html` demo must be backed by a real `.tsx`.
- **`ds-audit.sh`** — the full report (components + index.html + prototypes). Run before reporting DS work.
- **`pre-commit.sh`** / **`install-hooks.sh`** — the guard: runs detect + the lints + `--check`s + YAML parse, blocks on error.
- **`waldo-ds.styles.css`** — the vanilla component-class source that feeds `waldo-ds.css`.

## Rules for changing tooling here
- **Never hand-edit `waldo-ds.css`** — it's generated. Edit `waldo-ds.styles.css` (or tokens upstream) then `bash tools/build-waldo-ds.sh`.
- **To enforce a new pattern**, add it to `docs/token-catalog.yaml` `forbidden.patterns` with a `match` regex — detect picks it up automatically. Documenting an enforceable pattern = enforcing it.
- **Tune false positives in the detector, not by loosening real rules.** Verify a flag is real before "fixing" a component.
- After any change here, run `bash tools/ds-audit.sh` and confirm the guard still passes.

## In flight
An **HSL overlay migration** is on branch `hsl-migration` (PRO-2741): `waldo-ds.css` becomes
token-free and consumes the HSL theme via `hsl(var(--token)/a)`; the `-rgb` companion
convention + `undefined-rgb-token` rule retire when it lands. Until then, the hex + `-rgb`
convention is still live.
