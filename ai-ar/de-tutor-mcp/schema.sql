-- D1 schema for the AI-AR tutor POC (SQL topic only, single hardcoded user)

CREATE TABLE IF NOT EXISTS questions (
	id TEXT PRIMARY KEY,
	concept TEXT NOT NULL,
	prompt TEXT NOT NULL,
	reference_answer TEXT NOT NULL,
	kind TEXT NOT NULL CHECK (kind IN ('voice', 'code'))
);

CREATE TABLE IF NOT EXISTS attempts (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	question_id TEXT NOT NULL REFERENCES questions(id),
	user_id TEXT NOT NULL,
	correct INTEGER NOT NULL CHECK (correct IN (0, 1)),
	confidence INTEGER NOT NULL CHECK (confidence BETWEEN 1 AND 5),
	ts INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS progress (
	user_id TEXT NOT NULL,
	concept TEXT NOT NULL,
	ease REAL NOT NULL DEFAULT 2.5,
	interval_days INTEGER NOT NULL DEFAULT 0,
	due_ts INTEGER NOT NULL,
	PRIMARY KEY (user_id, concept)
);

CREATE INDEX IF NOT EXISTS idx_attempts_question ON attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_questions_concept ON questions(concept);
