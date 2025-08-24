import m from "mithril";

export const Usage: m.Component = {
  view() {
    return m("article#usage.stack", [
      m("h2", "Usage & overrides"),
      m(
        "pre",
        m(
          "code",
          `:root{
  --accent: oklch(55% .25 35);
  --surface: oklch(98% .02 240);
}`
        )
      ),
      m("pre", m("code", `<div class="flex items-center justify-between p-3">...</div>`)),
    ]);
  },
};
