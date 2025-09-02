import m from "mithril";
import { Container } from "../../components";
import { CodeExample } from "../lib/CodeExample";

/* Visual helpers (inline so you don't need to touch docs SCSS) */
const bandStyle =
  "background: repeating-linear-gradient(90deg, color-mix(in oklab, var(--border) 10%, transparent), color-mix(in oklab, var(--border) 10%, transparent) 1px, transparent 1px, transparent 12px);" +
  "border: 1px dashed color-mix(in oklab, var(--border) 25%, transparent);" +
  "padding-block: .5rem; margin-block: .5rem;";

const labelStyle = "display:block;margin:.25rem 1rem .5rem 1rem;color:var(--muted);font-size:.9em;";
const boxStyle =
  "background: color-mix(in oklab, var(--accent) 6%, transparent);" +
  "border: 1px solid color-mix(in oklab, var(--border) 35%, transparent);" +
  "border-radius: var(--radius); padding: .75rem 1rem;";

/* Code panes */
const containersHTML = `<div class="container">Default container (md)</div>
<div class="container-sm">Small container</div>
<div class="container-lg">Large container</div>`.trim();

const containersTS = `import m from "mithril";
import { Container } from "minimaloom";

m(Container, { max: "md" }, "Default container (md)");
m(Container, { max: "sm" }, "Small container");
m(Container, { max: "lg" }, "Large container");`.trim();

export const ContainersExamples: m.Component = {
  view() {
    return m("article#containers.stack",
      m(CodeExample, {
        title: "Containers",
        live: [
          // MD (default)
          m("div", { style: bandStyle }, [
            m("small", { style: labelStyle }, "md (token) → .container — max-width: var(--container-md)"),
            m(Container, { max: "md" },
              m("div", { style: boxStyle }, "Default container (md)")),
          ]),
          // SM
          m("div", { style: bandStyle }, [
            m("small", { style: labelStyle }, "sm (token) → .container-sm — max-width: var(--container-sm)"),
            m(Container, { max: "sm" },
              m("div", { style: boxStyle }, "Small container")),
          ]),
          // LG
          m("div", { style: bandStyle }, [
            m("small", { style: labelStyle }, "lg (token) → .container-lg — max-width: var(--container-lg)"),
            m(Container, { max: "lg" },
              m("div", { style: boxStyle }, "Large container")),
          ]),
        ],
        html: containersHTML,
        ts: containersTS,
      })
    );
  },
};
