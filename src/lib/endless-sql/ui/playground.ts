import { SqlEngine } from "../core/engine";
import { LocalStorageProgressStore, type ProgressStore } from "../core/progress";
import type { ExerciseData, Exercise, TableMeta, EngineState } from "../core/types";
import { createSqlEditor, type SqlEditor } from "../editor/codemirror";
import { renderResultsTable } from "./render-table";

const DIFF_TONE = { easy: "success", medium: "neutral", hard: "danger" } as const;

export interface SqlPlaygroundElements {
  root: HTMLElement;
  title: HTMLElement;
  topicPill: HTMLElement;
  diffPill: HTMLElement;
  question: HTMLElement;
  schema: HTMLElement;
  editorContainer: HTMLElement;
  hintBtn: HTMLElement;
  solutionBtn: HTMLElement;
  nextBtn: HTMLElement;
  runBtn: HTMLElement;
  checkBtn: HTMLElement;
  resetBtn: HTMLElement;
  hint: HTMLElement;
  solution: HTMLElement;
  resultsMeta: HTMLElement;
  verdict: HTMLElement;
  error: HTMLElement;
  tableWrap: HTMLElement;
  expectedDetails: HTMLDetailsElement;
  expectedWrap: HTMLElement;
  list: HTMLElement;
  engineBadge: HTMLElement;
  engineLabel: HTMLElement;
  progressFill: HTMLElement;
  progressPct: HTMLElement;
}

export class SqlPlaygroundApp {
  private data: ExerciseData;
  private engine: SqlEngine;
  private store: ProgressStore;
  private editor: SqlEditor;
  private elements: SqlPlaygroundElements;
  private currentIdx = 0;

  constructor(elements: SqlPlaygroundElements, data: ExerciseData, store?: ProgressStore) {
    this.elements = elements;
    this.data = data;
    this.engine = new SqlEngine();
    this.store = store ?? new LocalStorageProgressStore();

    this.editor = createSqlEditor({
      parent: this.elements.editorContainer,
      onRun: () => void this.runQuery(),
      onChange: (code) => {
        const ex = this.currentExercise;
        if (ex) {
          this.store.saveDraft(ex.id, code);
        }
      },
    });

    this.bindEvents();
  }

  get currentExercise(): Exercise {
    return this.data.exercises[this.currentIdx];
  }

  async init(): Promise<void> {
    this.refreshProgress();
    this.buildList();
    await this.selectExercise(0);
  }

  private bindEvents(): void {
    this.elements.runBtn.addEventListener("click", () => void this.runQuery());
    this.elements.checkBtn.addEventListener("click", () => void this.checkAnswer());
    this.elements.resetBtn.addEventListener("click", () => void this.resetData());

    this.elements.hintBtn.addEventListener("click", () => {
      this.elements.hint.hidden = !this.elements.hint.hidden;
    });

    this.elements.solutionBtn.addEventListener("click", () => {
      this.elements.solution.hidden = !this.elements.solution.hidden;
    });

    this.elements.nextBtn.addEventListener("click", () => {
      if (this.currentIdx < this.data.exercises.length - 1) {
        void this.selectExercise(this.currentIdx + 1);
      }
    });
  }

  async selectExercise(idx: number): Promise<void> {
    // Save previous draft
    const prev = this.data.exercises[this.currentIdx];
    if (prev) {
      this.store.saveDraft(prev.id, this.editor.getValue());
    }

    this.currentIdx = idx;
    const ex = this.data.exercises[idx];
    const ds = this.data.datasets[ex.dataset];

    // Populate question UI
    this.elements.title.textContent = ex.title;
    this.elements.topicPill.textContent = ex.topic;
    this.elements.diffPill.textContent = ex.difficulty;
    this.elements.diffPill.className = `ds-pill ds-pill--${DIFF_TONE[ex.difficulty]}`;
    this.elements.question.innerHTML = this.renderMarkdownBold(ex.question);
    this.elements.hint.textContent = ex.hint;
    this.elements.hint.hidden = true;
    this.elements.solution.textContent = ex.solution;
    this.elements.solution.hidden = true;
    this.elements.nextBtn.style.display = "none";
    this.hideVerdict();
    this.hideError();

    // Restore draft or empty
    const savedDraft = this.store.getDraft(ex.id);
    this.editor.setValue(savedDraft ?? "");

    // Load dataset into PGlite
    this.setEngineState("loading", "Loading engine…");
    try {
      const res = await this.engine.loadDataset(ds.schemaSql, ds.seedSql);

      // Render schema cards
      this.renderSchema(res.tables);
      this.editor.updateSchema(res.tables);

      this.elements.resultsMeta.textContent = "fresh instance seeded";
      this.elements.tableWrap.innerHTML = `<div class="sqlp-empty">Run a query to see results here.</div>`;
      this.setEngineState("ready", `${res.version.split(" ").slice(0, 2).join(" ")} · PGlite WASM`);
      this.buildList();
    } catch (err) {
      this.setEngineState("error", err instanceof Error ? err.message : "Engine error");
    }
  }

  private renderSchema(tables: TableMeta[]): void {
    this.elements.schema.innerHTML = "";
    tables.forEach((tbl) => {
      const box = document.createElement("div");
      box.className = "sqlp-schema-table";
      const colsHtml = tbl.columns
        .map(
          (c) =>
            `<span class="sqlp-col-item"><code class="sqlp-col-name">${c.name}</code><span class="sqlp-col-type">${c.type}</span></span>`
        )
        .join("");
      box.innerHTML = `
        <div class="sqlp-schema-table-head">
          <span class="sqlp-schema-table-name">${tbl.name}</span>
          <span class="sqlp-schema-table-meta">${tbl.columns.length} cols</span>
        </div>
        <div class="sqlp-schema-cols">${colsHtml}</div>
      `;
      this.elements.schema.appendChild(box);
    });
  }

  buildList(): void {
    this.elements.list.querySelectorAll(".sqlp-ex").forEach((n) => n.remove());
    this.data.exercises.forEach((ex, i) => {
      const isDone = this.store.isCompleted(ex.id);
      const isActive = i === this.currentIdx;

      const btn = document.createElement("button");
      btn.className = `sqlp-ex${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`;
      btn.innerHTML = `<span class="sqlp-ex-num">${isDone ? "✓" : i + 1}</span>
        <span class="sqlp-ex-label"><span class="sqlp-ex-name">${ex.title}</span><span class="sqlp-ex-topic">${ex.topic}</span></span>`;
      btn.addEventListener("click", () => void this.selectExercise(i));
      this.elements.list.appendChild(btn);
    });
  }

  refreshProgress(): void {
    const total = this.data.exercises.length;
    const completed = this.store.getCompletedCount(this.data.exercises.map((e) => e.id));
    const pct = total ? (completed / total) * 100 : 0;

    this.elements.progressFill.style.width = `${pct}%`;
    this.elements.progressPct.textContent = `${completed}/${total}`;
  }

  async runQuery(): Promise<void> {
    const sqlText = this.editor.getValue().trim();
    if (!sqlText) return;

    this.hideVerdict();
    this.hideError();
    this.elements.resultsMeta.textContent = "running…";

    try {
      const res = await this.engine.exec(sqlText);
      renderResultsTable(this.elements.tableWrap, res.fields, res.rows);
      const count = res.rows.length || res.rowCount || 0;
      this.elements.resultsMeta.textContent = `${res.command || "OK"} · ${count} row${count === 1 ? "" : "s"} · ${res.durationMs} ms`;
    } catch (err) {
      this.elements.error.textContent = err instanceof Error ? err.message : String(err);
      this.elements.error.hidden = false;
      this.elements.resultsMeta.textContent = "error";
    }
  }

  async checkAnswer(): Promise<void> {
    const ex = this.currentExercise;
    const sqlText = this.editor.getValue().trim();
    if (!sqlText) return;

    this.hideVerdict();
    this.hideError();
    this.elements.resultsMeta.textContent = "checking…";

    try {
      const res = await this.engine.check(sqlText, ex.solution, ex.orderMatters);
      const verdict = this.elements.verdict;

      if (res.pass) {
        verdict.className = "sqlp-verdict is-pass";
        verdict.textContent = `✓ Correct — ${ex.title} solved.`;
        this.store.markCompleted(ex.id);
        this.refreshProgress();
        this.buildList();

        if (this.currentIdx < this.data.exercises.length - 1) {
          this.elements.nextBtn.style.display = "";
        }
      } else {
        verdict.className = "sqlp-verdict is-fail";
        verdict.textContent = "✗ Not quite — your output doesn't match. Compare below.";
        this.elements.expectedDetails.hidden = false;
        this.elements.expectedDetails.open = true;
        renderResultsTable(this.elements.expectedWrap, res.expectedFields, res.expected);
      }

      verdict.hidden = false;
      this.elements.resultsMeta.textContent = res.pass ? "passed" : "failed";
    } catch (err) {
      this.elements.error.textContent = err instanceof Error ? err.message : String(err);
      this.elements.error.hidden = false;
      this.elements.resultsMeta.textContent = "error";
    }
  }

  async resetData(): Promise<void> {
    const ex = this.currentExercise;
    const ds = this.data.datasets[ex.dataset];
    try {
      await this.engine.loadDataset(ds.schemaSql, ds.seedSql);
      this.elements.resultsMeta.textContent = "data reset";
      this.elements.tableWrap.innerHTML = `<div class="sqlp-empty">Run a query to see results here.</div>`;
    } catch (err) {
      this.elements.error.textContent = err instanceof Error ? err.message : String(err);
      this.elements.error.hidden = false;
    }
  }

  private setEngineState(state: EngineState, label: string): void {
    this.elements.engineBadge.className = `sqlp-engine${state === "ready" ? " is-ready" : state === "error" ? " is-error" : ""}`;
    this.elements.engineLabel.textContent = label;
  }

  private hideVerdict(): void {
    this.elements.verdict.hidden = true;
  }

  private hideError(): void {
    this.elements.error.hidden = true;
    this.elements.expectedDetails.hidden = true;
  }

  private renderMarkdownBold(text: string): string {
    const esc = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }
}

