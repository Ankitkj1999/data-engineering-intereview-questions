export function renderResultsTable(
  container: HTMLElement,
  fields: { name: string }[],
  rows: Record<string, unknown>[]
): void {
  if (!fields.length || !rows.length) {
    container.innerHTML = `<div class="sqlp-empty">No rows returned.</div>`;
    return;
  }

  const table = document.createElement("table");
  table.className = "sqlp-table";

  const thead = `<thead><tr>${fields
    .map((f) => `<th>${escapeHtml(f.name)}</th>`)
    .join("")}</tr></thead>`;

  const tbody = `<tbody>${rows
    .map((r) => {
      const cells = fields
        .map((f) => {
          const v = r[f.name];
          if (v === null || v === undefined) {
            return `<td class="is-null">null</td>`;
          }
          return `<td>${escapeHtml(String(v))}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("")}</tbody>`;

  table.innerHTML = `${thead}${tbody}`;
  container.innerHTML = "";
  container.appendChild(table);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

