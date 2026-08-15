#!/usr/bin/env node
/**
 * Link-rot checker for every curated external resource on the site.
 *
 * External links decay — videos get deleted, repos get renamed, blog posts vanish.
 * A catalogue of dead links damages trust more than having no catalogue, so this runs
 * in CI and fails the build when something breaks.
 *
 *   npm run check:links            # check, report, exit 1 on failure
 *   npm run check:links -- --write # also stamp `checked` dates into the data files
 *
 * YouTube links go through the public oEmbed endpoint (no API key, no quota) so we can
 * tell "private/removed" apart from "temporarily unreachable". Everything else is a
 * HEAD, falling back to GET for hosts that reject HEAD.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WRITE = process.argv.includes("--write");
const CONCURRENCY = 6;
const TIMEOUT_MS = 20_000;
const UA = "Mozilla/5.0 (compatible; link-check; +data-engineering-interview-questions)";

// --- collect every external URL across the curated data files ---------------
const files = [
  { path: "src/data/interview-resources.json", collect: (d) => [
      ...d.resources.map((r) => ({ id: r.id, title: r.title, url: r.url })),
      ...d.creators.map((c) => ({ id: c.name, title: c.name, url: c.url })),
    ] },
  { path: "src/data/projects.json", collect: (d) =>
      d.projects.flatMap((p) => p.sources.map((s, i) => ({
        id: `${p.id}#${i}`, title: `${p.title} — ${s.label}`, url: s.url,
      }))) },
];

const targets = [];
const loaded = [];
for (const f of files) {
  const abs = path.join(ROOT, f.path);
  if (!fs.existsSync(abs)) { console.warn(`skipping missing ${f.path}`); continue; }
  const data = JSON.parse(fs.readFileSync(abs, "utf8"));
  loaded.push({ ...f, abs, data });
  for (const t of f.collect(data)) targets.push({ ...t, file: f.path });
}

async function check(url) {
  const isYouTube = /youtube\.com\/(watch\?v=|playlist\?list=)/.test(url);
  const target = isYouTube
    ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`
    : url;

  for (const method of isYouTube ? ["GET"] : ["HEAD", "GET"]) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(target, {
        method, signal: ctrl.signal, redirect: "follow", headers: { "user-agent": UA },
      });
      if (res.status === 404 || res.status === 410) return { ok: false, reason: `gone (${res.status})` };
      if (res.status === 405 || res.status === 403) { if (method === "HEAD") continue; }
      if (!res.ok) {
        if (method === "HEAD") continue;
        // Some hosts bot-block; a 403 on GET is inconclusive rather than proof of death.
        return res.status === 403
          ? { ok: true, warn: "403 (bot-blocked, not verified)" }
          : { ok: false, reason: `HTTP ${res.status}` };
      }
      if (isYouTube) {
        const j = await res.json().catch(() => null);
        if (!j?.title) return { ok: false, reason: "no oEmbed metadata (private or removed)" };
        return { ok: true, actualTitle: j.title };
      }
      return { ok: true };
    } catch (e) {
      if (method === "HEAD") continue;
      return { ok: false, reason: e.name === "AbortError" ? "timeout" : e.message };
    } finally {
      clearTimeout(timer);
    }
  }
  return { ok: false, reason: "unreachable" };
}

const results = [];
let cursor = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (cursor < targets.length) {
    const t = targets[cursor++];
    results.push({ ...t, ...(await check(t.url)) });
  }
}));

const dead = results.filter((r) => !r.ok);
const warned = results.filter((r) => r.ok && r.warn);

for (const r of dead) console.error(`  ✗ ${r.file} · ${r.id}\n      ${r.url}\n      ${r.reason}`);
if (warned.length) {
  console.warn("\nInconclusive (host blocks automated checks — verify by hand if it matters):");
  for (const r of warned) console.warn(`  ? ${r.id} — ${r.warn}\n      ${r.url}`);
}

if (WRITE && !dead.length) {
  const today = new Date().toISOString().slice(0, 10);
  for (const f of loaded) {
    f.data._meta.checked = today;
    fs.writeFileSync(f.abs, JSON.stringify(f.data, null, 2) + "\n");
  }
  console.log(`\nStamped _meta.checked = ${today} in ${loaded.length} file(s)`);
}

const byFile = Object.fromEntries(loaded.map((f) => [f.path,
  results.filter((r) => r.file === f.path && r.ok).length + "/" + results.filter((r) => r.file === f.path).length]));
console.log(`\n${results.length - dead.length}/${results.length} live · ${dead.length} dead · ${warned.length} inconclusive`);
for (const [f, s] of Object.entries(byFile)) console.log(`  ${s.padStart(7)}  ${f}`);
process.exit(dead.length ? 1 : 0);
