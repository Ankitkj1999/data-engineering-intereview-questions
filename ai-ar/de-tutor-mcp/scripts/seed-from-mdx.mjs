#!/usr/bin/env node
// Parses SQL theory Q&A out of the main site's MDX into seed.sql for `wrangler d1 execute`.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(
	__dirname,
	"..",
	"..",
	"..",
	"src/content/docs/level-1-foundations/sql/theory.mdx",
);
const OUT = path.join(__dirname, "..", "seed.sql");

const mdx = readFileSync(SOURCE, "utf8");

const sqlEscape = (s) => s.replace(/'/g, "''");

const listRe = /<QuestionList topic="([^"]+)"[^>]*>([\s\S]*?)<\/QuestionList>/g;
const cardRe = /<QuestionCard id="([^"]+)"[^>]*question="([^"]+)"[^>]*>([\s\S]*?)<\/QuestionCard>/g;

const rows = [];
let listMatch;
while ((listMatch = listRe.exec(mdx))) {
	const concept = listMatch[1];
	const body = listMatch[2];
	let cardMatch;
	cardRe.lastIndex = 0;
	while ((cardMatch = cardRe.exec(body))) {
		const [, id, question, answer] = cardMatch;
		rows.push({
			id,
			concept,
			prompt: question,
			reference_answer: answer.trim(),
			kind: "voice",
		});
	}
}

if (rows.length === 0) {
	throw new Error(`No questions parsed from ${SOURCE} — check the MDX structure hasn't changed.`);
}

const statements = rows.map(
	(r) =>
		`INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('${sqlEscape(r.id)}', '${sqlEscape(r.concept)}', '${sqlEscape(r.prompt)}', '${sqlEscape(r.reference_answer)}', '${r.kind}');`,
);

writeFileSync(OUT, statements.join("\n") + "\n");
console.log(`Wrote ${rows.length} questions across ${new Set(rows.map((r) => r.concept)).size} concepts to ${OUT}`);
