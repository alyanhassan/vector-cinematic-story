import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const LINKS = [
  { label: "INDEX 01", id: "manifesto" },
  { label: "SYSTEM", id: "system" },
  { label: "CAMPAIGN", id: "campaign" },
  { label: "SHOP", id: "shop" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled
          ? "border-b border-foreground/10 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-[1800px] items-center justify-between px-5 md:h-16 md:px-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="label-tech tracking-[0.28em]"
        >
          VECTOR / 01
        </button>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="label-tech opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "block h-px bg-foreground transition-all duration-300",
              open ? "w-5 translate-y-[3px] rotate-45" : "w-5",
            )}
          />
          <span
            className={cn(
              "block h-px bg-foreground transition-all duration-300",
              open ? "w-5 -translate-y-[3px] -rotate-45" : "w-3",
            )}
          />
        </button>

        <div className="hidden md:block">
          <span className="label-tech opacity-40">EST. 2026</span>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-foreground/10 bg-background/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden",
          open ? "max-h-72" : "max-h-0 border-t-transparent",
        )}
      >
        <div className="flex flex-col px-5 py-4">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="display py-3 text-left text-3xl"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
