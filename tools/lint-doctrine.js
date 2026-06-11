#!/usr/bin/env node
/**
 * Waldo Doctrine Linter — completeness checker for docs/usage-doctrine.yaml.
 *
 * Pure Node, zero dependencies. Validates:
 *   1. Coverage — every component in waldo-ui/src/components/ui/ has a doctrine
 *      entry, and every entry maps to a real component file.
 *   2. Entry standard — use_when ≥ 2 · dont_use_when ≥ 2 · prefer_over ≥ 1 ·
 *      notes present (ideally with a Figma node reference).
 *
 * Usage:
 *   node tools/lint-doctrine.js [--json]
 *
 * Exit code: 0 = clean, 1 = errors (missing coverage), warnings alone pass.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOCTRINE_PATH = path.join(ROOT, 'docs', 'usage-doctrine.yaml');
const COMPONENTS_DIR = path.join(ROOT, 'waldo-ui', 'src', 'components', 'ui');

// Infrastructure files that are not user-facing components — no doctrine entry required.
const EXEMPT = new Set([
  'form', // react-hook-form glue, not a visual component
  'icons', // icon registry (individual icons documented via their pattern entries)
  'icon', // icon wrapper util
  'charts', // chart demos barrel
  'sonner', // engine behind Toast — Toast is the documented surface
]);

/* ── Parse doctrine entries (regex-based; structure is stable) ── */

function parseDoctrine(text) {
  const entries = [];
  const blocks = text.split(/\n  - component: /).slice(1);
  for (const block of blocks) {
    const name = block.split('\n')[0].trim();
    const count = (field) => {
      const m = block.match(new RegExp(`\\n    ${field}:\\n((?:      - [^\\n]*\\n?)+)`));
      return m ? m[1].split('\n').filter((l) => l.trim().startsWith('- ')).length : 0;
    };
    const hasNotes = /\n    notes:/.test(block);
    const hasFigmaRef = /Figma node/i.test(block);
    entries.push({
      name,
      use_when: count('use_when'),
      dont_use_when: count('dont_use_when'),
      prefer_over: count('prefer_over'),
      notes: hasNotes,
      figmaRef: hasFigmaRef,
    });
  }
  return entries;
}

/* ── Name matching: doctrine names ↔ tsx filenames ── */

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function entryAliases(name) {
  // "Tag / TagInput" → ["tag", "taginput"]; "Dialog / Modal" → ["dialog", "modal"]
  return name.split('/').map((p) => normalize(p)).filter(Boolean);
}

/* ── Run ── */

const doctrineText = fs.readFileSync(DOCTRINE_PATH, 'utf8');
const entries = parseDoctrine(doctrineText);

const tsxFiles = fs
  .readdirSync(COMPONENTS_DIR)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => f.replace('.tsx', ''));

const findings = [];
const add = (severity, rule, subject, message) => findings.push({ severity, rule, subject, message });

// 1a. components without a doctrine entry
const allAliases = new Set(entries.flatMap((e) => entryAliases(e.name)));
for (const file of tsxFiles) {
  if (EXEMPT.has(file)) continue;
  if (!allAliases.has(normalize(file))) {
    add('error', 'missing-entry', file, `${file}.tsx has no doctrine entry`);
  }
}

// 1b. entries without a component file
const allFiles = new Set(tsxFiles.map(normalize));
for (const e of entries) {
  if (!entryAliases(e.name).some((a) => allFiles.has(a))) {
    add('warning', 'orphan-entry', e.name, `doctrine entry "${e.name}" matches no .tsx file`);
  }
}

// 2. entry standard
for (const e of entries) {
  if (e.use_when < 2) add('warning', 'thin-use-when', e.name, `use_when has ${e.use_when} item(s), standard is ≥2`);
  if (e.dont_use_when < 2) add('warning', 'thin-dont-use', e.name, `dont_use_when has ${e.dont_use_when} item(s), standard is ≥2`);
  if (e.prefer_over < 1) add('warning', 'no-prefer-over', e.name, `prefer_over is empty — the agent's decision field`);
  if (!e.notes) add('warning', 'no-notes', e.name, `notes missing — exact values + Figma node belong here`);
  else if (!e.figmaRef) add('warning', 'no-figma-ref', e.name, `notes have no Figma node reference`);
}

/* ── Output ── */

const args = process.argv.slice(2);
const errors = findings.filter((f) => f.severity === 'error');
const warnings = findings.filter((f) => f.severity === 'warning');

if (args.includes('--json')) {
  console.log(
    JSON.stringify(
      { entries: entries.length, componentFiles: tsxFiles.length, exempt: [...EXEMPT], errors: errors.length, warnings: warnings.length, findings },
      null,
      2
    )
  );
} else {
  const byRule = {};
  for (const f of findings) (byRule[f.rule] = byRule[f.rule] || []).push(f);
  for (const rule of Object.keys(byRule)) {
    console.log(`\n[${rule}] (${byRule[rule].length})`);
    for (const f of byRule[rule]) {
      console.log(`  ${f.severity === 'error' ? '✗' : '⚠'} ${f.subject} — ${f.message}`);
    }
  }
  console.log(`\n${entries.length} doctrine entries · ${tsxFiles.length} component files (${EXEMPT.size} exempt) · ${errors.length} error(s) · ${warnings.length} warning(s)`);
}

process.exit(errors.length ? 1 : 0);
