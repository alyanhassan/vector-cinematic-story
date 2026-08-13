import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ASSETS } from "./assets";
import { TechLabel } from "./primitives";

const ZONES = [
  { label: "TEXTURED MESH", top: "26%", left: "18%", w: "16%" },
  { label: "STRUCTURAL LACING", top: "48%", left: "58%", w: "20%" },
  { label: "SCULPTED BASE", top: "76%", left: "30%", w: "14%" },
];

export function Material() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[110svh] overflow-hidden bg-background md:h-[130svh]"
    >
      <motion.div style={{ y: reduced ? 0 : imgY }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <img
          src={ASSETS.detail}
          alt="Macro detail of textured mesh, lacing and stitching on a cream sneaker"
          width={1536}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />

      {/* Conceptual material zone callouts */}
      <div className="absolute inset-0 hidden md:block">
        {ZONES.map((z, i) => (
          <motion.div
            key={z.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.9 }}
            className="absolute flex items-center gap-3"
            style={{ top: z.top, left: z.left }}
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-foreground" />
            <span className="block h-px bg-foreground/60" style={{ width: z.w }} />
            <TechLabel className="opacity-100">{z.label}</TechLabel>
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-[1800px] px-5 pb-10 md:px-10 md:pb-16">
        <TechLabel className="opacity-100">MATERIAL STUDY / 02</TechLabel>
        <h2 className="display mt-4 text-[20vw] leading-[0.8] md:text-[13vw]">
          <span className="block">FORM</span>
          <span className="block outline-type text-right">FUNCTION</span>
        </h2>
      </div>
    </section>
  );
}
