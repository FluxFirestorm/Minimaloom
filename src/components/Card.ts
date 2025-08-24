import m, { Component, Children } from "mithril";

export type CardAttrs = {
  as?: keyof HTMLElementTagNameMap; // article, section, div…
  title?: string;
  class?: string;
  style?: string;
  header?: Children; // optional custom header node(s)
  footer?: Children; // optional custom footer node(s)
};

export const Card: Component<CardAttrs> = {
  view: ({attrs, children}) => {
    const tag = attrs.as ?? "article";
    return m(tag, { class: ["card", attrs.class].filter(Boolean).join(" "), style: attrs.style }, [
      attrs.header && m("header", { class: "stack mb-2" }, attrs.header),
      attrs.title  && m("h3", attrs.title),
      children,
      attrs.footer && m("footer", { class: "mt-3" }, attrs.footer),
    ]);
  }
};
