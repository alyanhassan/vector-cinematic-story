import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ASSETS } from "./assets";
import { COPY, sectionLabel } from "./content";
import { Reveal, StaggerWords, TechLabel } from "./primitives";

export function MotionSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      id="motion"
      className="relative overflow-hidden bg-background py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <div className="mb-12 flex items-center gap-4">
          <TechLabel>{sectionLabel("motion")}</TechLabel>
          <span className="hairline-x flex-1" />
        </div>

        <div className="relative grid gap-10 md:grid-cols-12">
          <div className="relative md:col-span-6 md:col-start-3">
            <motion.div style={{ y: reduced ? 0 : imgY }} className="relative">
              <img
                src={ASSETS.motion}
                alt={COPY.motion.alt}
                width={1024}
                height={1440}
                loading="lazy"
                decoding="async"
                className="h-[78svh] w-full object-cover object-center md:h-[105svh]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent md:hidden" />
              {/* Mobile: words fully inside the photo */}
              <div className="pointer-events-none absolute bottom-5 left-5 md:hidden">
                <h2 className="sr-only">{COPY.motion.words.join(" ")}</h2>
                <StaggerWords
                  words={[...COPY.motion.words]}
                  className="display text-bone text-[22vw] leading-[0.86]"
                />
              </div>
            </motion.div>
            {/* Desktop: hangs ~5vw outside the photo, inverted via difference blend */}
            <div className="pointer-events-none absolute bottom-[6%] -left-[5vw] z-10 hidden mix-blend-difference md:block">
              <StaggerWords
                words={[...COPY.motion.words]}
                className="display text-bone text-[8.5vw] leading-[0.86]"
              />
            </div>
          </div>

          <Reveal delay={0.1} className="md:col-span-3 md:col-start-10 md:self-end md:pb-16">
            <p className="text-sm leading-relaxed">{COPY.motion.body}</p>
            <div className="hairline-x my-6" />
            <div className="grid grid-cols-2 gap-4">
              {COPY.motion.stats.map((s) => (
                <div key={s.label}>
                  <span className="display block text-4xl">{s.value}</span>
                  <TechLabel>{s.label}</TechLabel>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
