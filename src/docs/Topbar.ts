import m from "mithril";

export const Topbar: m.Component = {
  view() {
    return m("header.docs-topbar",
      m("div.container-lg",
        m("div.cluster.justify-between.items-center", [
          m("div.brand.cluster.items-center.gap-2", [
            m("strong", "Minimaloom"),
            m("span.muted", "Style Guide")
          ]),
          m("div", "")
        ])
      )
    );
  }
};
