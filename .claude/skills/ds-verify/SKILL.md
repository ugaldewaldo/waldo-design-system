---
name: ds-verify
description: Audit a component file for DS violations before finishing. MANDATORY before any commit.
argument-hint: "[filename or path]"
---

# DS Verify

Run this on EVERY component before finishing. No exceptions.

## What to check

### 1. Hardcoded colors — ZERO tolerance
Search the file for:
```bash
grep -nE '(#[0-9a-fA-F]{3,8}|bg-\[#|text-\[#|border-\[#)' <file>
grep -nE 'rgba\([0-9]' <file>
```
Every hit is a violation. Replace with DS token.

### 2. Wrong fonts — Inter only
```bash
grep -nE "font-family" <file>
```
Only allowed in: code snippets, keyboard shortcuts, hex swatches.
Never in: component UI, labels, numbers, values.

### 3. Legacy CSS vars that don't exist
```bash
grep -nE 'var\(--(txt-|fill-|bg-card|bg-high|elevated|sunken|line-low|line-reg|line-high|green\b)' <file>
```
Zero tolerance. These variables do not exist in globals.css.

### 4. Hardcoded radii
```bash
grep -nE 'rounded-\[[0-9]+px\]' <file>
```
Replace with token class:
- `rounded-[20px]` → `rounded-2-5xl`
- `rounded-[24px]` → `rounded-4xl`
- `rounded-[4px]` → `rounded-sm`

### 5. Atomic component reuse
Before writing any HTML/JSX, confirm:
- Status labels → `Badge`
- Dividers → `Separator`
- Icons → `Icon` wrapper or Lucide
- Toggle → `Switch`
- Checkbox → `Checkbox`
- Text input → `Input` / `Field`
- List rows → `ListItem`

### 6. index.html impact
If you changed an existing component:
- Does the index.html demo still reflect the correct behavior?
- Did any other component depend on the changed one?

## Pass criteria

The component passes verification when:
- [ ] Zero hardcoded hex or rgba in component code
- [ ] Zero wrong fonts
- [ ] Zero legacy CSS vars
- [ ] Zero hardcoded px radii
- [ ] All atoms reused correctly
- [ ] index.html demo updated
- [ ] English only — no Spanish in comments or labels

**If any check fails → fix it. Do not commit.**

### 7. No hardcoded HTML in demos

In `index.html` component demos, NEVER use raw `<input>` / `<button>` / `<select>` with inline styles.
Always use the DS classes:
- Input fields → class="input"
- Buttons → class="btn btn-default | btn-ghost | btn-white | btn-destructive"
- Labels → class="field-label"
- Badges → class="badge badge-active | badge-secondary …"

If a DS class doesn't exist for the element → create the component first, then use its class.
