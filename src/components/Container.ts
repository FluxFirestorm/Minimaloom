import m, { Component, Children, Vnode } from "mithril";

export type ContainerSize = "sm" | "md" | "lg";
export type ContainerAttrs = {
  /** Size token mapped to container classes. Default "md". */
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

    // map size token to one of the provided container classes
    const size = attrs.max ?? "md";
    const sizeClass =
      size === "sm" ? "container-sm" :
      size === "lg" ? "container-lg" :
      "container";

    const className = [sizeClass, attrs.class].filter(Boolean).join(" ") || undefined;

    return m(tag as any, { class: className, style: attrs.style }, children as Children);
  }
};
