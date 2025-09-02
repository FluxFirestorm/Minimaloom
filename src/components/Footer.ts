import m, { Component, Children, Vnode } from "mithril";
import { Container } from "./Container";

export type FooterAttrs = {
  sticky?: boolean;    // true => sticky-bottom
  container?: "sm" | "md" | "lg";
  class?: string;
  style?: string;
};

export const Footer: Component<FooterAttrs> = {
  view: (vnode: Vnode<FooterAttrs>) => {
    const { attrs, children } = vnode;
    const className = [attrs.sticky ? "sticky-bottom" : "", attrs.class, "card"]
      .filter(Boolean).join(" ");
    return m("footer", { class: className, style: attrs.style },
      // use max: instead of size:
      m(Container, { max: attrs.container }, children as Children)
    );
  }
};
