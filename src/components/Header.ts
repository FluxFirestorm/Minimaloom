import m, { Component, Children, Vnode } from "mithril";
import { Container } from "./Container";

export type HeaderAttrs = {
  sticky?: boolean;     // true => sticky-top
  container?: "sm" | "md" | "lg";
  class?: string;
  style?: string;
};

export const Header: Component<HeaderAttrs> = {
  view: (vnode: Vnode<HeaderAttrs>) => {
    const { attrs, children } = vnode;
    const className = [attrs.sticky ? "sticky-top" : "", attrs.class, "card"]
      .filter(Boolean).join(" ");
    return m("header", { class: className, style: attrs.style },
      // use max: instead of size:
      m(Container, { max: attrs.container }, children as Children)
    );
  }
};
