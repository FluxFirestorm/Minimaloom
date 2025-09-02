import m from "mithril";
import { Button, Modal } from "../../components";
import { CodeExample } from "../lib/CodeExample";

const presetTS = `import m from "mithril";
import { Modal, Button } from "minimaloom";

const Presets: m.Component = {
  oninit: v => Object.assign(v.state, { xs:false, md:false, lg:false }),
  view: v => m("div.grid", { style:"grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;" }, [
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).xs = true }, "Open XS"),
      m(Modal, { open:(v.state as any).xs, onClose: ()=> (v.state as any).xs=false, size:"xs",
                 header: m("strong","Alert") },
        [ m("p","Small, focused content.") ])
    ]),
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).md = true }, "Open MD (default)"),
      m(Modal, { open:(v.state as any).md, onClose: ()=> (v.state as any).md=false, size:"md",
                 header: m("strong","Modal Title") },
        [ ...Array.from({length: 12}, (_,i)=> m("p","Paragraph " + (i+1))) ])
    ]),
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).lg = true }, "Open LG"),
      m(Modal, { open:(v.state as any).lg, onClose: ()=> (v.state as any).lg=false, size:"lg",
                 header: m("strong","Wider content") },
        [ m("p","Good for two-column forms or media.") ])
    ])
  ])
};`.trim();

const customTS = `import m from "mithril";
import { Modal, Button } from "minimaloom";

const CustomWidth: m.Component = {
  oninit: v => (v.state as any).open = false,
  view: v => m("div.stack", [
    m(Button, { onclick: ()=> (v.state as any).open = true }, "Open 64rem modal"),
    m(Modal, {
      open: (v.state as any).open,
      onClose: ()=> (v.state as any).open = false,
      // override preset with a CSS length:
      maxWidth: "64rem",
      header: m("strong","Designer-intent width (64rem)")
    }, [
      m("p", "Use maxWidth for tables or code that would feel cramped otherwise.")
    ])
  ])
};`.trim();

const fullscreenTS = `import m from "mithril";
import { Modal, Button } from "minimaloom";

const FullscreenDemo: m.Component = {
  oninit: v => (v.state as any).open = false,
  view: v => m("div.stack", [
    m(Button, { onclick: ()=> (v.state as any).open = true }, "Open fullscreen"),
    m(Modal, {
      open: (v.state as any).open,
      fullscreen: true,
      onClose: ()=> (v.state as any).open = false,
      header: m("strong","Schedule Overview")
    }, [
      ...Array.from({length: 40}, (_,i)=> m("p","Row " + (i+1)))
    ])
  ])
};`.trim();

/* Placement demo snippet (TL / TC / default center / BC / BR) */
const placementsTS = `import m from "mithril";
import { Modal, Button } from "minimaloom";

const Placements: m.Component = {
  oninit: v => Object.assign(v.state, { tl:false, tc:false, c:false, bc:false, br:false }),
  view: v => m("div.grid", { style:"grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;" }, [
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).tl = true }, "Top-left"),
      m(Modal, { open:(v.state as any).tl, onClose: ()=> (v.state as any).tl=false,
                 size:"sm", placement:"top-left",
                 header: m("strong","Top-left") },
        [ m("p","Placed via placement=\\"top-left\\".") ])
    ]),
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).tc = true }, "Top-center"),
      m(Modal, { open:(v.state as any).tc, onClose: ()=> (v.state as any).tc=false,
                 size:"sm", placement:"top-center",
                 header: m("strong","Top-center") },
        [ m("p","Placed via placement=\\"top-center\\".") ])
    ]),
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).c = true }, "Center (default)"),
      m(Modal, { open:(v.state as any).c, onClose: ()=> (v.state as any).c=false,
                 size:"sm",
                 /* omit placement to demonstrate default center */
                 header: m("strong","Centered") },
        [ m("p","This uses the default centered placement.") ])
    ]),
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).bc = true }, "Bottom-center"),
      m(Modal, { open:(v.state as any).bc, onClose: ()=> (v.state as any).bc=false,
                 size:"sm", placement:"bottom-center",
                 header: m("strong","Bottom-center") },
        [ m("p","Placed via placement=\\"bottom-center\\".") ])
    ]),
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).br = true }, "Bottom-right"),
      m(Modal, { open:(v.state as any).br, onClose: ()=> (v.state as any).br=false,
                 size:"sm", placement:"bottom-right",
                 header: m("strong","Bottom-right") },
        [ m("p","Placed via placement=\\"bottom-right\\".") ])
    ]),
  ])
};`.trim();

/* Header width / alignment / density demo */
const headerTS = `import m from "mithril";
import { Modal, Button } from "minimaloom";

const HeaderWidthDemo: m.Component = {
  oninit: v => Object.assign(v.state, { a:false, b:false, c:false }),
  view: v => m("div.grid", { style:"grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;" }, [
    // Dense, left-aligned header
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).a = true }, "Narrow (start)"),
      m(Modal, {
        open:(v.state as any).a, onClose: ()=> (v.state as any).a=false,
        size:"md",
        headerDense:true,
        headerMaxWidth:"32ch",
        headerAlign:"start",
        header: m("strong","A compact, left-aligned header")
      }, [
        m("p","Body text wraps to the full card width; only the header is constrained.")
      ])
    ]),

    // Dense header, centered header
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).b = true }, "Narrow (center)"),
      m(Modal, {
        open:(v.state as any).b, onClose: ()=> (v.state as any).b=false,
        size:"md",
        headerDense:true,
        headerMaxWidth:"36ch",
        headerAlign:"center",
        header: m("strong","A nicely centered, narrow title")
      }, [
        m("p","Use this when very long titles feel visually heavy.")
      ])
    ]),

    // Dense header with end alignment
    m("div.stack", [
      m(Button, { onclick: ()=> (v.state as any).c = true }, "Dense (end)"),
      m(Modal, {
        open:(v.state as any).c, onClose: ()=> (v.state as any).c=false,
        size:"sm",
        headerDense:true,
        headerMaxWidth:"24rem",
        headerAlign:"end",
        header: m("strong","Settings")
      }, [
        m("p","End-aligned, compact header. Useful for utility dialogs.")
      ])
    ]),
  ])
};`.trim();

export const ModalsSection: m.Component = {
  oninit(v) {
    Object.assign(v.state, {
      xs:false, md:false, lg:false,
      custom:false, full:false,
      tl:false, tc:false, c:false, bc:false, br:false, // placement demos
      a:false, b:false, c2:false                       // header demos (a, b, c2 used below)
    });
  },

  view(v) {
    const s = v.state as any;
    return m("article#modals.stack",

      // Presets demo (XS / MD / LG)
      m(CodeExample, {
        title: "Modal widths (presets)",
        live: [
          m("div.grid", { style:"grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;" }, [
            m("div.stack", [
              m(Button, { onclick: ()=> (s.xs = true) }, "Open XS"),
              m(Modal, { open:s.xs, onClose: ()=> (s.xs=false), size:"xs",
                         header: m("strong","Alert") },
                [ m("p","Small, focused content.") ])
            ]),
            m("div.stack", [
              m(Button, { onclick: ()=> (s.md = true) }, "Open MD (default)"),
              m(Modal, { open:s.md, onClose: ()=> (s.md=false), size:"md",
                         header: m("strong","Modal Title") },
                [ ...Array.from({length: 40}, (_,i)=> m("p","Paragraph " + (i+1))) ])
            ]),
            m("div.stack", [
              m(Button, { onclick: ()=> (s.lg = true) }, "Open LG"),
              m(Modal, { open:s.lg, onClose: ()=> (s.lg=false), size:"lg",
                         header: m("strong","Wider content") },
                [ m("p","Good for two-column forms or media.") ])
            ]),
          ])
        ],
        ts: presetTS
      }),

      // Custom width demo
      m(CodeExample, {
        title: "Modal width (custom)",
        live: [
          m(Button, { onclick: ()=> (s.custom = true) }, "Open 64rem modal"),
          m(Modal, {
            open: s.custom,
            onClose: ()=> (s.custom=false),
            maxWidth: "64rem",
            header: m("strong","Designer-intent width (64rem)")
          }, [
            m("p", "Use maxWidth sparingly for dense tables or code.")
          ])
        ],
        ts: customTS
      }),

      // Placement demo (top-left / top-center / center default / bottom-center / bottom-right)
      m(CodeExample, {
        title: "Modal placement",
        live: [
          m("div.grid", { style:"grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;" }, [
            m("div.stack", [
              m(Button, { onclick: ()=> (s.tl = true) }, "Top-left"),
              m(Modal, {
                open: s.tl, onClose: ()=> (s.tl=false),
                size:"sm", placement:"top-left",
                header: m("strong","Top-left")
              }, [ m("p","Placed via placement=\"top-left\".") ])
            ]),
            m("div.stack", [
              m(Button, { onclick: ()=> (s.tc = true) }, "Top-center"),
              m(Modal, {
                open: s.tc, onClose: ()=> (s.tc=false),
                size:"sm", placement:"top-center",
                header: m("strong","Top-center")
              }, [ m("p","Placed via placement=\"top-center\".") ])
            ]),
            m("div.stack", [
              m(Button, { onclick: ()=> (s.c = true) }, "Center (default)"),
              m(Modal, {
                open: s.c, onClose: ()=> (s.c=false),
                size:"sm",
                header: m("strong","Centered")
              }, [ m("p","This uses the default centered placement.") ])
            ]),
            m("div.stack", [
              m(Button, { onclick: ()=> (s.bc = true) }, "Bottom-center"),
              m(Modal, {
                open: s.bc, onClose: ()=> (s.bc=false),
                size:"sm", placement:"bottom-center",
                header: m("strong","Bottom-center")
              }, [ m("p","Placed via placement=\"bottom-center\".") ])
            ]),
            m("div.stack", [
              m(Button, { onclick: ()=> (s.br = true) }, "Bottom-right"),
              m(Modal, {
                open: s.br, onClose: ()=> (s.br=false),
                size:"sm", placement:"bottom-right",
                header: m("strong","Bottom-right")
              }, [ m("p","Placed via placement=\"bottom-right\".") ])
            ]),
          ])
        ],
        ts: placementsTS
      }),

      // Header width / alignment / density
      m(CodeExample, {
        title: "Header width & alignment",
        live: [
          m("div.grid", { style:"grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;" }, [
            // Narrow, start-aligned
            m("div.stack", [
              m(Button, { onclick: ()=> (s.a = true) }, "Dense (start)"),
              m(Modal, {
                open: s.a, onClose: ()=> (s.a=false),
                size:"md",
                headerDense:true,
                headerMaxWidth:"32ch",
                headerAlign:"start",
                header: m("strong","A compact, left-aligned header")
              }, [
                m("p","Only the header is width-clamped; the body uses the card width.")
              ])
            ]),
            // Narrow, centered
            m("div.stack", [
              m(Button, { onclick: ()=> (s.b = true) }, "Dense (center)"),
              m(Modal, {
                open: s.b, onClose: ()=> (s.b=false),
                size:"md",
                headerDense:true,
                headerMaxWidth:"36ch",
                headerAlign:"center",
                header: m("strong","A nicely centered, narrow title")
              }, [
                m("p","Great when long titles feel visually heavy.")
              ])
            ]),
            // Dense, end-aligned
            m("div.stack", [
              m(Button, { onclick: ()=> (s.c2 = true) }, "Dense (end)"),
              m(Modal, {
                open: s.c2, onClose: ()=> (s.c2=false),
                size:"sm",
                headerDense:true,
                headerMaxWidth:"24rem",
                headerAlign:"end",
                header: m("strong","Settings")
              }, [
                m("p","Compact header padding and end alignment for utility dialogs.")
              ])
            ]),
          ])
        ],
        ts: headerTS
      }),

      // Fullscreen
      m(CodeExample, {
        title: "Modal (Fullscreen)",
        live: [
          m(Button, { onclick: ()=> (s.full = true) }, "Open fullscreen"),
          m(Modal, {
            open: s.full,
            fullscreen: true,
            onClose: ()=> (s.full=false),
            header: m("strong","Schedule Overview")
          }, [
            ...Array.from({length: 40}, (_,i)=> m("p","Row " + (i+1)))
          ])
        ],
        ts: fullscreenTS
      })
    );
  }
};
