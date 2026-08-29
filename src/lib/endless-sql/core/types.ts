export type Difficulty = "easy" | "medium" | "hard" | (string & {});
export interface Exercise {
  id: string;
  topic: string;
  difficulty: Difficulty;
  title: string;
  question: string;
  dataset: string;
  orderMatters: boolean;
  hint: string;
  solution: string;
}

export interface Dataset {
  name: string;
  schemaSql: string;
  seedSql: string;
}

export interface ExerciseData {
  title: string;
  subtitle: string;
  datasets: Record<string, Dataset>;
  exercises: Exercise[];
}

export interface ColumnMeta {
  name: string;
  type: string;
}

export interface TableMeta {
  name: string;
  columns: ColumnMeta[];
}

export interface ExecutionResult {
  fields: { name: string }[];
  rows: Record<string, unknown>[];
  rowCount: number;
  command: string;
  durationMs: number;
}

export interface CheckResult {
  pass: boolean;
  expected: Record<string, unknown>[];
  actual: Record<string, unknown>[];
  expectedFields: { name: string }[];
}

export type EngineState = "loading" | "ready" | "error";

