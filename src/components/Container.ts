import m, { Component, Children, Vnode } from "mithril";

export type ContainerSize = "sm" | "md" | "lg";

export type ContainerAttrs = {
  /** Preferred prop: maps to container classes. Default "md". */
  max?: ContainerSize;
  /** Optional extra classes */
  class?: string;
  /** Optional inline styles */
  style?: string;
  /** Optional tag name to render as (div/section/main/etc.) */
  as?: string;
};

export const Container: Component<ContainerAttrs> = {
  view(vnode: Vnode<ContainerAttrs>) {
    const { attrs, children } = vnode;
    const tag = attrs.as ?? "div";

    const token = attrs.max ?? "md";
    const sizeClass =
      token === "sm" ? "container-sm" :
      token === "lg" ? "container-lg" :
      "container";

    const className = [sizeClass, attrs.class].filter(Boolean).join(" ") || undefined;

    return m(tag as any, { class: className, style: attrs.style }, children as Children);
  }
};
