import m from "mithril";

export const Intro: m.Component = {
  view() {
    return m("article#intro.stack", [
      m("h1", "Minimaloom"),
      m(
        "p",
        "Minimal defaults with chainable utilities. Inputs use thin black borders. ",
        "Mobile and desktop friendly. Colors and spacing are driven by CSS variables."
      ),
      m("details", [
        m("summary", "Quick start"),
        m("pre", m("code", "sass sass/index.scss docs/assets/simple.css --style=compressed")),
        m("pre", m("code", '<link rel="stylesheet" href="assets/simple.css">')),
      ]),
    ]);
  },
};
