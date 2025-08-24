import m, { Component, Children } from "mithril";

export type FormAttrs = {
  onsubmit?: (e: Event) => void; // call e.preventDefault() in your handler if you want SPA behavior
  class?: string;
  style?: string;
  cols?: number;  // when using inline fields (applies to .fields-inline)
};

export const Form: Component<FormAttrs> = {
  view: ({attrs, children}) =>
    m("form", {
      class: ["stack", attrs.class].filter(Boolean).join(" "),
      style: attrs.style,
      onsubmit: attrs.onsubmit
    }, children as Children)
};

/** A simple 2+ column inline field wrapper */
export const InlineFields: Component<{ cols?: number; class?: string; style?: string }> = {
  view: ({attrs, children}) =>
    m("div", { class: ["fields-inline", attrs.class].filter(Boolean).join(" "),
               style: `--cols:${attrs.cols ?? 2};${attrs.style ?? ""}` }, children as Children)
};
