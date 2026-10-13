# Vector Cinematic Story

Build a premium editorial sneaker/streetwear brand website called “VECTOR / 01”. This is a portfolio showcase piece, NOT a generic ecommerce template. The visual direction is a fashion-art-directed campaign: oversized typography, dramatic product photography, asymmetrical layouts, large whitespace, cinematic lighting, and smooth scroll-driven motion.

IMPORTANT ASSET SETUP:
The intended assets are named exactly:
- ASSET 1 — isolated beige/gold futuristic sneaker cutout. PRIMARY HERO PRODUCT. It must be displayed very large, floating over the hero composition, with CSS-generated directional lighting, soft ambient glow, contact shadow, and subtle parallax/rotation illusion. Do not place it in a normal card.
- ASSET 2 — sneaker worn outdoors at night over wet pavement with blue city bokeh. LIFESTYLE / NIGHT CAMPAIGN IMAGE.
- ASSET 3 — extreme close-up of a cream sneaker showing material, laces, stitching and texture. PRODUCT DETAIL / MATERIAL SECTION.
- ASSET 4 — abstract modern building facade with strong geometric lines. ARCHITECTURE / VISUAL BREAK SECTION.
- ASSET 5 — runner wearing bright sneakers at night with city skyline. MOVEMENT / PERFORMANCE CAMPAIGN IMAGE.
Use these exact asset roles throughout the page. If the attached asset files are available to the project, use them rather than replacing them. Create the asset paths as /assets/ASSET 1.png, /assets/ASSET 2.jpg, /assets/ASSET 3.jpg, /assets/ASSET 4.jpg, /assets/ASSET 5.jpg so they are easy to replace if needed.

BRAND:
VECTOR / 01
Tagline: “MOVE DIFFERENT.”
Position it as an experimental performance-streetwear label, not a conventional shoe store.

CORE VISUAL IDEA:
The website should feel like a high-end fashion campaign / Awwwards portfolio piece. The sneaker is the hero object. Typography should sometimes become almost architectural. Use huge condensed/modern grotesk headings, e.g. “MOVE”, “FORM”, “MOTION”, “01”. Mix very large text with tiny technical labels such as “VECTOR / 01”, “SYSTEM 001”, “ENGINEERED FOR MOTION”.

COLOR:
Base: warm off-white / bone (#F3F0E8) and deep near-black (#0B0B0B).
Accents may borrow restrained cobalt blue and acid yellow from the photography, but never turn into a colorful UI. Keep it editorial and premium.

TYPOGRAPHY:
Use a strong modern grotesk/condensed display font for giant headlines and a clean neutral sans for body/metadata. Extremely bold typography, tight tracking on giant words, occasional outlined text, and text that partially overlaps imagery.

NAVBAR:
Minimal fixed/sticky navbar. Left: VECTOR / 01. Center/right: INDEX 01, SYSTEM, CAMPAIGN, SHOP. Tiny menu icon. Transparent at top and subtly changes contrast/background on scroll. No giant pill navbar. No generic SaaS styling.

HERO — “MOVE DIFFERENT.”:
Full viewport, editorial composition.
- Huge headline split across the screen: “MOVE” / “DIFFERENT.”
- ASSET 1 is the dominant visual, enormous and positioned partly outside the viewport so it feels like a physical object entering the page.
- Use CSS lighting layers behind/around the sneaker: radial highlights, soft warm rim light, subtle bloom, and a realistic contact shadow. The lighting must be generated in code, not baked into the image.
- Add small technical copy: “SYSTEM 001 / PERFORMANCE STREETWEAR / 2026”.
- Add a minimal scroll indicator.
- As the user scrolls, the sneaker should subtly move upward/sideways and scale down while the giant typography separates, creating the feeling of entering the campaign.
- Do NOT use fake 3D models, WebGL objects, or a generic 3D sneaker. This is image-based art direction with CSS/motion.

SECTION 2 — MANIFESTO:
Large off-white field with huge black typography:
“NOT MADE TO BLEND IN.”
Then a short editorial paragraph about movement, urban energy, engineered form and street culture. Include oversized “01” as a graphic element. Animate text with staggered reveal and subtle horizontal movement.

SECTION 3 — PRODUCT / “SYSTEM 001”:
Dark near-black section.
ASSET 1 returns as a huge product cutout, now against the dark background with cool/warm CSS rim lighting. Add product information in a very sparse editorial layout:
SYSTEM 001
VECTOR RUNNER
$240
Engineered silhouette / sculpted sole / adaptive upper
Button: EXPLORE SYSTEM
Use a large vertical “001” and small technical specs. The product should visually dominate.

SECTION 4 — MATERIAL / DETAIL:
Use ASSET 3 large, cropped dramatically so texture fills much of the viewport. Add oversized typography “FORM / FUNCTION” overlapping the image. Add small labels pointing conceptually to material zones: “TEXTURED MESH”, “STRUCTURAL LACING”, “SCULPTED BASE”. These can be simple CSS lines and labels, not SVG diagrams. Add slow parallax on the image.

SECTION 5 — ARCHITECTURE / FORM:
Use ASSET 4 as a full-width visual break. Treat the building geometry as part of the brand language. Overlay huge outlined text “FORM” and small “URBAN STRUCTURE / 04”. Use a restrained grayscale treatment and subtle zoom on scroll.

SECTION 6 — NIGHT CAMPAIGN:
Use ASSET 2 as a large immersive editorial image, not a card. Let it occupy most of the viewport. Overlay giant text “AFTER DARK” and tiny campaign metadata. Add a subtle dark gradient/vignette through CSS so typography remains legible. On scroll, create a gentle scale/position transition.

SECTION 7 — MOTION:
Use ASSET 5 as a tall editorial image with the runner clearly visible. Place it asymmetrically with huge text “RUN / LIVE / REPEAT” partially outside the image. Add performance-oriented copy and a small “SYSTEM 001 / TESTED IN MOTION” label. Use parallax and staggered text animation.

SECTION 8 — LOOKBOOK / CAMPAIGN INDEX:
Create a magazine-like grid using the available imagery again, but do not make repetitive cards. Mix full-width image, narrow crop, typography-only blocks, and overlapping compositions. Label items “01 / NIGHT”, “02 / DETAIL”, “03 / MOTION”, “04 / STRUCTURE”. Hover interactions should subtly zoom images and shift typography.

SECTION 9 — FINAL STATEMENT:
Huge black-on-off-white closing statement:
“MOVE DIFFERENT.”
Under it: “VECTOR / 01 — THE FIRST SYSTEM.”
Minimal CTA: “ENTER SYSTEM 001”.
Finish with a thin technical footer line.

MOTION / INTERACTION:
Use smooth, high-quality motion throughout. Prefer Framer Motion or another reliable animation library already supported by the project.
- Scroll reveal with opacity + translate + slight blur removal.
- Image parallax.
- Hero sneaker transform on scroll.
- Typography horizontal drift.
- Hover image zoom and text shift.
- Subtle cursor-follow lighting on the hero sneaker area if it remains performant.
- Smooth page scrolling.
- Respect prefers-reduced-motion.
Avoid excessive bouncing, springy UI, random floating particles, neon glows, or gimmicky effects.

LIGHTING RULES:
The isolated sneaker must look intentionally art-directed even though it is a flat image. Use CSS pseudo-elements/radial gradients, layered shadows, blur, and mix-blend modes to create directional key light, rim light, ambient glow and contact shadow. Keep it believable and premium. Never add a rectangular white image background around the cutout.

RESPONSIVE:
Desktop should be the strongest art-directed experience. On tablet/mobile, preserve the typography hierarchy and visual storytelling while adapting positions safely. The hero sneaker must remain prominent and never crop into an unusable shape.

QUALITY BAR:
No generic ecommerce cards, no standard hero-with-text-and-image template, no dashboard UI, no rounded SaaS components, no excessive pills, no emoji, no icon-heavy interface, no stock-looking placeholders, no fake 3D model, no gradients everywhere. This must look like a designer-built fashion campaign website.

FUNCTIONALITY:
All navigation links should scroll to their intended sections. CTA buttons should work. Add a simple product “Explore System” interaction/modal or scroll-to-product behavior, but keep the experience primarily editorial rather than ecommerce.

IMPLEMENTATION:
Use React + TypeScript + Tailwind. Keep components clean and reusable. Optimize images with object-fit/object-position and lazy loading where appropriate. Ensure there are no console errors and the page is fully responsive.

Most important: make ASSET 1 the visual hero object and make the entire site feel designed around it. The website should look impressive immediately on first load and even better while scrolling.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/71667fc9-4206-4517-a83c-7dc72b7eafe3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
