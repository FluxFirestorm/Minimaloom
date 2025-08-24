import m from "mithril";
import { ImageGrid } from "../../components";
import { CodeExample } from "../lib/CodeExample";
import { Button } from "../../components";

const htmlSnippet = `<div class="image-grid" style="--min:14rem">
  <article class="card image-card" data-fit="contain" data-selected="false">
    <div class="toolbar">
      <label class="choice"><input type="checkbox"> Select</label>
      <div class="cluster gap-1">
        <button class="btn ghost" aria-label="Download">⇩</button>
        <button class="btn ghost" aria-label="Delete">✕</button>
      </div>
    </div>
    <figure class="thumb m-0" style="aspect-ratio:4/3">
      <img src="https://picsum.photos/800/400" alt="">
    </figure>
    <div class="p-2 stack">
      <strong>IMG_001.jpg</strong>
      <small>800×400 • 120 KB</small>
    </div>
  </article>
  <!-- repeat cards; set data-fit="cover" to fill/crop instead -->
</div>`.trim();

const tsSnippet = `import { ImageGrid } from "your-lib";

const images = [
  { id: "1", src: "https://picsum.photos/800/400?1", title: "Landscape 1" },
  { id: "2", src: "https://picsum.photos/400/800?2", title: "Portrait 1" },
  { id: "3", src: "https://picsum.photos/1200/800?3", title: "Landscape 2" },
  { id: "4", src: "https://picsum.photos/500/900?4", title: "Portrait 2" },
];

let selected = new Set<string>();

m(ImageGrid, {
  items: images.map((it) => ({
    ...it,
    selected: selected.has(it.id),
    onToggleSelect: (id, next) => {
      next ? selected.add(id) : selected.delete(id);
      m.redraw();
    }
  })),
  min: "14rem",
  ratio: "4/3",         // fixed thumbnail box
  fit: "contain"        // show whole image; use "cover" to fill
});`.trim();

/** Reusable toolbar row: shows selection count + Clear, and the fit toggles */
function ControlsRow(args: {
  selectedCount: number;
  fit: "contain" | "cover";
  onSetFit: (fit: "contain" | "cover") => void;
  onClear: () => void;
}) {
  const { selectedCount, fit, onSetFit, onClear } = args;
  return m("div.cluster.justify-between.items-center.mb-3", [
    m("div.cluster.gap-1", [
      m("small", `${selectedCount} selected`),
      m(
        Button,
        { variant: "ghost", size: "sm", onclick: onClear },
        "Clear"
      ),
    ]),
    m("div.cluster.gap-1", [
      m(
        Button,
        {
          variant: fit === "contain" ? "primary" : "ghost",
          size: "sm",
          onclick: () => onSetFit("contain"),
        },
        "Fit: contain"
      ),
      m(
        Button,
        {
          variant: fit === "cover" ? "primary" : "ghost",
          size: "sm",
          onclick: () => onSetFit("cover"),
        },
        "Fit: cover"
      ),
    ]),
  ]);
}

export const ImagesSection: m.Component = {
  oninit: (v) => {
    (v.state as any).selected = new Set<string>();
    (v.state as any).fit = "contain" as "contain" | "cover";
  },
  view: (v) => {
    const selected: Set<string> = (v.state as any).selected;
    const fit: "contain" | "cover" = (v.state as any).fit;

    // mix portrait and landscape
    const sizes: Array<[number, number]> = [
      [800, 400], [400, 800], [1200, 800], [500, 900],
      [900, 600], [600, 900], [1000, 700], [700, 1000],
    ];

    const items = sizes.map(([w, h], i) => {
      const id = String(i + 1);
      const src = `https://picsum.photos/${w}/${h}?${i + 11}`;
      return {
        id, src,
        title: `IMG_${String(i + 1).padStart(3, "0")}.jpg`,
        meta: `${w}×${h}`,
        selected: selected.has(id),
        onToggleSelect: (id: string, next: boolean) => {
          next ? selected.add(id) : selected.delete(id);
          m.redraw();
        },
      };
    });

    return m("article#images.stack",
      m(CodeExample, {
        title: "Image grid",
        live: m("div.stack", [
          ControlsRow({
            selectedCount: selected.size,
            fit,
            onSetFit: (f) => { (v.state as any).fit = f; m.redraw(); },
            onClear: () => { selected.clear(); m.redraw(); },
          }),
          m(ImageGrid, { items, min: "14rem", ratio: "4/3", fit }),
        ]),
        html: htmlSnippet,
        ts: tsSnippet
      })
    );
  }
};
