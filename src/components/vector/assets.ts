// Asset roles are fixed. Replace the files in /public/assets to swap imagery.
export const ASSETS = {
  /** ASSET 1 — isolated beige/gold sneaker cutout. Primary hero product. */
  hero: "/assets/ASSET%201.png",
  /** ASSET 2 — night lifestyle, wet pavement, blue bokeh. */
  night: "/assets/ASSET%202.jpg",
  /** ASSET 3 — macro material / stitching detail. */
  detail: "/assets/ASSET%203.jpg",
  /** ASSET 4 — architecture facade, visual break. */
  structure: "/assets/ASSET%204.jpg",
  /** ASSET 5 — runner in motion at night. */
  motion: "/assets/ASSET%205.jpg",
} as const;
