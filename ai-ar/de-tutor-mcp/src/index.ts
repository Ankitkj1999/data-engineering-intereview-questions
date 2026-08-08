import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";
import { sm2Update, toQuality } from "./sm2";
import { PROGRESS_VIEW_HTML } from "./ui/progressView";

// Single hardcoded user for this POC — no auth.
const USER_ID = "default";

// MCP Apps (SEP-1865) resource URI for the get_progress UI widget.
const PROGRESS_VIEW_URI = "ui://de-tutor-mcp/progress-view";

const DIFFICULTY_RANK = "CASE q.difficulty WHEN 'easy' THEN 0 WHEN 'medium' THEN 1 WHEN 'hard' THEN 2 ELSE 1 END";

interface QuestionRow {
	id: string;
	concept: string;
	concept_order: number;
	prompt: string;
	reference_answer: string;
	kind: string;
	difficulty: string;
}

const ProgressOutputSchema = z.object({
	summary: z.object({
		concepts_total: z.number(),
		concepts_started: z.number(),
		questions_total: z.number(),
		questions_covered: z.number(),
	}),
	concepts: z.array(
		z.object({
			concept: z.string(),
			questions_total: z.number(),
			questions_covered: z.number(),
			ease: z.number().nullable(),
			interval_days: z.number().nullable(),
			due_ts: z.number().nullable(),
		}),
	),
});

interface ProgressRow {
	user_id: string;
	concept: string;
	ease: number;
	interval_days: number;
	due_ts: number;
}

function createServer(env: Env) {
	const server = new McpServer({
		name: "de-tutor",
		version: "1.0.0",
	});

	server.registerTool(
		"get_next_question",
		{
			description:
				"Pick the next question to ask the user. Depth-first by design: stays in whichever concept " +
				"is already in progress (started but not fully covered) before introducing a new one, so the " +
				"session builds on one topic at a time instead of jumping across the whole curriculum. Within " +
				"a concept, unseen questions come before repeats, easy before medium before hard.",
			inputSchema: z.object({}),
		},
		async () => {
			const now = Date.now();

			// 1. Continue whichever concept is already started but not finished —
			//    the most recently touched one, so a session stays on one topic.
			const inProgress = await env.DB.prepare(
				`SELECT q.concept AS concept,
					COUNT(DISTINCT q.id) AS total,
					COUNT(DISTINCT a.question_id) AS covered,
					MAX(a.ts) AS last_ts
				 FROM questions q
				 LEFT JOIN attempts a ON a.question_id = q.id AND a.user_id = ?
				 GROUP BY q.concept
				 HAVING covered > 0 AND covered < total
				 ORDER BY last_ts DESC
				 LIMIT 1`,
			)
				.bind(USER_ID)
				.first<{ concept: string }>();

			let concept = inProgress?.concept;

			// 2. Otherwise, a concept that's due for spaced-repetition review.
			if (!concept) {
				const due = await env.DB.prepare(
					`SELECT concept FROM progress WHERE user_id = ? AND due_ts <= ? ORDER BY due_ts ASC LIMIT 1`,
				)
					.bind(USER_ID, now)
					.first<{ concept: string }>();
				concept = due?.concept;
			}

			// 3. Otherwise, the next untouched concept in curriculum order.
			if (!concept) {
				const fresh = await env.DB.prepare(
					`SELECT concept FROM questions
					 WHERE concept NOT IN (
						 SELECT DISTINCT q.concept FROM attempts a JOIN questions q ON q.id = a.question_id WHERE a.user_id = ?
					 )
					 GROUP BY concept
					 ORDER BY MIN(concept_order) ASC
					 LIMIT 1`,
				)
					.bind(USER_ID)
					.first<{ concept: string }>();
				concept = fresh?.concept;
			}

			// 4. Fallback: everything's been covered at least once — spaced repetition governs.
			if (!concept) {
				const earliest = await env.DB.prepare(
					`SELECT concept FROM progress WHERE user_id = ? ORDER BY due_ts ASC LIMIT 1`,
				)
					.bind(USER_ID)
					.first<{ concept: string }>();
				concept = earliest?.concept;
			}

			if (!concept) {
				return { content: [{ type: "text" as const, text: "No questions seeded yet." }] };
			}

			// Within the concept: never-attempted first, then easy -> medium -> hard, then least-recently-attempted.
			const question = await env.DB.prepare(
				`SELECT q.* FROM questions q
				 LEFT JOIN (
					 SELECT question_id, MAX(ts) AS last_ts FROM attempts WHERE user_id = ? GROUP BY question_id
				 ) a ON a.question_id = q.id
				 WHERE q.concept = ?
				 ORDER BY
					 (a.last_ts IS NULL) DESC,
					 ${DIFFICULTY_RANK} ASC,
					 a.last_ts ASC
				 LIMIT 1`,
			)
				.bind(USER_ID, concept)
				.first<QuestionRow>();

			if (!question) {
				return { content: [{ type: "text" as const, text: `No questions found for concept "${concept}".` }] };
			}

			return {
				content: [
					{
						type: "text" as const,
						text: JSON.stringify({
							question_id: question.id,
							concept: question.concept,
							kind: question.kind,
							difficulty: question.difficulty,
							prompt: question.prompt,
						}),
					},
				],
			};
		},
	);

	server.registerTool(
		"submit_answer",
		{
			description:
				"Record the user's answer along with your grading of it. Grade the user_answer yourself " +
				"against the question's reference_answer (fetched via get_next_question) before calling this: " +
				"pass correct (did they get the substance right) and confidence (1-5, how solid/complete the " +
				"answer was). This updates spaced-repetition scheduling for the question's concept.",
			inputSchema: z.object({
				question_id: z.string(),
				user_answer: z.string(),
				correct: z.boolean(),
				confidence: z.number().min(1).max(5),
			}),
		},
		async ({ question_id, user_answer, correct, confidence }) => {
			const question = await env.DB.prepare(`SELECT * FROM questions WHERE id = ?`)
				.bind(question_id)
				.first<QuestionRow>();
			if (!question) {
				return { content: [{ type: "text" as const, text: `Unknown question_id "${question_id}".` }] };
			}

			const now = Date.now();
			await env.DB.prepare(
				`INSERT INTO attempts (question_id, user_id, correct, confidence, ts) VALUES (?, ?, ?, ?, ?)`,
			)
				.bind(question_id, USER_ID, correct ? 1 : 0, Math.round(confidence), now)
				.run();

			const prevProgress = await env.DB.prepare(`SELECT * FROM progress WHERE user_id = ? AND concept = ?`)
				.bind(USER_ID, question.concept)
				.first<ProgressRow>();

			const quality = toQuality(correct, confidence);
			const next = sm2Update(
				{ ease: prevProgress?.ease ?? 2.5, interval_days: prevProgress?.interval_days ?? 0 },
				quality,
				now,
			);

			await env.DB.prepare(
				`INSERT INTO progress (user_id, concept, ease, interval_days, due_ts) VALUES (?, ?, ?, ?, ?)
				 ON CONFLICT (user_id, concept) DO UPDATE SET ease = ?, interval_days = ?, due_ts = ?`,
			)
				.bind(
					USER_ID,
					question.concept,
					next.ease,
					next.interval_days,
					next.due_ts,
					next.ease,
					next.interval_days,
					next.due_ts,
				)
				.run();

			return {
				content: [
					{
						type: "text" as const,
						text: JSON.stringify({
							recorded: true,
							concept: question.concept,
							reference_answer: question.reference_answer,
							next_review_in_days: next.interval_days,
						}),
					},
				],
			};
		},
	);

	server.registerResource(
		"progress_view",
		PROGRESS_VIEW_URI,
		{
			description: "Coverage meters + summary stats for get_progress, rendered inline via MCP Apps.",
			mimeType: "text/html;profile=mcp-app",
			_meta: { ui: { prefersBorder: true } },
		},
		async (uri) => ({
			contents: [{ uri: uri.href, mimeType: "text/html;profile=mcp-app", text: PROGRESS_VIEW_HTML }],
		}),
	);

	server.registerTool(
		"get_progress",
		{
			description:
				"Per-concept mastery (ease, current interval, next due date) plus how many of each " +
				"concept's questions have been covered at least once, and an overall totals summary. " +
				"Renders as an inline visual widget on hosts that support MCP Apps.",
			inputSchema: z.object({}),
			outputSchema: ProgressOutputSchema,
			_meta: { ui: { resourceUri: PROGRESS_VIEW_URI } },
		},
		async () => {
			const { results } = await env.DB.prepare(
				`SELECT
					q.concept AS concept,
					COUNT(DISTINCT q.id) AS questions_total,
					COUNT(DISTINCT a.question_id) AS questions_covered,
					p.ease AS ease,
					p.interval_days AS interval_days,
					p.due_ts AS due_ts
				 FROM questions q
				 LEFT JOIN attempts a ON a.question_id = q.id AND a.user_id = ?
				 LEFT JOIN progress p ON p.concept = q.concept AND p.user_id = ?
				 GROUP BY q.concept
				 ORDER BY q.concept ASC`,
			)
				.bind(USER_ID, USER_ID)
				.all<{
					concept: string;
					questions_total: number;
					questions_covered: number;
					ease: number | null;
					interval_days: number | null;
					due_ts: number | null;
				}>();

			const concepts = results ?? [];
			const summary = {
				concepts_total: concepts.length,
				concepts_started: concepts.filter((c) => c.questions_covered > 0).length,
				questions_total: concepts.reduce((sum, c) => sum + c.questions_total, 0),
				questions_covered: concepts.reduce((sum, c) => sum + c.questions_covered, 0),
			};

			const structuredContent = { summary, concepts };
			return {
				content: [{ type: "text" as const, text: JSON.stringify(structuredContent) }],
				structuredContent,
			};
		},
	);

	server.registerTool(
		"list_weak_concepts",
		{
			description: "Concepts ranked by lowest ease / most-failed attempts — where the user needs the most work.",
			inputSchema: z.object({ limit: z.number().min(1).max(50).default(5) }),
		},
		async ({ limit }) => {
			const { results } = await env.DB.prepare(
				`SELECT p.concept, p.ease, p.interval_days,
					COALESCE(SUM(CASE WHEN a.correct = 0 THEN 1 ELSE 0 END), 0) AS fail_count,
					COUNT(a.id) AS attempt_count
				 FROM progress p
				 LEFT JOIN questions q ON q.concept = p.concept
				 LEFT JOIN attempts a ON a.question_id = q.id AND a.user_id = p.user_id
				 WHERE p.user_id = ?
				 GROUP BY p.concept
				 ORDER BY p.ease ASC, fail_count DESC
				 LIMIT ?`,
			)
				.bind(USER_ID, limit)
				.all();

			return { content: [{ type: "text" as const, text: JSON.stringify(results ?? []) }] };
		},
	);

	return server;
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// The MCP factory signature carries no `env`, so build the handler per
		// request, closing over this request's env (has the D1 binding).
		const handler = createMcpHandler(() => createServer(env));
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
