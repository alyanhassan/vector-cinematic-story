import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ASSETS } from "./assets";
import { TechLabel } from "./primitives";

export function Night() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      id="campaign"
      className="dark relative h-[105svh] overflow-hidden bg-background md:h-[125svh]"
    >
      <motion.div
        style={{ scale: reduced ? 1 : scale, y: reduced ? 0 : y }}
        className="absolute inset-0"
      >
        <img
          src={ASSETS.night}
          alt="Sneakers on wet pavement at night with blue city bokeh"
          width={1536}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* CSS vignette + gradient for legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(75%_65%_at_50%_45%,transparent_0%,oklch(0_0_0/0.55)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

      <div className="absolute inset-0 mx-auto flex max-w-[1800px] flex-col justify-between px-5 py-10 text-foreground md:px-10 md:py-16">
        <div className="flex items-start justify-between">
          <TechLabel className="opacity-90">CAMPAIGN 02 / AFTER DARK</TechLabel>
          <TechLabel className="hidden opacity-70 md:inline">
            SHOT ON LOCATION / 03:14
          </TechLabel>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="display text-[19vw] leading-[0.82] md:text-[14vw]"
        >
          AFTER
          <span className="block text-right">DARK</span>
        </motion.h2>

        <div className="flex items-end justify-between gap-6">
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
            The city rewrites itself after midnight. VECTOR is built for the version
            of the street that only exists then.
          </p>
          <TechLabel className="opacity-90">VECTOR / 01</TechLabel>
        </div>
      </div>
    </section>
  );
}
