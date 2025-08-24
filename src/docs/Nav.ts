import m from "mithril";

const items = [
  ["#intro", "Introduction"],
  ["#tokens", "Design tokens"],
  ["#layout", "Layout & alignment"],
  ["#containers", "Containers"],
  ["#buttons", "Buttons"],
  ["#cards", "Cards"],
  ["#forms", "Forms"],
  ["#images", "Images"],
  ["#modals", "Modals"],
  ["#navs", "Navigation"],
  ["#sticky", "Sticky header/footer"],
  ["#utilities", "Utilities"],
  ["#usage", "Usage & overrides"],
] as const;

export const Nav: m.Component = {
  view() {
    return m("aside",
      m("nav.docs-nav", { "aria-label": "Sections" },
        m("ul.stack",
          items.map(([href, label]) => m("li", m("a", { href }, label)))
        )
      )
    );
  }
};
