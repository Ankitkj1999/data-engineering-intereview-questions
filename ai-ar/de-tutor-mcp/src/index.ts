import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";
import { sm2Update, toQuality } from "./sm2";

// Single hardcoded user for this POC — no auth.
const USER_ID = "default";

interface QuestionRow {
	id: string;
	concept: string;
	prompt: string;
	reference_answer: string;
	kind: string;
}

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
				"Pick the next question to ask the user: the due concept with the earliest due_ts, " +
				"or a concept the user hasn't seen yet if nothing is due.",
			inputSchema: z.object({}),
		},
		async () => {
			const now = Date.now();

			const due = await env.DB.prepare(
				`SELECT * FROM progress WHERE user_id = ? AND due_ts <= ? ORDER BY due_ts ASC LIMIT 1`,
			)
				.bind(USER_ID, now)
				.first<ProgressRow>();

			let concept: string;
			if (due) {
				concept = due.concept;
			} else {
				const fresh = await env.DB.prepare(
					`SELECT DISTINCT concept FROM questions
					 WHERE concept NOT IN (SELECT concept FROM progress WHERE user_id = ?)
					 LIMIT 1`,
				)
					.bind(USER_ID)
					.first<{ concept: string }>();

				if (fresh) {
					concept = fresh.concept;
				} else {
					const earliest = await env.DB.prepare(
						`SELECT * FROM progress WHERE user_id = ? ORDER BY due_ts ASC LIMIT 1`,
					)
						.bind(USER_ID)
						.first<ProgressRow>();
					if (!earliest) {
						return { content: [{ type: "text" as const, text: "No questions seeded yet." }] };
					}
					concept = earliest.concept;
				}
			}

			// Least-recently-attempted question in this concept (or never attempted).
			const question = await env.DB.prepare(
				`SELECT q.* FROM questions q
				 LEFT JOIN (
					 SELECT question_id, MAX(ts) AS last_ts FROM attempts WHERE user_id = ? GROUP BY question_id
				 ) a ON a.question_id = q.id
				 WHERE q.concept = ?
				 ORDER BY a.last_ts ASC NULLS FIRST
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

	server.registerTool(
		"get_progress",
		{
			description:
				"Per-concept mastery (ease, current interval, next due date) plus how many of each " +
				"concept's questions have been covered at least once, and an overall totals summary.",
			inputSchema: z.object({}),
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

			return { content: [{ type: "text" as const, text: JSON.stringify({ summary, concepts }) }] };
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
