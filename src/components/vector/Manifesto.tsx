import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { COPY, sectionLabel } from "./content";
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
      id="idea"
      aria-labelledby="idea-title"
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
          <TechLabel>{sectionLabel("idea")}</TechLabel>
          <span className="hairline-x flex-1" />
        </Reveal>

        <motion.div style={{ x: reduced ? 0 : drift }}>
          <h2 id="idea-title" className="sr-only">
            {COPY.idea.headline.join(" ")}
          </h2>
          <StaggerWords
            words={[...COPY.idea.headline]}
            className="display text-[15vw] leading-[0.86] md:text-[11vw]"
          />
        </motion.div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <Reveal delay={0.05} className="md:col-span-4 md:col-start-6">
            <p className="text-base leading-relaxed md:text-lg">{COPY.idea.lead}</p>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-3 md:col-start-10">
            <p className="text-sm leading-relaxed text-muted-foreground">{COPY.idea.body}</p>
            <div className="hairline-x my-6" />
            <TechLabel>{COPY.idea.note}</TechLabel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
