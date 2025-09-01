import m, { Component, Children, Vnode } from "mithril";

export type ModalSize =
  | "xs" | "sm" | "md" | "lg" | "xl";

export type ModalPlacement =
  | "top-left" | "top-center" | "top-right"
  | "center-left" | "center" | "center-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export type HeaderAlign = "start" | "center" | "end";

/** Set max width with presets or override using `maxWidth` (CSS length). */
export type ModalAttrs = {
  open?: boolean;
  onClose?: () => void;
  backdropClose?: boolean;
  class?: string;
  style?: string;
  header?: Children;

  /** Fullscreen variant (ignores size/placement). */
  fullscreen?: boolean;

  /** Width preset (default "md" for non-fullscreen). */
  size?: ModalSize;

  /** Custom width cap for non-fullscreen, e.g. "64rem" or "900px". */
  maxWidth?: string;

  /** Where to place the card in the viewport (default "center"). */
  placement?: ModalPlacement;

  /** Max width of the header container (e.g. "36ch", "28rem", "480px"). */
  headerMaxWidth?: string;

  /** Optional denser header padding. */
  headerDense?: boolean;

  /** Align the header block when `headerMaxWidth` is set. */
  headerAlign?: HeaderAlign; // default "start"
};

type State = {
  closing?: boolean;
  requestClose?: () => void;
};

export const Modal: Component<ModalAttrs, State> = {
  oncreate(vnode: Vnode<ModalAttrs, State>) {
    const dlg = vnode.dom as HTMLDialogElement;
    const state = vnode.state;

    state.requestClose = () => {
      if (state.closing) return;
      state.closing = true;
      vnode.attrs.onClose?.();
      if (dlg.open) dlg.close();
    };

    if (vnode.attrs.open) {
      if (!dlg.open) dlg.showModal();
    } else if (dlg.open) {
      dlg.close();
    }

    const onCancel = (e: Event) => {
      e.preventDefault();
      state.requestClose!();
    };
    dlg.addEventListener("cancel", onCancel);

    const onClick = (e: MouseEvent) => {
      if (vnode.attrs.backdropClose !== false && e.target === dlg) state.requestClose!();
    };
    dlg.addEventListener("click", onClick);

    (state as any).__rm = () => {
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("click", onClick);
    };
  },

  onupdate(vnode: Vnode<ModalAttrs, State>) {
    const dlg = vnode.dom as HTMLDialogElement;
    const { open } = vnode.attrs;
    const state = vnode.state;

    if (open) {
      if (!dlg.open && !state.closing) dlg.showModal();
    } else {
      if (dlg.open) dlg.close();
      state.closing = false;
    }
  },

  onremove(vnode) {
    (vnode.state as any).__rm?.();
  },

  view(vnode) {
    const { attrs, children, state } = vnode;

    const bodyClass = ["card", "stack", attrs.class].filter(Boolean).join(" ");
    const sizeAttr = attrs.fullscreen ? undefined : (attrs.size ?? "md");
    const posAttr  = attrs.fullscreen ? undefined : (attrs.placement ?? "center");

    // --modal-w (card width) and header variables live on their respective elements
    const articleStyle =
      (attrs.style ? (attrs.style.endsWith(";") ? attrs.style : attrs.style + ";") : "") +
      (attrs.maxWidth ? `--modal-w:${attrs.maxWidth};` : "");

    // Header style: clamp width and choose alignment
    const headerStyleParts: string[] = [];
    if (attrs.headerMaxWidth) headerStyleParts.push(`--modal-header-max:${attrs.headerMaxWidth}`);
    const headerStyle = headerStyleParts.length ? headerStyleParts.join(";") + ";" : undefined;

    const headerClass =
      ["modal-header", attrs.headerDense ? "is-dense" : null].filter(Boolean).join(" ");

    const headerAlign = attrs.headerAlign ?? "start";

    return m(
      "dialog",
      {
        "data-fullscreen": attrs.fullscreen ? "true" : undefined,
        "data-size": sizeAttr,
        "data-pos": posAttr,
      },
      [
        m("article", { class: bodyClass, style: articleStyle || undefined }, [
          m("header", {
            class: headerClass,                 // "modal-header" + optional "is-dense"
            style: headerStyle,                 // sets --modal-header-max if provided
            "data-align": headerAlign           // "start" | "center" | "end"
          }, [
            // NEW: inner wrapper that gets width clamp & text alignment
            m("div.modal-head-inner",
              attrs.header ? m("p", attrs.header) : null
            ),
            m("button", {
              "aria-label": "Close",
              rel: "prev",
              onclick: (e: MouseEvent) => {
                e.preventDefault();
                (state.requestClose ??
                  (() => {
                    attrs.onClose?.();
                    const dlg = (e.currentTarget as HTMLElement).closest("dialog") as HTMLDialogElement | null;
                    if (dlg?.open) dlg.close();
                  }))();
              },
            }),
          ]),
          m("div.modal-content", children as Children),
        ]),
      ],
    );
  },
};
