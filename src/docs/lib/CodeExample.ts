import m from "mithril";

export type CodeExampleAttrs = {
  title: string;
  html?: string;
  ts?: string;
  live?: m.Children;
  notes?: m.Children;
};

export const CodeExample: m.Component<CodeExampleAttrs> = {
  oninit(v) {
    const { html, ts } = v.attrs;
    (v.state as any).tab = html ? "html" : ts ? "ts" : "html";
  },
  view(v) {
    const s = v.state as { tab: "html" | "ts" };
    const { title, html, ts, live, notes } = v.attrs;

    const tabs: Array<["html" | "ts", string]> = [];
    if (html) tabs.push(["html", "HTML"]);
    if (ts)   tabs.push(["ts",   "Mithril"]);

    const activeCode = s.tab === "html" ? (html ?? "") : (ts ?? "");

    return m("figure.ex", [
      m("figcaption.ex-head", [
        m("h3", title),
        m("div.ex-actions", [
          ...tabs.map(([key, label]) =>
            m("button.btn" + (s.tab === key ? ".primary" : ".ghost"), { onclick: () => (s.tab = key) }, label)
          ),
          m("button.btn.ghost", {
            onclick: async () => {
              try { await navigator.clipboard.writeText(activeCode); } catch {}
            }
          }, "Copy")
        ])
      ]),
      live && m("div.ex-live", live),
      m("div.ex-code", m("pre", m("code", activeCode))),
      notes && m("footer", m("small", notes))
    ]);
  }
};
