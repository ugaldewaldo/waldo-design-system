# VALIDATOR — review new detect.js rules `hsl-hex-token` / `bare-triplet-var`

- **What:** detect.js now cross-checks custom-property **definitions vs consumptions
  per file**: a token defined as hex/rgb but consumed as `hsl(var(--x))` → error
  `hsl-hex-token`; a token defined as an HSL/RGB triplet but consumed bare as
  `var(--x)` in a color property → error `bare-triplet-var`. Same-file only, so
  linked-theme consumers are never flagged — it targets self-contained prototypes
  and claude.ai artifacts that vendor the theme inline.
- **Where:** `tools/detect.js` (COLOR_PROPS / HSL_TRIPLET / NUM_TRIPLET consts, rule 10
  collect + check blocks in `scanFile`).
- **Why:** the PRO-2741 class of bug shipped AGAIN in a published artifact (Brand
  Intelligence API console): stale vendored theme with hex primitives + `hsl(var())`
  consumers → transparent `.btn-default` fills. The mismatch is 100% statically
  detectable; detect.js didn't look for it. Doctrine now also requires
  `node tools/detect.js <artifact-html>` (exit 0) before publishing any artifact
  (`docs/brand-api-dashboard-doctrine.md`, "Publishing as a claude.ai artifact").
- **Validation done:** catches exactly the 5 broken tokens in the broken artifact;
  0 findings on the fixed one; broad scan `detect.js . --include-labs` (291 files)
  surfaces only 8 genuine hits, all in the archived test snapshot
  `waldo-labs/PROTOTYPES/@Organize/promo-radar/TESTS/index-ds-test3-20260618.html`
  (hex `--chart-*` redefinitions consumed via `hsl(var())`). No false positives;
  detect.js self-scan clean; guard passes.
- **Ask:** review the rule implementation + severity (both `error`), and decide
  whether the archived @Organize test snapshot gets fixed or deleted. Consider adding
  the pattern to `token-catalog.yaml` docs (documentation-only entry — the logic is
  cross-reference, not a regex, so it lives in detect.js).
- **Status:** todo (rules already live; this is a review request)
