import m, { Component, Children } from "mithril";

export type ButtonVariant = "default" | "primary" | "ghost";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

export type ButtonAttrs = {
  variant?: ButtonVariant;
  size?: ButtonSize;                // default: "md"
  icon?: boolean;                   // square icon button
  type?: "button" | "submit" | "reset";
  class?: string;
  disabled?: boolean;
  onclick?: (e: MouseEvent) => void;
  style?: string;
};

export const Button: Component<ButtonAttrs> = {
  view: ({ attrs, children }) => {
    const variant = attrs.variant ?? "default";
    const size = attrs.size ?? "md";
    const classes = [
      "btn",
      variant !== "default" ? variant : "",
      size !== "md" ? size : "",
      attrs.icon ? "icon" : "",
      attrs.class
    ].filter(Boolean).join(" ");

    return m("button", {
      type: attrs.type ?? "button",
      disabled: attrs.disabled,
      onclick: attrs.onclick,
      style: attrs.style,
      class: classes
    }, children as Children);
  }
};
