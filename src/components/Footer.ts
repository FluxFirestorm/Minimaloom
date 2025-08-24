import m, { Component, Children } from "mithril";
import { Container } from "./Container";

export type FooterAttrs = {
  sticky?: boolean;    // true => sticky-bottom
  container?: "sm" | "md" | "lg";
  class?: string;
  style?: string;
};

export const Footer: Component<FooterAttrs> = {
  view: ({attrs, children}) =>
    m("footer", { class: [attrs.sticky ? "sticky-bottom" : "", attrs.class, "card"].filter(Boolean).join(" "),
                  style: attrs.style },
      m(Container, { size: attrs.container }, children as Children))
};
