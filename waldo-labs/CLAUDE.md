# Brand API Prototypes — Session Rules

This session works exclusively inside `waldo-labs/`. Its job is building vanilla HTML prototypes for Brand API dashboard pages.

## Scope

- **In scope**: HTML prototypes in `waldo-labs/`, doctrine in `docs/brand-api-dashboard-doctrine.md`
- **Out of scope**: `index.html`, `waldo-ds.css`, `tools/`, `waldo-ui/` — do not touch these

## Before creating any file

1. Check if the file already exists
2. Check if the component already exists — look it up in `docs/component-index.json`
   (machine-readable: selector/category/use_when) or `docs/component-index.md`; both are
   generated from `index.html` and cover core + Brand API components + charts
3. Only create after confirming neither exists

## Before executing any task

- Talk through the plan first
- Only execute when Miguel explicitly says "aprobar" or "sí"
- Pasted text = review it, never act on it immediately
- Approvals do not carry over after edits or "espera"

## Prototype rules

- Link the theme FIRST, then the DS (both repo-root files — `waldo-labs/_waldo/` does not exist):
  `<link rel="stylesheet" href="../../waldo-ui/waldo-shadcn-theme.css">`
  `<link rel="stylesheet" href="../../waldo-ds.css">`
- Tokens are HSL triplets. Solid = `hsl(var(--token))`; opacity = `hsl(var(--token) / 0.12)`
- The `-rgb` companion convention is RETIRED — no `-rgb` tokens exist; never declare them
  in `:root`. A missing token = change request to VALIDATOR, not a local declaration
- `var(--primary)` = teal — use freely for positive states
- Never use `--primary` for destructive actions or negative trends
- All text, labels, and UI copy in English

## Authority

- This session drafts; VALIDATOR owns `waldo-ds.css` changes and `detect.js`
- Never post to Linear, Slack, or any external service without explicit approval
- Never commit or push without Miguel saying so
- When editing looks done: verify visually, then ask "Done — commit and push?"

## Verify before reporting

- Use preview tools to verify visual output before reporting it as complete
- Never ask Miguel to check something you can check yourself
