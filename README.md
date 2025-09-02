# Minimaloom

Minimaloom is a tiny, class‑light **SCSS framework** with chainable utilities and a small set of **Mithril** components, shipped alongside a living styleguide. It aims to provide clean defaults, predictable utilities, and a few pragmatic components for common UI needs.

> **Status:** Work in progress. Not production‑ready yet. Interfaces and tokens may change without notice.

---

## What the styleguide covers

The docs site organizes the framework into these sections:

* Introduction
* Design tokens
* Layout & alignment
* Containers
* Buttons
* Cards
* Forms
* Images
* Modals
* Navigation
* Sticky header/footer
* Utilities
* Usage & overrides

Each section demonstrates the relevant SCSS utilities and (where applicable) the companion Mithril component.

---

## Requirements

* **Node.js ≥ 18** (LTS recommended)
* **npm** (or **pnpm/yarn** — commands below use `npm`; swap in your preferred runner)
* Optional when using components: **mithril** (peer dependency)

---

## Getting set up

```bash
# clone your fork or the repo
git clone https://github.com/FluxFirestorm/Minimaloom.git
cd Minimaloom

# install dependencies
npm install
```

> Using pnpm? Run `pnpm install`. Using yarn? Run `yarn`.

---

## Developing the docs (styleguide)

Start the docs in watch mode (CSS + JS bundlers + a static server):

```bash
npm run docs:dev
```

This runs three tasks concurrently:

* `sass` compiles the framework SCSS and the docs SCSS into `docs/assets/`
* `esbuild` bundles the docs app to `docs/assets/docs.bundle.js`
* `python3 -m http.server` serves the docs at **[http://localhost:8080](http://localhost:8080)**

Stop with **Ctrl+C**.

> Prefer running pieces individually? Use `npm run docs:watch:css`, `npm run docs:watch:js`, and `npm run docs:serve`.

---

## Building the library

Produce the distributable CSS, JS bundles, and type declarations:

```bash
npm run build
```

This executes, in order:

1. **`build:css`** – compiles `sass/index.scss` → `dist/simple.css` (no source map)
2. **`build:js`** – bundles components:

   * ESM: `dist/index.mjs`
   * CJS: `dist/index.cjs`
3. **`build:types`** – emits TypeScript declarations to `dist/`

---

## Scripts reference

* `docs:dev` – watch & serve the styleguide at `:8080`
* `docs:watch:css` / `docs:build:css` – compile framework + docs CSS
* `docs:watch:js` / `docs:build:js` – bundle docs JS (watch or minified)
* `docs:serve` – static server for the docs folder
* `build` – clean `dist/` and build CSS, JS, and types
* `build:css` / `build:js` / `build:types` – individual build steps
* `prepublishOnly` – runs `build` before publishing

---

## Outputs

After a full build you’ll have:

```
dist/
  ├─ index.cjs         # CommonJS bundle of components
  ├─ index.mjs         # ESM bundle of components
  ├─ index.d.ts        # Type declarations
  └─ simple.css        # Compiled framework CSS
sass/
  └─ index.scss        # SCSS entry (re-exported for consumers)
```

**Package exports** are configured so consumers can import:

* CSS: `minimaloom/simple.css`
* Components (ESM/CJS): `minimaloom`
* SCSS entry: `minimaloom/sass`

> Components require **mithril** at runtime (declared as a peer dependency).

---

## License

MIT

---

## Notes & caveats

* This repository is in **active development**; APIs, tokens, and CSS variables may change.
* The styleguide is intended for exploration and internal validation—not as a production site.
