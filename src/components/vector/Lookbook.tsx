import { ASSETS } from "./assets";
import { Reveal, TechLabel } from "./primitives";
import { cn } from "@/lib/utils";

function Frame({
  src,
  alt,
  index,
  title,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  index: string;
  title: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={cn("group relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
          imgClassName,
        )}
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <span className="label-tech text-bone opacity-100 transition-transform duration-700 group-hover:translate-x-2">
          {index} / {title}
        </span>
        <span className="label-tech text-bone opacity-0 transition-opacity duration-700 group-hover:opacity-90">
          VIEW
        </span>
      </figcaption>
    </figure>
  );
}

export function Lookbook() {
  return (
    <section id="shop" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="display text-[13vw] leading-[0.84] md:text-[7vw]">
            CAMPAIGN
            <br />
            INDEX
          </h2>
          <TechLabel className="pb-2">04 FRAMES / 2026</TechLabel>
        </div>
        <div className="hairline-x mb-10" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-8">
            <Frame
              src={ASSETS.night}
              alt="Night campaign frame on wet pavement"
              index="01"
              title="NIGHT"
              className="h-[52svh] md:h-[70svh]"
            />
          </Reveal>

          <div className="flex flex-col justify-between md:col-span-4">
            <Reveal delay={0.08}>
              <Frame
                src={ASSETS.detail}
                alt="Material detail frame"
                index="02"
                title="DETAIL"
                className="h-[34svh] md:h-[38svh]"
                imgClassName="object-[60%_40%]"
              />
            </Reveal>
            <Reveal delay={0.16} className="mt-4 md:mt-6">
              <div className="flex h-[26svh] flex-col justify-between border border-border p-5 md:h-[28svh]">
                <TechLabel>EDITORIAL NOTE</TechLabel>
                <p className="display text-3xl leading-[0.9] md:text-4xl">
                  ONE SYSTEM. NO SEASONS.
                </p>
                <TechLabel>VECTOR / 01</TechLabel>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06} className="md:col-span-5 md:-mt-16">
            <Frame
              src={ASSETS.motion}
              alt="Motion campaign frame with runner"
              index="03"
              title="MOTION"
              className="h-[60svh] md:h-[78svh]"
            />
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-4 md:self-end">
            <Frame
              src={ASSETS.structure}
              alt="Architecture structure frame"
              index="04"
              title="STRUCTURE"
              className="h-[40svh] md:h-[48svh]"
              imgClassName="grayscale"
            />
          </Reveal>

          <Reveal delay={0.18} className="md:col-span-3 md:self-end">
            <div className="relative overflow-hidden bg-foreground p-6 text-background md:h-[48svh]">
              <TechLabel className="opacity-80">SYSTEM 001</TechLabel>
              <p className="display mt-6 text-[16vw] leading-[0.82] md:text-[5vw]">
                MOVE
                <br />
                DIFF.
              </p>
              <img
                src={ASSETS.hero}
                alt="VECTOR Runner sneaker"
                loading="lazy"
                className="pointer-events-none absolute -bottom-6 -right-10 w-[85%] sneaker-lit-dark"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
