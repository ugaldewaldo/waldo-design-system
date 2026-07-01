#!/usr/bin/env node
// HSL migration (worktree). Color-preserving. Operates on styles.css + theme.
const fs = require('fs');
const WT = process.argv[2];
const STYLES = `${WT}/tools/waldo-ds.styles.css`;
const THEME = `${WT}/waldo-ui/waldo-shadcn-theme.css`;
const rep = { rootRemoved: false, rgbaClean: 0, hexClean: 0, companion: 0, bareVar: 0, borderAlpha: 0, flagged: [] };

let s = fs.readFileSync(STYLES, 'utf8');

// 1. Remove the vanilla token-definition :root block (theme provides tokens now).
const before = s.length;
s = s.replace(/[ \t]*:root\s*\{[\s\S]*?--radius:\s+6px;\s*\n\s*\}\n?/, '');
rep.rootRemoved = s.length < before;

// helpers
const RGBA = { '50,169,169':'primary','222,58,40':'destructive','247,211,113':'highlight','42,108,109':'green-700','201,78,34':'warning','23,24,25':'background',
  '210,211,211':'foreground','228,228,231':'foreground','255,255,255':'primary-foreground','9,9,11':'background','129,58,239':'chart-5','144,205,144':'chart-10' };
const KEEP_RGBA = ['0,0,0']; // scrims — intentional black overlay, no token
const HEX = { '#171819':'background','#f7d371':'highlight','#4dbcbc':'green-400','#41454b':'accent','#32a9a9':'primary','#265152':'green-800','#2d2f33':'secondary','#2a6c6d':'green-700','#27282b':'muted','#202123':'card','#8f9091':'muted-foreground','#d2d3d3':'foreground','#ffffff':'primary-foreground','#63dbdb':'green-400',
  '#242528':'muted','#3f4246':'accent','#e4e4e7':'foreground','#09090b':'background','#1b8c8c':'primary','#ba91f7':'chart-5','#90cd90':'chart-10','#ff8082':'chart-4' };
const COLOR = new Set(['background','foreground','card','primary','primary-foreground','muted','muted-foreground','secondary','accent','border','popover','destructive','warning','highlight','green-400','green-500','green-700','green-800','zinc-750','zinc-800','zinc-900',...Array.from({length:12},(_,i)=>`chart-${i+1}`)]);

// 2. border-md / border-strong / primary-fg specials FIRST (before generic bare-var)
s = s.replace(/var\(--border-strong\)/g, () => { rep.borderAlpha++; return 'hsl(var(--border) / 0.30)'; });
s = s.replace(/var\(--border-md\)/g, () => { rep.borderAlpha++; return 'hsl(var(--border) / 0.20)'; });
s = s.replace(/var\(--primary-fg\)/g, 'var(--primary-foreground)');

// 3. rgba(r,g,b,a) literals
s = s.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/g, (m,r,g,b,a) => {
  const k = `${r},${g},${b}`;
  if (KEEP_RGBA.includes(k)) return m; // scrim — intentional
  if (RGBA[k]) { rep.rgbaClean++; return `hsl(var(--${RGBA[k]}) / ${a})`; }
  rep.flagged.push(m); return `${m}/*TODO-HSL*/`;
});
// 4. rgba(var(--x-rgb), a)
s = s.replace(/rgba\(var\(--([a-z0-9-]+)-rgb\),\s*([0-9.]+)\)/g, (m,t,a) => { rep.companion++; return `hsl(var(--${t}) / ${a})`; });
// 5. #hex
s = s.replace(/#[0-9a-fA-F]{6}\b/g, (m) => {
  const k = m.toLowerCase();
  if (HEX[k]) { rep.hexClean++; return `hsl(var(--${HEX[k]}))`; }
  rep.flagged.push(m); return `${m}/*TODO-HSL*/`;
});
// 6. bare color var() -> hsl(var())
// pre excludes '(' so we never re-wrap a var() already inside hsl()/rgb()
s = s.replace(/(^|[:\s,])var\(--([a-z0-9-]+)\)/g, (m,pre,t) => {
  if (COLOR.has(t)) { rep.bareVar++; return `${pre}hsl(var(--${t}))`; }
  return m;
});
fs.writeFileSync(STYLES, s);

// 7. Complete the theme: add --fs-* + --radius-full (px values, form-agnostic) if missing.
let t = fs.readFileSync(THEME, 'utf8');
if (!/--fs-sm:/.test(t)) {
  const add = `\n  /* type scale + radius-full (vendored for the vanilla layer) */\n  --fs-xs: 12px; --fs-sm: 14px; --fs-base: 16px; --fs-lg: 18px; --fs-xl: 20px; --fs-2xl: 24px; --fs-5xl: 32px;\n  --radius-full: 9999px;\n`;
  t = t.replace(/(:root\s*\{)/, `$1${add}`);
  fs.writeFileSync(THEME, t);
  rep.themeCompleted = true;
}
const uniq = [...new Set(rep.flagged)];
console.log(JSON.stringify({...rep, flagged: uniq, flaggedCount: rep.flagged.length}, null, 2));
