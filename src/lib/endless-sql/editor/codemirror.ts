import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState, Prec } from "@codemirror/state";
import { sql } from "@codemirror/lang-sql";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { autocompletion, acceptCompletion } from "@codemirror/autocomplete";
import type { ColumnMeta, TableMeta } from "../core/types";

const PG_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "IS", "NULL",
  "AS", "ON", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "FULL", "CROSS",
  "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET",
  "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE",
  "CREATE", "TABLE", "DROP", "ALTER", "ADD", "COLUMN",
  "DISTINCT", "BETWEEN", "LIKE", "ILIKE", "EXISTS",
  "CASE", "WHEN", "THEN", "ELSE", "END",
  "ASC", "DESC", "TRUE", "FALSE",
  "COUNT", "SUM", "AVG", "MIN", "MAX",
  "UNION", "ALL", "INTERSECT", "EXCEPT",
  "WITH", "RECURSIVE", "OVER", "PARTITION BY", "ROW_NUMBER", "RANK", "DENSE_RANK",
  "PRIMARY KEY", "FOREIGN KEY", "REFERENCES", "SERIAL",
  "INT", "TEXT", "BOOLEAN", "NOT NULL", "DATE", "NUMERIC"
];

export interface SqlEditor {
  getValue(): string;
  setValue(text: string): void;
  updateSchema(tables: TableMeta[]): void;
  focus(): void;
  destroy(): void;
  view: EditorView;
}

export interface SqlEditorOptions {
  parent: HTMLElement;
  initialValue?: string;
  onRun?: () => void;
  onChange?: (value: string) => void;
}

export function createSqlEditor(options: SqlEditorOptions): SqlEditor {
  let schemaTables: string[] = [];
  let schemaColumns: { table: string; column: string; type: string }[] = [];

  function schemaCompleter(context: any) {
    const word = context.matchBefore(/[\w.]+/);
    if (!word || (word.from === word.to && !context.explicit)) return null;

    const prefix = word.text.toLowerCase();
    const suggestions: any[] = [];

    for (const kw of PG_KEYWORDS) {
      if (kw.toLowerCase().startsWith(prefix)) {
        suggestions.push({ label: kw, type: "keyword" });
      }
    }
    for (const tbl of schemaTables) {
      if (tbl.toLowerCase().startsWith(prefix)) {
        suggestions.push({ label: tbl, type: "table" });
      }
    }
    for (const col of schemaColumns) {
      if (col.column.toLowerCase().startsWith(prefix)) {
        suggestions.push({ label: col.column, type: "column", detail: col.table });
      }
    }

    if (!suggestions.length) return null;
    return { from: word.from, options: suggestions };
  }

  const editorTheme = EditorView.theme({
    "&": {
      fontSize: "0.92rem",
    },
    ".cm-content": {
      caretColor: "var(--sl-color-accent, #fbbf24) !important",
      fontFamily: "var(--sl-font-mono, monospace)",
    },
    "&.cm-focused .cm-cursor, .cm-cursor, .cm-dropCursor": {
      borderLeftColor: "var(--sl-color-accent, #fbbf24) !important",
      borderLeftWidth: "3px !important",
    },
  });

  const hl = Prec.highest(
    syntaxHighlighting(
      HighlightStyle.define([
        { tag: [t.keyword, t.controlKeyword, t.operatorKeyword, t.definitionKeyword], color: "var(--sqlp-hl-keyword, #fbbf24)", fontWeight: "700" },
        { tag: [t.string, t.docString, t.character], color: "var(--sqlp-hl-string, #4ade80)" },
        { tag: [t.number, t.integer, t.float], color: "var(--sqlp-hl-number, #60a5fa)" },
        { tag: [t.comment, t.lineComment, t.blockComment], color: "var(--sqlp-hl-comment, #94a3b8)", fontStyle: "italic" },
        { tag: [t.operator, t.compareOperator, t.logicOperator, t.punctuation, t.separator], color: "var(--sqlp-hl-operator, #f472b6)" },
        { tag: [t.className, t.typeName], color: "var(--sl-color-accent-high)" },
        { tag: [t.propertyName, t.name, t.variableName], color: "var(--page-text)" },
      ])
    )
  );

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged && options.onChange) {
      options.onChange(update.state.doc.toString());
    }
  });

  const view = new EditorView({
    state: EditorState.create({
      doc: options.initialValue ?? "",
      extensions: [
        basicSetup,
        sql(),
        editorTheme,
        hl,
        autocompletion({ override: [schemaCompleter] }),
        updateListener,
        Prec.highest(
          keymap.of([
            { key: "Tab", run: acceptCompletion },
            {
              key: "Mod-Enter",
              run: () => {
                options.onRun?.();
                return true;
              },
            },
          ])
        ),
        EditorView.lineWrapping,
      ],
    }),
    parent: options.parent,
  });

  return {
    getValue: () => view.state.doc.toString(),
    setValue: (text: string) => {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: text },
      });
    },
    updateSchema: (tables: TableMeta[]) => {
      schemaTables = tables.map((t) => t.name);
      schemaColumns = tables.flatMap((t) =>
        t.columns.map((c) => ({ table: t.name, column: c.name, type: c.type }))
      );
    },
    focus: () => view.focus(),
    destroy: () => view.destroy(),
    view,
  };
}

