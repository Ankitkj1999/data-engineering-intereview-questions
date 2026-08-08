-- Adds difficulty + concept_order to an existing questions table (no CHECK
-- constraint here — ALTER TABLE ADD COLUMN CHECK support varies; fresh installs
-- get the CHECK straight from schema.sql). seed.sql backfills real values after.
ALTER TABLE questions ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'medium';
ALTER TABLE questions ADD COLUMN concept_order INTEGER NOT NULL DEFAULT 0;
