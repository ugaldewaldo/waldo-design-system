#!/usr/bin/env node
/**
 * Doctrine Severity Panel — local read/write server (Node stdlib, zero deps).
 *
 * Reads the "Do not" section of docs/brand-api-dashboard-doctrine.md, exposes its
 * rules to the panel, and writes them back grouped into severity tiers with inline
 * [hard]/[should]/[pref] tags. The tags are the persistence layer — round-trippable.
 *
 * Run:  node waldo-labs/doctrine-panel/server.js   →   http://localhost:4174
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PANEL_DIR = __dirname;
const REPO_ROOT = path.resolve(PANEL_DIR, '..', '..');
const DOCTRINE = path.join(REPO_ROOT, 'docs', 'brand-api-dashboard-doctrine.md');
const PORT = 4174;

const SEVERITIES = ['hard', 'should', 'pref'];
const TIER_META = {
  hard:   { heading: 'Hard — blocking violations', note: 'A prototype that breaks one of these is wrong. detect.js / review must reject it.' },
  should: { heading: 'Should — strong defaults',   note: 'Follow unless the specific design has a documented reason not to.' },
  pref:   { heading: 'Preference — taste & polish', note: 'Guidance that raises quality; deviations are judgment calls, not violations.' },
};
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png' };

// --- doctrine parsing / writing --------------------------------------------

function findSectionBy(lines, re) {
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) { start = i; break; }
  }
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) { end = i; break; }
  }
  return { start, end };
}
const findSection = lines => findSectionBy(lines, /^##\s+Do not\s*$/);

function parseCalibration(text) {
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Calibration\b/);
  if (!sec) return { intro: '', rows: [] };
  const intro = [];
  const rows = [];
  let seenHeader = false;
  for (let i = sec.start + 1; i < sec.end; i++) {
    const ln = lines[i].trim();
    if (ln.startsWith('|')) {
      if (/^\|[\s:|-]+\|?$/.test(ln)) continue;            // separator row
      const cells = ln.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      if (!seenHeader) { seenHeader = true; continue; }     // header row
      rows.push({ dimension: cells[0] || '', gold: cells[1] || '', slop: cells[2] || '' });
    } else if (ln && !ln.startsWith('#') && ln !== '---') {
      intro.push(ln);
    }
  }
  return { intro: intro.join(' '), rows };
}

function saveCalibration(intro, rows) {
  const text = fs.readFileSync(DOCTRINE, 'utf8');
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Calibration\b/);
  if (!sec) throw new Error('Calibration section not found');
  fs.writeFileSync(DOCTRINE + '.bak', text);
  const clean = s => String(s || '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
  const out = [lines[sec.start], ''];
  if (intro && intro.trim()) out.push(intro.trim(), '');
  out.push('| Dimension | Gold | Slop ("burdo") |', '|-----------|------|----------------|');
  for (const r of rows) out.push(`| ${clean(r.dimension)} | ${clean(r.gold)} | ${clean(r.slop)} |`);
  out.push('', '---', '');
  const before = lines.slice(0, sec.start).join('\n').replace(/\n+$/, '');
  const after = lines.slice(sec.end).join('\n');
  let result = before + '\n\n' + out.join('\n');
  if (after.trim()) result += '\n' + after;
  if (!result.endsWith('\n')) result += '\n';
  fs.writeFileSync(DOCTRINE, result);
}

function parseThesis(text) {
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Aesthetic thesis\b/);
  if (!sec) return { intro: '', principles: [] };
  const intro = []; const principles = []; let cur = null; let inList = false;
  for (let i = sec.start + 1; i < sec.end; i++) {
    const ln = lines[i]; const t = ln.trim();
    const m = t.match(/^\d+\.\s+\*\*(.+?)\*\*\s*(.*)$/);
    if (m) { if (cur) principles.push(cur); cur = { title: m[1].replace(/\.$/, ''), body: m[2] }; inList = true; }
    else if (cur && /^\s+\S/.test(ln)) { cur.body += ' ' + t; }
    else if (!inList && t && !t.startsWith('#') && t !== '---') { intro.push(t); }
  }
  if (cur) principles.push(cur);
  return { intro: intro.join(' '), principles };
}

function saveThesis(intro, principles) {
  const text = fs.readFileSync(DOCTRINE, 'utf8');
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Aesthetic thesis\b/);
  if (!sec) throw new Error('Aesthetic thesis section not found');
  fs.writeFileSync(DOCTRINE + '.bak', text);
  const clean = s => String(s || '').replace(/\s+/g, ' ').trim();
  const out = [lines[sec.start], ''];
  const it = clean(intro);
  if (it) out.push(it, '');
  principles.forEach((p, i) => out.push(`${i + 1}. **${clean(p.title).replace(/\.$/, '')}.** ${clean(p.body)}`));
  out.push('', '---', '');
  const before = lines.slice(0, sec.start).join('\n').replace(/\n+$/, '');
  const after = lines.slice(sec.end).join('\n');
  let result = before + '\n\n' + out.join('\n');
  if (after.trim()) result += '\n' + after;
  if (!result.endsWith('\n')) result += '\n';
  fs.writeFileSync(DOCTRINE, result);
}

function parseGallery(text) {
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Reference gallery\b/);
  if (!sec) return { intro: '', items: [] };
  const intro = []; const items = [];
  for (let i = sec.start + 1; i < sec.end; i++) {
    const t = lines[i].trim();
    const m = t.match(/^-\s+\[(.+?)\]\((.+?)\)(?:\s*—\s*(.*))?$/);
    if (m) items.push({ title: m[1], url: m[2], caption: (m[3] || '').trim() });
    else if (t && !t.startsWith('#') && t !== '---') intro.push(t);
  }
  return { intro: intro.join(' '), items };
}

function saveGallery(intro, items) {
  const text = fs.readFileSync(DOCTRINE, 'utf8');
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Reference gallery\b/);
  if (!sec) throw new Error('Reference gallery section not found');
  fs.writeFileSync(DOCTRINE + '.bak', text);
  const clean = s => String(s || '').replace(/\s+/g, ' ').trim();
  const out = [lines[sec.start], ''];
  const it = clean(intro); if (it) out.push(it, '');
  items.forEach(x => out.push(`- [${clean(x.title)}](${clean(x.url)})${x.caption ? ' — ' + clean(x.caption) : ''}`));
  out.push('', '---', '');
  const before = lines.slice(0, sec.start).join('\n').replace(/\n+$/, '');
  const after = lines.slice(sec.end).join('\n');
  let result = before + '\n\n' + out.join('\n');
  if (after.trim()) result += '\n' + after;
  if (!result.endsWith('\n')) result += '\n';
  fs.writeFileSync(DOCTRINE, result);
}

function parseRules(text) {
  const lines = text.split('\n');
  const sec = findSection(lines);
  if (!sec) return [];
  const rules = [];
  let cur = null;
  const push = () => { if (cur) { rules.push(cur); cur = null; } };
  for (let i = sec.start + 1; i < sec.end; i++) {
    const ln = lines[i];
    const m = ln.match(/^-\s+(.*)$/);
    if (m) {
      push();
      let body = m[1];
      let sev = 'hard';
      const tag = body.match(/^\[(hard|should|pref)\]\s*/i);
      if (tag) { sev = tag[1].toLowerCase(); body = body.slice(tag[0].length); }
      cur = { severity: sev, text: body.trim() };
    } else if (cur && /^\s+\S/.test(ln)) {
      cur.text += ' ' + ln.trim();      // wrapped continuation line
    } else if (/^###\s+/.test(ln) || ln.trim() === '') {
      push();                            // tier heading or blank ends a bullet
    }
  }
  push();
  return rules.map((r, i) => ({ id: i, severity: r.severity, text: r.text }));
}

function buildSection(rules) {
  const out = ['## Do not', ''];
  for (const sev of SEVERITIES) {
    const group = rules.filter(r => r.severity === sev);
    if (!group.length) continue;
    out.push(`### ${TIER_META[sev].heading}`, '', `_${TIER_META[sev].note}_`, '');
    for (const r of group) out.push(`- [${sev}] ${r.text}`);
    out.push('');
  }
  return out.join('\n').replace(/\n+$/, '\n');
}

function save(rules) {
  const text = fs.readFileSync(DOCTRINE, 'utf8');
  const lines = text.split('\n');
  const sec = findSection(lines);
  if (!sec) throw new Error('"## Do not" section not found');
  fs.writeFileSync(DOCTRINE + '.bak', text);              // safety backup
  const before = lines.slice(0, sec.start).join('\n').replace(/\n+$/, '');
  const after = lines.slice(sec.end).join('\n');
  let result = before + '\n\n' + buildSection(rules);
  if (after.trim()) result += '\n' + after;
  if (!result.endsWith('\n')) result += '\n';
  fs.writeFileSync(DOCTRINE, result);
}

// --- http -------------------------------------------------------------------

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}
function sendJSON(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

if (require.main !== module) { module.exports = { parseRules, buildSection, findSection, parseCalibration, saveCalibration, parseThesis, saveThesis, parseGallery, saveGallery }; return; }

http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && u.pathname === '/') return serveFile(res, path.join(PANEL_DIR, 'index.html'));

  if (req.method === 'GET' && u.pathname === '/api/rules') {
    try { sendJSON(res, 200, { rules: parseRules(fs.readFileSync(DOCTRINE, 'utf8')), tiers: TIER_META }); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'GET' && u.pathname === '/api/thesis') {
    try { sendJSON(res, 200, parseThesis(fs.readFileSync(DOCTRINE, 'utf8'))); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save-thesis') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { intro, principles } = JSON.parse(body); saveThesis(intro, principles); sendJSON(res, 200, { ok: true, count: principles.length }); }
      catch (e) { sendJSON(res, 500, { error: String(e) }); }
    });
    return;
  }
  if (req.method === 'GET' && u.pathname === '/api/gallery') {
    try { sendJSON(res, 200, parseGallery(fs.readFileSync(DOCTRINE, 'utf8'))); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save-gallery') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { intro, items } = JSON.parse(body); saveGallery(intro, items); sendJSON(res, 200, { ok: true, count: items.length }); }
      catch (e) { sendJSON(res, 500, { error: String(e) }); }
    });
    return;
  }
  if (req.method === 'GET' && u.pathname === '/api/calibration') {
    try { sendJSON(res, 200, parseCalibration(fs.readFileSync(DOCTRINE, 'utf8'))); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save-calibration') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { intro, rows } = JSON.parse(body); saveCalibration(intro, rows); sendJSON(res, 200, { ok: true, count: rows.length }); }
      catch (e) { sendJSON(res, 500, { error: String(e) }); }
    });
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { rules } = JSON.parse(body); save(rules); sendJSON(res, 200, { ok: true, count: rules.length }); }
      catch (e) { sendJSON(res, 500, { error: String(e) }); }
    });
    return;
  }
  if (req.method === 'GET') {                              // static, repo-root scoped
    const rel = decodeURIComponent(u.pathname.replace(/^\/+/, ''));
    const filePath = path.resolve(REPO_ROOT, rel);
    if (filePath !== REPO_ROOT && !filePath.startsWith(REPO_ROOT + path.sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    return serveFile(res, filePath);
  }
  res.writeHead(404); res.end('Not found');
}).listen(PORT, () => console.log(`Doctrine panel → http://localhost:${PORT}`));
