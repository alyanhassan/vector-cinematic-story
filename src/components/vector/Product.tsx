import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ASSETS } from "./assets";
import { BRAND, COPY, SPECS, sectionLabel } from "./content";
import { Reveal, TechLabel } from "./primitives";

export function Product() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shoeY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const shoeRot = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <section
      ref={ref}
      id="the-01"
      className="dark relative overflow-hidden bg-background py-24 text-foreground grain-overlay md:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 cool-fill opacity-70" />
        <div className="absolute inset-0 rim-light opacity-50" />
      </div>

      <span
        aria-hidden
        className="display pointer-events-none absolute -left-2 top-1/2 hidden -translate-y-1/2 select-none text-[22vw] leading-none text-foreground/8 [writing-mode:vertical-rl] md:block"
      >
        {COPY.product.numeral}
      </span>

      <div className="relative mx-auto max-w-[1800px] px-5 md:px-10">
        <div className="mb-10 flex items-center gap-4">
          <TechLabel>{sectionLabel("the-01")}</TechLabel>
          <span className="hairline-x flex-1" />
          <TechLabel>{COPY.product.rightLabel}</TechLabel>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-12">
          <motion.div
            style={{ y: reduced ? 0 : shoeY, rotate: reduced ? 0 : shoeRot }}
            className="relative md:col-span-8 md:-ml-[12%] md:w-[124%]"
          >
            <div className="absolute inset-x-[16%] bottom-[6%] h-[14%] contact-shadow" />
            <img
              src={ASSETS.hero}
              alt={COPY.product.alt}
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="relative w-full sneaker-lit-dark"
            />
          </motion.div>

          <div className="md:col-span-4">
            <Reveal>
              <h2 className="display text-[16vw] leading-[0.86] md:text-[6vw]">
                {COPY.product.heading[0]}
                <br />
                {COPY.product.heading[1]}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <div className="flex items-baseline gap-6">
                <span className="display text-4xl">{BRAND.priceLabel}</span>
                <TechLabel>{COPY.product.priceLabel}</TechLabel>
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {COPY.product.description}
              </p>
              <dl className="mt-8 space-y-3">
                {SPECS.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-border pb-2">
                    <dt className="label-tech opacity-80">{k}</dt>
                    <dd className="label-tech">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
