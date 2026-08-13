import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ASSETS } from "./assets";
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
      className="relative h-[90svh] overflow-hidden bg-foreground md:h-[110svh]"
    >
      <motion.img
        style={{ scale: reduced ? 1 : scale }}
        src={ASSETS.structure}
        alt="Abstract concrete facade with strong diagonal geometry"
        width={1536}
        height={1024}
        loading="lazy"
        className="h-full w-full object-cover grayscale contrast-125"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1800px] flex-col justify-between px-5 py-10 md:px-10 md:py-16">
        <TechLabel className="text-background opacity-90">URBAN STRUCTURE / 04</TechLabel>
        <h2 className="display outline-type-thick text-center text-[34vw] leading-none text-background">
          FORM
        </h2>
        <TechLabel className="self-end text-background opacity-90">
          GEOMETRY AS BRAND LANGUAGE
        </TechLabel>
      </div>
    </section>
  );
}
