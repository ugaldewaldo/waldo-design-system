#!/usr/bin/env node
// Migrate index.html colors to hsl(var()). CSS-context only — SVG presentation
// attributes (fill="#hex"/stroke=/stop-color=) are LEFT as-is (attrs can't read var; policy A).
const fs = require('fs');
const F = process.argv[2];
let s = fs.readFileSync(F, 'utf8');
const rep = { themeLink: false, rgba: 0, hex: 0, bareVar: 0, keptScrim: 0, keptSvgAttr: 0, flagged: [] };

// 1. Add theme <link> before waldo-ds.css (theme provides tokens now)
if (!/<link[^>]*waldo-shadcn-theme\.css/.test(s)) {
  const before = s;
  s = s.replace(/(<link rel="stylesheet" href="waldo-ds\.css"\s*\/>)/,
    '<link rel="stylesheet" href="waldo-shadcn-theme.css" />\n  $1');
  rep.themeLink = s !== before;
}

const RGBA = { '50,169,169':'primary','222,58,40':'destructive','247,211,113':'highlight','42,108,109':'green-700','201,78,34':'warning','23,24,25':'background',
  '210,211,211':'foreground','228,228,231':'foreground','255,255,255':'primary-foreground','9,9,11':'background','129,58,239':'chart-5','144,205,144':'chart-10' };
const HEX = { '#171819':'background','#f7d371':'highlight','#4dbcbc':'green-400','#41454b':'accent','#32a9a9':'primary','#265152':'green-800','#2d2f33':'secondary','#2a6c6d':'green-700','#27282b':'muted','#202123':'card','#8f9091':'muted-foreground','#d2d3d3':'foreground','#ffffff':'primary-foreground','#63dbdb':'green-400','#242528':'muted','#3f4246':'accent','#e4e4e7':'foreground','#09090b':'background','#1b8c8c':'primary','#ba91f7':'chart-5','#90cd90':'chart-10','#ff8082':'chart-4' };
const COLOR = new Set(['background','foreground','card','primary','primary-foreground','muted','muted-foreground','secondary','accent','border','popover','destructive','warning','highlight','green-400','green-500','green-700','green-800','zinc-750','zinc-800','zinc-900',...Array.from({length:12},(_,i)=>`chart-${i+1}`)]);

// rgba literals — CSS context only (not preceded by =" or =')
s = s.replace(/(?<!=["'])rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/g, (m,r,g,b,a) => {
  const k = `${r},${g},${b}`;
  if (k === '0,0,0') { rep.keptScrim++; return m; }
  if (RGBA[k]) { rep.rgba++; return `hsl(var(--${RGBA[k]}) / ${a})`; }
  rep.flagged.push(m); return m;
});
// hex — CSS context only; SVG attrs (=") left alone
s = s.replace(/(?<!=["'])#[0-9a-fA-F]{6}\b/g, (m) => {
  const k = m.toLowerCase();
  if (HEX[k]) { rep.hex++; return `hsl(var(--${HEX[k]}))`; }
  rep.flagged.push(m); return m;
});
// count SVG-attr hexes we intentionally kept
rep.keptSvgAttr = (s.match(/=["']#[0-9a-fA-F]{6}/g) || []).length;
// bare color var() -> hsl(var())  (SVG attrs don't use var(), so safe)
s = s.replace(/(^|[:\s,])var\(--([a-z0-9-]+)\)/g, (m,pre,t) => {
  if (COLOR.has(t)) { rep.bareVar++; return `${pre}hsl(var(--${t}))`; }
  return m;
});

fs.writeFileSync(F, s);
const uniq = [...new Set(rep.flagged)];
console.log(JSON.stringify({ ...rep, flagged: uniq, flaggedCount: rep.flagged.length }, null, 2));
