import m, { Component, Children } from "mithril";

export type ContainerAttrs = {
  size?: "sm" | "md" | "lg";  // default md (your .container)
  class?: string;
  style?: string;
};

function sizeClass(size?: ContainerAttrs["size"]) {
  switch (size) {
    case "sm": return "container-sm";
    case "lg": return "container-lg";
    default:   return "container";
  }
}

export const Container: Component<ContainerAttrs> = {
  view: ({attrs, children}: {attrs: ContainerAttrs; children: Children}) =>
    m("div", { class: [sizeClass(attrs.size), attrs.class].filter(Boolean).join(" "), style: attrs.style }, children)
};
