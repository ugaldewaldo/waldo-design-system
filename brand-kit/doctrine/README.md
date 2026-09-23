# Doctrine

One file per content type: when to use the pattern, what varies, what's fixed, and copy guidance. This is what the generation skill/app reads first to pick the right pattern for a prompt.

Read order for any generator:

1. `model-default-traps.md` — always, before generating anything. The failure modes to avoid.
2. `<pattern>.md` — the entry for the pattern in play (format: `_pattern-template.md`). Written as patterns ship.

Canonical-source rule: social, backgrounds and collateral are **Figma-first** (the Figma master is layout truth; the HTML render template mirrors it; samples are exported renders). Emails are **code-first** (the HTML skeleton is truth; token values inlined via the email-safe mapping). Every pattern entry declares its canonical source explicitly.
