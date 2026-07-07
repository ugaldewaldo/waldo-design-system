#!/usr/bin/env node
/**
 * Waldo Doctrines — local read/write server (Node stdlib, zero deps).
 *
 * Governance console over the doctrine files. Two data domains:
 *  - Surface doctrines: every docs/*-doctrine.md with a "## Do not" section.
 *    Sections (thesis / rules / calibration / gallery) are parsed and written
 *    back in place; severity tiers persist as inline [hard]/[should]/[pref] tags.
 *  - Component usage doctrine: docs/usage-doctrine.yaml. Rule content is editable;
 *    everything else (header, token_rules footer, non-standard keys) round-trips
 *    verbatim.
 *
 * Run:  node doctrines/server.js   →   http://localhost:4174
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PANEL_DIR = __dirname;
const REPO_ROOT = path.resolve(PANEL_DIR, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const DEFAULT_DOC = 'brand-api-dashboard-doctrine';
const USAGE = path.join(DOCS_DIR, 'usage-doctrine.yaml');
const COMP_INDEX = path.join(DOCS_DIR, 'component-index.json');
const PORT = 4174;

// --- surfaces: every docs/*-doctrine.md with a "## Do not" section is a surface --

function listSurfaces() {
  return fs.readdirSync(DOCS_DIR)
    .filter(f => f.endsWith('-doctrine.md'))
    .map(f => {
      const text = fs.readFileSync(path.join(DOCS_DIR, f), 'utf8');
      if (!/^##\s+Do not\s*$/m.test(text)) return null;      // not a surface doctrine
      const m = text.match(/^#\s+(.+)$/m);
      return { id: f.replace(/\.md$/, ''), title: m ? m[1].trim() : f };
    })
    .filter(Boolean);
}

function surfacePath(id) {
  const clean = String(id || DEFAULT_DOC);
  if (!/^[\w-]+-doctrine$/.test(clean)) throw new Error('bad doc id: ' + clean);
  const p = path.join(DOCS_DIR, clean + '.md');
  if (!fs.existsSync(p)) throw new Error('unknown doctrine doc: ' + clean);
  return p;
}

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

function saveCalibration(file, intro, rows) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Calibration\b/);
  if (!sec) throw new Error('Calibration section not found');
  fs.writeFileSync(file + '.bak', text);
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
  fs.writeFileSync(file, result);
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

function saveThesis(file, intro, principles) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Aesthetic thesis\b/);
  if (!sec) throw new Error('Aesthetic thesis section not found');
  fs.writeFileSync(file + '.bak', text);
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
  fs.writeFileSync(file, result);
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

function saveGallery(file, intro, items) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const sec = findSectionBy(lines, /^##\s+Reference gallery\b/);
  if (!sec) throw new Error('Reference gallery section not found');
  fs.writeFileSync(file + '.bak', text);
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
  fs.writeFileSync(file, result);
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

function save(file, rules) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const sec = findSection(lines);
  if (!sec) throw new Error('"## Do not" section not found');
  fs.writeFileSync(file + '.bak', text);                  // safety backup
  const before = lines.slice(0, sec.start).join('\n').replace(/\n+$/, '');
  const after = lines.slice(sec.end).join('\n');
  let result = before + '\n\n' + buildSection(rules);
  if (after.trim()) result += '\n' + after;
  if (!result.endsWith('\n')) result += '\n';
  fs.writeFileSync(file, result);
}

// --- usage doctrine (docs/usage-doctrine.yaml) -------------------------------
// Scoped zero-dep YAML round-trip. Editable fields: use_when / dont_use_when /
// prefer_over / notes. Everything else (header comments, token_rules footer,
// non-standard keys like `variants:`) is preserved verbatim. Entries the client
// did not touch are re-emitted from their original raw text.

function parseUsage(text) {
  const lines = text.split('\n');
  const ci = lines.findIndex(l => /^components:\s*$/.test(l));
  if (ci < 0) throw new Error('"components:" key not found');
  const header = lines.slice(0, ci + 1).join('\n');
  let fi = lines.length;
  for (let i = ci + 1; i < lines.length; i++) {
    if (/^\S/.test(lines[i])) { fi = i; break; }               // first col-0 line = footer
  }
  const footer = lines.slice(fi).join('\n');
  const blocks = [];
  let cur = null;
  for (const ln of lines.slice(ci + 1, fi)) {
    const m = ln.match(/^  - component:\s*(.*)$/);
    if (m) { if (cur) blocks.push(cur); cur = { name: m[1].trim(), lines: [] }; }
    else if (cur) cur.lines.push(ln);
  }
  if (cur) blocks.push(cur);
  return { header, footer, entries: blocks.map(parseUsageEntry) };
}

function parseUsageListItems(lines) {
  const items = [];
  for (const ln of lines) {
    if (!ln.trim()) continue;
    const m = ln.match(/^      - (.*)$/);
    if (m) items.push(m[1].trim());
    else return null;                                          // nested content → keep raw
  }
  return items;
}

function parseUsageEntry(block) {
  const segs = [];
  let cur = null;
  for (const ln of block.lines) {
    const m = ln.match(/^    ([A-Za-z_][\w]*):(.*)$/);
    if (m) { if (cur) segs.push(cur); cur = { key: m[1], head: m[2], lines: [] }; }
    else if (cur) cur.lines.push(ln);
  }
  if (cur) segs.push(cur);
  const raw = ['  - component: ' + block.name, ...block.lines].join('\n').replace(/\n+$/, '');
  const e = { name: block.name, raw, use_when: [], dont_use_when: [], prefer_over: [], notes: '', extras: [], order: [] };
  for (const s of segs) {
    const KNOWN_LISTS = ['use_when', 'dont_use_when', 'prefer_over'];
    if (KNOWN_LISTS.includes(s.key) && s.head.trim() === '[]' && !s.lines.some(l => l.trim())) {
      e[s.key] = []; e.order.push(s.key); continue;           // inline empty list
    }
    if ((s.key === 'use_when' || s.key === 'dont_use_when') && !s.head.trim()) {
      const items = parseUsageListItems(s.lines);
      if (items) { e[s.key] = items; e.order.push(s.key); continue; }
    }
    if (s.key === 'prefer_over' && !s.head.trim()) {
      const items = parseUsageListItems(s.lines);
      if (items) {
        e.prefer_over = items.map(t => {
          const i = t.indexOf(': ');
          return i > 0 ? { name: t.slice(0, i).trim(), reason: t.slice(i + 2).trim() }
                       : { name: t.replace(/:\s*$/, '').trim(), reason: '' };
        });
        e.order.push('prefer_over'); continue;
      }
    }
    if (s.key === 'notes') {
      const h = s.head.trim();
      if (h === '|' || h === '') {
        // strip exactly the 6-space block indent, keep deeper indentation
        const ded = s.lines.map(l => (l.startsWith('      ') ? l.slice(6) : l.trimEnd() === '' ? '' : l));
        while (ded.length && !ded[ded.length - 1].trim()) ded.pop();
        while (ded.length && !ded[0].trim()) ded.shift();
        e.notes = ded.join('\n');
        e.order.push('notes'); continue;
      }
      if (!s.lines.some(l => l.trim())) { e.notes = h; e.order.push('notes'); continue; }
    }
    e.extras.push({ key: s.key, raw: ('    ' + s.key + ':' + s.head + '\n' + s.lines.join('\n')).replace(/\n+$/, '') });
    e.order.push('extra:' + (e.extras.length - 1));
  }
  return e;
}

function buildUsageEntry(e) {
  const clean1 = s => String(s || '').replace(/\s+/g, ' ').trim();
  const out = ['  - component: ' + clean1(e.name)];
  const emit = key => {
    if (key.startsWith('extra:')) {
      const x = (e.extras || [])[Number(key.slice(6))];
      if (x && x.raw) out.push(x.raw);
      return;
    }
    if (key === 'use_when' || key === 'dont_use_when') {
      const v = (e[key] || []).map(clean1).filter(Boolean);
      if (!v.length) return;
      out.push(`    ${key}:`);
      v.forEach(t => out.push(`      - ${t}`));
    } else if (key === 'prefer_over') {
      const v = (e.prefer_over || []).filter(p => clean1(p.name));
      if (!v.length) return;
      out.push('    prefer_over:');
      v.forEach(p => out.push(`      - ${clean1(p.name)}: ${clean1(p.reason)}`));
    } else if (key === 'notes') {
      const s = String(e.notes || '').replace(/[ \t]+$/gm, '').replace(/\n+$/, '').replace(/^\n+/, '');
      if (!s.trim()) return;
      if (s.includes('\n')) {
        out.push('    notes: |');
        s.split('\n').forEach(l => out.push(l.trim() ? '      ' + l : ''));
      } else out.push('    notes: ' + s.trim());
    }
  };
  const keys = [...(e.order && e.order.length ? e.order : [])];
  for (const k of ['use_when', 'dont_use_when', 'prefer_over', 'notes']) if (!keys.includes(k)) keys.push(k);
  const seen = new Set();
  for (const k of keys) { if (seen.has(k)) continue; seen.add(k); emit(k); }
  return out.join('\n');
}

function serializeUsage(text, entries) {
  const { header, footer } = parseUsage(text);
  const blocks = entries.map(e => (e.dirty || !e.raw) ? buildUsageEntry(e) : e.raw);
  let result = header + '\n\n' + blocks.join('\n\n') + '\n';
  if (footer.trim()) result += '\n' + footer.replace(/\n+$/, '') + '\n';
  return result;
}

function saveUsage(entries) {
  const text = fs.readFileSync(USAGE, 'utf8');
  fs.writeFileSync(USAGE + '.bak', text);
  fs.writeFileSync(USAGE, serializeUsage(text, entries));
}

function loadComponentIndex() {
  try { return JSON.parse(fs.readFileSync(COMP_INDEX, 'utf8')).components || []; }
  catch (e) { return []; }
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

if (require.main !== module) { module.exports = { parseRules, buildSection, findSection, parseCalibration, saveCalibration, parseThesis, saveThesis, parseGallery, saveGallery, parseUsage, buildUsageEntry, serializeUsage, listSurfaces, surfacePath }; return; }

http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && u.pathname === '/') return serveFile(res, path.join(PANEL_DIR, 'index.html'));

  const doc = () => surfacePath(u.searchParams.get('doc'));

  if (req.method === 'GET' && u.pathname === '/api/surfaces') {
    try { sendJSON(res, 200, { surfaces: listSurfaces(), default: DEFAULT_DOC }); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'GET' && u.pathname === '/api/rules') {
    try { sendJSON(res, 200, { rules: parseRules(fs.readFileSync(doc(), 'utf8')), tiers: TIER_META }); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'GET' && u.pathname === '/api/thesis') {
    try { sendJSON(res, 200, parseThesis(fs.readFileSync(doc(), 'utf8'))); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save-thesis') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { intro, principles } = JSON.parse(body); saveThesis(doc(), intro, principles); sendJSON(res, 200, { ok: true, count: principles.length }); }
      catch (e) { sendJSON(res, 500, { error: String(e) }); }
    });
    return;
  }
  if (req.method === 'GET' && u.pathname === '/api/gallery') {
    try { sendJSON(res, 200, parseGallery(fs.readFileSync(doc(), 'utf8'))); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save-gallery') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { intro, items } = JSON.parse(body); saveGallery(doc(), intro, items); sendJSON(res, 200, { ok: true, count: items.length }); }
      catch (e) { sendJSON(res, 500, { error: String(e) }); }
    });
    return;
  }
  if (req.method === 'GET' && u.pathname === '/api/calibration') {
    try { sendJSON(res, 200, parseCalibration(fs.readFileSync(doc(), 'utf8'))); }
    catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save-calibration') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { intro, rows } = JSON.parse(body); saveCalibration(doc(), intro, rows); sendJSON(res, 200, { ok: true, count: rows.length }); }
      catch (e) { sendJSON(res, 500, { error: String(e) }); }
    });
    return;
  }
  if (req.method === 'GET' && u.pathname === '/api/usage') {
    try {
      const { entries } = parseUsage(fs.readFileSync(USAGE, 'utf8'));
      sendJSON(res, 200, { entries, index: loadComponentIndex() });
    } catch (e) { sendJSON(res, 500, { error: String(e) }); }
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save-usage') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { entries } = JSON.parse(body); saveUsage(entries); sendJSON(res, 200, { ok: true, count: entries.length }); }
      catch (e) { sendJSON(res, 500, { error: String(e) }); }
    });
    return;
  }
  if (req.method === 'POST' && u.pathname === '/api/save') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { const { rules } = JSON.parse(body); save(doc(), rules); sendJSON(res, 200, { ok: true, count: rules.length }); }
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
