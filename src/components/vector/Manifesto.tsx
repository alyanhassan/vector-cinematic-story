import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Reveal, StaggerWords, TechLabel } from "./primitives";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const numY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative overflow-hidden bg-background py-28 md:py-48"
    >
      <motion.span
        style={{ y: reduced ? 0 : numY }}
        aria-hidden
        className="display outline-type-thick pointer-events-none absolute -right-4 top-6 select-none text-[42vw] leading-none text-foreground/25 md:right-10 md:text-[26vw]"
      >
        01
      </motion.span>

      <div className="relative mx-auto max-w-[1800px] px-5 md:px-10">
        <Reveal className="mb-10 flex items-center gap-4">
          <TechLabel>INDEX 01 — MANIFESTO</TechLabel>
          <span className="hairline-x flex-1" />
        </Reveal>

        <motion.div style={{ x: reduced ? 0 : drift }}>
          <StaggerWords
            words={["NOT MADE", "TO BLEND", "IN."]}
            className="display text-[15vw] leading-[0.84] md:text-[11vw]"
          />
        </motion.div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <Reveal delay={0.05} className="md:col-span-4 md:col-start-6">
            <p className="text-base leading-relaxed md:text-lg">
              VECTOR is built for the hours the city never accounts for. Every
              silhouette begins as a study in movement — mass shifted forward,
              volume sculpted away, structure kept only where the body demands it.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-3 md:col-start-10">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Engineered form, street intent. We treat performance as material
              language and the street as the only testing ground that matters.
            </p>
            <div className="hairline-x my-6" />
            <TechLabel>ENGINEERED FOR MOTION</TechLabel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
