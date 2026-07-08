# Add --fs-3xl / --fs-4xl to the HSL theme (KPI values render tiny)

- **What:** `waldo-shadcn-theme.css` ships the `--fs-*` ramp only up to `--fs-2xl` plus `--fs-5xl` — `--fs-3xl` (30px) and `--fs-4xl` (30px) are missing. `waldo-ds.css` `.k-value` (KPI Stat Card) uses `var(--fs-4xl)`, so in every theme-consuming prototype the KPI number silently falls back to inherited body size (~14px).
- **Where:** `waldo-ui/waldo-shadcn-theme.css` (add the tokens; canonical values live in `waldo-ui/src/globals.css:219-221`). Consumers affected: all `waldo-labs/` prototypes.
- **Why:** Found while rebuilding the six PROTOTYPES dashboards (2026-07-07); confirmed independently by two build agents. Local guards (`.k-value { font-size: var(--fs-5xl) }` = 32px, nearest existing token) were added in `waldo-labs/PROTOTYPES/` (moodtape, poppi-health, promo-radar, prospector, reception) — remove them once the theme ships the real 30px token.
- **Status:** todo
- **Owner:** VALIDATOR (theme + waldo-ds.css sync)
- **Reported by:** Brand API Prototypes session
