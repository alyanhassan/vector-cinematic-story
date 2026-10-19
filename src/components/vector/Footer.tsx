import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

import { BRAND, COPY, FOOTER_LINK_IDS, SECTIONS } from "./content";
import { EASE } from "./primitives";
import { scrollToId } from "./scroll";

function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span />;
  const h = now.getHours();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const night = h >= 18 || h < 5;
  return (
    <span className="label-tech">
      {time} — {night ? COPY.footer.nightRun : COPY.footer.dayRun}
    </span>
  );
}

function Wordmark() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const letters = BRAND.name.split("");

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setPos(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={(e) => e.pointerType === "mouse" && onMove(e)}
      onPointerLeave={() => setPos(null)}
      aria-label={BRAND.name}
      role="img"
      className={reduced ? "" : pos ? "" : "wordmark-drift"}
      style={pos ? { ["--lp" as string]: pos } : undefined}
    >
      <motion.div
        aria-hidden
        initial={reduced ? false : "hidden"}
        animate={reduced || inView ? "show" : "hidden"}
        className="display flex justify-between text-[19.5vw] leading-[0.86] tracking-[-0.02em] md:text-[19vw] xl:text-[min(19vw,345px)]"
      >
        {letters.map((l, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className={reduced ? "block text-foreground" : "wordmark-light block"}
              variants={{
                hidden: { y: "100%" },
                show: { y: "0%", transition: { duration: 1, delay: i * 0.06, ease: EASE } },
              }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function FooterInner() {
  const anchor = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId(id);
  };
  const ticker = COPY.footer.ticker.repeat(4);
  return (
    <footer className="dark bg-background pb-6 pt-10 text-foreground">
      <div className="ticker overflow-hidden border-y border-border py-3">
        <div className="ticker-track flex w-max whitespace-nowrap">
          <span className="label-tech pr-0">{ticker}</span>
          <span className="label-tech" aria-hidden>
            {ticker}
          </span>
        </div>
      </div>
      <div className="mx-auto max-w-[1800px] px-5 pt-12 md:px-10 md:pt-20">
        <Wordmark />
        <nav aria-label="Footer" className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          {FOOTER_LINK_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={anchor(id)}
              className="label-tech flex min-h-11 items-center opacity-80 hover:opacity-100"
            >
              {SECTIONS.find((s) => s.id === id)!.label}
            </a>
          ))}
        </nav>
        <div className="mt-6 grid gap-3 border-t border-border pt-6 md:grid-cols-3">
          <span className="label-tech">{COPY.footer.copyright}</span>
          <span className="md:text-center">
            <LocalTime />
          </span>
          <span className="label-tech md:text-right">{BRAND.credit}</span>
        </div>
      </div>
    </footer>
  );
}

/** Curtain reveal on md+ (content above slides off a fixed footer); static elsewhere. */
export function Footer({ children }: { children?: ReactNode }) {
  const reduced = useReducedMotion();
  const innerRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  const [curtain, setCurtain] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setCurtain(mq.matches && !reduced);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [curtain]);

  if (!curtain) {
    return (
      <div ref={innerRef}>
        {children}
        <FooterInner />
      </div>
    );
  }
  return (
    <>
      {children}
      <div className="relative" style={{ height: h, clipPath: "inset(0)" }}>
        <div ref={innerRef} className="fixed bottom-0 left-0 w-full">
          <FooterInner />
        </div>
      </div>
    </>
  );
}
