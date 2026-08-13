import { Reveal, StaggerWords, TechLabel } from "./primitives";

export function Closing() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative overflow-hidden bg-background pt-28 md:pt-48">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <StaggerWords
          words={["MOVE", "DIFFERENT."]}
          className="display text-[21vw] leading-[0.8] md:text-[16vw]"
        />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <p className="display text-2xl md:text-4xl">VECTOR / 01 — THE FIRST SYSTEM.</p>
          <button
            onClick={() => scrollTo("system")}
            className="label-tech inline-flex items-center gap-3 border border-foreground px-8 py-4 transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            ENTER SYSTEM 001
            <span aria-hidden>→</span>
          </button>
        </Reveal>

        <footer className="mt-20 border-t border-border py-6 md:mt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TechLabel>© 2026 VECTOR / 01</TechLabel>
            <TechLabel>ENGINEERED FOR MOTION</TechLabel>
            <TechLabel>SYSTEM 001 / BONE — GOLD</TechLabel>
            <TechLabel>ALL RIGHTS RESERVED</TechLabel>
          </div>
        </footer>
      </div>
    </section>
  );
}
