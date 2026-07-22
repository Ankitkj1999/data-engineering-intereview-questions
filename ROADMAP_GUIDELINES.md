# Roadmap Guidelines

Guidelines for creating and maintaining interactive roadmap pages on this site.

---

## Table of Contents
1. [Overview](#overview)
2. [File Locations](#file-locations)
3. [JSON Data Format](#json-data-format)
4. [Astro Page Structure](#astro-page-structure)
5. [ROADMAP Array Format](#roadmap-array-format)
6. [localStorage Key](#localstorage-key)
7. [Adding a New Roadmap — Checklist](#adding-a-new-roadmap--checklist)
8. [Navigation Registration](#navigation-registration)
9. [Existing Roadmaps](#existing-roadmaps)

---

## Overview

Each roadmap is a self-contained Astro page (`src/pages/roadmaps/*.astro`) that:

- Renders inside `StarlightPage` so it inherits the full site header, sidebar, and doc-chat panel
- Builds its visual flow from a `ROADMAP` constant defined inline in the page's `<script>` block
- Tracks per-topic progress in `localStorage` (key is unique per roadmap)
- Uses shared CSS from `src/styles/roadmap.css` — **do not duplicate those styles inside the page**
- Moves the `#rm-drawer` element to `document.body` at init time so the slide-in panel is never clipped by Starlight's layout containers

The source of truth for roadmap content is a JSON file under `data/data-engineering-interview-questions-master/roadmap/`. The Astro page does **not** import the JSON at build time — the data is manually transcribed into the `ROADMAP` constant in the `<script>` block so it runs fully client-side with no server dependency.

---

## File Locations

| What | Where |
|---|---|
| Source JSON | `data/data-engineering-interview-questions-master/roadmap/<name>.json` |
| Astro page | `src/pages/roadmaps/<name>.astro` |
| Shared CSS | `src/styles/roadmap.css` |
| Navigation config | `src/config/navigation.json` |

**Naming convention:** lowercase, hyphenated. Examples: `apache-spark.astro`, `data-engineering.astro`.

---

## JSON Data Format

The source JSON files follow this schema:

```json
{
  "title": "Human-readable roadmap title",
  "description": "One-sentence summary used for the page meta description",
  "totalPhases": 10,
  "totalSections": 26,
  "totalTopics": 206,
  "phases": [
    {
      "id": "unique-phase-id",
      "name": "Phase Display Name",
      "description": "What this phase covers.",
      "sections": [
        {
          "id": "unique-section-id",
          "name": "Section Display Name",
          "description": "What this section covers.",
          "topics": [
            "Topic label string",
            "Another topic label"
          ]
        }
      ]
    }
  ]
}
```

**Key points:**
- `phases` maps to top-level topic nodes in the roadmap flow
- `sections` inside a phase map to subtopic nodes
- `topics` inside a section are the leaf-level items listed in the side panel when a section is opened
- All `id` values must be unique within the file — they are used as `localStorage` keys

---

## Astro Page Structure

Copy this skeleton for every new roadmap page. Replace every `CHANGEME` placeholder.

```astro
---
import StarlightPage from "@astrojs/starlight/components/StarlightPage.astro";
---

<StarlightPage
  frontmatter={{
    title: "CHANGEME Roadmap",        // Short — appears in sidebar
    description: "CHANGEME",          // 150-160 chars, keyword-rich
  }}
>
  <div id="rm-root">
    <div class="rm-header">
      <div class="rm-header-left">
        <span class="rm-badge">Roadmap</span>
        <h1 class="rm-title">CHANGEME</h1>
        <p class="rm-subtitle">CHANGEME short subtitle</p>
      </div>
      <div class="rm-header-right">
        <div class="rm-legend">
          <span class="rm-legend-item" data-status="pending"><span class="rm-dot"></span>Pending</span>
          <span class="rm-legend-item" data-status="inprogress"><span class="rm-dot"></span>In Progress</span>
          <span class="rm-legend-item" data-status="done"><span class="rm-dot"></span>Done</span>
        </div>
        <div class="rm-progress-summary">
          <span class="rm-prog-label">Progress</span>
          <div class="rm-prog-bar-wrap"><div class="rm-prog-bar" id="rm-prog-bar"></div></div>
          <span class="rm-prog-pct" id="rm-prog-pct">0%</span>
        </div>
      </div>
    </div>

    <div class="rm-flow" id="rm-flow"></div>

    <div class="rm-drawer" id="rm-drawer">
      <div class="rm-backdrop" id="rm-backdrop"></div>
      <div class="rm-panel">
        <div class="rm-panel-header">
          <div>
            <span id="rm-panel-badge" class="rm-panel-badge"></span>
            <h2 id="rm-panel-title" class="rm-panel-title"></h2>
          </div>
          <button id="rm-panel-close" class="rm-panel-close" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
            </svg>
          </button>
        </div>
        <div class="rm-panel-status-row">
          <span class="rm-panel-status-label">Status</span>
          <div class="rm-status-select-wrap">
            <span class="rm-status-dot" id="rm-status-dot"></span>
            <select class="rm-status-select" id="rm-status-select" aria-label="Set status">
              <option value="pending">⬜ Pending</option>
              <option value="inprogress">🟡 In Progress</option>
              <option value="done">✅ Done</option>
            </select>
          </div>
        </div>
        <div class="rm-panel-body" id="rm-panel-body"></div>
      </div>
    </div>
  </div>
</StarlightPage>

<style is:global>
  @import "/src/styles/roadmap.css";
</style>

<script>
// ── Data ──────────────────────────────────────────────────────────────────────
// Transcribed from data/.../roadmap/CHANGEME.json
const ROADMAP = [
  // ... see ROADMAP Array Format section below
];

// ── Constants ─────────────────────────────────────────────────────────────────
const ICON_PENDING    = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><circle cx="8" cy="8" r="6"/></svg>`;
const ICON_INPROGRESS = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><circle cx="8" cy="8" r="6"/><polyline points="8 5 8 8 10 10"/></svg>`;
const ICON_DONE       = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="6"/><polyline points="5.5 8.5 7 10 10.5 6"/></svg>`;
const ICON_ARROW      = `<svg width="20" height="28" viewBox="0 0 20 28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="10" y1="0" x2="10" y2="20"/><polyline points="5 15 10 22 15 15"/></svg>`;
const ICON_CHEVRON    = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 5 7 9 11 5"/></svg>`;
function iconFor(s: string) { return s==="done"?ICON_DONE:s==="inprogress"?ICON_INPROGRESS:ICON_PENDING; }

// ── State ─────────────────────────────────────────────────────────────────────
// IMPORTANT: Change this key for every new roadmap to avoid collisions
const KEY = "CHANGEME_roadmap_v1";
function load(): Record<string,string> { try { return JSON.parse(localStorage.getItem(KEY)||"{}"); } catch { return {}; } }
function save(s: Record<string,string>) { localStorage.setItem(KEY, JSON.stringify(s)); }
let state = load();
function getS(id: string) { return state[id]||"pending"; }

function allIds() {
  const ids: string[] = [];
  for (const t of ROADMAP) { ids.push(t.id); for (const s of t.subs) ids.push(s.id); }
  return ids;
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function refreshProgress() {
  const ids = allIds();
  const done = ids.filter(id => getS(id)==="done").length;
  const pct = ids.length ? Math.round((done/ids.length)*100) : 0;
  const bar = document.getElementById("rm-prog-bar");
  const pctEl = document.getElementById("rm-prog-pct");
  if (bar) bar.style.width = `${pct}%`;
  if (pctEl) pctEl.textContent = `${pct}%`;
}

// ── Flow builder ─────────────────────────────────────────────────────────────
function buildFlow() {
  const flow = document.getElementById("rm-flow");
  if (!flow) return;
  flow.innerHTML = "";
  ROADMAP.forEach((topic, ti) => {
    const s = getS(topic.id);
    const topicEl = document.createElement("div");
    topicEl.className = `rm-topic-node${s!=="pending"?` is-${s}`:""}`;
    topicEl.dataset.id = topic.id;
    topicEl.innerHTML = `<span class="rm-topic-icon">${iconFor(s)}</span><span class="rm-topic-label">${topic.label}</span>${topic.subs.length?`<span class="rm-count-badge">${topic.subs.length}</span>`:""}<span class="rm-chevron">${ICON_CHEVRON}</span>`;
    topicEl.addEventListener("click", () => openPanel(topic.id, "topic"));
    flow.appendChild(topicEl);
    if (topic.subs.length > 0) {
      const group = document.createElement("div");
      group.className = "rm-sub-group";
      for (const sub of topic.subs) {
        const ss = getS(sub.id);
        const subEl = document.createElement("div");
        subEl.className = `rm-sub-node${ss!=="pending"?` is-${ss}`:""}`;
        subEl.dataset.id = sub.id;
        subEl.innerHTML = `<span class="rm-sub-icon">${iconFor(ss)}</span><span class="rm-sub-label">${sub.label}</span>`;
        subEl.addEventListener("click", () => openPanel(sub.id, "subtopic", topic.id));
        group.appendChild(subEl);
      }
      flow.appendChild(group);
    }
    if (ti < ROADMAP.length-1) {
      const arrow = document.createElement("div");
      arrow.className = "rm-arrow";
      arrow.innerHTML = ICON_ARROW;
      flow.appendChild(arrow);
    }
  });
}

// ── Panel ─────────────────────────────────────────────────────────────────────
let activeId: string|null = null, activeParent: string|null = null;
function findItem(id: string): any {
  for (const t of ROADMAP) { if (t.id===id) return {...t,type:"topic"}; for (const s of t.subs) { if (s.id===id) return {...s,type:"subtopic"}; } }
  return null;
}

function openPanel(id: string, type: string, parentId?: string) {
  activeId = id; activeParent = parentId??null;
  const item = findItem(id); if (!item) return;
  const badge = document.getElementById("rm-panel-badge")!;
  const title = document.getElementById("rm-panel-title")!;
  const body  = document.getElementById("rm-panel-body")!;
  badge.textContent = type==="topic"?"Topic":"Subtopic";
  badge.className   = `rm-panel-badge is-${type}`;
  title.textContent = item.label;
  body.innerHTML    = `<p class="rm-panel-desc">${item.desc}</p>` + (item.link ? `<a href="${item.link}" class="rm-read-more">Read more →</a>` : "");
  if (type==="topic" && item.subs?.length>0) {
    const sublist = document.createElement("div");
    sublist.className = "rm-panel-sublist";
    sublist.innerHTML = `<p class="rm-panel-sublist-title">Subtopics (${item.subs.length})</p>`;
    for (const sub of item.subs) {
      const ss = getS(sub.id);
      const row = document.createElement("div");
      row.className = `rm-panel-subitem${ss!=="pending"?` is-${ss}`:""}`;
      row.dataset.subId = sub.id;
      row.innerHTML = `<span class="rm-panel-subitem-icon">${iconFor(ss)}</span><span class="rm-panel-subitem-label">${sub.label}</span><span class="rm-panel-subitem-tag">${ss}</span>`;
      row.addEventListener("click", e => { e.stopPropagation(); openPanel(sub.id,"subtopic",id); });
      sublist.appendChild(row);
    }
    body.appendChild(sublist);
  }
  syncBtns();
  document.getElementById("rm-drawer")!.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closePanel() {
  document.getElementById("rm-drawer")!.classList.remove("is-open");
  document.body.style.overflow = "";
  activeId = activeParent = null;
}

function syncBtns() {
  if (!activeId) return;
  const s = getS(activeId);
  const sel = document.getElementById("rm-status-select") as HTMLSelectElement;
  const dot = document.getElementById("rm-status-dot");
  if (sel) { sel.value = s; sel.className = `rm-status-select${s !== "pending" ? ` is-${s}` : ""}`; }
  if (dot) dot.className = `rm-status-dot${s !== "pending" ? ` is-${s}` : ""}`;
}

function setStatus(id: string, s: string) {
  state[id] = s; save(state); buildFlow(); refreshProgress(); syncBtns();
  const row = document.querySelector<HTMLElement>(`.rm-panel-subitem[data-sub-id="${id}"]`);
  if (row) {
    row.className = `rm-panel-subitem${s!=="pending"?` is-${s}`:""}`;
    row.dataset.subId = id;
    const icon = row.querySelector(".rm-panel-subitem-icon");
    const tag  = row.querySelector(".rm-panel-subitem-tag");
    if (icon) icon.innerHTML = iconFor(s);
    if (tag)  tag.textContent = s;
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
buildFlow();
refreshProgress();
// Portal the drawer to <body> so it is not clipped by Starlight's overflow:hidden layout
document.body.appendChild(document.getElementById("rm-drawer")!);
document.getElementById("rm-panel-close")?.addEventListener("click", closePanel);
document.getElementById("rm-backdrop")?.addEventListener("click", closePanel);
document.addEventListener("keydown", e => { if (e.key==="Escape") closePanel(); });
document.getElementById("rm-status-select")?.addEventListener("change", (e) => {
  if (activeId) setStatus(activeId, (e.target as HTMLSelectElement).value);
});
</script>
```

---

## ROADMAP Array Format

The `ROADMAP` constant is a flat array of **topic objects**. Each topic maps to one `phase` from the JSON. Each topic's `subs` array maps to the `sections` of that phase. Individual `topics` strings from the JSON become the `desc` of the subtopic or are listed as bullet points inside `desc`.

```typescript
const ROADMAP = [
  {
    id: "phase-id",           // must match JSON phase id
    label: "Phase Name",      // JSON phase.name
    desc: "Phase description.", // JSON phase.description
    link: "/level-2-core-concepts/data-modeling/", // optional, see "Linking to Content Pages" below
    subs: [
      {
        id: "section-id",     // must match JSON section id
        label: "Section Name", // JSON section.name
        desc: "Section description. Topics: topic1, topic2, topic3.", // combine section.description + topics list
        link: "/level-1-foundations/sql/#window-functions", // optional
      },
      // ... more sections
    ],
  },
  // ... more phases
];
```

### Linking to Content Pages

`link` is optional on both topic and subtopic objects. When present, the drawer panel renders a "Learn more →" link below the `desc` paragraph, pointing into the actual content site rather than leaving the roadmap as a disconnected checklist.

Priority order when deciding a topic's `link`:
1. **A page we maintain that covers this exact topic** — link to it directly (e.g. roadmap topic "What is Data Engineering" → `/level-2-core-concepts/what-is-data-engineering/`).
2. **A section within a page we maintain** — anchor-link into it (e.g. roadmap topic "Window Functions" → `/level-1-foundations/sql/#window-functions`), matching an actual `##`/`###` heading on that page.
3. **Nothing of ours covers it yet** — omit `link` rather than pointing externally. Only link externally for topics that will never get their own page here (e.g. a specific third-party tool we don't otherwise document).

Do not invent a page-per-leaf-topic to satisfy this — most roadmaps have 80-200+ leaf topics (SQL: 89, Python: 77, Data Engineering: 148, AWS: 226), far more than warrant individual pages. `link` is populated opportunistically as matching content pages already exist, not as a mandate to write one page per roadmap node.

### Converting `topics` array into `desc`

The panel shows `desc` as a paragraph. Include the topic list naturally:

```typescript
// JSON section:
// { "id": "execution-lifecycle", "name": "Execution Lifecycle",
//   "description": "How a Spark application is scheduled.",
//   "topics": ["Job, stage, task hierarchy", "DAG scheduler flow", "Shuffle mechanics"] }

// → ROADMAP subtopic:
{
  id: "execution-lifecycle",
  label: "Execution Lifecycle",
  desc: "How a Spark application is scheduled. Covers: Job, stage, task hierarchy; DAG scheduler flow; Shuffle mechanics.",
}
```

---

## localStorage Key

**Every roadmap must have a unique key.** Reusing a key across roadmaps will merge progress data.

| Roadmap | Key |
|---|---|
| Data Engineering | `de_roadmap_v1` |
| Python | `py_roadmap_v1` |
| SQL | `sql_roadmap_v1` |
| Apache Spark | `spark_roadmap_v1` |
| AWS Services | `aws_roadmap_v1` |

Pattern: `<short_name>_roadmap_v1`. Increment the version suffix if you ever need to reset everyone's saved progress due to a structural change.

---

## Adding a New Roadmap — Checklist

- [ ] JSON source file exists at `data/.../roadmap/<name>.json`
- [ ] Create `src/pages/roadmaps/<name>.astro` from the skeleton above
- [ ] Replace all `CHANGEME` placeholders:
  - `title` in frontmatter (short, e.g. `"Apache Spark Roadmap"`)
  - `description` in frontmatter (150-160 chars)
  - `<h1 class="rm-title">` display name
  - `<p class="rm-subtitle">` subtitle
  - `const KEY` localStorage key (unique — see table above)
  - `const ROADMAP` array (transcribed from JSON)
- [ ] `ROADMAP` ids match JSON ids exactly (they are used as localStorage keys)
- [ ] `document.body.appendChild(document.getElementById("rm-drawer")!)` is present in the init block
- [ ] `<style is:global>@import "/src/styles/roadmap.css";</style>` present — **no inline rm-* styles**
- [ ] Add entry to `src/config/navigation.json` (see below)
- [ ] Run `npm run dev` and verify the page renders at `/roadmaps/<name>/`
- [ ] Click several topics — confirm panel opens flush to top with no gap
- [ ] Mark a topic done, reload — confirm progress persists

---

## Navigation Registration

Add the new roadmap to `src/config/navigation.json` under the roadmaps group:

```json
{
  "label": "Apache Spark",
  "link": "/roadmaps/apache-spark/"
}
```

Find the existing roadmaps sidebar group (look for the entries for Data Engineering, Python, SQL) and add the new entry in the same list.

---

## Existing Roadmaps

| Name | Page | JSON | localStorage Key |
|---|---|---|---|
| Data Engineering | `src/pages/roadmaps/data-engineering.astro` | `roadmap/data-engineering.json` | `de_roadmap_v1` |
| Python | `src/pages/roadmaps/python.astro` | `roadmap/python.json` | `py_roadmap_v1` |
| SQL | `src/pages/roadmaps/sql.astro` | `roadmap/sql.json` | `sql_roadmap_v1` |
| Apache Spark | *(to be created)* | `roadmap/apache-spark.json` | `spark_roadmap_v1` |
| AWS Services | `src/pages/roadmaps/aws.astro` | `cheat-sheet/aws-cheatsheet.json` | `aws_roadmap_v1` |

---

**Last Updated**: July 21, 2026
