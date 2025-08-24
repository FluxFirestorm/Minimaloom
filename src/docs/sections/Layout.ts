import m from "mithril";
import { CodeExample } from "../lib/CodeExample";

const layoutHTML = `<div class="stack gap-5">
  <div class="stack">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
  </div>

  <div class="cluster justify-between items-center gap-3">
    <div class="card">Left</div>
    <div class="card">Right</div>
  </div>

  <div class="grid md-3 gap-3">
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card">3</div>
  </div>
</div>`.trim();

const layoutTS = `import m from "mithril";

m("div.stack.gap-5", [
  m("div.stack", [
    m("div.card", "Item 1"),
    m("div.card", "Item 2"),
    m("div.card", "Item 3"),
  ]),

  m("div.cluster.justify-between.items-center.gap-3", [
    m("div.card", "Left"),
    m("div.card", "Right"),
  ]),

  m("div.grid.md-3.gap-3", [
    m("div.card", "1"),
    m("div.card", "2"),
    m("div.card", "3"),
  ]),
]);`.trim();

export const LayoutSection: m.Component = {
  view() {
    return m(
      "article#layout.stack",
      m(CodeExample, {
        title: "Layout: stack, cluster, grid",
        live: m("div.stack.gap-5", [
          m("div.stack", [
            m("div.card", "Item 1"),
            m("div.card", "Item 2"),
            m("div.card", "Item 3"),
          ]),
          m("div.cluster.justify-between.items-center.gap-3", [
            m("div.card", "Left"),
            m("div.card", "Right"),
          ]),
          m("div.grid.md-3.gap-3", [
            m("div.card", "1"),
            m("div.card", "2"),
            m("div.card", "3"),
          ]),
        ]),
        html: layoutHTML,
        ts: layoutTS,
      })
    );
  },
};
