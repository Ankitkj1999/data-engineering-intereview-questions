# Content Plan

**Single source of truth for content work on this site.** Read this first in any new session
(human or AI). When you finish something, update the **Status** table and add a line to the
**Session Log** at the bottom. That's the whole system.

Read the **[Decisions](#decisions)** section before proposing changes — it records *why* things
are the way they are, so settled questions don't get re-opened as if they were bugs.

---

## You are here

> **Two tracks are open.**
> **Content:** Phase 6 — Video Catalog. 6a and 6c shipped; only 6b remains. Phases 1–5 ✅ done, plus a roadmap quality pass.
> **Design:** a separate track started 2026-08-15 — see [Design track](#design-track) below. Phase 1 (navigation & layout shell) ✅ done.
> Last updated: 2026-08-15

Site total: **3,895 questions** across 51 topic pages + 74 subtopic pages, and **50 roadmaps**.
The master DE roadmap has **118 of 123 sub-nodes linked**; the 5 that aren't have no honest
target yet (Java/Scala, Go, A/B Testing, Power BI, Streamlit).

---

## Where things stand

The master [Data Engineering roadmap](src/pages/roadmaps/data-engineering.astro) is the site's
front door: 25 categories, 123 sub-nodes. **118 of them now lead to real content** (37 did at the
start of 2026-08-09). The 5 that don't — Java/Scala, Go, A/B Testing, Power BI, Streamlit — have
no honest target, and were left visibly incomplete rather than pointed at loosely-related pages.

Every roadmap now uses the proven **roadmap-node → subtopic-page** pattern:

| Roadmap | Nodes | Subtopic pages | Questions | Linked |
|---|---:|---:|---:|:--:|
| SQL | 93 | 21 | 260 | ✅ |
| Apache Spark | 236 | 22 | 448 | ✅ |
| Python | 77 | 14 | 347 | ✅ 77/77 |
| AWS | 226 (65 DE) | 7 | 190 | ✅ 65/65 DE |
| Azure | 110 (22 DE) | 5 | 121 | ✅ 22/22 DE |
| GCP | 53 (18 DE) | 5 | 123 | ✅ 18/18 DE |

Plus **50 roadmaps** (was 7) covering every topic page with 12+ questions, and topic pages
for the previously-empty categories: Git, Linux, Docker, CI/CD, IaC, Networking, Data Lifecycle,
Ingestion Patterns, Reverse ETL, ML & MLOps.

**Phase 6 (Video Catalog):** [`/interview-experiences/`](src/pages/interview-experiences.astro) and
[`/projects/`](src/pages/projects.astro) are live. **Only 6b remains** — concept videos as an
optional `videos: []` on roadmap nodes, shown in the drawer.

Other ideas, not queued, roughly by value:

- **Improve the weak source answers on `data-warehousing.mdx`** — see
  [D10](#d10-roadmap-descriptions-come-from-prose-when-strong-questions-otherwise). Its answers were
  imported from a low-quality source and contain typos and off-topic content
  ("Main Purpose of Stored Procedure for reduse the network trafic"). The roadmap now routes around
  them, but the page itself still shows them. `hadoop.mdx` has milder versions of the same issue.
- **Fix the `ssf-01`/`ssf-02` duplicate ids** (see [Open questions](#open-questions)).
- **The 5 unlinked master-roadmap nodes** — a Java/Scala-for-DE page is the most defensible addition.
- **Audit `sql/theory.mdx` (102 Q) against the 260 SQL subtopic questions** for duplication.

---

## Design track

Separate from the content phases below, started 2026-08-15. Visual/UX work only — no content
changes. Direction settled with the user up front: **keep the navy + amber brand but reassign
roles** (amber gets one job — in-progress state and the primary CTA — with a separate link/info
blue and done-green taking the rest of its current workload), add a real elevation scale and type
scale, and **write the token layer as a swappable theme contract now, ship a theme picker later**.
References the user gave: roadmap.sh and programiz for the entry-point shape, once-ui for
precision and restraint, monkeytype for the eventual theme switcher.

| # | Phase | Scope | Status |
|:-:|---|---|---|
| D1 | **Navigation & layout shell** | Header nav + section panels, rails scoped per route, widths re-cut, `/roadmaps/` index | ✅ Done (2026-08-15) |
| D2 | **Design tokens** | Type scale (28 ad-hoc sizes → one scale), elevation, colour role reassignment | ⬜ Not started |
| D3 | **Homepage + `/questions/` index** | Crossroads homepage (see below) plus the missing questions directory | ⬜ Not started |
| D4 | **SEO + LLM surface** | Real `site` URL, JSON-LD, `llms.txt`, canonicals, crawlable roadmaps | ✅ Done (2026-08-13) — see [D12](#d12-structured-data-breadcrumblist--techarticle-deliberately-no-faqpage), [D13](#d13-roadmaps-render-a-static-topic-index-hub-and-spoke) |
| D5 | **Theme picker** | Ships the contract D2 establishes | ⬜ Not started |

**D3 detail — settled 2026-08-15 after looking at roadmap.sh.** Their homepage *is* their
directory: ~116 items across five list sections, all free, auth prompts only in a community block
at the very bottom. **Don't copy that shape.** It works because roadmaps are their only product;
we have five content types, and our differentiator is the 3,895 questions — the one thing their
layout has no slot for. Copying it would foreground our least-differentiated content and leave our
strongest as a statistic. It would also duplicate `/roadmaps/`, which already is the grouped
all-50 page.

The homepage is a **crossroads**, the directories carry the depth, and no section is exhaustive in
two places:

```
Hero                real numbers, and a thesis
The four stages     keep the pipeline — it IS a genuine sequence
Questions by topic  ~51 topics grouped by level, with counts   <- the big add
Roadmaps            curated ~12 + "all 50 ->"        deep: /roadmaps/
Projects            curated ~6  + "all 18 ->"        deep: /projects/
Interviews          curated ~6  + "all 33 ->"        deep: /interview-experiences/
Track your prep     the progress instrument — nobody else has this
```

That puts ~80 internal links with descriptive anchor text on the homepage, which is the concrete
version of the SEO/LLM goal. It needs one new page: **`/questions/`**, mirroring `/roadmaps/` —
questions are the only content type with no directory of their own, and it's the page that should
rank for "data engineering interview questions".

Done already, ahead of the phase: **every count on the homepage is now derived at build time**
(`getCollection("docs")` + an `import.meta.glob` over the roadmap sources). The hardcoded ones had
gone stale by an order of magnitude — hero, meta description and stat strip all said "300+
questions" and "30+ technologies" against 3,895 questions and 50 roadmaps, and Foundations was
labelled "3 core skills" while holding 51 pages. Don't reintroduce a written-down count here.

**D4 detail — done 2026-08-13.** `site` now points at the live workers.dev origin (was
`example.com`, which made every canonical and all 208 sitemap URLs claim the content lived on a
domain we don't own). Added `public/robots.txt`, `public/llms.txt`, and JSON-LD on 208/208 pages.

Two findings changed the plan as written here:

- **`FAQPage` was rejected, not shipped.** Google fully deprecated FAQ rich results on 2026-05-07 —
  no site is eligible any more. It earns zero search appearance, so it isn't worth 130 pages of
  markup on SEO grounds. Shipped `BreadcrumbList` + `TechArticle` + `WebSite` instead. See
  [D12](#d12-structured-data-breadcrumblist--techarticle-deliberately-no-faqpage).
- **The roadmaps were the real gap**, not structured data. They rendered zero links and zero node
  text into static HTML. Fixed with a hub-and-spoke static index — 1,730 crawlable links, 39,832
  words now indexed. See [D13](#d13-roadmaps-render-a-static-topic-index-hub-and-spoke).

The sitewide `noindex, nofollow` in `astro.config.mjs` is **deliberate and untouched** — all of the
above is built behind it and takes effect when that one line is removed at launch. Note `nofollow`
also suppresses the new roadmap link graph until then, which is expected.

When a custom domain is attached, **three files** carry the origin: `astro.config.mjs`,
`public/robots.txt` and `public/llms.txt`.

---

## Status

Do these **in order**. One phase at a time — don't start the next until the current is built,
passing `npx astro build`, and logged below.

| # | Phase | Scope | Est. pages | Status |
|:-:|---|---|:-:|---|
| 1 | **Engineering Foundations** | Git/GitHub, Linux, Docker, CI/CD, IaC, Networking | 6 | ✅ Done (2026-08-09) — 203 questions |
| 1b | **Roadmap coverage** | A roadmap for every topic page with 12+ questions | 39 roadmaps | ✅ Done (2026-08-09) — 46 total, 2,005 nodes |
| 2 | **Python depth** | 19 roadmap categories → subtopic pages, mirroring SQL | 14 | ✅ Done (2026-08-09) — 280 questions |
| 3 | **Cloud depth** | AWS (7) → Azure (5) → GCP (5), DE-scoped services only | 17 | ✅ Done (2026-08-09) — 281 questions |
| 4 | **Remaining breadth** | Monitoring, Data Lifecycle, Ingestion Types, Reverse ETL, MLOps | 4 new + 1 expanded | ✅ Done (2026-08-09) — 65 questions |
| 5 | **Wire the master roadmap** | Add `link:` to the unlinked DE roadmap nodes | 0 new | ✅ Done (2026-08-09) — 118/123 linked |
| 6a | **Interview experiences** | Curated videos + articles, data layer, link checker | 1 page + data | ✅ Done (2026-08-13) — 33 resources |
| 6b | **Concept videos in roadmaps** | Optional `videos: []` on roadmap nodes, shown in the drawer | script change | ⬜ Not started |
| 6c | **Projects section** | Project walkthroughs tagged by the topics they exercise | 1 page + data | ✅ Done (2026-08-13) — 18 projects |

Status values: `⬜ Not started` · `🟡 In progress` · `✅ Done (YYYY-MM-DD)` · `⏸️ Deferred (why)`

---

## Phase detail

### Phase 1 — Engineering Foundations ✅ Done 2026-08-09

The `CS & DevOps Foundations` / `CI/CD` / `IaC` categories were entirely empty — the
highest-interview-weight breadth gap. Six new topic pages, **203 questions**, closing 13 dead-end
roadmap nodes.

| Page | Questions | Sections | Roadmap nodes closed |
|---|:-:|---|:-:|
| [Git & GitHub](src/content/docs/level-1-foundations/git.mdx) | 39 | Fundamentals, Branching & Merging, Rewriting History, Remotes & Collaboration, Undoing Mistakes, Git for DE | 1 |
| [Linux](src/content/docs/level-1-foundations/linux.mdx) | 40 | Filesystem, Permissions, Processes & Signals, Text Processing, Shell Scripting, Cron, Troubleshooting | 1 |
| [Docker](src/content/docs/level-1-foundations/docker.mdx) | 33 | Fundamentals, Images & Dockerfiles, Layers & Optimisation, Storage & Networking, Compose, Docker for DE | 1 |
| [CI/CD](src/content/docs/level-1-foundations/cicd.mdx) | 29 | Fundamentals, GitHub Actions, GitLab CI, ArgoCD & GitOps, CI/CD for Data Pipelines | 4 |
| [Infrastructure as Code](src/content/docs/level-1-foundations/iac.mdx) | 32 | Fundamentals, Terraform Core, State Management, Modules & Environments, OpenTofu & CDK, IaC for Data Platforms | 5 |
| [Networking](src/content/docs/level-1-foundations/networking.mdx) | 30 | TCP/IP, DNS, HTTP & TLS, Cloud Networking, Load Balancing, Networking for DE | 1 |

**Scope cut applied:** `Distributed Systems Basics` got **no new page** — its roadmap node points
at [`level-4-advanced/system-design.mdx`](src/content/docs/level-4-advanced/system-design.mdx),
which already covers CAP, consistency models, replication, partitioning and consensus across 63
questions.

**Placement — see [D8](#d8-engineering-foundations-pages-live-under-the-existing-foundations-group).**
Flat `.mdx` files at `src/content/docs/level-1-foundations/`, inside the existing **Foundations**
sidebar group alongside SQL / Python / Data Structures.

Wiring done: all 6 in `navigation.json`, all 6 as rows in `src/pages/progress.astro`, and 13
`link:` fields added to `data-engineering.astro`. Verified with a clean `npx astro build` — all
203 cards render, every roadmap anchor target resolves in the built HTML, zero new duplicate ids.

**Follow-up done same day — all 6 got their own roadmap.** User's call: leaving them as single
nodes on the master roadmap was inconsistent with Python/SQL/Spark and gave no single-view picture
of each topic. Generated `/roadmaps/{git,linux,docker,cicd,iac,networking}.astro` — **239 nodes**
across 36 categories, every node linking to the section anchor on its content page:

| Roadmap | Categories | Nodes | Storage key |
|---|:-:|:-:|---|
| `/roadmaps/git/` | 6 | 45 | `git_roadmap_v1` |
| `/roadmaps/linux/` | 7 | 47 | `linux_roadmap_v1` |
| `/roadmaps/docker/` | 6 | 39 | `docker_roadmap_v1` |
| `/roadmaps/cicd/` | 5 | 34 | `cicd_roadmap_v1` |
| `/roadmaps/iac/` | 6 | 38 | `iac_roadmap_v1` |
| `/roadmaps/networking/` | 6 | 36 | `networking_roadmap_v1` |

All 6 added to the sidebar's Roadmaps group. The master DE roadmap's 6 corresponding nodes now
link to the **roadmap** rather than straight to the page, so the drill-down is
`DE roadmap → topic roadmap → page anchor`, matching Python/SQL/Spark.

### Phase 1b — Roadmap coverage ✅ Done 2026-08-09

Every topic page with 12+ questions now has a roadmap. **46 roadmaps, 298 categories, 2,005 nodes**
(was 7 roadmaps at the start of the day).

User's call on two forks: **one roadmap per tool** rather than grouping thin related tools into
category roadmaps, and a **flat sidebar** rather than subgrouping — see
[D9](#d9-one-roadmap-per-tool-flat-sidebar).

The 33 generated in this batch were **derived from the content pages**, not hand-written: category
= a page's `##`/`###` section, sub-nodes = the distinct `topic="..."` values of the QuestionCards
inside it, descriptions = the first usable sentence of the first answer for that topic. Roughly
96% of descriptions are real content; the rest fall back to a neutral
"N interview questions on X" line where the extracted sentence didn't stand alone.

**Quality caveat — since fixed, see the 2026-08-13 pass below.** Because descriptions were
extracted rather than authored, a minority read
awkwardly — a truncated list item, or a sentence that assumed context from the question it
answered. Node *labels* are all curated `topic` values and are reliable. Worth a cleanup pass if
they bother you; not worth blocking on.

Excluded deliberately: the five narrative level-2 pages (`what-is-data-engineering`,
`skills-and-responsibilities`, `data-engineering-lifecycle`, `choosing-the-right-technologies`,
`data-engineer-vs-data-scientist`) — prose introductions, not learnable topic areas.

### Phase 2 — Python depth ✅ Done 2026-08-09

14 subtopic pages, **280 questions**, at `src/content/docs/level-1-foundations/python/`. All 19
roadmap categories and **77 of 77 nodes** in `python.astro` now carry a `link:` (was zero).
`theory.mdx` (40 Q) and `practice.mdx` (27 Q) kept as-is — the new pages go alongside, exactly as
SQL's did.

| Page | Q | Covers |
|---|:-:|---|
| `basics.mdx` | 34 | syntax, variables, types & casting, control flow, exceptions, built-ins, lists/tuples/sets/dicts |
| `data-structures-algorithms.mdx` | 24 | arrays & linked lists, hash tables, stacks/queues, heaps, trees & binary search, recursion, sorting |
| `functions.mdx` | 18 | definitions, arguments, lambdas, scope & closures, functional programming |
| `comprehensions-generators.mdx` | 18 | comprehensions, iterator protocol, generators, itertools |
| `decorators-context-managers.mdx` | 18 | decorator fundamentals & practical patterns, context managers, contextlib |
| `oop.mdx` | 20 | classes, methods & attributes, inheritance & MRO, dunder methods, dataclasses & protocols |
| `concurrency.mdx` | 20 | GIL, threading, multiprocessing, asyncio, choosing an approach |
| `modules-packaging.mdx` | 20 | imports, packages, virtual environments, package managers, building & distributing |
| `static-typing.mdx` | 17 | type hints, typing module, mypy/pyright, Pydantic & runtime validation |
| `testing.mdx` | 23 | pytest, fixtures, mocking, unittest/doctest/tox, testing data pipelines |
| `code-quality.mdx` | 19 | formatting, linting, documentation, pre-commit, logging, profiling & debugging |
| `regular-expressions.mdx` | 18 | pattern syntax, `re` module, groups, lookarounds, ReDoS & performance |
| `data-libraries.mdx` | 21 | NumPy, pandas, PyArrow/Parquet, Polars/DuckDB, file I/O & serialisation |
| `web-frameworks.mdx` | 10 | framework comparison, FastAPI, building data APIs |

**Trims applied**, both suggested in the original plan: the nine framework nodes became **one**
`web-frameworks.mdx` (least interview-relevant for a data engineer), and the nine sub-less roadmap
nodes (Lambdas, Decorators, Iterators, Comprehensions, Generator Expressions, Context Managers,
Paradigms, Regular Expressions, Common Packages) were folded into thematic pages rather than
getting one thin page each.

Per [D1](#d1-sidebar-and-progress-track-interview-topics-only--not-subtopic-pages) these are
**subtopic** pages: roadmap links yes, sidebar no, progress dashboard no.

Verified: clean `npx astro build`, all 77 roadmap targets resolve against the built HTML, zero new
duplicate question ids.

### Phase 3 — Cloud depth ✅ Done 2026-08-09

17 subtopic pages, **281 questions**, at `src/content/docs/level-3-technologies/cloud/`.
All **105 DE-tagged services** across the three cloud roadmaps are now linked (was zero).
The existing `aws.mdx` / `azure.mdx` / `gcp.mdx` remain as overview pages, questions untouched.

| Provider | Pages | Q | DE services linked |
|---|---|:-:|:-:|
| **AWS** | compute, storage, databases, analytics, migration, integration, comparisons | 130 | 65/65 |
| **Azure** | compute, storage, databases, data-solutions, comparisons | 76 | 22/22 |
| **GCP** | compute, storage, databases, analytics, comparisons | 75 | 18/18 |

Built to the DE-tagged subset only, per
[D2](#d2-cloud-roadmaps-default-to-a-data-engineering-filtered-view) — full service catalogues
were not covered.

**Scope adjustments** from the original estimate: AWS's "Other" category (Amazon MQ alone) was
folded into `aws-integration` rather than getting a one-item page, and Azure's thin Solutions
(2 services) plus Service Bus became one `azure-data-solutions` page. That's 17 pages rather
than the estimated 19, applying [D5](#d5-cut-low-value-scope-rather-than-filling-it).

Each provider's **comparisons page** covers the roadmap's "X vs Y" nodes, and each of those nodes
links to the matching section — these make unusually good interview material, which is why they
got a page each rather than being scattered.

Per [D1](#d1-sidebar-and-progress-track-interview-topics-only--not-subtopic-pages) these are
**subtopic** pages: roadmap links yes, sidebar no, progress dashboard no.

Verified: clean `npx astro build`, **123 linked roadmap nodes checked against the built HTML**
with zero broken page or anchor targets, and no new duplicate question ids.

### Phase 4 — Remaining breadth ✅ Done 2026-08-09

The last empty master-roadmap categories. **4 new pages + 1 expanded, 65 questions.**

| Page | Q | Closes |
|---|:-:|---|
| [Data Lifecycle](src/content/docs/level-2-core-concepts/data-lifecycle.mdx) | 14 | `Data Lifecycle` (4) + `Sources of Data` (4) |
| [Ingestion Patterns](src/content/docs/level-3-technologies/ingestion/ingestion-patterns.mdx) | 14 | `Types of Data Ingestion` (4) |
| [ML & MLOps](src/content/docs/level-4-advanced/mlops.mdx) | 16 | `Machine Learning & MLOps` (2) |
| [Reverse ETL](src/content/docs/level-2-core-concepts/reverse-etl.mdx) | 13 | `Reverse ETL` (4) |
| [Observability](src/content/docs/level-4-advanced/observability.mdx) — **expanded** 12 → 20 | +8 | `Monitoring` (4) |

**Monitoring was handled by expanding the existing Observability page** rather than creating a
second one — the master roadmap's Monitoring category already pointed there, and two pages on the
same subject would have been worse than one. All 12 original `obs-*` questions kept verbatim with
their ids, per [D3](#d3-question-ids-are-permanent).

These are **topic** pages, not subtopic pages, so per
[D1](#d1-sidebar-and-progress-track-interview-topics-only--not-subtopic-pages) they *do* go in the
sidebar and the progress dashboard — added to Core Concepts, Ingestion and Advanced.

### Phase 5 — Wire the master roadmap ✅ Done 2026-08-09

**118 of 123 sub-nodes now carry a `link:`** (was 37 at the start of the day). Every target was
validated against the built HTML before writing, so there are zero broken pages or anchors.

Most nodes point at content created in Phases 1–4: cloud services to the new provider pages, the
lifecycle and ingestion nodes to the Phase 4 pages, monitoring tools to the expanded Observability
page, database fundamentals to SQL subtopic pages, and CAP/scaling to `system-design`.

**5 nodes deliberately left unlinked**, because no honest target exists: `java-scala`, `go`,
`ab-test`, `powerbi`, `streamlit`. Pointing them at loosely-related pages would be worse than
leaving them visibly incomplete — see [D5](#d5-cut-low-value-scope-rather-than-filling-it). These
are the natural candidates if more content is ever wanted.

### Phase 6 — Video Catalog (planned)

A lot of good data engineering material is on YouTube — recorded interview experiences, concept
explainers, and end-to-end project walkthroughs. This phase adds curated video alongside the
written content.

#### The shape: companion, not catalog

The decision that drives everything else: **a standalone "videos" catalog competes with YouTube
search and loses.** Value comes from videos being attached to the structure this site already has.
So the three content types get three different shapes:

| Type | Shape | Why |
|---|---|---|
| **Concept videos** | A "Watch" block **on existing topic pages** | No new information architecture. Reuses the 51 topic pages and 50 roadmaps as the taxonomy. Serves people who learn better by watching without duplicating the written Q&A. |
| **Interview experiences** | **New browsable section** | Has no existing home on the site, and it's the most differentiated content — hard to find and organise anywhere else. |
| **Projects** | **New section** | The site has no projects section at all. Videos are one resource type on it, not the point of it. |

#### One mechanism for all three

- **`src/data/videos.json`** — one record per video. Data, not MDX, so it's queryable and
  automatically checkable.
- **A `<VideoList>` / `<VideoCard>` component pair**, mirroring `QuestionList`/`QuestionCard`,
  including **watched state in localStorage** so it feeds the existing progress dashboard for free.
- **Tag to topic slugs, not roadmap nodes.** 2,049 nodes is too granular to maintain; 51 topics is
  not.
- **A link-rot checker in CI**, hitting YouTube's oEmbed endpoint. **Non-negotiable** — decaying
  links are what kill link directories, and a broken catalog damages trust more than no catalog.
- **Link, or lazy-embed with `youtube-nocookie`.** Raw iframes hurt page load and set third-party
  cookies.

Proposed record shape:

```json
{
  "id": "diHUuPIaMpI",
  "type": "video",
  "title": "Salting in Spark — data engineer interview question",
  "channel": "MANISH KUMAR",
  "url": "https://www.youtube.com/watch?v=diHUuPIaMpI",
  "kind": "concept",
  "topics": ["spark"],
  "company": null,
  "level": "intermediate",
  "duration_s": 780,
  "added": "2026-08-13",
  "checked": "2026-08-13"
}
```

`kind` is one of `concept` | `interview` | `project`. `topics[]` must match existing topic slugs.

#### 6a — Interview experiences ✅ Done 2026-08-13

Shipped at [`/interview-experiences/`](src/pages/interview-experiences.astro), backed by
[`src/data/interview-resources.json`](src/data/interview-resources.json) — **33 resources**
(5 company experiences, 9 mock interviews, 19 guides), 4 companies, 7 creators.

**Sources are grouped video-first, then articles**, per the user's call that video is the more
engaging format.

**Structure is format-primary with company as a filter — not company-primary.** This deviates from
the original intent, on evidence: only **5 of 45** source records carry a company, and it can't be
derived (a creator's employer is not the company they interviewed at). Company-first would have
meant four near-empty cards. The data model already carries `company`, so promoting it to the
primary axis later is a presentation change, not a migration.

Also settled:

- **Playlists are first-class entries** where the whole playlist is coherent, with their video
  count shown (one has 96, another 33). They're also more link-rot resistant than single videos —
  one removed video doesn't kill the entry.
- **Channel links are not catalogue entries.** The 7 became a separate short "creators worth
  following" list at the foot of the page.
- **Videos do not count toward progress** — user's call, and it keeps the completion percentage
  meaning "questions answered" rather than diluting it.
- **Topic tags link into the site** — a resource tagged `sql` links to the SQL theory page, so the
  section routes people into existing content rather than only out to YouTube.

**Link-rot checker shipped with it**, not after:
[`scripts/check-video-links.mjs`](scripts/check-video-links.mjs), run with `npm run check:links`.
Uses YouTube's oEmbed endpoint (no API key, no quota), fails the build on dead links, and warns on
title drift. First run: **40/40 live, 0 dead.**

**Not done, and it's the real value:** no company has a round-by-round loop breakdown yet. That
needs someone to watch the sources and summarise — it cannot be extracted, and inventing it would
be fabrication. The UI degrades gracefully and says so explicitly rather than hiding the gap.

#### 6c — Projects ✅ Done 2026-08-13

Shipped at [`/projects/`](src/pages/projects.astro), backed by
[`src/data/projects.json`](src/data/projects.json) — **18 projects, 27 sources**, grouped into 8
stack domains: streaming, AWS, Azure, GCP, Databricks/lakehouse, warehousing (Snowflake + dbt),
orchestration, and curated collections.

**Sourced by live web research**, not from a seed file — none existed for projects. Every URL was
then verified by the link checker before shipping.

Design decisions:

- **A project is not a link, it's a thing you build.** Each carries a summary, its stack, and
  *multiple* sources — repo, video walkthrough and written guide where all three exist. That's the
  main structural difference from 6a, where one resource meant one URL.
- **Grouped by stack domain**, because "which cloud am I targeting" is the first question someone
  asks. Level sorts within a group.
- **The left column carries level**, rendered as three dots — adapting 6a's "left column holds the
  decision factor" pattern. For interview resources that was scale; for projects it's commitment.
- **Every project links back into the site** via a "Revise" row — a Kafka project links to the
  Kafka questions. Same routing principle as 6a: send people into the content, not just out to
  GitHub.

**Link checker generalised** — `scripts/check-video-links.mjs` became
[`scripts/check-links.mjs`](scripts/check-links.mjs), now covering both data files, handling HEAD
with GET fallback for non-YouTube hosts, and distinguishing **dead** from **inconclusive** (Medium
bot-blocks automated checks with a 403, which is not proof of death). Run: **67/67 live, 0 dead,
6 inconclusive.**

#### Source data assessment

[`interview_experience_videos.json`](data/data-engineering-interview-questions-master/interview_experience/interview_experience_videos.json)
holds **45 records** grouped by creator: 28 videos, 10 playlists, 7 channels.

**It's a starting point, not a catalog.** What the data actually shows:

- **Company-first organisation does not survive contact with it.** Only **5 of 45** records carry a
  company, and deriving more from titles produces false positives — "Ankit Bansal — Channel (Data
  Engineer at Amazon)" is the *creator's employer*, not an Amazon interview. Company should be an
  **opportunistic filter**, not the primary axis, until records are tagged by hand.
- **The playlists are the highest-value items**, not the individual videos — one has 96 videos,
  another 33 ("richest source of real mock/experience interviews in this set"). A handful of
  playlist entries may be worth more than all 28 single videos.
- **7 channel-level links are weak catalog entries** — "go browse this channel" isn't curation.
  They probably belong in a separate short "creators worth following" list.
- **Known data-quality flags already in the file:** one record notes playlist IDs "were not
  text-indexed — open in a browser to grab list= IDs" (incomplete), and one is re-attributed to
  CareerVidz rather than the originally-credited creator (provenance was already being corrected).
- **URL normalisation needed** — a `youtu.be/…` short link and three `/c/…` channel URLs.

#### Suggested order

1. **Mechanism + interview experiences** — build the schema, component, and link checker, and
   populate the interview section. Doing the new-section work first surfaces the hard problems early.
2. **Concept videos onto existing topic pages** — cheap once the component exists.
3. **Projects section** — the biggest scope; worth doing properly rather than as an afterthought.

#### The real cost

Not the code — **watching videos to decide which are good.** 30 curated beats 500 scraped, and
curation doesn't scale by adding time. Cap the initial target deliberately (say 10 companies and
5 topics), ship it, and see whether it actually gets used before widening.

---

---

## Decisions

Settled calls and the reasoning behind them. **Don't re-open these as if they were oversights.**

### D1. Sidebar and progress track interview topics only — not subtopic pages

The sidebar (`src/config/navigation.json`) and the global progress dashboard
(`src/pages/progress.astro`) carry **only the topics actually needed for a data engineering
interview**. The 43 fine-grained subtopic pages (SQL's 21, Spark's 22 — 708 questions) are
deliberately excluded from both, and are reached through their roadmap instead.

**Why:** subtopic pages are *preparatory learning material*, not the interview-prep checklist.
Listing all 43 would bury the sidebar and dilute the progress percentage into something that no
longer answers "am I ready for an interview?" The roadmap is the right entry point for that depth.

**Applies going forward:** subtopic pages built in Phases 2–3 follow the same rule — roadmap
`link:` yes, sidebar no, progress dashboard no. New *topic* pages (Phases 1 and 4) do go in both.

### D2. Cloud roadmaps default to a data-engineering-filtered view

AWS/Azure/GCP roadmaps carry the full service catalog but default to showing only nodes tagged
`de: true` (AWS 65/209, Azure 22/96, GCP 18/43). Non-matching nodes are **hidden, not dimmed**.
Scope is **core only** — storage, data-workload compute, databases/warehouses, streaming, ETL,
migration/catalog. Excludes networking, IAM/security, cost/monitoring tooling, and **all** ML/AI.
A "X vs Y" comparison is in scope only if every side is in scope.

Progress % is computed over the *full* roadmap on purpose, so toggling the filter never moves it.

**Why:** the site is for DE interview prep; full cloud catalogs are mostly noise for that reader.
Hiding-by-default preserves the completeness already built as an opt-in.

**Applies going forward:** cloud content phases build the DE-tagged subset only.

### D3. Question `id`s are permanent

`id` on a `QuestionCard` is the localStorage key for that user's progress. Changing or renumbering
one silently wipes their state. **Add new ids; never edit or reuse existing ones.** When
restructuring a page, keep existing questions verbatim with their original ids and re-home them
under new headings.

### D4. Roadmap data lives inline in the `.astro` files

Each `src/pages/roadmaps/*.astro` holds its own hardcoded `ROADMAP` JS array in a `<script>` tag.
The JSON under `data/data-engineering-interview-questions-master/roadmap/*.json` is **source
material only** — editing it does nothing to the live site. There is no generation step.

### D5. Cut low-value scope rather than filling it

If a topic isn't earning its place in a data engineering interview, drop it instead of writing
thin filler. This has already been applied to: the cloud roadmap DE-filter (D2), a superseded
planning doc that was deleted rather than kept, and speculative frontmatter fields that were
dropped rather than carried "just in case."

### D6. Preserve existing content over hitting word-count targets

When restructuring, keep every existing question and let the page run long rather than trimming to
a target length. Applied to SQL's 99-question page and the 38 pages converted in the original
Phase 6.

### D7. AWS cheat sheet integration — deferred

Only 26 of 300 topics in `cheat-sheet/aws-cheatsheet.json` have written content, and cheat sheets
are a reference-lookup shape that fits neither the topic-page nor subtopic-page pattern. Deferred
until more content exists. Don't restart without an explicit ask.

### D8. Engineering Foundations pages live under the existing Foundations group

Git, Linux, Docker, CI/CD, IaC and Networking are flat `.mdx` files at
`src/content/docs/level-1-foundations/`, listed inside the existing **Foundations** sidebar group
next to SQL / Python / Data Structures — *not* in a new top-level section.

**Why:** user's call, 2026-08-09, chosen over a separate "Engineering Foundations" top-level group.
Keeps the sidebar flatter and fewer top-level groups; these are foundational skills regardless of
whether they're a language or a tool.

### D9. One roadmap per tool, flat sidebar

Every topic page with 12+ questions gets **its own** roadmap — Snowflake, BigQuery, Redshift and
Databricks are four roadmaps, not one "Cloud Data Warehouses" roadmap. The sidebar's Roadmaps
group is a **flat list of 46 links** in learning-sequence order, collapsed by default.

**Why:** user's call, 2026-08-09, chosen over a 12-roadmap grouped alternative and over
subgrouping the sidebar. Maximum granularity — each tool is independently trackable, and its
roadmap maps 1:1 to its content page.

**Trade-off accepted:** 46 flat sidebar entries is a long list, and roadmaps built from
single-section pages (Parquet, Avro, Kubernetes, NiFi, Observability, Cost Optimization) have only
one category, so they render as a flat checklist rather than a staged path. Both were flagged
before building and accepted.

### D10. Roadmap descriptions come from prose when strong, questions otherwise

Generated roadmap node descriptions are built by a two-source rule: take the **first complete,
self-contained sentence** from the topic's answers if it scores well (long enough, mentions the
topic, reads definitionally); otherwise use the **question text itself**, which is short,
self-contained and inherently descriptive of what the node covers.

**Why:** the first attempt used answer prose only, truncating at 160 characters. That produced 37%
unusable descriptions — 179 cut mid-sentence, 61 neutral fallbacks, 17 list fragments. The rewrite
(2026-08-13) took that to **0%**, with 53% prose and 47% question-derived.

**A finding worth keeping:** the scoring exists because some pages have genuinely weak *source*
answers. `data-warehousing.mdx` in particular contains imported content with typos and off-topic
text ("Main Purpose of Stored Procedure for reduse the network trafic", "Meta data is nothing but
information about data"). The roadmap now routes around those by preferring the question — but
**the underlying page still shows them to readers**, which is a content problem the roadmap pass
did not fix.

**How to apply:** if regenerating, node ids must stay stable — they are localStorage progress keys.
The generator asserts that no previously-existing id disappears, and that assertion should be kept.

### D11. Content spacing is fixed globally in `theme.css`, not per page

Starlight spaces markdown with a single `--sl-content-gap-y` (1rem) between every sibling pair,
plus `1.5em` **before** a heading. Nothing sets the space **after** a heading, so it fell back to
that 1rem — and on this site nearly every heading is immediately followed by a bold lead paragraph
or a `<QuestionList>`, which made headings look glued to their content. The page title was worse:
the `h1` lives in its own panel with `margin-bottom: 0`, so it butted straight against the first
section heading.

Fixed once in [`src/styles/theme.css`](src/styles/theme.css) under "Content rhythm":

| Relationship | Was | Now |
|---|---|---|
| Page title → first heading | 0 | 0.9rem |
| After an `h2` | 1rem | 1.5rem |
| After an `h3`–`h6` | 1rem | 1.15rem |
| Before an `h2` (section break) | 1.5em | 3rem |
| Before an `h3` | 1.5em | 2.25rem |
| Around a `<QuestionList>` | 1rem | 1.75rem |

**Two implementation facts worth keeping:**

1. **Starlight wraps headings in `.sl-heading-wrapper`** (for the anchor link), so adjacency
   selectors must target the *wrapper*, not the `h2`. Selectors written against `h2 + *` silently
   match nothing.
2. **`hr` is excluded from the section-break rule** — a rule already separates visually, and
   stacking both produced far too much space.

**Scope:** these rules only affect `.sl-markdown-content` *with* heading wrappers, i.e. MDX content
pages. Custom `.astro` pages (roadmaps, `/interview-experiences/`, `/projects/`) render raw
headings and carry their own spacing systems, so they are deliberately untouched — but they do pick
up the shared page-title fix.

**How to apply:** adjust spacing here, not in individual pages or components. If a page needs
different rhythm, that's a signal it should own its layout like the custom `.astro` pages do.

### D12. Structured data: BreadcrumbList + TechArticle, deliberately no FAQPage

Shipped 2026-08-13 via a [`Head` override](src/overrides/Head.astro), on **208 of 208 pages**:

- **BreadcrumbList** — still renders a visible breadcrumb trail in Google results, and encodes the
  tier structure (foundations → core → technologies → advanced) machine-readably.
- **TechArticle** — what a content page actually is, carrying its description and section.
- **WebSite** + `SearchAction` — homepage only.

**FAQPage was considered and deliberately rejected.** Google **fully deprecated FAQ rich results on
2026-05-07** — no site is eligible any more, not even the government and health domains that kept
it after the 2023 restriction. The schema is still valid and LLMs do read it, but it earns zero
search appearance, so it isn't worth shipping across 130 pages on SEO grounds. Revisit only if LLM
ingestion becomes an explicit goal in its own right.

**Also fixed the same day:** `astro.config.mjs` had `site: "https://example.com"`, so every
canonical tag and all 208 sitemap URLs pointed at a domain we don't own — which tells search
engines the real content lives elsewhere. Now set to the live workers.dev origin; **it is one line
to change when a custom domain is attached**, and `public/robots.txt` and `public/llms.txt`
hardcode the same origin, so update all three together.

**This gap is now fixed — see [D13](#d13-roadmaps-render-a-static-topic-index-hub-and-spoke).**

### D13. Roadmaps render a static topic index (hub-and-spoke)

Roadmap node text used to live only in an inline `ROADMAP` array evaluated client-side, so a
crawler landing on `/roadmaps/kafka/` found **zero links and zero node text** — the entire
hub→spoke link graph was invisible.

**Reference: roadmap.sh.** Their diagram is also client-rendered — checking the live page confirmed
its nodes are absent from static HTML too. Their indexing comes from a **hub-and-spoke** model
instead: the roadmap is the hub, and every topic is a separately indexable spoke page that links
back. We already had 152 spoke pages; only the wiring was missing.

Fixed 2026-08-13:

1. Each roadmap's `ROADMAP` array moved out of the client script into
   [`src/data/roadmaps/<slug>.json`](src/data/roadmaps/), imported in frontmatter.
2. Every page renders a visible **"All topics"** section listing all nodes as real text with real
   links, server-side.
3. The client script reads the data from an embedded `<script type="application/json" id="rm-data">`
   rather than carrying its own copy — so there is one source of truth, and node ids (the
   localStorage progress keys) are untouched.

| | Before | After |
|---|---:|---:|
| Crawlable links across roadmaps | 0 | **1,730** |
| Node text in static HTML | 0 | **2,049 nodes** |
| Words indexed by Pagefind | ~1,400 | **39,832** |

**Two implementation notes worth keeping:**

- The section is a `<section>`, **not a `<nav>`** — Pagefind excludes `nav` by default, which is
  why the first attempt indexed only 26 words per roadmap. It's an index of content, not site
  navigation, so `section` is also the more accurate element.
- It is **visible, not hidden**. A hidden block of 200 links is a spam signal; a text index of a
  roadmap is genuinely useful and honest.

---

## Open questions

Unresolved calls. Settle before the phase that needs them; move the answer into **Decisions**.

**Phase 6 (video catalog):**

- **Primary axis for interview experiences** — company is the axis people search by, but only 5 of
  45 source records have one. Tag by hand, or organise by creator/playlist first and add company
  opportunistically?
- **Playlists as first-class entries or expanded?** A 96-video playlist is one record but a lot of
  content. Link the playlist, or pull out the individual videos worth watching?
- **Channel-level links** — keep as a short "creators worth following" list, or drop them?
- **Do videos count toward progress?** Watched-state is easy to add, but mixing "watched a video"
  into a completion percentage that currently means "answered a question" may dilute what the
  number means. Related to [D1](#d1-sidebar-and-progress-track-interview-topics-only--not-subtopic-pages).

- **SQL theory overlap** — `sql/theory.mdx` (102 Q) may duplicate the 260 questions on SQL
  subtopic pages. Worth an audit at some point; not blocking anything.
- **Duplicate question ids `ssf-01` / `ssf-02`** — pre-existing collision between
  `spark-core-fundamentals.mdx` and `spark-testing-devops.mdx` (found 2026-08-09, introduced in
  commit `a86bfe2`). Both pairs share a localStorage progress key, so marking one marks the other.
  Fixing means changing an id, which [D3](#d3-question-ids-are-permanent) forbids — but tracking is
  already broken for these four questions, so a one-time renumber is likely the lesser evil.
  Needs a call.

---

## The recipe

How to build one page. Copy
[`src/content/docs/level-1-foundations/sql/basic-syntax.mdx`](src/content/docs/level-1-foundations/sql/basic-syntax.mdx)
as the reference — it is the canonical example.

**1. Create the page** at the path the roadmap node will link to:

```mdx
---
title: Python Concurrency
description: One-line description — shows in search results.
---

import QuestionCard from '../../../../components/mdx/QuestionCard.astro';
import QuestionList from '../../../../components/mdx/QuestionList.astro';

## Concurrency: <the angle this page takes>

**One bold paragraph framing why this topic matters and what trips people up.**

## Table of Contents
- [Key Concepts](#key-concepts)
- [GIL](#gil)          ← one entry per roadmap sub-node
...

## Key Concepts

<prose that explains the topic before the questions start>

## GIL                 ← H2 per roadmap sub-node; anchor must match the roadmap link

<QuestionList topic="GIL" storagePrefix="python-concurrency-gil">

<QuestionCard id="gil-01" number={1} question="..." difficulty="easy" topic="GIL">
Answer in markdown. Code fences are fine.
</QuestionCard>

</QuestionList>

## Common Interview Scenarios
## Further Reading
```

**2. Rules that matter**

- `id` must be **unique site-wide** — see [D3](#d3-question-ids-are-permanent). Short prefix per
  H2 section (`gil-01`, `thr-01`), not per page.
- `number` restarts at 1 within each `QuestionList`.
- `storagePrefix` is unique per `QuestionList`: `<page-slug>-<section-slug>`.
- `difficulty` is `easy` | `medium` | `hard`. `topic` matches the section.
- **MDX gotcha:** a bare `<` followed by a letter in prose is parsed as a JSX tag and fails the
  build — `<object at 0x7f...>`, `<pid>`, `<T>`. Wrap them in backticks. Curly braces are the same
  hazard. Fenced code blocks and inline code are safe.

**3. Wire the roadmap.** In the matching `src/pages/roadmaps/*.astro`, add `link:` to each node —
category node → page root, sub-node → page anchor.

> **Creating a whole new roadmap?** Every `roadmaps/*.astro` is the same file with three things
> swapped: the page title/h1/subtitle, the `ROADMAP` array, and `const KEY` (which **must** be
> unique — it's the localStorage key for that roadmap's progress). Copy `sql.astro` and replace
> those three. Generating several at once from a script is reasonable; a throwaway generator was
> used for the 6 Engineering Foundations roadmaps rather than hand-writing ~330 lines of identical
> boilerplate six times.

```js
{ id:"concurrency", label:"Concurrency", desc:"...", link:"/level-1-foundations/python/concurrency/", subs:[
  { id:"gil", label:"GIL", desc:"...", link:"/level-1-foundations/python/concurrency/#gil" },
]},
```

**4. Sidebar + progress — topic pages only.** Per [D1](#d1-sidebar-and-progress-track-interview-topics-only--not-subtopic-pages):
a new **topic** page gets added to `src/config/navigation.json` and `src/pages/progress.astro`.
A **subtopic** page gets neither — the roadmap link is its only entry point.

**5. Verify:** `npx astro build` must pass clean, and check for duplicate ids:

```bash
grep -rho 'id="[^"]*"' src/content/docs --include=*.mdx | sort | uniq -d
```

---

## Reference docs

[`CONTENT_GUIDELINES.md`](CONTENT_GUIDELINES.md) · [`ROADMAP_GUIDELINES.md`](ROADMAP_GUIDELINES.md) · [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)

---

## Session log

Newest first. One line per working session: what was done, and what's next.

| Date | What happened | Next up |
|---|---|---|
| 2026-08-15 | **Design phase 1 — navigation & layout shell.** Audit first: colour is genuinely centralised (~20 stray hexes outside `theme.css`), **typography is not** (28 ad-hoc `font-size` values, no scale, while the vendor ships an unused `--page-font-size-*` scale). Fixed four structural faults, all pre-existing: header nav read `process.env.PAGE_NAVIGATION`, **never set anywhere**, so the `<nav>` rendered nothing on every page; both rails rendered on every route (`sidebar.length > 0` is the *global* config, and Starlight synthesizes a one-item TOC), so home/roadmaps/projects each carried 640px of chrome pointing nowhere; trailing `.page-toc-sidebar` rules out-ordered the `@media (min-width: 1280px)` block so the TOC never went `position: fixed` and sat in flow at 320px — **doc prose measured 434px, now 752px**; and roadmap pages shipped two H1s. Built the header nav with Roadmaps/Questions panels, moved the sidebar below the header (one site title, not two), scoped rail offsets to `.with-sidebar`/`.with-toc`, and added the missing **`/roadmaps/` index** (50 roadmaps, 2,049 nodes, grouped, with live per-roadmap progress read from each page's own storage key). Bonus, outside phase scope: **light mode was unusable** — the vendor stamps `data-theme` on `<body>` and other inner elements and never updates them, so its dark palette kept applying under a light root. Fixed at both the token and attribute layer. Clean build, 209 pages. Reviewed after: fixed 4 real findings — section active-state matched on `href` so "Questions" lit on 1 of 29 topics (now an explicit `match` prefix list per nav item), `/guides` earned a rail it has no sidebar entries for, the menu blurb said "123 nodes" where the index says 148 (123 sub-nodes + 25 categories — unit now stated), and a dead `is-standalone` class. Two findings rejected with measurements: the header is pinned by PageFrame's `height:100vh; overflow:hidden` shell, so it does not scroll away and no gap opens above the rail. | Design phase 2 — tokens: type scale, elevation, colour role reassignment |
| 2026-08-13 | **Phase 6c done — projects.** Researched projects live across the stacks (Spark, Databricks, AWS, Azure, GCP, Snowflake/dbt, streaming, orchestration), built `/projects/` with **18 projects and 27 sources** in 8 domains. Each project carries a repo *and* video *and* article where they exist, plus a "Revise" row linking into the site's own questions. Generalised the link checker to cover both data files and to tell dead apart from bot-blocked: **67/67 live, 0 dead**. | Phase 6b — concept videos on roadmap nodes |
| 2026-08-13 | **Phase 6 planned — video catalog.** Wrote up the design: companion-not-catalog shape (concept videos on existing topic pages, new sections for interview experiences and projects), one shared data file + component + mandatory link-rot checker, tagged to topic slugs. Assessed the 45-record source JSON: it's a starting point, not a catalog — **company-first organisation doesn't work** (only 5 of 45 tagged, title-derivation gives false positives), the **playlists carry more value than the single videos**, and 7 channel links aren't really catalog entries. Four open questions logged. Not started. | Phase 6 — settle open questions, then build |
| 2026-08-13 | **Roadmap quality pass + 4 new roadmaps.** Rewrote the description generator: descriptions now come from the first *complete* answer sentence when it scores well, and from the **question text** otherwise. Unusable descriptions went **37% → 0%** (was 179 truncated, 61 fallback, 17 fragments across 696). Regenerated all 33 generated roadmaps plus a stale Observability (page had grown 12→20 Q in Phase 4), and added 4 missing roadmaps for the Phase 4 pages per D9 — **50 roadmaps, 2,049 nodes**. All 694 link targets verified; **no node id changed**, so no roadmap progress was lost. Recorded as D10, including the finding that `data-warehousing.mdx` has weak *source* answers the roadmap now routes around but the page still shows. | Ask the user |
| 2026-08-09 | **Phases 4 and 5 done — plan complete.** Phase 4: 4 new pages + Observability expanded 12→20, **65 questions**, closing the last empty master-roadmap categories; added to sidebar and progress since these are topic pages. Phase 5: master DE roadmap wired from 37 to **118 of 123** linked sub-nodes, all validated against built HTML, 5 left deliberately unlinked for lack of an honest target. **All five phases now done — nothing queued.** | Ask the user |
| 2026-08-09 | **Phase 3 done — Cloud depth.** 17 subtopic pages, **281 questions** (AWS 130, Azure 76, GCP 75). All **105 DE-tagged services** across the three cloud roadmaps now linked, up from zero; 123 roadmap nodes verified against built HTML. Trimmed 19 estimated pages to 17 by folding one-item categories in. Two MDX gotchas hit: a bare `<object at 0x…>` in prose, and nested `**bold**` inside a bold paragraph. | Phase 4 — Remaining breadth |
| 2026-08-09 | **Phase 2 done — Python depth.** 14 subtopic pages, **280 questions**, taking Python from 67 questions on 2 flat pages to 347 across 16. All **77 of 77** `python.astro` roadmap nodes now linked (was zero). Applied both planned trims: 9 framework nodes → one page, 9 sub-less nodes folded into thematic pages. Per D1, these are subtopic pages — roadmap only, no sidebar or progress. Hit one MDX gotcha: an unbackticked `<object at 0x…>` in prose parses as a JSX tag and fails the build. | Phase 3 — Cloud depth |
| 2026-08-09 | **Roadmap coverage complete — 46 roadmaps.** Generated 33 more from the content pages (categories from section headings, sub-nodes from `topic` attributes, descriptions extracted from answers). Site went 7 → 46 roadmaps, 2,005 nodes, in one day. Sidebar rebuilt as a flat 46-entry list in learning order. Caught and fixed a slug bug — Starlight renders "A & B" as `a--b`, so anchors are now read from the built HTML rather than re-derived. All 500 link targets verified. | Phase 2 — Python depth |
| 2026-08-09 | **Phase 1 follow-up: 6 new roadmaps.** User flagged that leaving Git/Linux/Docker/CI-CD/IaC/Networking as single nodes on the master roadmap was inconsistent with Python/SQL/Spark and gave no single-view picture. Generated all 6 `/roadmaps/*.astro` from the `sql.astro` template — **239 nodes**, 36 categories, unique storage keys, every node anchored to its content-page section. Added to the sidebar; DE roadmap nodes repointed to the roadmaps. All 36 distinct link targets verified to resolve; clean build. | Phase 2 — Python depth |
| 2026-08-09 | **Phase 1 done.** Built all 6 Engineering Foundations pages — Git (39 Q), Linux (40), Docker (33), CI/CD (29), IaC (32), Networking (30) = **203 questions**. Wired into `navigation.json`, `progress.astro`, and 13 `link:` fields on the DE roadmap. `Distributed Systems Basics` pointed at the existing system-design page rather than getting a new one. Clean build; all anchors verified. Found a pre-existing duplicate-id bug (`ssf-01`/`ssf-02`) — logged in Open questions, not fixed. | Phase 2 — Python depth |
| 2026-08-09 | Audited all 7 roadmaps against actual content. Found the breadth gap (8 master-roadmap categories with zero content, 86/123 nodes unlinked) matters more than the depth gap, and reordered around it. Recorded settled decisions in the Decisions section — notably D1, that excluding subtopic pages from sidebar/progress is intentional, not a bug. | Phase 1 — settle placement, then Git & Linux |
