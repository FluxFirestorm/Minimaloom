import m from "mithril";
import { Nav } from "./Nav";
import { Topbar } from "./Topbar";

import { Intro } from "./sections/Intro";
import { Tokens } from "./sections/Tokens";
import { LayoutSection } from "./sections/Layout";
import { ContainersExamples } from "./sections/Containers";
import { ButtonsExamples } from "./sections/Buttons";
import { CardsExamples } from "./sections/Cards";
import { FormsExamples } from "./sections/Forms";
import { StickyExamples } from "./sections/Sticky";
import { UtilitiesSection } from "./sections/Utilities";
import { Usage } from "./sections/Usage";
import { ModalsSection } from "./sections/Modals";
import { NavsSection } from "./sections/Navs";
import { ImagesSection } from "./sections/Images"; 

// In App.ts
export const App: m.Component = {
  oncreate() {
    const header = document.querySelector<HTMLElement>('header.docs-topbar');
    if (!header) return;

    const apply = () =>
      document.documentElement.style.setProperty('--topbar-h',
        `${header.getBoundingClientRect().height}px`);

    // Initial + on resize; ResizeObserver handles content/line-wrap changes
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(header);
    window.addEventListener('resize', apply);

    (this as any).__cleanup = () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
    };
  },
  onremove() { (this as any).__cleanup?.(); },

  view() {
    return m("div", [
      m(Topbar),
      m("main.docs-shell", [
        m(Nav),
        m("section.docs-content.stack", [
          m(Intro),
          m(Tokens),
          m(LayoutSection),
          m(ContainersExamples),
          m(ButtonsExamples),
          m(CardsExamples),
          m(FormsExamples),
          m(ImagesSection),
          m(ModalsSection),
          m(NavsSection),
          m(StickyExamples),
          m(UtilitiesSection),
          m(Usage),
          m("footer.muted", m("small","Minimaloom"))
        ])
      ])
    ]);
  }
};
