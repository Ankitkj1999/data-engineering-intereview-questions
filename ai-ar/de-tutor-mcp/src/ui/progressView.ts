// MCP Apps (SEP-1865) UI resource for get_progress. Talks to the host over
// postMessage JSON-RPC per the spec — no SDK needed, see apps.mdx "Transport Layer".
export const PROGRESS_VIEW_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  :root {
    color-scheme: light dark;
    --bg: light-dark(#fcfcfb, #1a1a19);
    --ink: light-dark(#0b0b0b, #ffffff);
    --ink-2: light-dark(#52514e, #c3c2b7);
    --ink-muted: light-dark(#898781, #898781);
    --grid: light-dark(#e1e0d9, #2c2c2a);
    --accent: light-dark(#2a78d6, #3987e5);
    --accent-track: light-dark(rgba(42,120,214,0.15), rgba(57,135,229,0.22));
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font-sans, system-ui, -apple-system, "Segoe UI", sans-serif);
    padding: 14px 16px 16px;
  }
  .stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
  .stat-tile { border: 1px solid var(--grid); border-radius: 8px; padding: 8px 10px; }
  .stat-label { font-size: 10.5px; color: var(--ink-muted); display: block; }
  .stat-value { font-size: 18px; font-weight: 650; font-variant-numeric: tabular-nums; }
  .stat-value small { font-size: 11px; font-weight: 500; color: var(--ink-muted); margin-left: 3px; }
  .row { display: grid; grid-template-columns: 1fr 96px 48px; align-items: center; gap: 8px; padding: 6px 0; border-top: 1px solid var(--grid); }
  .row:first-of-type { border-top: none; }
  .name { font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .track { height: 6px; border-radius: 999px; background: var(--accent-track); overflow: hidden; }
  .fill { display: block; height: 100%; background: var(--accent); border-radius: 999px; }
  .val { font-variant-numeric: tabular-nums; font-size: 11px; color: var(--ink-2); text-align: right; }
  .empty { font-size: 12px; color: var(--ink-muted); padding: 24px 0; text-align: center; }
</style>
</head>
<body>
  <div class="stat-row" id="stats"></div>
  <div id="rows"><p class="empty">Waiting for progress data…</p></div>

<script>
(function () {
  var nextId = 1;
  var pending = {};

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || typeof data !== "object") return;
    if (data.id !== undefined && pending[data.id]) {
      var cb = pending[data.id];
      delete pending[data.id];
      if (data.error) cb.reject(new Error(data.error.message || "error"));
      else cb.resolve(data.result);
      return;
    }
    if (data.method === "ui/notifications/tool-result") {
      render(data.params && data.params.structuredContent);
    }
  });

  function sendRequest(method, params) {
    var id = nextId++;
    window.parent.postMessage({ jsonrpc: "2.0", id: id, method: method, params: params }, "*");
    return new Promise(function (resolve, reject) {
      pending[id] = { resolve: resolve, reject: reject };
    });
  }
  function sendNotification(method, params) {
    window.parent.postMessage({ jsonrpc: "2.0", method: method, params: params }, "*");
  }

  function tile(label, value, small) {
    var el = document.createElement("div");
    el.className = "stat-tile";
    var l = document.createElement("span");
    l.className = "stat-label";
    l.textContent = label;
    var v = document.createElement("span");
    v.className = "stat-value";
    v.textContent = value;
    if (small) {
      var s = document.createElement("small");
      s.textContent = small;
      v.appendChild(s);
    }
    el.appendChild(l);
    el.appendChild(v);
    return el;
  }

  function render(data) {
    if (!data || !data.summary) return;

    var stats = document.getElementById("stats");
    stats.innerHTML = "";
    stats.appendChild(tile("Concepts", data.summary.concepts_started + " / " + data.summary.concepts_total));
    var pct = data.summary.questions_total
      ? Math.round((100 * data.summary.questions_covered) / data.summary.questions_total)
      : 0;
    stats.appendChild(tile("Covered", data.summary.questions_covered + " / " + data.summary.questions_total, pct + "%"));
    var avgEase = data.concepts.length
      ? (
          data.concepts.reduce(function (s, c) {
            return s + (c.ease || 2.5);
          }, 0) / data.concepts.length
        ).toFixed(2)
      : "—";
    stats.appendChild(tile("Avg. ease", avgEase, "SM-2"));

    var rows = document.getElementById("rows");
    rows.innerHTML = "";
    var sorted = data.concepts.slice().sort(function (a, b) {
      return b.questions_total - a.questions_total;
    });
    sorted.forEach(function (c) {
      var rowPct = c.questions_total ? Math.round((100 * c.questions_covered) / c.questions_total) : 0;
      var row = document.createElement("div");
      row.className = "row";

      var name = document.createElement("span");
      name.className = "name";
      name.textContent = c.concept;

      var track = document.createElement("span");
      track.className = "track";
      var fill = document.createElement("span");
      fill.className = "fill";
      fill.style.width = rowPct + "%";
      track.appendChild(fill);

      var val = document.createElement("span");
      val.className = "val";
      val.textContent = c.questions_covered + " / " + c.questions_total;

      row.appendChild(name);
      row.appendChild(track);
      row.appendChild(val);
      rows.appendChild(row);
    });

    resize();
  }

  function resize() {
    sendNotification("ui/notifications/size-changed", { height: document.documentElement.scrollHeight });
  }
  new ResizeObserver(resize).observe(document.body);

  sendRequest("ui/initialize", {
    protocolVersion: "2026-01-26",
    capabilities: {},
    clientInfo: { name: "de-tutor progress view", version: "1.0.0" },
    appCapabilities: { availableDisplayModes: ["inline"] },
  }).then(function (result) {
    var theme = result && result.hostContext && result.hostContext.theme;
    if (theme) document.documentElement.style.colorScheme = theme;
    sendNotification("ui/notifications/initialized", {});
  });
})();
</script>
</body>
</html>
`;
