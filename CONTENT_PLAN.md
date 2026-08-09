# Content Plan

**Single source of truth for content work on this site.** Read this first in any new session
(human or AI). When you finish something, update the **Status** table and add a line to the
**Session Log** at the bottom. That's the whole system.

Read the **[Decisions](#decisions)** section before proposing changes — it records *why* things
are the way they are, so settled questions don't get re-opened as if they were bugs.

---

## You are here

> **Current phase: Phase 3 (Cloud depth) — not started.** Phases 1, 1b and 2 ✅ done 2026-08-09.
> Last updated: 2026-08-09

Site total: **3,549 questions** across 47 topic pages + 57 subtopic pages, and 46 roadmaps.

---

## The two gaps

The master [Data Engineering roadmap](src/pages/roadmaps/data-engineering.astro) is the site's
front door: 25 categories, 123 nodes. Measured against it, content is missing in two different
ways — and they're not equally urgent.

**Breadth — 8 categories have no content page at all.** Every node in them is a dead end.

| Category | Nodes | Interview weight |
|---|:-:|---|
| CS & DevOps Foundations — Git, Linux, Networking, Distributed Systems | 4 | High |
| CI/CD — GitHub Actions, GitLab CI, ArgoCD | 3 | Medium–high |
| Infrastructure as Code — Terraform, OpenTofu, CDK | 4 | Medium–high |
| Monitoring — Prometheus, Datadog, Sentry, New Relic | 4 | Medium |
| Data Lifecycle — generation, storage, ingestion, serving | 4 | Medium |
| Types of Data Ingestion — batch, streaming, realtime, hybrid | 4 | Medium |
| Reverse ETL | 4 | Low |
| Machine Learning & MLOps | 2 | Low |

Docker sits under Containers & Orchestration and is also unlinked — same problem, different
category. **86 of 123 master-roadmap nodes have no `link:` at all.**

**Depth — 4 topics have a rich roadmap pointing at one thin page.** Usable today, just shallow.
Only SQL and Spark use the proven roadmap-node → subtopic-page pattern:

| Roadmap | Nodes | Subtopic pages | Questions | Deep? |
|---|---:|---:|---:|:--:|
| SQL | 93 | 21 | 260 | ✅ |
| Apache Spark | 236 | 22 | 448 | ✅ |
| Python | 77 | 0 | 67 | ❌ |
| AWS | 226 (65 DE) | 0 | 60 | ❌ |
| Azure | 110 (22 DE) | 0 | 45 | ❌ |
| GCP | 53 (18 DE) | 0 | 48 | ❌ |

**Breadth goes first.** A missing topic is a dead end; a thin topic still works. Closing a breadth
gap also costs less per unit of value — one new page closes several roadmap nodes at once.

---

## Status

Do these **in order**. One phase at a time — don't start the next until the current is built,
passing `npx astro build`, and logged below.

| # | Phase | Scope | Est. pages | Status |
|:-:|---|---|:-:|---|
| 1 | **Engineering Foundations** | Git/GitHub, Linux, Docker, CI/CD, IaC, Networking | 6 | ✅ Done (2026-08-09) — 203 questions |
| 1b | **Roadmap coverage** | A roadmap for every topic page with 12+ questions | 39 roadmaps | ✅ Done (2026-08-09) — 46 total, 2,005 nodes |
| 2 | **Python depth** | 19 roadmap categories → subtopic pages, mirroring SQL | 14 | ✅ Done (2026-08-09) — 280 questions |
| 3 | **Cloud depth** | AWS (8) → Azure (6) → GCP (5), DE-scoped services only | ~19 | ⬜ Not started |
| 4 | **Remaining breadth** | Monitoring, Data Lifecycle, Ingestion Types, Reverse ETL, MLOps | ~5 | ⬜ Not started |
| 5 | **Wire the master roadmap** | Add `link:` to the 86 unlinked DE roadmap nodes | 0 new | ⬜ Not started |

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

**Known quality caveat:** because descriptions are extracted rather than authored, a minority read
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

### Phase 3 — Cloud depth

DE-tagged services only (the `de: true` subset shown by default on each roadmap) — see
[D2](#d2-cloud-roadmaps-default-to-a-data-engineering-filtered-view). One page per category.
Existing `cloud/{aws,azure,gcp}.mdx` become overview pages; their questions stay put, since
moving them would break saved progress.

**3a — AWS** (`src/pages/roadmaps/aws.astro`, 65 DE services)

| Category | DE services |
|---|---|
| Compute | EKS, EC2, ECS, Batch, Fargate, Lambda (6) |
| Storage | EBS, EFS, FSx, S3, S3 Glacier, Snowball Edge, Snowmobile, Storage Gateway, Transfer Family (9) |
| Database | Aurora, DocumentDB, DynamoDB, ElastiCache, MemoryDB, Neptune, QLDB, RDS, Redshift, Redshift Serverless (10) |
| Analytics | Athena, Elasticsearch, EMR, Kinesis, MSK, Redshift, Data Exchange, Data Pipeline, Glue, Glue DataBrew, Glue Data Quality, Lake Formation (12) |
| Migration | DMS, DataSync, Data Transfer Terminal, Snowball Edge, Snowmobile (5) |
| Application | AppFlow, EventBridge, SNS, SQS, SWF, Step Functions, MWAA (7) |
| Comparisons | 15 "X vs Y" entries — these make excellent interview questions |
| Other | Amazon MQ (1) |

**3b — Azure** (22 DE services): Compute (4) · Storage (7) · Database (4) · Solutions (2) ·
Comparisons (4) · Other (1: Service Bus).

**3c — GCP** (18 DE services): Compute (4: Cloud Run, Functions, GCE, GKE) · Storage (4:
Filestore, GCS, Local SSD, Persistent Disks) · Database (4: BigQuery, Bigtable, Cloud SQL,
Spanner) · Data & Analytics (4: Dataflow, Dataprep, Dataproc, Pub/Sub) · Comparisons (2).

### Phase 4 — Remaining breadth

The lower-weight empty categories. Re-check interview relevance before writing — some may deserve
cutting rather than filling, per [D5](#d5-cut-low-value-scope-rather-than-filling-it).

Monitoring (4) · Data Lifecycle (4) · Types of Data Ingestion (4) · Reverse ETL (4) · ML & MLOps (2).

### Phase 5 — Wire the master roadmap

86 of 123 nodes in `data-engineering.astro` have no `link:`. After Phases 1–4, most targets exist.
Pure wiring — no new content.

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

---

## Open questions

Unresolved calls. Settle before the phase that needs them; move the answer into **Decisions**.

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
| 2026-08-09 | **Phase 2 done — Python depth.** 14 subtopic pages, **280 questions**, taking Python from 67 questions on 2 flat pages to 347 across 16. All **77 of 77** `python.astro` roadmap nodes now linked (was zero). Applied both planned trims: 9 framework nodes → one page, 9 sub-less nodes folded into thematic pages. Per D1, these are subtopic pages — roadmap only, no sidebar or progress. Hit one MDX gotcha: an unbackticked `<object at 0x…>` in prose parses as a JSX tag and fails the build. | Phase 3 — Cloud depth |
| 2026-08-09 | **Roadmap coverage complete — 46 roadmaps.** Generated 33 more from the content pages (categories from section headings, sub-nodes from `topic` attributes, descriptions extracted from answers). Site went 7 → 46 roadmaps, 2,005 nodes, in one day. Sidebar rebuilt as a flat 46-entry list in learning order. Caught and fixed a slug bug — Starlight renders "A & B" as `a--b`, so anchors are now read from the built HTML rather than re-derived. All 500 link targets verified. | Phase 2 — Python depth |
| 2026-08-09 | **Phase 1 follow-up: 6 new roadmaps.** User flagged that leaving Git/Linux/Docker/CI-CD/IaC/Networking as single nodes on the master roadmap was inconsistent with Python/SQL/Spark and gave no single-view picture. Generated all 6 `/roadmaps/*.astro` from the `sql.astro` template — **239 nodes**, 36 categories, unique storage keys, every node anchored to its content-page section. Added to the sidebar; DE roadmap nodes repointed to the roadmaps. All 36 distinct link targets verified to resolve; clean build. | Phase 2 — Python depth |
| 2026-08-09 | **Phase 1 done.** Built all 6 Engineering Foundations pages — Git (39 Q), Linux (40), Docker (33), CI/CD (29), IaC (32), Networking (30) = **203 questions**. Wired into `navigation.json`, `progress.astro`, and 13 `link:` fields on the DE roadmap. `Distributed Systems Basics` pointed at the existing system-design page rather than getting a new one. Clean build; all anchors verified. Found a pre-existing duplicate-id bug (`ssf-01`/`ssf-02`) — logged in Open questions, not fixed. | Phase 2 — Python depth |
| 2026-08-09 | Audited all 7 roadmaps against actual content. Found the breadth gap (8 master-roadmap categories with zero content, 86/123 nodes unlinked) matters more than the depth gap, and reordered around it. Recorded settled decisions in the Decisions section — notably D1, that excluding subtopic pages from sidebar/progress is intentional, not a bug. | Phase 1 — settle placement, then Git & Linux |
