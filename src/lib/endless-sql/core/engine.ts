import { PGlite } from "@electric-sql/pglite";
import type { TableMeta, ExecutionResult, CheckResult } from "./types";

export class SqlEngine {
  private db: PGlite;
  private currentSchema = "";
  private currentSeed = "";

  constructor() {
    this.db = new PGlite();
  }

  async getVersion(): Promise<string> {
    const res = await this.db.query<{ version: string }>("SELECT version()");
    return res.rows[0]?.version ?? "PostgreSQL (PGlite)";
  }

  async reseed(): Promise<void> {
    await this.db.exec(`
      DROP SCHEMA IF EXISTS public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO public;
      GRANT ALL ON SCHEMA public TO postgres;
    `);
    if (this.currentSchema) {
      await this.db.exec(this.currentSchema);
    }
    if (this.currentSeed) {
      await this.db.exec(this.currentSeed);
    }
  }

  async loadDataset(schemaSql: string, seedSql: string): Promise<{ tables: TableMeta[]; version: string }> {
    this.currentSchema = schemaSql;
    this.currentSeed = seedSql;
    await this.reseed();

    const [tables, version] = await Promise.all([
      this.getTableMeta(),
      this.getVersion(),
    ]);

    return { tables, version };
  }

  async getTableMeta(): Promise<TableMeta[]> {
    const res = await this.db.query<{ table_name: string; column_name: string; data_type: string }>(
      `SELECT table_name, column_name, data_type
         FROM information_schema.columns
        WHERE table_schema = 'public'
        ORDER BY table_name, ordinal_position`
    );

    const tables: TableMeta[] = [];
    for (const row of res.rows) {
      let tbl = tables.find((x) => x.name === row.table_name);
      if (!tbl) {
        tbl = { name: row.table_name, columns: [] };
        tables.push(tbl);
      }
      tbl.columns.push({ name: row.column_name, type: row.data_type });
    }
    return tables;
  }

  async exec(sqlText: string): Promise<ExecutionResult> {
    const t0 = performance.now();
    const results = await this.db.exec(sqlText);
    const durationMs = Math.max(1, Math.round(performance.now() - t0));
    const last = results[results.length - 1];

    return {
      fields: (last?.fields ?? []).map((f) => ({ name: f.name })),
      rows: (last?.rows ?? []) as Record<string, unknown>[],
      rowCount: last?.rowCount ?? 0,
      command: last?.command ?? "",
      durationMs,
    };
  }

  async check(userSql: string, solutionSql: string, orderMatters: boolean): Promise<CheckResult> {
    // 1. Run solution on fresh database
    await this.reseed();
    const expectedExec = await this.exec(solutionSql);
    const expected = expectedExec.rows;

    // 2. Run user query on fresh database
    await this.reseed();
    const actualExec = await this.exec(userSql);
    const actual = actualExec.rows;

    // 3. Normalize rows for comparison
    const norm = (rows: Record<string, unknown>[]) =>
      (orderMatters
        ? rows
        : [...rows].map((r) => JSON.stringify(r)).sort().map((s) => JSON.parse(s) as Record<string, unknown>)
      ).map((r) => JSON.stringify(r));

    const pass = norm(expected).join("\n") === norm(actual).join("\n");

    return {
      pass,
      expected,
      actual,
      expectedFields: expectedExec.fields,
    };
  }
}

