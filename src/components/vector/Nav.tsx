import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import { BRAND, COPY, NAV_BAR_IDS, SECTIONS, type SectionId } from "./content";
import { EASE } from "./primitives";
import { lockScroll, scrollToId } from "./scroll";
import { cn } from "@/lib/utils";

const PANEL_ID = "site-menu";

function useHeroPast() {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
      threshold: 0,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return past;
}

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

const labelOf = (id: SectionId) => SECTIONS.find((s) => s.id === id)!.label;

export function Nav() {
  const past = useHeroPast();
  const active = useActiveSection();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  const mobileIconRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const anchor = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      lockScroll(false);
    }
    scrollToId(id);
  };

  const toggle = (from: HTMLButtonElement | null) => {
    returnFocus.current = from;
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>("a,button"));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panel?.contains(t) || iconRef.current?.contains(t) || mobileIconRef.current?.contains(t))
        return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      lockScroll(false);
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const clipFrom = "circle(0px at calc(100% - 28px) 28px)";
  const clipTo = "circle(150% at calc(100% - 28px) 28px)";

  return (
    <>
      {/* State A — full bar in the hero */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          past ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100",
        )}
        aria-hidden={past || undefined}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-5 md:px-10"
        >
          <a
            href="#top"
            onClick={anchor("top")}
            tabIndex={past ? -1 : 0}
            className="label-tech flex min-h-11 items-center tracking-[0.28em]"
          >
            {BRAND.wordmark}
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_BAR_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={anchor(id)}
                tabIndex={past ? -1 : 0}
                className="label-tech flex min-h-11 items-center opacity-75 transition-opacity duration-300 hover:opacity-100"
              >
                {labelOf(id)}
              </a>
            ))}
          </div>

          <a
            href="#order"
            onClick={anchor("order")}
            tabIndex={past ? -1 : 0}
            className="label-tech hidden min-h-11 items-center border border-foreground px-5 transition-colors duration-300 hover:bg-foreground hover:text-background md:inline-flex"
          >
            {COPY.nav.order}
          </a>

          <MenuIcon
            ref={mobileIconRef}
            open={open}
            onClick={() => toggle(mobileIconRef.current)}
            className="md:hidden"
            tabIndex={past ? -1 : 0}
          />
        </nav>
      </header>

      {/* State B — floating icon after the hero */}
      <div
        className={cn(
          "fixed right-5 top-5 z-[55] mix-blend-difference transition-[transform,opacity] duration-[450ms] md:right-10",
          past || open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
          open && "opacity-0",
        )}
      >
        <MenuIcon
          ref={iconRef}
          open={open}
          onClick={() => toggle(iconRef.current)}
          tabIndex={past ? 0 : -1}
          blend
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={PANEL_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="dark fixed right-3 top-3 z-[60] flex max-h-[calc(100svh-1.5rem)] w-[min(calc(100vw-1.5rem),460px)] flex-col overflow-y-auto border border-border bg-background text-foreground md:right-6 md:top-6"
            initial={reduced ? { opacity: 0 } : { clipPath: clipFrom }}
            animate={
              reduced
                ? { opacity: 1 }
                : { clipPath: clipTo, transition: { duration: 0.6, ease: EASE } }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : { clipPath: clipFrom, transition: { duration: 0.35, ease: EASE } }
            }
          >
            <div className="flex items-center justify-between px-6 pb-4 pt-5">
              <span className="label-tech opacity-80">{COPY.nav.menu}</span>
              <button
                onClick={close}
                aria-label={COPY.nav.closeMenu}
                className="label-tech flex min-h-11 items-center gap-3"
              >
                {COPY.nav.close}
                <span aria-hidden className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 block h-px w-4 rotate-45 bg-foreground" />
                  <span className="absolute left-0 top-1/2 block h-px w-4 -rotate-45 bg-foreground" />
                </span>
              </button>
            </div>
            <ul className="px-6">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  className="border-t border-border"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: reduced ? 0 : 0.18 + i * 0.06, duration: 0.5, ease: EASE },
                  }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={anchor(s.id)}
                    aria-current={active === s.id ? "true" : undefined}
                    className={cn(
                      "display flex items-baseline gap-4 py-2 text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[0.95] transition-[transform,opacity] duration-300 hover:translate-x-2 hover:opacity-100",
                      active === s.id ? "opacity-100" : "opacity-40",
                    )}
                  >
                    <span className="label-tech font-sans tracking-[0.32em]">{s.num}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border px-6 py-5">
              <span className="label-tech">
                {BRAND.product} — {BRAND.priceLabel}
              </span>
              <a
                href="#order"
                onClick={anchor("order")}
                className="label-tech inline-flex min-h-11 items-center gap-2 border border-foreground px-4 transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                {COPY.nav.order} <span aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type IconProps = {
  open: boolean;
  onClick: () => void;
  className?: string;
  tabIndex?: number;
  blend?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

function MenuIcon({ open, onClick, className, tabIndex, blend, ref }: IconProps) {
  const line = blend ? "bg-bone" : "bg-foreground";
  return (
    <button
      ref={ref}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={COPY.nav.openMenu}
      aria-expanded={open}
      aria-controls={open ? PANEL_ID : undefined}
      className={cn("group flex h-12 items-center justify-end gap-3", className)}
    >
      <span
        className={cn(
          "label-tech translate-x-2 opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
          blend ? "text-bone" : "text-foreground",
        )}
      >
        {COPY.nav.menu}
      </span>
      <span aria-hidden className="flex h-12 w-12 flex-col items-end justify-center gap-[6px] pr-3">
        <span className={cn("block h-px w-6", line)} />
        <span className={cn("block h-px w-6", line)} />
        <span
          className={cn(
            "block h-px w-6 origin-right scale-x-[0.667] transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100",
            line,
          )}
        />
      </span>
    </button>
  );
}
