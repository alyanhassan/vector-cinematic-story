// Single source of truth for every word on the site.
// Change the brand here and it updates everywhere.

/** Fill with the published site origin (e.g. https://example.com) to make og:image absolute. */
export const SITE_URL = "https://vector-cinematic-story.lovable.app";
export const OG_IMAGE_PATH = "/assets/ASSET%202.jpg";

const PRICE = 240;
const WEIGHT = "241 G";
const DROP = "8 MM";
const KM_TESTED = "1,400";

export const BRAND = {
  name: "OVERPASS",
  wordmark: "OVERPASS / 01",
  tagline: "Built for the city after dark.",
  product: "THE 01",
  productFull: "THE 01 — NIGHT RUNNER",
  productTitle: "The 01",
  colourway: "BONE & GOLD",
  price: PRICE,
  priceLabel: `$${PRICE}`,
  credit: "DESIGNED & BUILT BY ALYAN HASSAN",
  year: 2026,
} as const;

export const META = {
  title: `${BRAND.wordmark} — ${BRAND.tagline}`,
  description: `${BRAND.wordmark} makes one shoe at a time for people who run when the city goes quiet. The first pair: The 01 Night Runner, bone and gold, $${PRICE}.`,
  ogImage: `${SITE_URL}${OG_IMAGE_PATH}`,
} as const;

export type SectionId =
  | "idea"
  | "the-01"
  | "craft"
  | "city"
  | "night"
  | "motion"
  | "lookbook"
  | "order";

export const SECTIONS: { id: SectionId; num: string; label: string }[] = [
  { id: "idea", num: "01", label: "THE IDEA" },
  { id: "the-01", num: "02", label: "THE 01" },
  { id: "craft", num: "03", label: "CRAFT" },
  { id: "city", num: "04", label: "THE CITY" },
  { id: "night", num: "05", label: "AFTER DARK" },
  { id: "motion", num: "06", label: "IN MOTION" },
  { id: "lookbook", num: "07", label: "LOOKBOOK" },
  { id: "order", num: "08", label: "ORDER" },
];

export const NAV_BAR_IDS: SectionId[] = ["idea", "the-01", "craft", "night", "lookbook"];
export const FOOTER_LINK_IDS: SectionId[] = ["the-01", "craft", "night", "lookbook", "order"];

export const sectionLabel = (id: SectionId) => {
  const s = SECTIONS.find((x) => x.id === id)!;
  return `${s.num} — ${s.label}`;
};

export const SPECS: [string, string][] = [
  ["UPPER", "ENGINEERED MESH"],
  ["MIDSOLE", "SCULPTED FOAM"],
  ["DROP", DROP],
  ["WEIGHT", `${WEIGHT} / UK 9`],
  ["COLOURWAY", "BONE / GOLD"],
];

export const COPY = {
  skip: "Skip to content",
  nav: { order: "ORDER", menu: "MENU", close: "CLOSE", openMenu: "Open menu", closeMenu: "Close menu" },
  hero: {
    line1: "RUN",
    line2: "THE CITY.",
    labelLeft: "OVERPASS 01 — NIGHT RUNNING FOOTWEAR",
    labelCentre: `${BRAND.product} / ${BRAND.colourway}`,
    scroll: "SCROLL",
    alt: "The 01 Night Runner in bone and gold, floating in warm studio light",
  },
  idea: {
    headline: ["THE STREET", "IS THE", "TRACK."],
    lead: "Overpass is named after the parts of the city nobody stops at: the overpasses, the underpasses, the crossings you only know on foot, late, with the traffic gone quiet.",
    body: "We make one shoe at a time, built for pavement instead of treadmills. Every panel is there because the run needs it.",
    note: "ONE SHOE. MADE PROPERLY.",
  },
  product: {
    rightLabel: "FIRST RELEASE",
    heading: ["THE 01", "NIGHT RUNNER"],
    priceLabel: "FIRST RELEASE",
    description:
      "A bone-and-gold runner with a sculpted sole and a mesh upper that locks the foot down at speed. Built for wet pavement, tight corners and the last kilometre home.",
    numeral: "01",
    alt: "The 01 Night Runner in bone and gold against a dark studio field",
  },
  craft: {
    words: ["FORM", "FUNCTION"],
    zones: ["BREATHABLE MESH", "LOCKED-DOWN LACING", "SCULPTED SOLE"],
    note: "Every seam is there because the run needs it.",
    alt: "Close-up of the cream mesh, laces and stitching on The 01",
  },
  city: {
    word: "LINES",
    note: "THE CITY DRAWS THE LINES. WE FOLLOW THEM.",
    alt: "Greyscale concrete facade with strong diagonal lines",
  },
  night: {
    meta: "CAMPAIGN 01 / 03:14 AM",
    headline: ["AFTER", "DARK"],
    body: "The city rewrites itself after midnight. The 01 is built for that version of it: wet pavement, low light, nobody watching.",
    alt: "The 01 on wet pavement at night with blue city lights behind",
  },
  motion: {
    words: ["RUN", "LIVE", "REPEAT"],
    body: "Tested on real routes, not treadmills. The sole compresses on landing and returns the energy on the push, kilometre after kilometre.",
    stats: [
      { value: KM_TESTED, label: "KM ROAD-TESTED" },
      { value: WEIGHT.replace(" ", ""), label: "UK 9 WEIGHT" },
    ],
    alt: "Runner wearing bright shoes at night with the city skyline behind",
  },
  lookbook: {
    heading: ["THE", "LOOKBOOK"],
    count: `04 FRAMES / ${BRAND.year}`,
    noteLabel: "EDITORIAL NOTE",
    note: ["ONE SHOE.", "NO SEASONS."],
    tileLabel: "FIRST PAIR",
    tileText: BRAND.product,
    frames: [
      { index: "01", title: "NIGHT", alt: "Night frame: The 01 on wet pavement" },
      { index: "02", title: "DETAIL", alt: "Detail frame: mesh and lacing" },
      { index: "03", title: "MOTION", alt: "Motion frame: runner at night" },
      { index: "04", title: "CITY", alt: "City frame: concrete facade" },
    ],
    close: "CLOSE",
  },
  order: {
    headline: ["BUY", "THE 01."],
    lead: `$${PRICE}. Bone and gold. Choose your size and we'll hold a pair.`,
    alt: "The 01 Night Runner",
    fields: { name: "FULL NAME", email: "EMAIL", size: "SIZE (UK)", qty: "QUANTITY" },
    total: "TOTAL",
    submit: "PLACE ORDER",
    pending: "PLACING ORDER…",
    disclaimer: "Concept store — no payment is taken.",
    received: "ORDER RECEIVED.",
    again: "Place another order",
  },
  footer: {
    ticker: "RUN THE CITY — THE 01 — BONE & GOLD — AFTER DARK — NIGHT RUNNING FOOTWEAR — ",
    copyright: `© ${BRAND.year} ${BRAND.wordmark} — A CONCEPT BRAND`,
    nightRun: "GOOD TIME FOR A NIGHT RUN.",
    dayRun: "GOOD TIME FOR A RUN.",
  },
} as const;

export const SIZES = [6, 7, 8, 9, 10, 11, 12] as const;
export const MAX_QTY = 4;
