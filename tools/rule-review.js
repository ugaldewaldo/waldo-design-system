#!/usr/bin/env node
/**
 * Rule review — the approval step of docs/_rules, as a page instead of a folder drag.
 *
 * The pipeline's contract is unchanged: moving a file into a folder is the approval.
 * This only moves the file for you, from a button, and shows what you are approving.
 *
 *   node tools/rule-review.js [--port 7788]
 *
 * Approve  → docs/_rules/3-to-canon/   (Claude writes it into the doctrine next run)
 * Drop     → docs/_rules/0-dropped/    (left alone forever)
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.join(__dirname, '..', 'docs', '_rules');
const REVIEW = path.join(ROOT, '2-to-review');
const CANON = path.join(ROOT, '3-to-canon');
const DROPPED = path.join(ROOT, '0-dropped');

const portArg = process.argv.indexOf('--port');
const PORT = portArg > -1 ? Number(process.argv[portArg + 1]) : 7788;

/* ── Read one draft ────────────────────────────────────────────────────────── */

// A draft is front matter plus "## " sections. Everything the page shows is one
// of those sections, so a draft that omits one simply renders without it.
function section(body, name) {
  // 'm' is needed so ^ finds the heading at a line start, but it also makes $ match
  // at every line end — which truncated a section at its first line break. The tail
  // is (?![\s\S]) instead: end of input, and nothing weaker.
  const re = new RegExp(`^## ${name}\\s*\\n([\\s\\S]*?)(?=\\n## |(?![\\s\\S]))`, 'm');
  const m = body.match(re);
  return m ? m[1].trim() : '';
}

function parse(file) {
  const raw = fs.readFileSync(path.join(REVIEW, file), 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = {};
  const body = fm ? fm[2] : raw;
  if (fm) {
    for (const line of fm[1].split('\n')) {
      const m = line.match(/^([a-z]+):\s*(.*)$/);
      if (m) meta[m[1]] = m[2].trim();
    }
  }
  const said = section(body, 'Said').replace(/^>\s?/gm, '').trim();
  return {
    file,
    name: meta.rule || file.replace(/\.md$/, ''),
    captured: meta.captured || '',
    where: meta.where || '',
    said,
    canon: section(body, 'Draft — canon line') || section(body, 'Draft'),
    tier: section(body, 'Tier'),
    scope: section(body, 'Scope'),
    placement: section(body, 'Placement'),
    enforcement: section(body, 'Enforcement'),
    violations: section(body, 'Violations today'),
    precedent: section(body, 'Precedent'),
  };
}

function drafts() {
  if (!fs.existsSync(REVIEW)) return [];
  return fs
    .readdirSync(REVIEW)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map(parse);
}

/* ── Move one draft ────────────────────────────────────────────────────────── */

function move(file, decision) {
  const dest = decision === 'approve' ? CANON : DROPPED;
  const from = path.join(REVIEW, file);
  // Refuse anything that is not a plain draft sitting in 2-to-review — the file
  // name arrives from the page, so it never gets to name a path of its own.
  if (path.basename(file) !== file || !file.endsWith('.md')) throw new Error('bad name');
  if (!fs.existsSync(from)) throw new Error('already moved');
  fs.mkdirSync(dest, { recursive: true });
  fs.renameSync(from, path.join(dest, file));
  return path.relative(path.join(__dirname, '..'), path.join(dest, file));
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Markdown here is only ever inline code, bold, italics and bare paragraphs.
const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, ' ');

// A draft wraps its prose, so a bare line break is not a new item. Only a line that
// opens with a marker starts one; everything after it belongs to the item above.
function bullets(s) {
  const items = [];
  for (const line of s.split('\n')) {
    const m = line.match(/^\s*[-*]\s+(.*)$/);
    if (m) items.push(m[1].trim());
    else if (items.length && line.trim()) items[items.length - 1] += ' ' + line.trim();
    else if (line.trim()) items.push(line.trim());
  }
  return items;
}

function card(d) {
  const details = [
    ['Where it lands', d.placement],
    ['Enforcement', d.enforcement],
    ['Violations today', d.violations],
    ['Precedent', d.precedent],
  ].filter(([, v]) => v);

  return `
<article class="rule" data-file="${esc(d.file)}">
  <header>
    <div class="tags">
      ${d.tier ? `<span class="tag tier-${esc(d.tier.toLowerCase())}">${esc(d.tier)}</span>` : ''}
      ${d.scope ? `<span class="tag muted">${inline(d.scope.split('·')[0].trim())}</span>` : ''}
      ${d.captured ? `<span class="tag muted">${esc(d.captured)}</span>` : ''}
    </div>
    <h2>${inline(d.canon || d.name)}</h2>
  </header>

  ${d.said ? `<blockquote>${inline(d.said)}</blockquote>` : ''}

  ${
    details.length
      ? `<details>
          <summary>Detail</summary>
          <dl>
            ${details
              .map(
                ([k, v]) => {
                  const items = bullets(v);
                  return `<dt>${esc(k)}</dt><dd>${
                    items.length > 1
                      ? `<ul>${items.map((b) => `<li>${inline(b)}</li>`).join('')}</ul>`
                      : inline(items[0] || v)
                  }</dd>`;
                }
              )
              .join('')}
          </dl>
        </details>`
      : ''
  }

  <footer>
    <button class="approve" data-decision="approve">Make it law</button>
    <button class="drop" data-decision="drop">Never mind</button>
    <span class="result" role="status"></span>
  </footer>
</article>`;
}

function page() {
  const list = drafts();
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rule review</title>
<style>
  :root {
    --bg: #171819; --surface: #1d1e1f; --line: #2b2c2d;
    --ink: #d2d3d3; --ink-dim: #8f9091; --ink-faint: #636465;
    --green: #2a6c6d; --green-lit: #3d9192; --coral: #de3a28;
    --radius: 12px;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 48px 24px 96px;
    background: var(--bg); color: var(--ink);
    font: 400 15px/1.6 Inter, ui-sans-serif, system-ui, sans-serif;
    letter-spacing: -0.01em;
    -webkit-font-smoothing: antialiased;
  }
  main { max-width: 720px; margin: 0 auto; }
  .head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 32px; }
  .head h1 { font-size: 20px; font-weight: 500; margin: 0; letter-spacing: -0.02em; }
  .count { color: var(--ink-faint); font-size: 13px; }

  .rule {
    background: var(--surface); border-radius: var(--radius);
    padding: 24px; margin-bottom: 16px;
    transition: opacity .18s ease, transform .18s ease;
  }
  .rule.gone { opacity: 0; transform: translateY(-6px); }
  .rule h2 { font-size: 18px; font-weight: 500; line-height: 1.45; margin: 0; letter-spacing: -0.02em; }

  .tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
  .tag {
    font-size: 11px; line-height: 1; padding: 5px 9px; border-radius: 999px;
    color: var(--ink-dim); background: rgba(210,211,211,.06);
  }
  .tag.tier-must { background: rgba(222,58,40,.14); color: #f0917f; }
  .tag.tier-should { background: rgba(61,145,146,.16); color: #6fc0c1; }

  blockquote {
    margin: 16px 0 0; padding: 12px 16px;
    background: rgba(210,211,211,.04); border-radius: 8px;
    color: var(--ink-dim); font-size: 14px;
  }
  blockquote::before { content: "“"; color: var(--ink-faint); }
  blockquote::after { content: "”"; color: var(--ink-faint); }

  details { margin-top: 16px; }
  summary {
    cursor: pointer; font-size: 13px; color: var(--ink-faint);
    list-style: none; user-select: none;
  }
  summary::-webkit-details-marker { display: none; }
  summary::before { content: "+ "; }
  details[open] summary::before { content: "– "; }
  summary:hover { color: var(--ink-dim); }
  dl { margin: 14px 0 0; font-size: 14px; }
  dt { color: var(--ink-faint); font-size: 12px; margin-top: 14px; }
  dd { margin: 4px 0 0; color: var(--ink-dim); }
  dd ul { margin: 4px 0 0; padding-left: 18px; }
  code {
    font: 12px/1.5 ui-monospace, "SF Mono", Menlo, monospace;
    background: rgba(210,211,211,.07); padding: 1px 5px; border-radius: 4px;
  }

  footer { display: flex; align-items: center; gap: 8px; margin-top: 22px; }
  button {
    font: 500 14px/1 Inter, sans-serif; letter-spacing: -0.02em;
    height: 40px; padding: 0 18px; border-radius: 999px;
    border: 0; cursor: pointer; transition: background .1s ease;
  }
  .approve { background: var(--green); color: #fff; }
  .approve:hover { background: var(--green-lit); }
  .drop { background: rgba(210,211,211,.05); color: var(--ink-dim); }
  .drop:hover { background: rgba(210,211,211,.1); color: var(--ink); }
  button:disabled { opacity: .4; cursor: default; }
  .result { font-size: 13px; color: var(--ink-faint); }
  .result.err { color: var(--coral); }

  .empty { text-align: center; padding: 80px 0; color: var(--ink-faint); }
  .empty strong { display: block; color: var(--ink); font-weight: 500; font-size: 18px; margin-bottom: 6px; }
</style></head>
<body>
<main>
  <div class="head">
    <h1>Rule review</h1>
    <span class="count">${list.length} waiting</span>
  </div>
  ${
    list.length
      ? list.map(card).join('')
      : `<div class="empty"><strong>Nothing waiting</strong>Every drafted rule has been decided.</div>`
  }
</main>
<script>
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-decision]');
  if (!btn) return;
  const art = btn.closest('.rule');
  const out = art.querySelector('.result');
  art.querySelectorAll('button').forEach((b) => (b.disabled = true));
  out.classList.remove('err');
  out.textContent = 'Moving…';
  try {
    const res = await fetch('/decide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: art.dataset.file, decision: btn.dataset.decision }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'failed');
    out.textContent = '→ ' + data.moved;
    setTimeout(() => {
      art.classList.add('gone');
      setTimeout(() => {
        art.remove();
        const left = document.querySelectorAll('.rule').length;
        document.querySelector('.count').textContent = left + ' waiting';
        if (!left) location.reload();
      }, 200);
    }, 700);
  } catch (err) {
    out.textContent = err.message;
    out.classList.add('err');
    art.querySelectorAll('button').forEach((b) => (b.disabled = false));
  }
});
</script>
</body></html>`;
}

/* ── Server ────────────────────────────────────────────────────────────────── */

http
  .createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/decide') {
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => {
        try {
          const { file, decision } = JSON.parse(body);
          const moved = move(file, decision === 'approve' ? 'approve' : 'drop');
          console.log(`${decision === 'approve' ? '✓ law   ' : '· dropped'}  ${file}`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ moved }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page());
  })
  .listen(PORT, () => {
    const n = drafts().length;
    console.log(`Rule review — ${n} draft(s) waiting`);
    console.log(`http://localhost:${PORT}`);
  });
