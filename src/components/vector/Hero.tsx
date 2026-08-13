import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { ASSETS } from "./assets";
import { TechLabel } from "./primitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const shoeY = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const shoeX = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const shoeScale = useTransform(scrollYProgress, [0, 1], [1, 0.74]);
  const shoeRotate = useTransform(scrollYProgress, [0, 1], [-6, -13]);
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Cursor-follow key light
  const mx = useMotionValue(50);
  const my = useMotionValue(38);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 });
  const lightPos = useTransform([sx, sy], ([x, y]) => `${x}% ${y}%`);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-background grain-overlay"
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      {/* CSS lighting stack */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 key-light opacity-90" />
        <div className="absolute inset-0 rim-light opacity-70" />
        <motion.div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background: useTransform(
              lightPos,
              (p) =>
                `radial-gradient(38% 38% at ${p}, oklch(1 0.06 92 / 0.9) 0%, transparent 70%)`,
            ),
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/8 to-transparent" />
      </div>

      {/* Typography */}
      <motion.div
        style={{ opacity: reduced ? 1 : fade }}
        className="pointer-events-none relative z-20 mx-auto flex min-h-[100svh] max-w-[1800px] flex-col justify-center px-5 pt-24 md:px-10"
      >
        <motion.h1 className="display select-none">
          <motion.span
            style={{ x: reduced ? 0 : leftX }}
            className="block text-[24vw] leading-[0.78] md:text-[17vw]"
          >
            MOVE
          </motion.span>
          <motion.span
            style={{ x: reduced ? 0 : rightX }}
            className="block text-right text-[19vw] leading-[0.78] md:text-[13.5vw]"
          >
            DIFFERENT.
          </motion.span>
        </motion.h1>
      </motion.div>

      {/* ASSET 1 — hero object, partially outside viewport */}
      <motion.div
        style={{
          y: reduced ? 0 : shoeY,
          x: reduced ? 0 : shoeX,
          scale: reduced ? 1 : shoeScale,
          rotate: reduced ? -6 : shoeRotate,
        }}
        className="pointer-events-none absolute left-1/2 top-[54%] z-10 w-[150vw] max-w-none -translate-x-1/2 -translate-y-1/2 md:left-[58%] md:top-1/2 md:w-[108vw]"
      >
        <div className="relative">
          <div className="absolute inset-x-[14%] bottom-[8%] h-[16%] contact-shadow" />
          <img
            src={ASSETS.hero}
            alt="VECTOR Runner System 001 sneaker in bone and gold"
            width={1536}
            height={1024}
            className="relative w-full sneaker-lit"
          />
          <div className="pointer-events-none absolute inset-0 mix-blend-overlay cool-fill opacity-40" />
        </div>
      </motion.div>

      {/* Technical copy */}
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto max-w-[1800px] px-5 pb-6 md:px-10 md:pb-8">
        <div className="hairline-x mb-4" />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <TechLabel>SYSTEM 001 / PERFORMANCE STREETWEAR / 2026</TechLabel>
          <TechLabel className="hidden md:inline">ENGINEERED FOR MOTION</TechLabel>
          <div className="flex items-center gap-3">
            <TechLabel>SCROLL</TechLabel>
            <motion.span
              aria-hidden
              className="block h-8 w-px bg-foreground/40 origin-top"
              animate={reduced ? undefined : { scaleY: [0.2, 1, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
