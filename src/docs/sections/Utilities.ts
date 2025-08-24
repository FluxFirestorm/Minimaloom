import m from "mithril";
import { CodeExample } from "../lib/CodeExample";

/** --- Small helpers to render a compact cheat sheet table --- */
function row(label: string, usage: string, note?: string) {
  return m("tr", [
    m("td", m("code", label)),
    m("td", m("code", usage)),
    m("td", note ?? ""),
  ]);
}

const tableLive = m("div.stack", [
  m("h3.m-0", "Cheat sheet"),
  m("table", [
    m("thead", m("tr", [m("th", "Utility"), m("th", "Usage"), m("th", "Notes")])),
    m("tbody", [
      // spacing scale
      row(".m-1..8", "<div class='m-4'>", "Margin (all sides)"),
      row(".p-1..8", "<div class='p-3'>", "Padding (all sides)"),
      row(".gap-1..8", "<div class='stack gap-5'>", "Gaps for .stack/.grid/.cluster"),

      // logical margins/padding
      row(".mt-1..8", "<div class='mt-2'>", "Margin block-start (top in LTR)"),
      row(".mb-1..8", "<div class='mb-2'>", "Margin block-end (bottom)"),
      row(".ms-1..8", "<div class='ms-2'>", "Margin inline-start (left in LTR)"),
      row(".me-1..8", "<div class='me-2'>", "Margin inline-end (right in LTR)"),
      row(".pt-1..8", "<div class='pt-2'>", "Padding block-start"),
      row(".pb-1..8", "<div class='pb-2'>", "Padding block-end"),
      row(".ps-1..8", "<div class='ps-2'>", "Padding inline-start"),
      row(".pe-1..8", "<div class='pe-2'>", "Padding inline-end"),
      row(".m0 / .p0", "<div class='m0'>", "Zero out margin/padding"),

      // alignment
      row(".text-start|center|end", "<p class='text-center'>", "Text alignment"),

      // sizing
      row(".w-100", "<div class='w-100'>", "Inline size: 100%"),
      row(".max-w-sm|md|lg", "<div class='max-w-md'>", "Clamp width by container tokens"),

      // display
      row(".block | .inline | .inline-block", "<span class='inline-block'>", "Display helpers"),

      // misc
      row(".ring", "<button class='btn ring'>", "Focus ring outline"),
      row(".sr-only", "<span class='sr-only'>", "Visually hidden, accessible"),

      // responsive
      row(".md:flex / .md:inline", "<div class='md:flex'>", "Active ≥ 48rem"),
      row(".md:text-center", "<p class='md:text-center'>", "Active ≥ 48rem"),
    ]),
  ]),
]);

/** --- Example code shown in the toggler --- */
const utilitiesHTML = `<div class="stack gap-5">
  <div class="stack">
    <div class="card">A .stack controls vertical rhythm via <code>gap</code>.</div>
    <div class="card">Use <code>gap-1..8</code> to change it.</div>
  </div>

  <div class="cluster gap-3">
    <div class="card">Cluster item</div>
    <div class="card">Cluster item</div>
  </div>

  <div class="grid md-3 gap-3">
    <div class="card">Grid 1</div>
    <div class="card">Grid 2</div>
    <div class="card">Grid 3</div>
  </div>

  <p class="text-center m0">Center text with <code>.text-center</code>.</p>
</div>`.trim();

const utilitiesTS = `import m from "mithril";

m("div.stack.gap-5", [
  m("div.stack", [
    m("div.card", "A .stack controls vertical rhythm via gap."),
    m("div.card", "Use gap-1..8 to change it."),
  ]),

  m("div.cluster.gap-3", [
    m("div.card", "Cluster item"),
    m("div.card", "Cluster item"),
  ]),

  m("div.grid.md-3.gap-3", [
    m("div.card", "Grid 1"),
    m("div.card", "Grid 2"),
    m("div.card", "Grid 3"),
  ]),

  m("p.text-center.m0", "Center text with .text-center."),
]);`.trim();

export const UtilitiesSection: m.Component = {
  view() {
    return m("article#utilities.stack", [
      m(CodeExample, {
        title: "Utilities",
        live: m("div.stack", [
          tableLive,
          m("hr"),
          m("div", { class: "stack" }, [
            m("h3.m-0", "Examples"),
            m.trust("<small>Use the toggles to copy HTML or Mithril snippets.</small>"),
          ]),
        ]),
        html: utilitiesHTML,
        ts: utilitiesTS,
      }),
    ]);
  },
};
