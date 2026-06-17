#!/usr/bin/env node
/**
 * Waldo DS Detector — deterministic design-system violation scanner.
 *
 * Pure Node, zero dependencies, no LLM. Rules come from docs/token-catalog.yaml
 * (the machine-readable token catalog) — add a rule there and this script
 * enforces it automatically.
 *
 * Usage:
 *   node tools/detect.js <file|dir> [more paths...] [--json]
 *
 * Exit code: 0 = clean, 1 = errors found (warnings alone don't fail).
 */

const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.join(__dirname, '..', 'docs', 'token-catalog.yaml');
const SCAN_EXTENSIONS = new Set(['.html', '.css', '.tsx', '.jsx', '.ts', '.js', '.vue', '.svelte']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next']);

/* ── Rules from the catalog ────────────────────────────────────── */

function loadRules(catalogText) {
  const rules = { validHex: new Set(), tokenByHex: {}, legacyVars: {}, modelDefaults: {}, validRgba: new Set(), patterns: [] };

  // colors: every catalog entry hex + its primitive/var for suggestions
  const colorBlocks = catalogText.matchAll(
    /- hex: "(#[0-9a-fA-F]{6}|rgba\([^)]+\))"\s*\n\s*primitive: ([^\n]+)\n(?:(?:(?!- hex:)[\s\S])*?vanilla_var: ([^\n]*)\n)?/g
  );
  for (const m of colorBlocks) {
    const value = m[1].toLowerCase().replace(/\s/g, '');
    const primitive = m[2].trim();
    const vanillaVar = (m[3] || '').trim();
    if (value.startsWith('#')) {
      rules.validHex.add(value);
      rules.tokenByHex[value] = { primitive, vanillaVar: vanillaVar.startsWith('--') ? vanillaVar.split(',')[0] : null };
    } else {
      rules.validRgba.add(value);
    }
  }

  // brand palette (valid values, but marketing-only)
  for (const m of catalogText.matchAll(/\{ hex: "(#[0-9a-fA-F]{6})", name: (brand-[a-z0-9-]+)/g)) {
    const hex = m[1].toLowerCase();
    rules.validHex.add(hex);
    rules.tokenByHex[hex] = { primitive: m[2] + ' (MARKETING ONLY)', vanillaVar: null };
  }

  // legacy vars with corrections
  for (const m of catalogText.matchAll(/\{ wrong: "(--[a-z-]+)[^"]*",\s*use_instead: "([^"]+)" \}/g)) {
    rules.legacyVars[m[1]] = m[2];
  }

  // model defaults
  for (const m of catalogText.matchAll(/\{ hex: "(#[0-9a-fA-F]{6})", looks_like: "([^"]+)", use_instead: "([^"]+)" \}/g)) {
    rules.modelDefaults[m[1].toLowerCase()] = { looksLike: m[2], useInstead: m[3] };
  }

  // forbidden.patterns — entries that carry a `match` become enforced rules.
  // Documenting an enforceable pattern in the catalog = enforcing it here.
  const patternsBlock = catalogText.match(/\n {2}patterns:\n([\s\S]*?)(?=\n[a-z_]+:|\n {0,2}#|$)/);
  if (patternsBlock) {
    // split into list items (each starts with "    - ")
    const items = patternsBlock[1].split(/\n {4}- /).slice(1);
    for (const item of items) {
      const matchVal = item.match(/(?:^|\n) {6}match:\s*'((?:[^']|'')*)'/);
      if (!matchVal) continue; // no regex → documentation-only, skip
      const rule = (item.match(/(?:^|\n) {6}rule:\s*([^\n]+)/) || [])[1];
      const severity = (item.match(/(?:^|\n) {6}severity:\s*([^\n]+)/) || [])[1];
      const suggestion = (item.match(/(?:^|\n) {6}suggestion:\s*'((?:[^']|'')*)'/) || [])[1];
      try {
        rules.patterns.push({
          rule: (rule || 'forbidden-pattern').trim(),
          severity: (severity || 'error').trim() === 'warning' ? 'warning' : 'error',
          regex: new RegExp(matchVal[1].replace(/''/g, "'"), 'g'),
          suggestion: suggestion ? suggestion.replace(/''/g, "'") : null,
        });
      } catch (e) {
        console.error(`detect.js: bad regex in forbidden.patterns (${rule || '?'}): ${e.message}`);
      }
    }
  }

  return rules;
}

/* ── Helpers ───────────────────────────────────────────────────── */

function expandHex(hex) {
  let h = hex.toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(h)) h = '#' + [...h.slice(1)].map((c) => c + c).join('');
  if (/^#[0-9a-f]{8}$/.test(h)) h = h.slice(0, 7); // drop alpha byte for matching
  if (/^#[0-9a-f]{4}$/.test(h)) h = '#' + [...h.slice(1, 4)].map((c) => c + c).join('');
  return h;
}

function hexToRgb(hex) {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function nearestToken(hex, rules) {
  const [r, g, b] = hexToRgb(hex);
  let best = null;
  let bestDist = Infinity;
  for (const valid of rules.validHex) {
    const [vr, vg, vb] = hexToRgb(valid);
    const d = (r - vr) ** 2 + (g - vg) ** 2 + (b - vb) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = valid;
    }
  }
  if (!best) return null;
  const t = rules.tokenByHex[best];
  return `${best} (${t.primitive}${t.vanillaVar ? ' · ' + t.vanillaVar : ''})`;
}

const ALLOWED_HEX = new Set(['#ffffff']); // white text on green-700 fills
const ALLOWED_RADII = new Set([0, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 50, 9999]);
const ALLOWED_FONTS = /inter|ui-monospace|sf mono|jetbrains mono|fira code|menlo|consolas|monospace|sans-serif|emoji/;
const TW_FOREIGN_PALETTE =
  /\b(?:bg|text|border|ring|fill|stroke|from|to|via)-(?:red|blue|violet|purple|rose|indigo|sky|cyan|emerald|lime|amber|fuchsia|slate|gray|neutral|stone|teal)-\d{2,3}\b/g;

/* ── Scanner ───────────────────────────────────────────────────── */

function scanFile(filePath, rules) {
  const findings = [];
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n');
  const add = (line, severity, rule, message, suggestion) =>
    findings.push({ file: filePath, line, severity, rule, message, suggestion: suggestion || null });

  lines.forEach((rawLine, i) => {
    const n = i + 1;

    // skip comment-only lines, and strip inline /* */ and <!-- --> comments so
    // hex labels inside comments (e.g. `--chart-1: … /* #2DD4C4 */`) don't trip
    // color rules. `//` is NOT stripped inline (would break https:// in URLs).
    if (/^(\/\/|\/\*|\*\s|<!--)/.test(rawLine.trim())) return;
    const line = rawLine.replace(/\/\*.*?\*\//g, '').replace(/<!--.*?-->/g, '');

    // 1. hex colors
    for (const m of line.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      const raw = m[0];
      if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(raw)) continue;
      const hex = expandHex(raw);
      if (rules.validHex.has(hex) || ALLOWED_HEX.has(hex)) continue;
      if (rules.modelDefaults[hex]) {
        const d = rules.modelDefaults[hex];
        add(n, 'error', 'model-default', `${raw} is a model default (${d.looksLike}) — not a Waldo color`, `use ${d.useInstead}`);
      } else if (hex === '#000000') {
        add(n, 'error', 'unknown-color', `${raw} — pure black is not in the Waldo palette`, 'use --background #171819 or a zinc token');
      } else {
        add(n, 'error', 'unknown-color', `${raw} is not in the token catalog`, `nearest Waldo token: ${nearestToken(hex, rules)}`);
      }
    }

    // 2. rgba values
    for (const m of line.matchAll(/rgba?\(([^)]+)\)/g)) {
      const compact = ('rgba(' + m[1] + ')').toLowerCase().replace(/\s/g, '');
      if (rules.validRgba.has(compact)) continue;
      const parts = m[1].split(',').map((s) => s.trim());
      if (parts.length >= 3) {
        const [r, g, b] = parts.map(Number);
        if (r === 0 && g === 0 && b === 0) continue; // shadows — intentional per DS
        if (r === 210 && g === 211 && b === 211) continue; // zinc-200 alpha family
        if (r === 23 && g === 24 && b === 25) continue; // zinc-950 alpha family
        if (r === 50 && g === 169 && b === 169) continue; // green-500 alpha family
        if (r === 222 && g === 58 && b === 40) continue; // coral-500 alpha family
        if (r === 42 && g === 108 && b === 109) continue; // green-700 alpha (button states)
        if (r === 255 && g === 255 && b === 255) {
          add(n, 'warning', 'raw-rgba', `rgba(255,255,255,…) — white alphas are not Waldo tokens`, 'use rgba(210,211,211,…) zinc-200 alpha family');
          continue;
        }
        add(n, 'warning', 'raw-rgba', `rgba(${parts.slice(0, 4).join(',')}) is not a catalog alpha`, 'check alpha namespace in token catalog');
      }
    }

    // 3. legacy variables
    for (const legacy of Object.keys(rules.legacyVars)) {
      if (line.includes(legacy + ')') || line.includes(legacy + ':') || line.includes(legacy + ',') || line.includes(legacy + ' ')) {
        add(n, 'error', 'legacy-var', `${legacy} does not exist in the DS`, `use ${rules.legacyVars[legacy]}`);
      }
    }

    // 4. font families
    const fontMatch = line.match(/font-family\s*:\s*([^;}]+)/i);
    if (fontMatch && !ALLOWED_FONTS.test(fontMatch[1].toLowerCase()) && !/var\(/.test(fontMatch[1])) {
      add(n, 'error', 'wrong-font', `font-family "${fontMatch[1].trim()}" — Inter is the only UI font`, 'use Inter (mono only for code/kbd/hex)');
    }

    // 5. italic
    if (/font-style\s*:\s*italic|class="[^"]*\bitalic\b|<em[\s>]|<i[\s>]/.test(line)) {
      add(n, 'error', 'italic', 'italic is forbidden everywhere in the DS', 'remove italic styling');
    }

    // 6. arbitrary / off-scale radii
    for (const m of line.matchAll(/border-radius\s*:\s*(\d+)px/g)) {
      const px = Number(m[1]);
      if (!ALLOWED_RADII.has(px)) {
        add(n, 'warning', 'off-scale-radius', `border-radius ${px}px is not a radius token`, 'tokens: 4/6/8/12/16/20/24/32/9999');
      }
    }
    for (const m of line.matchAll(/rounded-\[(\d+)px\]/g)) {
      add(n, 'error', 'arbitrary-radius', `rounded-[${m[1]}px] arbitrary value`, 'use a radius token class (rounded-md, rounded-2-5xl, rounded-full…)');
    }

    // 7. foreign Tailwind palettes (zinc/waldo-green are mapped to Waldo values; the rest are Tailwind defaults)
    for (const m of line.matchAll(TW_FOREIGN_PALETTE)) {
      add(n, 'error', 'foreign-palette', `${m[0]} resolves to a Tailwind default, not a Waldo color`, 'use a semantic class (bg-primary, text-destructive, bg-warning…)');
    }
    for (const m of line.matchAll(/\b(?:bg|text|border)-green-(\d{2,3})\b/g)) {
      add(n, 'warning', 'ambiguous-green', `${m[0]} — Waldo green only in Tailwind v4 (@theme); in v3 it's Tailwind's default green`, `prefer a semantic class or waldo-green-${m[1]}`);
    }

    // 8. catalog-driven forbidden patterns (from forbidden.patterns entries with a `match`)
    for (const p of rules.patterns) {
      p.regex.lastIndex = 0;
      if (p.regex.test(line)) {
        add(n, p.severity, p.rule, `forbidden pattern: ${p.rule}`, p.suggestion);
      }
    }
  });

  return findings;
}

function collectFiles(target) {
  const out = [];
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (SCAN_EXTENSIONS.has(path.extname(target))) out.push(target);
    return out;
  }
  for (const entry of fs.readdirSync(target)) {
    if (SKIP_DIRS.has(entry)) continue;
    out.push(...collectFiles(path.join(target, entry)));
  }
  return out;
}

/* ── Main ──────────────────────────────────────────────────────── */

const args = process.argv.slice(2);
const json = args.includes('--json');
const targets = args.filter((a) => a !== '--json');

if (!targets.length) {
  console.error('usage: node tools/detect.js <file|dir> [more paths...] [--json]');
  process.exit(2);
}

const rules = loadRules(fs.readFileSync(CATALOG_PATH, 'utf8'));
const files = targets.flatMap(collectFiles);
const all = files.flatMap((f) => scanFile(f, rules));

const errors = all.filter((f) => f.severity === 'error');
const warnings = all.filter((f) => f.severity === 'warning');

if (json) {
  console.log(JSON.stringify({ files: files.length, errors: errors.length, warnings: warnings.length, findings: all }, null, 2));
} else {
  let lastFile = null;
  for (const f of all) {
    if (f.file !== lastFile) {
      console.log(`\n${f.file}`);
      lastFile = f.file;
    }
    const icon = f.severity === 'error' ? '✗' : '⚠';
    console.log(`  ${icon} L${f.line} [${f.rule}] ${f.message}`);
    if (f.suggestion) console.log(`      → ${f.suggestion}`);
  }
  console.log(`\n${files.length} file(s) scanned · ${errors.length} error(s) · ${warnings.length} warning(s)`);
}

process.exit(errors.length ? 1 : 0);
