import m, { Component } from "mithril";
import { ImageCard, ImageCardAttrs } from "./ImageCard";

export type ImageGridItem = Omit<ImageCardAttrs, "class" | "style">;

export type ImageGridAttrs = {
  items: ImageGridItem[];
  min?: string;         // min column width (CSS length), default "14rem"
  gapClass?: string;
  class?: string;
  style?: string;
  /** optional grid-level default fit passed to items without an explicit fit */
  fit?: "cover" | "contain";
  /** optional grid-level default ratio passed to items without an explicit ratio */
  ratio?: `${number}/${number}` | number | "auto";
};

export const ImageGrid: Component<ImageGridAttrs> = {
  view: ({ attrs }) => {
    const { items, min = "14rem", class: cls, style, gapClass, fit, ratio } = attrs;
    return m("div", {
      class: ["image-grid", gapClass || "", cls].filter(Boolean).join(" "),
      style: `--min:${min};${style ?? ""}`
    }, items.map((it) =>
      m(ImageCard, {
        ...it,
        fit: it.fit ?? fit,
        ratio: it.ratio ?? ratio,
      })
    ));
  }
};
