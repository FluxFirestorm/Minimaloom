import m from "mithril";
import { Container } from "../../components";
import { CodeExample } from "../lib/CodeExample";

const containersHTML = `<div class="container">Default container (md)</div>
<div class="container-sm">Small container</div>
<div class="container-lg">Large container</div>`.trim();

const containersTS = `import { Container } from "your-lib";

m(Container, { size: "md" }, "Default container (md)");
m(Container, { size: "sm" }, "Small container");
m(Container, { size: "lg" }, "Large container");`.trim();

export const ContainersExamples: m.Component = {
  view() {
    return m(
      "article#containers.stack",
      m(CodeExample, {
        title: "Containers",
        live: [
          m(Container, { size: "md" }, m("div.p-3", "Default container (md)")),
          m(Container, { size: "sm" }, m("div.p-3", "Small container")),
          m(Container, { size: "lg" }, m("div.p-3", "Large container")),
        ],
        html: containersHTML,
        ts: containersTS,
      })
    );
  },
};
