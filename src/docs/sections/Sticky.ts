import m from "mithril";
import { Button, Header, Footer } from "../../components";
import { CodeExample } from "../lib/CodeExample";

const stickyHTML = `<header class="sticky-top card">
  <div class="container-lg cluster justify-between items-center">
    <strong>Site</strong>
    <nav class="cluster gap-2">
      <a class="btn ghost" href="#">Docs</a>
      <button class="btn primary">Get Started</button>
    </nav>
  </div>
</header>

<footer class="sticky-bottom card">
  <div class="container-lg cluster justify-between">
    <small>© Your Project</small>
    <small>Built with Simple SCSS</small>
  </div>
</footer>`.trim();

const stickyTS = `import { Header, Footer, Button } from "your-lib";

m(Header, { sticky: true, container: "lg" },
  m("div.cluster.justify-between.items-center", [
    m("strong", "Site"),
    m("nav.cluster.gap-2", [
      m("a.btn.ghost", { href: "#" }, "Docs"),
      m(Button, { variant: "primary" }, "Get Started"),
    ])
  ])
);

m(Footer, { sticky: true, container: "lg" },
  m("div.cluster.justify-between", [
    m("small", "© Your Project"),
    m("small", "Built with Simple SCSS")
  ])
);`.trim();

export const StickyExamples: m.Component = {
  view() {
    return m(
      "article#sticky.stack",
      m(CodeExample, {
        title: "Sticky header & footer",
        live: [
          m(Header, { sticky: true, container: "lg" }, [
            m("div.cluster.justify-between.items-center", [
              m("strong", "Site"),
              m("nav.cluster.gap-2", [
                m("a.btn.ghost", { href: "#" }, "Docs"),
                m(Button, { variant: "primary" }, "Get Started"),
              ]),
            ]),
          ]),
          m("div", { class: "p-3", style: "height: 6rem" }, "Page content sample…"),
          m(Footer, { sticky: true, container: "lg" }, [
            m("div.cluster.justify-between", [
              m("small", "© Your Project"),
              m("small", "Built with Simple SCSS"),
            ]),
          ]),
        ],
        html: stickyHTML,
        ts: stickyTS,
        notes: m("span", "Sticky utilities are provided by .sticky-top / .sticky-bottom in your SCSS."),
      })
    );
  },
};
