import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { ASSETS } from "./assets";
import { Reveal, TechLabel } from "./primitives";
import { cn } from "@/lib/utils";

const SPECS = [
  ["UPPER", "ADAPTIVE ENGINEERED MESH"],
  ["MIDSOLE", "SCULPTED ENERGY FOAM"],
  ["DROP", "8MM"],
  ["WEIGHT", "241G / UK9"],
  ["COLOURWAY", "BONE / GOLD"],
];

export function Product() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shoeY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const shoeRot = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <section
      ref={ref}
      id="system"
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
        001
      </span>

      <div className="relative mx-auto max-w-[1800px] px-5 md:px-10">
        <div className="mb-10 flex items-center gap-4">
          <TechLabel>SYSTEM 001</TechLabel>
          <span className="hairline-x flex-1" />
          <TechLabel>PRODUCT / 03</TechLabel>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-12">
          <motion.div
            style={{ y: reduced ? 0 : shoeY, rotate: reduced ? 0 : shoeRot }}
            className="relative md:col-span-8 md:-ml-[12%] md:w-[124%]"
          >
            <div className="absolute inset-x-[16%] bottom-[6%] h-[14%] contact-shadow" />
            <img
              src={ASSETS.hero}
              alt="VECTOR Runner sneaker lit against a dark studio field"
              width={1536}
              height={1024}
              loading="lazy"
              className="relative w-full sneaker-lit-dark"
            />
          </motion.div>

          <div className="md:col-span-4">
            <Reveal>
              <h2 className="display text-[16vw] leading-[0.84] md:text-[6vw]">
                VECTOR
                <br />
                RUNNER
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <div className="flex items-baseline gap-6">
                <span className="display text-4xl">$240</span>
                <TechLabel>LIMITED RELEASE</TechLabel>
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Engineered silhouette / sculpted sole / adaptive upper.
              </p>
              <div className="mt-8 space-y-3">
                {SPECS.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-border pb-2">
                    <TechLabel>{k}</TechLabel>
                    <TechLabel className="opacity-100">{v}</TechLabel>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setOpen(true)}
                className="label-tech mt-10 inline-flex items-center gap-3 border border-foreground/40 px-7 py-4 transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                EXPLORE SYSTEM
                <span aria-hidden>→</span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Editorial spec sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex items-end justify-center transition-opacity duration-500 md:items-center",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="System 001 specification"
      >
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />
        <div
          className={cn(
            "relative m-4 w-full max-w-3xl bg-background p-6 transition-transform duration-500 md:p-12",
            open ? "translate-y-0" : "translate-y-6",
          )}
        >
          <div className="flex items-start justify-between">
            <TechLabel>SYSTEM 001 / TECHNICAL SHEET</TechLabel>
            <button onClick={() => setOpen(false)} className="label-tech opacity-70">
              CLOSE
            </button>
          </div>
          <h3 className="display mt-8 text-[13vw] leading-[0.84] md:text-[5vw]">
            VECTOR RUNNER
          </h3>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <img
              src={ASSETS.hero}
              alt="VECTOR Runner sneaker cutout"
              width={1536}
              height={1024}
              loading="lazy"
              className="w-full sneaker-lit-dark"
            />
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A single-system release: one silhouette, one colourway, produced in a
                fixed run. Built around a sculpted base and an adaptive upper that
                tightens through the midfoot as stride load increases.
              </p>
              <div className="mt-6 space-y-3">
                {SPECS.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-border pb-2">
                    <TechLabel>{k}</TechLabel>
                    <TechLabel className="opacity-100">{v}</TechLabel>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="display text-3xl">$240</span>
                <TechLabel>SHIPS 2026</TechLabel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
