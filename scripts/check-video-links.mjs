#!/usr/bin/env node
/**
 * Link-rot checker for the curated video/article resources.
 *
 * YouTube links decay — videos get deleted, made private, or their channel vanishes.
 * A catalogue of dead links damages trust more than having no catalogue, so this runs
 * in CI and fails the build when something breaks.
 *
 *   node scripts/check-video-links.mjs            # check, report, exit 1 on failure
 *   node scripts/check-video-links.mjs --write    # also stamp `checked` dates into the JSON
 *
 * Uses YouTube's public oEmbed endpoint: no API key, no quota.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "src/data/interview-resources.json");
const WRITE = process.argv.includes("--write");
const CONCURRENCY = 6;
const TIMEOUT_MS = 15_000;

const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const targets = [
  ...data.resources.map((r) => ({ kind: "resource", id: r.id, title: r.title, url: r.url, ref: r })),
  ...data.creators.map((c) => ({ kind: "creator", id: c.name, title: c.name, url: c.url, ref: c })),
];

async function check(url) {
  // oEmbed resolves videos and playlists; channels have no oEmbed, so fall back to a fetch.
  const isOembeddable = /youtube\.com\/(watch\?v=|playlist\?list=)/.test(url);
  const target = isOembeddable
    ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`
    : url;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(target, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (link-check; +data-engineering-interview-questions)" },
    });
    if (res.status === 404) return { ok: false, reason: "removed or private (404)" };
    if (res.status === 401 || res.status === 403) return { ok: false, reason: `blocked (${res.status})` };
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    if (isOembeddable) {
      const j = await res.json().catch(() => null);
      if (!j || !j.title) return { ok: false, reason: "no oEmbed metadata" };
      return { ok: true, actualTitle: j.title, author: j.author_name };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e.name === "AbortError" ? "timeout" : e.message };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
let cursor = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < targets.length) {
      const t = targets[cursor++];
      results.push({ ...t, ...(await check(t.url)) });
    }
  })
);

const dead = results.filter((r) => !r.ok);
const live = results.filter((r) => r.ok);

for (const r of dead) console.error(`  ✗ [${r.kind}] ${r.id}\n      ${r.url}\n      ${r.reason}`);

// Flag titles that have drifted far from the source — a sign the link now points elsewhere.
const drift = live.filter((r) => {
  if (!r.actualTitle) return false;
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const a = norm(r.title), b = norm(r.actualTitle);
  return !a.includes(b.slice(0, 18)) && !b.includes(a.slice(0, 18));
});
if (drift.length) {
  console.warn("\nTitle drift (our label vs YouTube's — check these still describe the same thing):");
  for (const r of drift) console.warn(`  ~ ${r.id}\n      ours:    ${r.title}\n      actual:  ${r.actualTitle}`);
}

if (WRITE && !dead.length) {
  const today = new Date().toISOString().slice(0, 10);
  data._meta.checked = today;
  fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  console.log(`\nStamped _meta.checked = ${today}`);
}

console.log(`\n${live.length}/${results.length} live · ${dead.length} dead · ${drift.length} title drift`);
process.exit(dead.length ? 1 : 0);
