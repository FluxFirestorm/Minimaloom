import m from "mithril";
import { Button, Modal } from "../../components";
import { CodeExample } from "../lib/CodeExample";

const modalHTML = `<dialog open>
  <article>
    <header class="modal-header">
      <p><strong>🗓️ Thank You for Registering!</strong></p>
      <button aria-label="Close" rel="prev"></button>
    </header>
    <p>We're excited to have you join us for our upcoming event. Please arrive at the museum 
    on time to check in and get started.</p>
    <ul>
      <li>Date: Saturday, April 15</li>
      <li>Time: 10:00am - 12:00pm</li>
    </ul>
  </article>
</dialog>`.trim();

const modalTS = `import m from "mithril";
import { Modal, Button } from "your-lib";

const Demo: m.Component = {
  oninit: (v)=> v.state.open = false,
  view: (v) => m("div.stack", [
    m(Button, { variant:"primary", onclick: ()=> (v.state.open = true) }, "Open modal"),
    m(Modal, {
      open: v.state.open,
      onClose: ()=> (v.state.open = false),
      header: m("strong", "🗓️ Thank You for Registering!")
    }, [
      m("p", "We're excited to have you join us for our upcoming event. Please arrive at the museum on time to check in and get started."),
      m("ul", [ m("li","Date: Saturday, April 15"), m("li","Time: 10:00am - 12:00pm") ])
    ])
  ])
};`.trim();

export const ModalsSection: m.Component = {
  oninit: (v) => (v.state as any).open = false,
  view(v) {
    const s = v.state as { open: boolean };
    return m("article#modals.stack",
      m(CodeExample, {
        title: "Modal",
        live: [
          m(Button, { variant: "primary", onclick: () => (s.open = true) }, "Open modal"),
          m(Modal, {
            open: s.open,
            onClose: () => (s.open = false),
            header: m("strong", "🗓️ Thank You for Registering!")
          }, [
            m("p",
              "We're excited to have you join us for our upcoming event. Please arrive at the museum ",
              "on time to check in and get started."
            ),
            m("ul", [ m("li","Date: Saturday, April 15"), m("li","Time: 10:00am - 12:00pm") ])
          ])
        ],
        html: modalHTML,
        ts: modalTS
      })
    );
  }
};
