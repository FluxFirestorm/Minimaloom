import m, { Component, Children, Vnode, VnodeDOM } from "mithril";

export type ModalSize =
  | "xs" | "sm" | "md" | "lg" | "xl";

export type ModalPlacement =
  | "top-left" | "top-center" | "top-right"
  | "center-left" | "center" | "center-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

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

  /** Optional header controls (advanced header API – safe to ignore) */
  headerDense?: boolean;
  headerMaxWidth?: string;      // CSS length, e.g. "32ch"
  headerAlign?: "start" | "center" | "end";
};

type State = {
  closing?: boolean;
  requestClose?: () => void;
};

export const Modal: Component<ModalAttrs, State> = {
  oncreate(vnode: VnodeDOM<ModalAttrs, State>) {
    const dlg = vnode.dom as HTMLDialogElement;
    const state = vnode.state;

    state.requestClose = () => {
      if (state.closing) return;
      state.closing = true;
      vnode.attrs.onClose?.();
      if (dlg.open) dlg.close();
    };

    // Initial sync of open state
    if (vnode.attrs.open) {
      if (!dlg.open) dlg.showModal();
    } else if (dlg.open) {
      dlg.close();
    }

    // ESC -> close
    const onCancel = (e: Event) => {
      e.preventDefault();
      state.requestClose!();
    };
    dlg.addEventListener("cancel", onCancel);

    // Backdrop click -> close
    const onClick = (e: MouseEvent) => {
      if (vnode.attrs.backdropClose !== false && e.target === dlg) state.requestClose!();
    };
    dlg.addEventListener("click", onClick);

    (state as any).__rm = () => {
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("click", onClick);
    };
  },

  onupdate(vnode: VnodeDOM<ModalAttrs, State>) {
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

  onremove(vnode: VnodeDOM<ModalAttrs, State>) {
    (vnode.state as any).__rm?.();
  },

  view(vnode: Vnode<ModalAttrs, State>) {
    const { attrs, children, state } = vnode;

    const bodyClass = ["card", "stack", attrs.class].filter(Boolean).join(" ");
    const sizeAttr =
      attrs.fullscreen ? undefined : (attrs.size ?? "md");
    const posAttr =
      attrs.fullscreen ? undefined : (attrs.placement ?? "center");

    // Build style string, injecting --modal-w if maxWidth is provided.
    const styleStr =
      (attrs.style ? (attrs.style.endsWith(";") ? attrs.style : attrs.style + ";") : "") +
      (attrs.maxWidth ? `--modal-w:${attrs.maxWidth};` : "") +
      (attrs.headerMaxWidth ? `--modal-header-max:${attrs.headerMaxWidth};` : "");

    // Optional header density / alignment attributes are reflected as data/class
    const headerData: Record<string, any> = {};
    if (attrs.headerAlign) headerData["data-align"] = attrs.headerAlign;
    const headerClass = ["modal-header", attrs.headerDense ? "is-dense" : ""].filter(Boolean).join(" ");

    return m(
      "dialog",
      {
        "data-fullscreen": attrs.fullscreen ? "true" : undefined,
        "data-size": sizeAttr,
        "data-pos": posAttr,
      },
      [
        m("article", { class: bodyClass, style: styleStr || undefined }, [
          m("header", { class: headerClass, ...headerData }, [
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
