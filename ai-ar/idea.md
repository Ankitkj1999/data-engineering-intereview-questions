# Project Context — AI-Powered Active-Recall Tutor (POC)

## What we're building
A learning tool that **tests** data engineers on what they know, instead of feeding them
material to passively read. The core bet: retrieval practice + spaced repetition drives
retention far better than re-reading. For this POC, the "intelligence" — asking questions,
grading answers, explaining — is **Claude itself, connected over MCP**. Our code owns only
the question bank, the user's progress, and the scheduling.

## Why this shape
- We already have a deployed **Astro + Starlight** site of data-engineering interview
  questions on **Cloudflare Workers** (~2,000 questions; progress currently in
  `localStorage`, no backend).
- Rather than build a voice frontend now, we validate the **learning loop** by letting
  Claude drive it through MCP tools. Fast to prove, nothing to design.
- Division of labor: **Claude** = ask, grade, explain. **Our Worker** = store state,
  schedule what's next.

## MVP scope (deliberately narrow)
- **One topic: SQL.** Self-contained, minimal prerequisites, testable both by explanation
  (spoken/typed) and by writing actual queries.
- **Single hardcoded user**, no auth.
- **~30–50 SQL questions** to start — enough to feel the loop.

## Architecture
- A **separate Cloudflare Worker** hosts the MCP server. Do **not** modify the live Astro
  site. Start from the template `cloudflare/ai/demos/remote-mcp-authless`.
- **Cloudflare D1** (free tier) holds all state.
- Claude connects to the Worker URL as a **remote MCP server** and runs the session.

### D1 tables
| table | columns |
| --- | --- |
| `questions` | `id, concept, prompt, reference_answer, kind`  (kind = `voice` \| `code`) |
| `attempts` | `id, question_id, user_id, correct, confidence, ts` |
| `progress` | `user_id, concept, ease, interval_days, due_ts`  ← SM-2 state |

### MCP tools (the contract)
- `get_next_question` → the earliest `due_ts`, or a fresh concept if none due
- `submit_answer(question_id, user_answer)` → Claude grades against `reference_answer`,
  store `correct` + `confidence`, then apply **SM-2** to update `progress`
- `get_progress` → per-concept mastery
- `list_weak_concepts` → lowest ease / most-failed concepts

The only non-trivial logic is the SM-2 update inside `submit_answer`; everything else is
plumbing.

## Data source / seeding
Extract SQL Q&A from the existing site's SQL `.mdx` files (under
`src/content/docs/level-1-foundations/`) into a `seed.json`, then load with
`wrangler d1 execute`.

## Definition of done (for the POC)
In Claude, saying **"test me on SQL"** yields a working loop:
question → spoken/typed answer → graded → progress updated → next question scheduled
sensibly. Nothing more.

## Explicitly out of scope (later, not now)
- Standalone voice-first app / real frontend
- Topics beyond SQL
- AI-assisted knowledge graph for prerequisite ordering
- Multi-user / auth
- Open-source polish, local-LLM (Ollama) support