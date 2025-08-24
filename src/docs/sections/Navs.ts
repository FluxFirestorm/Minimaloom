import m from "mithril";
import { Nav, Button } from "../../components";
import { CodeExample } from "../lib/CodeExample";

const navHTML = `<nav class="nav">
  <ul>
    <li><strong>Brand</strong></li>
    <li><a href="#" class="active">Home</a></li>
    <li><a href="#">Docs</a></li>
  </ul>
  <ul>
    <li><a href="#">Login</a></li>
    <li><button class="btn primary sm">Sign up</button></li>
  </ul>
</nav>`.trim();

const navTS = `import { Nav, Button } from "your-lib";

m(Nav, {
  brand: m("strong", "Brand"),
  itemsLeft: [
    { label: "Home", href: "#", active: true },
    { label: "Docs", href: "#" },
  ],
  itemsRight: [
    { label: "Login", href: "#" },
    // Pass a vnode directly; Nav will not wrap it in another button
    { label: m(Button, { variant: "primary", size: "sm" }, "Sign up") }
  ]
});`.trim();

export const NavsSection: m.Component = {
  view() {
    return m("article#navs.stack",
      m(CodeExample, {
        title: "Navigation",
        live: m(Nav, {
          brand: m("strong", "Brand"),
          itemsLeft: [
            { label: "Home", href: "#", active: true },
            { label: "Docs", href: "#" },
          ],
          itemsRight: [
            { label: "Login", href: "#" },
            { label: m(Button, { variant: "primary", size: "sm" }, "Sign up") },
          ],
        }),
        html: navHTML,
        ts: navTS,
      })
    );
  },
};
