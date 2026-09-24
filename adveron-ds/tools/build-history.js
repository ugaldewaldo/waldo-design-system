#!/usr/bin/env node
/*
 * Builds adveron-ds/app/history.json — the evidence behind every baseline file:
 * who changed it, when, under which Linear card, how much, and a provenance tag.
 *
 *   node adveron-ds/tools/build-history.js [--agentic ~/GitHub/waldo-agentic]
 *
 * Reads git history from waldo-agentic up to the SHA pinned in adveron-ds/UPSTREAM,
 * so the page describes exactly the baseline, never a newer working copy.
 *
 * Provenance is EVIDENCE, never a claim of who decided:
 *   created     — the commit that added the file.
 *   asked-for   — the commit or PR title names this file's visual subject.
 *   side-effect — the change rode inside a commit whose title is about something else.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const HERE = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(HERE, '..');
const argIdx = process.argv.indexOf('--agentic');
const AGENTIC = argIdx > -1 ? process.argv[argIdx + 1] : path.join(os.homedir(), 'GitHub', 'waldo-agentic');
const PKG = 'packages/adveron-web';
const GITHUB = 'https://github.com/waldo-fyi/waldo-agentic';
const LINEAR = 'https://linear.app/waldofyi/issue';

const upstream = fs.readFileSync(path.join(HERE, 'UPSTREAM'), 'utf8');
const SHA = upstream.match(/^sha:\s*(\w+)/m)[1];

const git = (...args) => execFileSync('git', ['-C', AGENTIC, ...args], { encoding: 'utf8', maxBuffer: 64 << 20 });

// What a title has to mention for a change to count as asked for, per file.
// Component files: their own name (and obvious synonyms). Theme files: theme vocabulary.
const THEME_WORDS = ['theme', 'palette', 'color', 'colour', 'token', 'font', 'typeface', 'type scale', 'brand layer', 'dark mode', 'light mode', 'radius', 'radii', 'shadow', 'restyle', 'redesign', 'visual'];
const SYNONYMS = {
  'dropdown-menu': ['dropdown'],
  'radio-group': ['radio'],
  dialog: ['dialog', 'modal', 'overlay'],
  sheet: ['sheet', 'drawer', 'side panel'],
  chart: ['chart', 'graph'],
  command: ['command', 'palette', 'cmdk'],
  input: ['input', 'field', 'textarea'],
  tabs: ['tab'],
  table: ['table'],
  select: ['select'],
  skeleton: ['skeleton', 'loading'],
};

function subjectWords(file) {
  const base = path.basename(file).replace(/\.(tsx|css)$/, '');
  if (file.endsWith('.css')) return THEME_WORDS;
  return SYNONYMS[base] || [base];
}

function tagFor(file, subject, isCreation) {
  if (isCreation) return 'created';
  const s = subject.toLowerCase();
  return subjectWords(file).some((w) => new RegExp(`\\b${w}`, 'i').test(s)) ? 'asked-for' : 'side-effect';
}

function historyOf(rel) {
  const full = `${PKG}/${rel}`;
  // --follow is left off on purpose: these files were created in place, and it
  // mis-attributes renames across the monorepo's many small ui/*.tsx files.
  const out = git('log', SHA, '--numstat', '--format=@@%H|%an|%aI|%s', '--', full);
  const commits = [];
  for (const block of out.split('@@').filter(Boolean)) {
    const [head, ...rest] = block.trim().split('\n');
    const [sha, author, date, ...subj] = head.split('|');
    const subject = subj.join('|');
    const stat = rest.find((l) => l.trim());
    const [added, removed] = stat ? stat.split('\t') : ['0', '0'];
    const card = (subject.match(/\b(ENG|PRO|MAR)-\d+\b/) || [])[0] || null;
    const pr = (subject.match(/\(#(\d+)\)\s*$/) || [])[1] || null;
    commits.push({
      sha: sha.slice(0, 9),
      author,
      date: date.slice(0, 10),
      subject,
      added: Number(added) || 0,
      removed: Number(removed) || 0,
      card,
      cardUrl: card ? `${LINEAR}/${card}` : null,
      pr,
      url: pr ? `${GITHUB}/pull/${pr}` : `${GITHUB}/commit/${sha}`,
    });
  }
  // git log is newest first; the last entry is the one that created the file.
  commits.forEach((c, i) => (c.tag = tagFor(rel, c.subject, i === commits.length - 1)));
  return commits;
}

function lines(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').split('\n').length : null;
}

// How far the fork sits from Waldo today: changed lines between the two files.
function waldoDiff(rel) {
  const name = path.basename(rel);
  const waldo = path.join(REPO_ROOT, 'waldo-ui', 'src', 'components', 'ui', name);
  if (!fs.existsSync(waldo)) return null;
  try {
    execFileSync('diff', [path.join(HERE, 'baseline', rel), waldo]);
    return 0;
  } catch (e) {
    return String(e.stdout).split('\n').filter((l) => /^[<>]/.test(l)).length;
  }
}

const themeFiles = ['src/app/waldo-theme.css', 'src/app/adveron-theme.css', 'src/app/globals.css'];
const componentFiles = fs
  .readdirSync(path.join(HERE, 'baseline', 'src', 'components', 'ui'))
  .filter((f) => f.endsWith('.tsx') && !f.endsWith('.test.tsx'))
  .map((f) => `src/components/ui/${f}`);

const entry = (rel, kind) => {
  const commits = historyOf(rel);
  const count = (t) => commits.filter((c) => c.tag === t).length;
  return {
    id: path.basename(rel).replace(/\.(tsx|css)$/, ''),
    file: rel,
    kind,
    lines: lines(path.join(HERE, 'baseline', rel)),
    waldoDiff: kind === 'component' ? waldoDiff(rel) : null,
    authors: [...new Set(commits.map((c) => c.author))],
    lastChanged: commits[0] ? commits[0].date : null,
    askedFor: count('asked-for'),
    sideEffect: count('side-effect'),
    commits,
  };
};

const data = {
  upstream: { sha: SHA, short: SHA.slice(0, 9), url: `${GITHUB}/commit/${SHA}` },
  generated: new Date().toISOString().slice(0, 10),
  themes: themeFiles.map((f) => entry(f, 'theme')),
  components: componentFiles.map((f) => entry(f, 'component')),
};

const outDir = path.join(HERE, 'app');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'history.json'), JSON.stringify(data, null, 2) + '\n');
const all = [...data.themes, ...data.components];
console.log(
  `history.json · ${all.length} files · ${all.reduce((n, e) => n + e.commits.length, 0)} changes · ` +
    `${all.reduce((n, e) => n + e.askedFor, 0)} asked for · ${all.reduce((n, e) => n + e.sideEffect, 0)} side effect`,
);
