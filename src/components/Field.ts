import m, { Component, Children } from "mithril";

export type FieldAttrs = {
  label?: string;
  for?: string;             // htmlFor id
  hint?: string | Children; // small helper text
  class?: string;
  style?: string;
};

export const Field: Component<FieldAttrs> = {
  view: ({attrs, children}) =>
    m("div", { class: ["field", attrs.class].filter(Boolean).join(" "), style: attrs.style }, [
      attrs.label && m("label", { for: attrs.for }, attrs.label),
      children as Children,
      attrs.hint && m("small", attrs.hint)
    ])
};
