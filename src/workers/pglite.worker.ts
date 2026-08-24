/* ── PGlite worker ────────────────────────────────────────────────────────────
   Owns the PGlite (Postgres-in-WASM) instance so queries never run on the
   main thread. Hand-rolled request/response protocol over postMessage: each
   request carries an id, each response echoes it. The DB itself never
   crosses the boundary — only SQL in, JSON-able results out.
──────────────────────────────────────────────────────────────────────────── */

import { PGlite } from "@electric-sql/pglite";

type LoadReq = {
  id: number;
  type: "load";
  schemaSql: string;
  seedSql: string;
};
type ExecReq = { id: number; type: "exec"; sql: string };
type ResetReq = { id: number; type: "reset" };
type CheckReq = {
  id: number;
  type: "check";
  userSql: string;
  solutionSql: string;
  orderMatters: boolean;
};
type Req = LoadReq | ExecReq | ResetReq | CheckReq;

export type ColumnMeta = { name: string; type: string };
export type TableMeta = { name: string; columns: ColumnMeta[] };

type OkRes =
  | { id: number; ok: true; kind: "load"; tables: TableMeta[]; version: string }
  | {
      id: number;
      ok: true;
      kind: "exec";
      fields: { name: string }[];
      rows: Record<string, unknown>[];
      rowCount: number;
      command: string;
    }
  | { id: number; ok: true; kind: "reset" }
  | {
      id: number;
      ok: true;
      kind: "check";
      pass: boolean;
      expected: Record<string, unknown>[];
      actual: Record<string, unknown>[];
    };
type ErrRes = { id: number; ok: false; error: string };
type Res = OkRes | ErrRes;

let db: PGlite | null = null;
let currentSchema = "";
let currentSeed = "";

/** Recreate a clean public schema and replay the exercise's schema + seed.
    Cheaper than a fresh PGlite instance, and clears any tables the user
    created while experimenting. */
async function reseed(): Promise<PGlite> {
  if (!db) db = new PGlite();
  await db.exec(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO public;
    GRANT ALL ON SCHEMA public TO postgres;
  `);
  await db.exec(currentSchema);
  await db.exec(currentSeed);
  return db;
}

async function tableMeta(pg: PGlite): Promise<TableMeta[]> {
  const res = await pg.query<{
    table_name: string;
    column_name: string;
    data_type: string;
  }>(
    `SELECT table_name, column_name, data_type
       FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position`,
  );
  const tables: TableMeta[] = [];
  for (const row of res.rows) {
    let t = tables.find((x) => x.name === row.table_name);
    if (!t) {
      t = { name: row.table_name, columns: [] };
      tables.push(t);
    }
    t.columns.push({ name: row.column_name, type: row.data_type });
  }
  return tables;
}

/** Run possibly-multi-statement SQL and return the last statement's result —
    matches what psql shows you when you paste a script. */
async function runLast(
  pg: PGlite,
  sql: string,
): Promise<{
  fields: { name: string }[];
  rows: Record<string, unknown>[];
  rowCount: number;
  command: string;
}> {
  const results = await pg.exec(sql);
  const last = results[results.length - 1];
  return {
    fields: (last?.fields ?? []).map((f) => ({ name: f.name })),
    rows: last?.rows ?? [],
    rowCount: last?.rowCount ?? 0,
    command: last?.command ?? "",
  };
}

/** Deterministic answer check: run the solution on a fresh instance and
    snapshot it, reseed, run the user's query, compare the row sets. Doing
    the solution first means a mutating user query (UPDATE, DELETE) can't
    corrupt the expected side. */
async function check(
  userSql: string,
  solutionSql: string,
  orderMatters: boolean,
) {
  let pg = await reseed();
  const expected = (await pg.query(solutionSql)).rows;

  pg = await reseed();
  const run = await runLast(pg, userSql);

  const norm = (rows: Record<string, unknown>[]) =>
    (orderMatters
      ? rows
      : [...rows].map((r) => JSON.stringify(r)).sort().map((s) => JSON.parse(s))
    ).map((r) => JSON.stringify(r));
  return { pass: norm(expected).join("\n") === norm(run.rows).join("\n"), expected, actual: run.rows };
}

self.onmessage = async (e: MessageEvent<Req>) => {
  const { id, type } = e.data;
  try {
    let res: OkRes;
    switch (type) {
      case "load": {
        currentSchema = e.data.schemaSql;
        currentSeed = e.data.seedSql;
        const pg = await reseed();
        const [tables, version] = await Promise.all([
          tableMeta(pg),
          pg.query<{ version: string }>("SELECT version()"),
        ]);
        res = {
          id,
          ok: true,
          kind: "load",
          tables,
          version: version.rows[0]?.version ?? "PostgreSQL (PGlite)",
        };
        break;
      }
      case "reset": {
        await reseed();
        res = { id, ok: true, kind: "reset" };
        break;
      }
      case "exec": {
        if (!db) throw new Error("No exercise loaded yet.");
        const run = await runLast(db, e.data.sql);
        res = {
          id,
          ok: true,
          kind: "exec",
          fields: run.fields,
          rows: run.rows,
          rowCount: run.rowCount,
          command: run.command,
        };
        break;
      }
      case "check": {
        const result = await check(
          e.data.userSql,
          e.data.solutionSql,
          e.data.orderMatters,
        );
        res = {
          id,
          ok: true,
          kind: "check",
          pass: result.pass,
          expected: result.expected,
          actual: result.actual,
        };
        break;
      }
    }
    (self as unknown as Worker).postMessage(res satisfies Res);
  } catch (err) {
    const error =
      err instanceof Error ? err.message : "Unknown engine error";
    (self as unknown as Worker).postMessage({ id, ok: false, error } satisfies ErrRes);
  }
};
