#!/usr/bin/env node
/**
 * Waldo Index Linter — every component demo in index.html must be backed by a
 * real .tsx component in waldo-ui/src/components/ui/.
 *
 * Source of components = the nav registry in index.html (waldoGo('comp-X')).
 * Match is hyphen-insensitive + substring either way, so naming variants like
 * comp-fileinput → file-input.tsx and comp-kpi-card → kpi-stat-card.tsx resolve.
 *
 * Usage:  node tools/lint-index.js [--json]
 * Exit:   0 = every demo backed by a .tsx, 1 = orphan demo(s) found.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const UI_DIR = path.join(ROOT, 'waldo-ui', 'src', 'components', 'ui');

// Demos that legitimately have no single .tsx (composed / vanilla-only patterns).
// Keep this list tight and justified.
const EXEMPT = new Set([
  'theme-pill',        // vanilla-only DS utility component, no React wrapper needed
  'comment-card',      // vanilla-only prototype component, consumed by waldo-labs
  'quote-card',        // vanilla-only VoC card, no React wrapper needed
  'benchmark-bar',     // vanilla-only competitive bar, no React wrapper needed
  'dual-bar-row',      // vanilla-only dual comparison row, no React wrapper needed
  'chart',             // internal data-viz section, not a standalone component
  'advanced-section',  // internal DS section grouping, not a standalone component
]);

const norm = (s) => s.replace(/-/g, '').toLowerCase();

function tsxNames() {
  return fs
    .readdirSync(UI_DIR)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => f.slice(0, -4));
}

function main() {
  const json = process.argv.includes('--json');
  const html = fs.readFileSync(INDEX, 'utf8');
  const comps = [...new Set([...html.matchAll(/waldoGo\('comp-([a-z0-9-]+)'/g)].map((m) => m[1]))];
  const tsx = tsxNames();
  const tnorm = tsx.map(norm);

  const orphans = [];
  for (const c of comps) {
    if (EXEMPT.has(c)) continue;
    const n = norm(c);
    const ok = tnorm.some((t) => n === t || n.includes(t) || t.includes(n));
    if (!ok) orphans.push(c);
  }

  if (json) {
    console.log(JSON.stringify({ components: comps.length, tsx: tsx.length, orphans }, null, 2));
  } else {
    if (orphans.length) {
      console.log('\nindex.html — component demos with no backing .tsx:');
      for (const o of orphans) {
        console.log(`  ✗ comp-${o} — no component in waldo-ui/src/components/ui/`);
        console.log(`      → add the .tsx, or fix the demo id to match, or add to EXEMPT with a reason`);
      }
    }
    console.log(`\n${comps.length} demo(s) · ${tsx.length} .tsx · ${orphans.length} orphan(s)`);
  }

  process.exit(orphans.length ? 1 : 0);
}

main();
