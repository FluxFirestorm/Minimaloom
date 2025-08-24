export const tokenKeys = ["--accent", "--bg", "--surface", "--text", "--border", "--radius"] as const;

export const rootEl = document.documentElement;

export const readVar = (k: string) => getComputedStyle(rootEl).getPropertyValue(k).trim();
export const setVar  = (k: string, v: string) => rootEl.style.setProperty(k, v);

export const defaults: Record<string, string> = {};

export function initTokenDefaults() {
  tokenKeys.forEach(k => (defaults[k] = readVar(k)));
}

/** Paint small color swatches for the token inspector */
export function paintSwatches() {
  document.querySelectorAll<HTMLElement>("[data-swatch]").forEach(el => {
    const v = readVar(el.dataset.swatch || "");
    el.style.background = v || "transparent";
  });
}
