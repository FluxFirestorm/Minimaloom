import m from "mithril";
import { Button } from "../../components";
import { CodeExample } from "../lib/CodeExample";

const buttonsHTML = `<div class="stack">
  <div class="cluster gap-2">
    <button class="btn">Button</button>
    <button class="btn primary">Primary</button>
    <button class="btn ghost">Ghost</button>
  </div>

  <div class="cluster gap-2">
    <button class="btn xs">XS</button>
    <button class="btn sm ghost">Small</button>
    <button class="btn">Default</button>
    <button class="btn lg">Large</button>
  </div>

  <div class="stack">
    <small class="m0">Force a visible focus ring with <code>.ring</code> (utility):</small>
    <div class="cluster gap-2">
      <button class="btn ring">Button + ring</button>
      <button class="btn primary ring">Primary + ring</button>
      <button class="btn ghost ring">Ghost + ring</button>
    </div>
  </div>
</div>`.trim();

const buttonsTS = `import m from "mithril";
import { Button } from "minimaloom";

m("div.stack", [
  m("div.cluster.gap-2", [
    m(Button, {}, "Button"),
    m(Button, { variant: "primary" }, "Primary"),
    m(Button, { variant: "ghost" }, "Ghost"),
  ]),

  m("div.cluster.gap-2", [
    m(Button, { size: "xs" }, "XS"),
    m(Button, { size: "sm", variant: "ghost" }, "Small"),
    m(Button, {}, "Default"),
    m(Button, { size: "lg" }, "Large"),
  ]),

  m("div.stack", [
    m("small.m0", ["Force a visible focus ring with ", m("code", ".ring"), " (utility):"]),
    m("div.cluster.gap-2", [
      m(Button, { class: "ring" }, "Button + ring"),
      m(Button, { variant: "primary", class: "ring" }, "Primary + ring"),
      m(Button, { variant: "ghost", class: "ring" }, "Ghost + ring"),
    ])
  ])
]);`.trim();

export const ButtonsExamples: m.Component = {
  view() {
    return m("article#buttons.stack",
      m(CodeExample, {
        title: "Buttons",
        live: m("div.stack", [
          m("div.cluster.gap-2", [
            m(Button, {}, "Button"),
            m(Button, { variant: "primary" }, "Primary"),
            m(Button, { variant: "ghost" }, "Ghost"),
          ]),
          m("div.cluster.gap-2", [
            m(Button, { size: "xs" }, "XS"),
            m(Button, { size: "sm", variant: "ghost" }, "Small"),
            m(Button, {}, "Default"),
            m(Button, { size: "lg" }, "Large"),
          ]),
          m("div.stack", [
            m("small.m0", [ "Force a visible focus ring with ", m("code", ".ring"), " (utility):" ]),
            m("div.cluster.gap-2", [
              m(Button, { class: "ring" }, "Button + ring"),
              m(Button, { variant: "primary", class: "ring" }, "Primary + ring"),
              m(Button, { variant: "ghost", class: "ring" }, "Ghost + ring"),
            ])
          ])
        ]),
        html: buttonsHTML,
        ts: buttonsTS,
      })
    );
  },
};
