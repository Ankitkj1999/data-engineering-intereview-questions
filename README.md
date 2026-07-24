# Data Engineering Interview Questions

A structured, self-trackable checklist for getting interview-ready as a data engineer — not a raw dump of Q&A, but a site organized so you can see what "fully prepared" actually covers, and track your own progress through it.

## What this is

The core idea: interview prep for data engineering is scattered across blog posts, PDFs, and half-finished GitHub gists. This site puts it in one place, organized by topic, with every question rendered as a trackable card rather than plain markdown — so "have I actually covered this?" has a real answer instead of a vague feeling.

**Current scope:** 41 topics, **2,089 interview questions**, all tracked per-question via a "mark as done" / "save for later" system that persists in the browser (`localStorage`, no login required).

## How content is organized

Topics live under four tiers in `src/content/docs/`:

| Tier | Files | What it covers |
| --- | --- | --- |
| `level-1-foundations/` | 10 | Python, SQL, Data Structures — core skills, not tools |
| `level-2-core-concepts/` | 7 | Data modeling, ETL, data warehousing, etc. — concepts independent of any one vendor |
| `level-3-technologies/` | 44 | Spark, Hadoop, Kafka, cloud data warehouses, and other named tools/platforms |
| `level-4-advanced/` | 4 | System design, cost optimization, and other senior-level topics |

Every topic page follows one of two locked patterns (see [`CONTENT_GUIDELINES.md`](CONTENT_GUIDELINES.md) for the full spec):

- **Pattern A** (Python only) — split across `theory.mdx` (concept Q&A) and `practice.mdx` (coding problems), because those are genuinely different question formats, not just different depth.
- **Pattern B** (everything else, including SQL) — one page: Quick Summary → Key Concepts → Interview Questions → Common Scenarios → Further Reading.

Both patterns render their Q&A through `QuestionCard`/`QuestionList` (`src/components/mdx/`), never plain markdown — that's what makes progress tracking possible at all.

## Progress tracking

Three layers, all built on the same `localStorage` primitive (no backend):

- **Per-page** — each `QuestionCard` remembers done/saved state; `QuestionList` rolls that up into a live stats bar at the top of the page.
- **Per-topic** — `progress.mdx` pages (e.g. `/python/progress/`) aggregate a topic's full question set by section.
- **Site-wide** — [`/progress/`](src/content/docs/progress.mdx) rolls up every topic into one dashboard, each row linking back to its topic's own progress page.

All three reuse the same `ProgressOverview.astro` component — it just takes an arbitrary list of question IDs per section, which is what makes the whole system easy to extend.

## Roadmaps

Separate from the topic pages: `src/pages/roadmaps/*.astro` are visual, clickable curriculum maps (phase → section → topic) with their own independent progress tracking, sourced from JSON in `data/data-engineering-interview-questions-master/roadmap/`. Currently live: Data Engineering, Python, SQL, Apache Spark, AWS Services. See [`ROADMAP_GUIDELINES.md`](ROADMAP_GUIDELINES.md) before adding a new one.

## Tech stack

- **[Astro](https://astro.build)** + **[Starlight](https://starlight.astro.build)** — static site framework and docs theme, both fully overridden (`src/overrides/`, `src/styles/`) for a custom look; see [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).
- **Cloudflare Workers** — deployment target (`@astrojs/cloudflare` adapter, `wrangler.json`).
- **MDX** content collections (`src/content.config.ts`) with a `docChat` panel (`@pelagornis/page`, Gemini-backed) available on every page.

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to ./dist
npm run preview   # preview the production build locally
npm run deploy    # build + wrangler deploy to Cloudflare
```

`npm run dev` and `npm run build` both run `scripts/crawl-docs.mjs` first — it feeds the `docChat` integration, so don't skip straight to `astro dev`/`astro build` or that panel won't have anything to search.

## Key docs

- [`CONTENT_GUIDELINES.md`](CONTENT_GUIDELINES.md) — content patterns, frontmatter, SEO rules for topic pages
- [`ROADMAP_GUIDELINES.md`](ROADMAP_GUIDELINES.md) — how to add/maintain a roadmap page
- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — tokens, components, and visual rules for the site chrome

## Status

All 41 topics are converted to the locked content pattern, both with a working global progress dashboard. The one known gap: the **AWS cheat sheet** (`data/.../cheat-sheet/aws-cheatsheet.json` catalogues 300 topics) currently has real written content for only 26 of them — building that section out is intentionally on hold until more of the 300 are actually written, rather than shipping a mostly-empty section.

**Noindexed for now** (`astro.config.mjs` sets `robots: noindex, nofollow`) — remove that once the site is ready for public search visibility.
