import m from "mithril";
import { Button, Card } from "../../components";
import { CodeExample } from "../lib/CodeExample";

/* ---------- HTML snippets ---------- */

const basicHTML = `<article class="card stack">
  <h3>Card title</h3>
  <p>Body text…</p>
</article>`.trim();

const mediaHTML = `<article class="card stack">
  <figure class="m-0">
    <img src="https://picsum.photos/800/400" alt="Demo" />
    <figcaption>Caption</figcaption>
  </figure>
  <h3>Media card</h3>
  <p>Image + content.</p>
  <footer class="cluster justify-end">
    <button class="btn ghost">Action</button>
  </footer>
</article>`.trim();

const gridHTML = `<div class="grid md-3">
  <article class="card"><h3 class="m-0">One</h3></article>
  <article class="card"><h3 class="m-0">Two</h3></article>
  <article class="card"><h3 class="m-0">Three</h3></article>
</div>`.trim();

const linkHTML = `<a class="card stack" href="#">
  <h3>Clickable card</h3>
  <p>Acts like a link.</p>
</a>`.trim();

/* ---------- Mithril (TS) snippets ---------- */

const basicTS = `import m from "mithril";
import { Card } from "your-lib";

m(Card, { title: "Card title" }, m("p", "Body text…"));`.trim();

const mediaTS = `import m from "mithril";
import { Card, Button } from "your-lib";

m(Card, [
  m("figure.m-0", [
    m("img", { src: "https://picsum.photos/800/400", alt: "Demo" }),
    m("figcaption", "Caption"),
  ]),
  m("h3", "Media card"),
  m("p", "Image + content."),
  m("footer.cluster.justify-end",
    m(Button, { variant: "ghost" }, "Action")
  )
]);`.trim();

const gridTS = `import m from "mithril";

m("div.grid.md-3", [
  m("article.card", m("h3.m-0", "One")),
  m("article.card", m("h3.m-0", "Two")),
  m("article.card", m("h3.m-0", "Three")),
]);`.trim();

const linkTS = `import m from "mithril";

m("a.card.stack", { href: "#" }, [
  m("h3", "Clickable card"),
  m("p", "Acts like a link.")
]);`.trim();

/* ---------- Section component ---------- */

export const CardsExamples: m.Component = {
  view() {
    return m("article#cards.stack", [
      m(CodeExample, {
        title: "Basic card",
        live: m(Card, { title: "Card title" }, m("p", "Body text…")),
        html: basicHTML,
        ts: basicTS,
      }),

      m(CodeExample, {
        title: "Media card",
        live: m("article.card.stack", [
          m("figure.m-0", [
            m("img", { src: "https://picsum.photos/800/400", alt: "Demo" }),
            m("figcaption", "Caption"),
          ]),
          m("h3", "Media card"),
          m("p", "Image + content."),
          m("footer.cluster.justify-end",
            m(Button, { variant: "ghost" }, "Action")
          ),
        ]),
        html: mediaHTML,
        ts: mediaTS,
      }),

      m(CodeExample, {
        title: "Cards grid",
        live: m("div.grid.md-3", [
          m("article.card", m("h3.m-0", "One")),
          m("article.card", m("h3.m-0", "Two")),
          m("article.card", m("h3.m-0", "Three")),
        ]),
        html: gridHTML,
        ts: gridTS,
      }),

      m(CodeExample, {
        title: "Clickable card (link)",
        live: m("a.card.stack", { href: "#" }, [
          m("h3", "Clickable card"),
          m("p", "Acts like a link."),
        ]),
        html: linkHTML,
        ts: linkTS,
      }),
    ]);
  },
};
