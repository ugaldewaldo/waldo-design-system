#!/usr/bin/env node
/**
 * Waldo DS CSS drift check — index.html is the source of the vanilla component
 * CSS; waldo-ds.css is (today) a hand-copy of it. This flags any shared CSS rule
 * whose body has drifted between the two, so the copy can't silently go stale.
 *
 * Not drift (ignored): rules only in index.html (showcase chrome / demos) and
 * rules only in waldo-ds.css (e.g. the @theme header) — those are intentional.
 * Drift = a selector present in BOTH with a DIFFERENT body.
 *
 * Usage:  node tools/lint-ds-css.js [--json]
 * Exit:   0 = in sync, 1 = drift found.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function rules(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const out = {};
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const sel = m[1].split(/\s+/).join(' ').trim();
    const body = m[2].split(/\s+/).join(' ').trim();
    if (sel.startsWith('.') || sel.startsWith(':root')) out[sel] = body;
  }
  return out;
}

function indexStyles(html) {
  return [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
}

function main() {
  const json = process.argv.includes('--json');
  const wds = rules(fs.readFileSync(path.join(ROOT, 'waldo-ds.css'), 'utf8'));
  const idx = rules(indexStyles(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')));

  const drift = [];
  for (const sel of Object.keys(wds)) {
    if (sel in idx && wds[sel] !== idx[sel]) drift.push(sel);
  }

  if (json) {
    console.log(JSON.stringify({ shared: Object.keys(wds).filter((s) => s in idx).length, drift }, null, 2));
  } else {
    if (drift.length) {
      console.log('\nwaldo-ds.css has drifted from index.html (source) on these rules:');
      for (const s of drift) console.log(`  ✗ ${s}`);
      console.log('\n  → reconcile, then regenerate waldo-ds.css from index.html (needs sign-off).');
    }
    console.log(`\n${drift.length} drifted rule(s).`);
  }
  process.exit(drift.length ? 1 : 0);
}

main();
