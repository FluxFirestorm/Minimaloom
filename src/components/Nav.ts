import m, { Component, Children, Vnode } from "mithril";

export type NavLink = {
  /** Text or vnode to render */
  label: Children;
  /** Make it an anchor */
  href?: string;
  /** Make it a button (ghost) */
  onclick?: (e: MouseEvent) => void;
  /** Mark active anchors */
  active?: boolean;
};

export type NavAttrs = {
  brand?: Children;
  itemsLeft?: NavLink[];
  itemsRight?: NavLink[];
  class?: string;
  style?: string;
};

function renderItem(it: NavLink): Children {
  if (it.href) {
    return m(
      "a",
      { href: it.href, class: it.active ? "active" : undefined, onclick: it.onclick as any },
      it.label
    );
  }
  if (it.onclick) {
    // explicit button intent
    return m("button.btn.ghost", { onclick: it.onclick as any }, it.label);
  }
  // arbitrary vnode or plain text — render as-is (wrap plain text in <span>)
  if (typeof it.label === "string" || typeof it.label === "number") {
    return m("span", it.label as any);
  }
  return it.label as Vnode<any, any>;
}

function renderList(items?: NavLink[]) {
  return m("ul", (items ?? []).map((it) => m("li", renderItem(it))));
}

export const Nav: Component<NavAttrs> = {
  view: ({ attrs }) =>
    m(
      "nav",
      { class: ["nav", attrs.class].filter(Boolean).join(" "), style: attrs.style },
      [m("ul", [
        attrs.brand && m("li", attrs.brand),
        ...(attrs.itemsLeft ?? []).map((it) => m("li", renderItem(it))),
      ]),
      renderList(attrs.itemsRight)]
    ),
};
