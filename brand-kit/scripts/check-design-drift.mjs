#!/usr/bin/env node
// Verifies the vendored DESIGN.md matches the canonical copy in waldo-agentic.
// The tokens block (design-tokens:start..end) must be byte-identical; the rest
// of the file is compared too, but only the tokens block is a hard failure.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const LOCAL = resolve(here, '..', 'DESIGN.md');
const CANONICAL_SUFFIX = join('waldo-agentic', 'packages', 'design-system', 'DESIGN.md');
// Candidate locations for the waldo-agentic checkout; set WALDO_AGENTIC_DIR to override.
const CANDIDATES = [
  process.env.WALDO_AGENTIC_DIR &&
    join(process.env.WALDO_AGENTIC_DIR, 'packages', 'design-system', 'DESIGN.md'),
  resolve(here, '..', '..', '..', CANONICAL_SUFFIX),
  join(homedir(), 'GitHub', CANONICAL_SUFFIX),
].filter(Boolean);
const CANONICAL = CANDIDATES.find(existsSync) ?? CANDIDATES[CANDIDATES.length - 1];

const tokensBlock = (text, file) => {
  const match = text.match(/<!-- design-tokens:start -->([\s\S]*?)<!-- design-tokens:end -->/);
  if (!match) {
    console.error(`✗ ${file}: design-tokens block markers not found`);
    process.exit(1);
  }
  return match[1];
};

let canonical;
try {
  canonical = readFileSync(CANONICAL, 'utf8');
} catch {
  console.error(`✗ Canonical file not found: ${CANONICAL}`);
  console.error('  A sibling checkout of waldo-agentic is required to run the drift check.');
  process.exit(1);
}
const local = readFileSync(LOCAL, 'utf8');

if (tokensBlock(local, 'local DESIGN.md') !== tokensBlock(canonical, 'canonical DESIGN.md')) {
  console.error('✗ DRIFT: the design-tokens block differs from the canonical DESIGN.md.');
  console.error(`  Re-copy: cp ${CANONICAL} ${LOCAL}`);
  process.exit(1);
}

if (local !== canonical) {
  console.warn('⚠ Tokens match, but prose outside the tokens block differs from canonical.');
} else {
  console.log('✓ DESIGN.md matches canonical exactly.');
}
