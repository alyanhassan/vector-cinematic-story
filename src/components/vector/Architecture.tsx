import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ASSETS } from "./assets";
import { COPY, sectionLabel } from "./content";
import { TechLabel } from "./primitives";

export function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  return (
    <section
      ref={ref}
      id="city"
      className="relative h-[90svh] overflow-hidden bg-foreground md:h-[110svh]"
    >
      <motion.img
        style={{ scale: reduced ? 1 : scale }}
        src={ASSETS.structure}
        alt={COPY.city.alt}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover grayscale contrast-125"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1800px] flex-col justify-between px-5 py-10 md:px-10 md:py-16">
        <TechLabel className="text-background opacity-100">{sectionLabel("city")}</TechLabel>
        <h2 className="display outline-type-thick text-center text-[30vw] leading-none text-background">
          {COPY.city.word}
        </h2>
        <TechLabel className="self-end text-right text-background opacity-100">
          {COPY.city.note}
        </TechLabel>
      </div>
    </section>
  );
}
