import m from "mithril";
import { App } from "./App";
import { initTokenDefaults } from "./lib/dom";

initTokenDefaults();
m.mount(document.getElementById("app") as Element, App);
