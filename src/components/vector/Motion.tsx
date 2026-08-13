import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ASSETS } from "./assets";
import { Reveal, StaggerWords, TechLabel } from "./primitives";

export function MotionSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const typeX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <div className="mb-12 flex items-center gap-4">
          <TechLabel>SYSTEM 001 / TESTED IN MOTION</TechLabel>
          <span className="hairline-x flex-1" />
        </div>

        <div className="relative grid gap-10 md:grid-cols-12">
          <motion.div
            style={{ y: reduced ? 0 : imgY }}
            className="relative md:col-span-6 md:col-start-2"
          >
            <img
              src={ASSETS.motion}
              alt="Runner sprinting at night in bright sneakers with city skyline behind"
              width={1024}
              height={1440}
              loading="lazy"
              className="h-[70svh] w-full object-cover object-center md:h-[105svh]"
            />
          </motion.div>

          <motion.div
            style={{ x: reduced ? 0 : typeX }}
            className="pointer-events-none z-10 md:absolute md:left-[40%] md:top-1/2 md:-translate-y-1/2"
          >
            <StaggerWords
              words={["RUN", "LIVE", "REPEAT"]}
              className="display text-[20vw] leading-[0.8] mix-blend-difference text-bone md:text-[10vw]"
            />
          </motion.div>

          <Reveal delay={0.1} className="md:col-span-3 md:col-start-10 md:self-end md:pb-16">
            <p className="text-sm leading-relaxed">
              Tested over 1,400 kilometres of night pavement. Energy return tuned for
              repeated load, not lab conditions — the sole compresses forward, then
              gives it straight back.
            </p>
            <div className="hairline-x my-6" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="display block text-4xl">1,400</span>
                <TechLabel>KM TESTED</TechLabel>
              </div>
              <div>
                <span className="display block text-4xl">241G</span>
                <TechLabel>UK9 WEIGHT</TechLabel>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
