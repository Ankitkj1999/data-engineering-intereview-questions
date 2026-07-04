/**
 * Crawls src/content/docs and writes data/docs.json in the shape
 * that @pelagornis/page's chat API handler expects:
 *   { path, locale, title, description?, content }[]
 *
 * Each file is split into ~800-char chunks by heading so the LLM
 * gets focused context rather than entire pages.
 *
 * Run:  node scripts/crawl-docs.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const DOCS_ROOT = path.resolve('src/content/docs');
const OUT_FILE = path.resolve('data/docs.json');
const CHUNK_SIZE = 800; // characters per chunk

/** Recursively collect all .md / .mdx files */
function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(full));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

/** Strip frontmatter and return { title, description, body } */
function parseFrontmatter(raw) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  let title = '';
  let description = '';
  let body = raw;

  if (fm) {
    body = raw.slice(fm[0].length);
    const titleMatch = fm[1].match(/^title:\s*["']?(.+?)["']?\s*$/m);
    const descMatch = fm[1].match(/^description:\s*["']?(.+?)["']?\s*$/m);
    if (titleMatch) title = titleMatch[1].trim();
    if (descMatch) description = descMatch[1].trim();
  }

  // Fall back to first H1 if no frontmatter title
  if (!title) {
    const h1 = body.match(/^#\s+(.+)$/m);
    if (h1) title = h1[1].trim();
  }

  return { title, description, body };
}

/** Split body into chunks, splitting on headings when possible */
function chunkText(text) {
  // Split on headings first
  const sections = text.split(/(?=^#{1,3}\s)/m).filter(Boolean);
  const chunks = [];

  for (const section of sections) {
    if (section.length <= CHUNK_SIZE) {
      chunks.push(section.trim());
    } else {
      // Hard-split long sections
      let i = 0;
      while (i < section.length) {
        chunks.push(section.slice(i, i + CHUNK_SIZE).trim());
        i += CHUNK_SIZE;
      }
    }
  }

  return chunks.filter((c) => c.length > 0);
}

// ── Main ─────────────────────────────────────────────────────────────────────

const files = collectFiles(DOCS_ROOT);
const docs = [];

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf-8');
  const { title, description, body } = parseFrontmatter(raw);

  // Build a URL-like path relative to DOCS_ROOT, strip extension
  const rel = path.relative(DOCS_ROOT, file).replace(/\.(md|mdx)$/, '').replace(/\\/g, '/');
  const docPath = rel === 'index' ? '/' : `/${rel}/`;

  const chunks = chunkText(body);

  for (const chunk of chunks) {
    docs.push({
      path: docPath,
      locale: 'en',
      title,
      ...(description ? { description } : {}),
      content: chunk,
    });
  }
}

// Make sure the output directory exists
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(docs, null, 2));

console.log(`✓ Crawled ${files.length} files → ${docs.length} chunks → ${OUT_FILE}`);
