import m from "mithril";
import { paintSwatches, readVar, setVar, tokenKeys } from "../lib/dom";

const tokenRefOrder = [
  "--bg","--surface","--text","--muted","--border","--accent",
  "--radius",
  "--space-1","--space-2","--space-3","--space-4","--space-5","--space-6","--space-7","--space-8",
  "--container-sm","--container-md","--container-lg"
];

const notes: Record<string,string> = {
  "--bg":"Page background",
  "--surface":"Panels / cards",
  "--text":"Body text color",
  "--muted":"Secondary text",
  "--border":"Thin borders",
  "--accent":"Brand / primary",
  "--radius":"Corner radius (px/rem)",
  "--space-1":"Spacing scale",
  "--space-2":"Spacing scale",
  "--space-3":"Spacing scale",
  "--space-4":"Spacing scale",
  "--space-5":"Spacing scale",
  "--space-6":"Spacing scale",
  "--space-7":"Spacing scale",
  "--space-8":"Spacing scale",
  "--container-sm":"Container clamp",
  "--container-md":"Container clamp",
  "--container-lg":"Container clamp",
};

export const Tokens: m.Component = {
  oncreate: () => setTimeout(paintSwatches, 0),
  onupdate: () => setTimeout(paintSwatches, 0),
  view() {
    return m("section#tokens.stack", [
      m("h2", "Design tokens"),
      m("p", ["Edit tokens live. Changes update the page via CSS variables on ", m("code", ":root"), "."]),
      m("div.grid.md-3", [
        // color pickers
        m(
          "div.stack",
          tokenKeys
            .filter((k) => k !== "--radius")
            .map((k) =>
              m("label.choice", [
                m("span", k),
                m("input[type=color]", {
                  "data-token": k,
                  value: "#000000",
                  oninput: (e: InputEvent) => setVar(k, (e.target as HTMLInputElement).value),
                }),
              ])
            )
        ),

        // swatches
        m("div.stack", [
          m(
            "div.swatches",
            ["--bg", "--surface", "--text", "--border", "--accent"].map((name) =>
              m("div.swatch", { "data-swatch": name }, m("span", name.replace("--", "")))
            )
          ),
          m("small", ["These reflect the current values on ", m("code", ":root"), "."]),
        ]),

        // radius + spacing note
        m("div.stack", [
          m("h3", "Radius and spacing"),
          m("label.choice", [
            m("span", "--radius"),
            m('input#radiusRange[type=range][min=0][max=24][step=1]', {
              value: parseInt(readVar("--radius") || "8", 10),
              oninput: (e: InputEvent) => {
                const n = (e.target as HTMLInputElement).value;
                setVar("--radius", `${n}px`);
                const out = document.getElementById("radiusOut");
                if (out) out.textContent = `${n}px`;
              },
            }),
            m("output#radiusOut", readVar("--radius") || "8px"),
          ]),
          m("p.m-0", m("small", ["Utilities use ", m("code", "--space-1..8"), ". Override in ", m("code", "_config.scss"), "."])),
        ]),
      ]),

      // --- Reference block ---
      m("details", [
        m("summary", "Token reference (current values)"),
        m("table", [
          m("thead", m("tr", [m("th", "Variable"), m("th", "Current value"), m("th", "Notes")])),
          m("tbody",
            tokenRefOrder.map((k) =>
              m("tr", [
                m("td", m("code", k)),
                m("td", m("code", readVar(k) || "")),
                m("td", notes[k] || "")
              ])
            )
          ),
        ]),
        m("p", m("small", [
          "Override in ", m("code", "sass/_config.scss"), " or on a scope (e.g., ",
          m("code", ":root[data-theme=\"light\"]"), ")."
        ])),
      ]),
    ]);
  },
};
