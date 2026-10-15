import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRef, useState } from "react";

import { ASSETS } from "./assets";
import { COPY } from "./content";
import { Reveal, TechLabel } from "./primitives";
import { cn } from "@/lib/utils";

const IMAGES = [ASSETS.night, ASSETS.detail, ASSETS.motion, ASSETS.structure];
const FRAMES = COPY.lookbook.frames.map((f, i) => ({ ...f, src: IMAGES[i] }));
const caption = (i: number) => `${FRAMES[i].index} / ${FRAMES[i].title}`;

function Frame({
  i,
  onOpen,
  className,
  imgClassName,
  btnRef,
}: {
  i: number;
  onOpen: (i: number) => void;
  className?: string;
  imgClassName?: string;
  btnRef: (el: HTMLButtonElement | null) => void;
}) {
  const f = FRAMES[i];
  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => onOpen(i)}
      aria-label={`Open ${caption(i)}`}
      className={cn("group relative block w-full overflow-hidden text-left", className)}
    >
      <img
        src={f.src}
        alt={f.alt}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
          imgClassName,
        )}
      />
      <span className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/20" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
      <span className="label-tech absolute bottom-4 left-4 text-bone transition-transform duration-700 group-hover:translate-x-2">
        {caption(i)}
      </span>
    </button>
  );
}

export function Lookbook() {
  const [open, setOpen] = useState<number | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef(0);
  const setRef = (i: number) => (el: HTMLButtonElement | null) => {
    refs.current[i] = el;
  };
  const show = (i: number) => {
    lastOpened.current = i;
    setOpen(i);
  };
  const step = (d: number) => setOpen((v) => (v === null ? v : (v + d + FRAMES.length) % FRAMES.length));

  return (
    <section id="lookbook" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="display text-[13vw] leading-[0.86] md:text-[7vw]">
            {COPY.lookbook.heading[0]}
            <br />
            {COPY.lookbook.heading[1]}
          </h2>
          <TechLabel className="pb-2">{COPY.lookbook.count}</TechLabel>
        </div>
        <div className="hairline-x mb-10" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-8">
            <Frame i={0} onOpen={show} btnRef={setRef(0)} className="h-[52svh] md:h-[70svh]" />
          </Reveal>

          <div className="flex flex-col justify-between md:col-span-4">
            <Reveal delay={0.08}>
              <Frame
                i={1}
                onOpen={show}
                btnRef={setRef(1)}
                className="h-[34svh] md:h-[38svh]"
                imgClassName="object-[60%_40%]"
              />
            </Reveal>
            <Reveal delay={0.16} className="mt-4 md:mt-6">
              <div className="flex h-[26svh] flex-col justify-between border border-border p-5 md:h-[28svh]">
                <TechLabel>{COPY.lookbook.noteLabel}</TechLabel>
                <p className="display text-3xl leading-[0.9] md:text-4xl">
                  {COPY.lookbook.note[0]} {COPY.lookbook.note[1]}
                </p>
                <TechLabel>OVERPASS / 01</TechLabel>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06} className="md:col-span-5 md:-mt-16">
            <Frame i={2} onOpen={show} btnRef={setRef(2)} className="h-[60svh] md:h-[78svh]" />
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-4 md:self-end">
            <Frame
              i={3}
              onOpen={show}
              btnRef={setRef(3)}
              className="h-[40svh] md:h-[48svh]"
              imgClassName="grayscale"
            />
          </Reveal>

          <Reveal delay={0.18} className="md:col-span-3 md:self-end">
            <div className="relative h-[40svh] overflow-hidden bg-foreground p-6 text-background md:h-[48svh]">
              <TechLabel className="opacity-90">{COPY.lookbook.tileLabel}</TechLabel>
              <p className="display mt-6 text-[16vw] leading-[0.86] md:text-[5vw]">
                {COPY.lookbook.tileText}
              </p>
              <img
                src={ASSETS.hero}
                alt=""
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute -bottom-6 -right-10 w-[85%] sneaker-lit-dark"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <DialogPrimitive.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-ink" />
          <DialogPrimitive.Content
            className="dark fixed inset-0 z-[71] flex flex-col bg-ink p-4 text-foreground outline-none md:p-8"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              refs.current[lastOpened.current]?.focus({ preventScroll: true });
            }}
          >
            <div className="flex justify-end">
              <DialogPrimitive.Close className="label-tech min-h-11 px-2">
                {COPY.lookbook.close}
              </DialogPrimitive.Close>
            </div>
            {open !== null && (
              <>
                <DialogPrimitive.Title className="sr-only">{caption(open)}</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  {FRAMES[open].alt}
                </DialogPrimitive.Description>
                <img
                  src={FRAMES[open].src}
                  alt={FRAMES[open].alt}
                  width={1536}
                  height={1024}
                  className="min-h-0 w-full flex-1 object-contain"
                />
                <div className="flex items-center justify-between pt-4">
                  <span className="label-tech">{caption(open)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous frame"
                      className="label-tech min-h-11 min-w-11"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next frame"
                      className="label-tech min-h-11 min-w-11"
                    >
                      →
                    </button>
                  </div>
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
