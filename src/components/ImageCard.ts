import m, { Component, Children } from "mithril";

export type ImageCardAttrs = {
  id: string;
  src: string;
  alt?: string;
  title?: Children;
  meta?: Children;
  selected?: boolean;
  selectable?: boolean;
  onToggleSelect?: (id: string, next: boolean) => void;
  toolbarEnd?: Children;
  class?: string;
  style?: string;
  /** aspect ratio of the thumbnail box; e.g. "4/3", 1, 16/9, or "auto" */
  ratio?: `${number}/${number}` | number | "auto";
  /** how the image fits inside the thumb box; default "cover" */
  fit?: "cover" | "contain";
};

export const ImageCard: Component<ImageCardAttrs> = {
  view: ({ attrs }) => {
    const {
      id, src, alt,
      title, meta,
      selected,
      selectable = true,
      onToggleSelect,
      toolbarEnd,
      class: cls,
      style,
      ratio,
      fit = "cover",
    } = attrs;

    const ratioStyle =
      ratio === undefined ? undefined :
      ratio === "auto" ? "aspect-ratio: auto" :
      `aspect-ratio:${ratio}`;

    return m("article", {
      class: ["card", "image-card", cls].filter(Boolean).join(" "),
      "data-selected": selected ? "true" : "false",
      "data-fit": fit,
      style
    }, [
      // toolbar
      m("div.toolbar.cluster.justify-between.items-center", [
        selectable
          ? m("label.choice", [
              m("input[type=checkbox]", {
                checked: !!selected,
                onchange: (e: Event) => onToggleSelect?.(id, (e.target as HTMLInputElement).checked)
              }),
              " Select"
            ])
          : m("span"),
        m("div.cluster.gap-1", toolbarEnd)
      ]),

      // thumb
      m("figure.thumb.m-0", { style: ratioStyle }, [
        m("img", { src, alt: alt || "", loading: "lazy" })
      ]),

      // meta
      (title || meta) &&
        m("div.p-2.stack", [
          title && m("strong", title),
          meta && m("small", meta)
        ])
    ]);
  }
};
