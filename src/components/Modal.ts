import m, { Component, Children, Vnode } from "mithril";

export type ModalAttrs = {
  /** Controlled open/closed state */
  open?: boolean;
  /** Called when a close is requested (ESC, backdrop, close button) */
  onClose?: () => void;
  /** Click backdrop to close (default: true) */
  backdropClose?: boolean;
  /** Extra classes/styles on the <article> (modal body) */
  class?: string;
  style?: string;
  /** Optional header content (rendered inside <header>) */
  header?: Children;
};

type State = {
  closing?: boolean;
  requestClose?: () => void;
};

export const Modal: Component<ModalAttrs, State> = {
  oncreate(vnode: Vnode<ModalAttrs, State>) {
    const dlg = vnode.dom as HTMLDialogElement;
    const state = vnode.state;

    // Unified close path: tell parent first (flip open=false), then hide dialog.
    state.requestClose = () => {
      if (state.closing) return;
      state.closing = true;
      vnode.attrs.onClose?.();
      if (dlg.open) dlg.close();
    };

    // Initial sync
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

    // Cleanup
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
      // Only (re)open if we're not mid-close
      if (!dlg.open && !state.closing) dlg.showModal();
    } else {
      if (dlg.open) dlg.close();
      // Parent has acknowledged the close
      state.closing = false;
    }
  },

  onremove(vnode) {
    (vnode.state as any).__rm?.();
  },

  view(vnode) {
    const { attrs, children, state } = vnode;
    const bodyClass = ["card", "stack", attrs.class].filter(Boolean).join(" ");

    return m("dialog", [
      m("article", { class: bodyClass, style: attrs.style }, [
        // One-line header: title on the left, close button on the right
        m("header.modal-header", [
          attrs.header ? m("p", attrs.header) : null,
          m("button", {
            "aria-label": "Close",
            rel: "prev",
            onclick: (e: MouseEvent) => {
              e.preventDefault();
              // unified close path
              (state.requestClose ?? (() => {
                attrs.onClose?.();
                const dlg = (e.currentTarget as HTMLElement).closest("dialog") as HTMLDialogElement | null;
                if (dlg?.open) dlg.close();
              }))();
            },
          }),
        ]),
        children as Children,
      ]),
    ]);
  },
};
