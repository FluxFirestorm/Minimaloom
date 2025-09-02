import m from "mithril";
import { CodeExample } from "../lib/CodeExample";

/** ---------- Tiny helpers ---------- */
function row(label: string, usage: string, note?: string) {
  return m("tr", [
    m("td", m("code", label)),
    m("td", m("code", usage)),
    m("td", note ?? ""),
  ]);
}

/** A full-bleed band to make width clamps visually obvious */
// Before (viewport-bleed): margin-inline: calc(50% - 50vw)
const bandStyle =
  "margin-inline: calc(-1 * var(--space-3));" +
  "padding-block: .5rem;" +
  "padding-inline: var(--space-3);" +
  "background:repeating-linear-gradient(90deg," +
  " color-mix(in oklab, var(--border) 10%, transparent) 0 1px," +
  " transparent 1px 12px);";
const centerStyle = "margin-inline:auto;";

/** ---------- Cheat sheet table (unchanged) ---------- */
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
      row(".w-100", "<div class='w-100'>", "Inline size: 100% of parent"),
      row(".max-w-sm|md|lg", "<div class='max-w-md'>", "Clamp width by container tokens"),

      // display
      row(".block | .inline | .inline-block", "<span class='inline-block'>", "Display helpers"),

      // responsive
      row(".md:flex / .md:inline", "<div class='md:flex'>", "Active ≥ 48rem"),
      row(".md:text-center", "<p class='md:text-center'>", "Active ≥ 48rem"),
    ]),
  ]),
]);

/** ---------- Visual examples (clearer demos) ---------- */
const examplesLive = m("div.stack.gap-6", [
  // 1) Layout helpers
  m("div.stack", [
    m("h3.m-0", "Layout helpers"),
    m("div.stack.gap-2", [
      m("div.stack.gap-2", [
        m("div.card.p-2", "A .stack controls vertical rhythm via gap."),
        m("div.card.p-2", "Use .gap-1..8 to change it."),
      ]),
      m("div.cluster.gap-2", [
        m("div.card.p-2", "Cluster item"),
        m("div.card.p-2", "Cluster item"),
        m("div.card.p-2", "Cluster item"),
      ]),
      m("div.grid.md-3.gap-2", [
        m("div.card.p-2", "Grid 1"),
        m("div.card.p-2", "Grid 2"),
        m("div.card.p-2", "Grid 3"),
      ]),
    ]),
  ]),

  // 2) Margins (block and inline)
  m("div.stack", [
    m("h3.m-0", "Margins"),
    m("div.stack", [
      m("small.muted", "Block (vertical)"),
      m("div.stack", [
        m("div.card.p-2", "Box A (no margin)"),
        m("div.card.p-2.mt-2", "Box B with .mt-2 (adds space above)"),
      ]),
      m("div.stack.mt-3", [
        m("div.card.p-2.mb-2", "Box C with .mb-2 (adds space below)"),
        m("div.card.p-2", "Box D (no margin)"),
      ]),
    ]),
    m("div.stack.mt-3", [
      m("small.muted", "Inline (horizontal)"),
      m("div.cluster.items-center", [
        m("div.card.p-2.me-2", ".me-2 → pushes next item"),
        m("div.card.p-2", "Next"),
        m("div.card.p-2.ms-2", ".ms-2 → has space before"),
      ]),
    ]),
  ]),

  // 3) Padding
  m("div.stack", [
    m("h3.m-0", "Padding"),
    m("div.cluster.gap-2", [
      m("div.card.pt-2.pb-2.ps-2.pe-2", "pt-2 pb-2 ps-2 pe-2"),
      m("div.card.p-3", "p-3 (all sides)"),
    ]),
  ]),

  // 4) Alignment
  m("div.stack", [
    m("h3.m-0", "Alignment"),
    m("p.text-center.m0", "Center text with .text-center."),
  ]),

  // 5) Sizing (obvious, with full-bleed band + centered clamps)
  m("div.stack", [
    m("h3.m-0", "Sizing"),
    // full-bleed band so clamped widths are visible
    m("div", { style: bandStyle }, [
      m("div.max-w-sm", { style: centerStyle }, m("div.card.p-2", "max-w-sm (≈42rem)")),
      m("div.max-w-md.mt-2", { style: centerStyle }, m("div.card.p-2", "max-w-md (≈64rem)")),
      m("div.max-w-lg.mt-2", { style: centerStyle }, m("div.card.p-2", "max-w-lg (≈80rem)")),
    ]),
    // w-100 inside a constrained wrapper to show it fills parent
    m("div.mt-3", [
      m("div", {
        style:
          "max-inline-size:24rem;margin-inline:auto;outline:1px dashed color-mix(in oklab, var(--border) 40%, transparent);padding:.25rem;",
      }, m("div.w-100.card.p-2", "w-100 stretches to the wrapper (24rem)")),
    ]),
  ]),
]);

/** ---------- Snippets for toggler (match the live intent) ---------- */
const utilitiesHTML = `<div class="stack gap-6">

  <div class="stack">
    <h3 class="m-0">Layout helpers</h3>
    <div class="stack gap-2">
      <div class="stack gap-2">
        <div class="card p-2">A .stack controls vertical rhythm via <code>gap</code>.</div>
        <div class="card p-2">Use <code>.gap-1..8</code> to change it.</div>
      </div>
      <div class="cluster gap-2">
        <div class="card p-2">Cluster item</div>
        <div class="card p-2">Cluster item</div>
        <div class="card p-2">Cluster item</div>
      </div>
      <div class="grid md-3 gap-2">
        <div class="card p-2">Grid 1</div>
        <div class="card p-2">Grid 2</div>
        <div class="card p-2">Grid 3</div>
      </div>
    </div>
  </div>

  <div class="stack">
    <h3 class="m-0">Margins</h3>
    <div class="stack">
      <small class="muted">Block (vertical)</small>
      <div class="stack">
        <div class="card p-2">Box A (no margin)</div>
        <div class="card p-2 mt-2">Box B with .mt-2 (adds space above)</div>
      </div>
      <div class="stack mt-3">
        <div class="card p-2 mb-2">Box C with .mb-2 (adds space below)</div>
        <div class="card p-2">Box D (no margin)</div>
      </div>
    </div>
    <div class="stack mt-3">
      <small class="muted">Inline (horizontal)</small>
      <div class="cluster items-center">
        <div class="card p-2 me-2">.me-2 → pushes next item</div>
        <div class="card p-2">Next</div>
        <div class="card p-2 ms-2">.ms-2 → has space before</div>
      </div>
    </div>
  </div>

  <div class="stack">
    <h3 class="m-0">Padding</h3>
    <div class="cluster gap-2">
      <div class="card pt-2 pb-2 ps-2 pe-2">pt-2 pb-2 ps-2 pe-2</div>
      <div class="card p-3">p-3 (all sides)</div>
    </div>
  </div>

  <div class="stack">
    <h3 class="m-0">Alignment</h3>
    <p class="text-center m0">Center text with <code>.text-center</code>.</p>
  </div>

  <div class="stack">
    <h3 class="m-0">Sizing</h3>

    <!-- Full-bleed band so width clamps are visible -->
    <div style="margin-inline:calc(50% - 50vw);padding:.5rem 0;background:repeating-linear-gradient(90deg, color-mix(in oklab, var(--border) 10%, transparent) 0 1px, transparent 1px 12px);">
      <div class="max-w-sm" style="margin-inline:auto">
        <div class="card p-2">max-w-sm (≈42rem)</div>
      </div>
      <div class="max-w-md mt-2" style="margin-inline:auto">
        <div class="card p-2">max-w-md (≈64rem)</div>
      </div>
      <div class="max-w-lg mt-2" style="margin-inline:auto">
        <div class="card p-2">max-w-lg (≈80rem)</div>
      </div>
    </div>

    <!-- w-100 fills a constrained parent -->
    <div class="mt-3">
      <div style="max-inline-size:24rem;margin-inline:auto;outline:1px dashed color-mix(in oklab, var(--border) 40%, transparent);padding:.25rem;">
        <div class="w-100 card p-2">w-100 stretches to the wrapper (24rem)</div>
      </div>
    </div>
  </div>
</div>`.trim();

const utilitiesTS = `import m from "mithril";

const band = (child: m.Children) =>
  m("div", {
    style:
      "margin-inline:calc(50% - 50vw);padding:.5rem 0;" +
      "background:repeating-linear-gradient(90deg," +
      " color-mix(in oklab, var(--border) 10%, transparent) 0 1px," +
      " transparent 1px 12px);",
  }, child);

export default m("div.stack.gap-6", [
  // Layout
  m("div.stack", [
    m("h3.m-0", "Layout helpers"),
    m("div.stack.gap-2", [
      m("div.stack.gap-2", [
        m("div.card.p-2", "A .stack controls vertical rhythm via gap."),
        m("div.card.p-2", "Use .gap-1..8 to change it."),
      ]),
      m("div.cluster.gap-2", [
        m("div.card.p-2", "Cluster item"),
        m("div.card.p-2", "Cluster item"),
        m("div.card.p-2", "Cluster item"),
      ]),
      m("div.grid.md-3.gap-2", [
        m("div.card.p-2", "Grid 1"),
        m("div.card.p-2", "Grid 2"),
        m("div.card.p-2", "Grid 3"),
      ]),
    ]),
  ]),

  // Margins
  m("div.stack", [
    m("h3.m-0", "Margins"),
    m("div.stack", [
      m("small.muted", "Block (vertical)"),
      m("div.stack", [
        m("div.card.p-2", "Box A (no margin)"),
        m("div.card.p-2.mt-2", "Box B with .mt-2 (adds space above)"),
      ]),
      m("div.stack.mt-3", [
        m("div.card.p-2.mb-2", "Box C with .mb-2 (adds space below)"),
        m("div.card.p-2", "Box D (no margin)"),
      ]),
    ]),
    m("div.stack.mt-3", [
      m("small.muted", "Inline (horizontal)"),
      m("div.cluster.items-center", [
        m("div.card.p-2.me-2", ".me-2 → pushes next item"),
        m("div.card.p-2", "Next"),
        m("div.card.p-2.ms-2", ".ms-2 → has space before"),
      ]),
    ]),
  ]),

  // Padding
  m("div.stack", [
    m("h3.m-0", "Padding"),
    m("div.cluster.gap-2", [
      m("div.card.pt-2.pb-2.ps-2.pe-2", "pt-2 pb-2 ps-2 pe-2"),
      m("div.card.p-3", "p-3 (all sides)"),
    ]),
  ]),

  // Alignment
  m("div.stack", [
    m("h3.m-0", "Alignment"),
    m("p.text-center.m0", "Center text with .text-center."),
  ]),

  // Sizing
  m("div.stack", [
    m("h3.m-0", "Sizing"),
    band([
      m("div.max-w-sm", { style: "margin-inline:auto" }, m("div.card.p-2", "max-w-sm (≈42rem)")),
      m("div.max-w-md.mt-2", { style: "margin-inline:auto" }, m("div.card.p-2", "max-w-md (≈64rem)")),
      m("div.max-w-lg.mt-2", { style: "margin-inline:auto" }, m("div.card.p-2", "max-w-lg (≈80rem)")),
    ]),
    m("div.mt-3",
      m("div", { style: "max-inline-size:24rem;margin-inline:auto;outline:1px dashed color-mix(in oklab, var(--border) 40%, transparent);padding:.25rem;" },
        m("div.w-100.card.p-2", "w-100 stretches to the wrapper (24rem)")))
  ]),
]);`.trim();

/** ---------- Component ---------- */
export const UtilitiesSection: m.Component = {
  view() {
    return m("article#utilities.stack", [
      m(CodeExample, {
        title: "Utilities",
        live: m("div.stack", [
          tableLive,
          m("hr"),
          m("div.stack", [
            m("h3.m-0", "Examples"),
            examplesLive,
          ]),
        ]),
        html: utilitiesHTML,
        ts: utilitiesTS,
      }),
    ]);
  },
};
