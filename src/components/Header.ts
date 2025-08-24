import m, { Component, Children } from "mithril";
import { Container } from "./Container";

export type HeaderAttrs = {
  sticky?: boolean;     // true => sticky-top
  container?: "sm" | "md" | "lg";
  class?: string;
  style?: string;
};

export const Header: Component<HeaderAttrs> = {
  view: ({attrs, children}) =>
    m("header", { class: [attrs.sticky ? "sticky-top" : "", attrs.class, "card"].filter(Boolean).join(" "),
                  style: attrs.style },
      m(Container, { size: attrs.container }, children as Children))
};
