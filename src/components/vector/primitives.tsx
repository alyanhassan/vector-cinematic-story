import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 34,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.05 }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "42%", filter: "blur(12px)" },
  show: (i: number) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 1.1, delay: i * 0.08, ease: EASE },
  }),
};

export function StaggerWords({
  words,
  className,
  lineClassName,
  once = true,
}: {
  words: string[];
  className?: string;
  lineClassName?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      {words.map((word, i) => (
        <span key={word + i} className="block overflow-hidden">
          {reduced ? (
            <span className={cn("block", lineClassName)}>{word}</span>
          ) : (
            <motion.span
              className={cn("block", lineClassName)}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once, amount: 0.1 }}
            >
              {word}
            </motion.span>
          )}
        </span>
      ))}
    </div>
  );
}

export function TechLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("label-tech opacity-70", className)}>{children}</span>;
}
