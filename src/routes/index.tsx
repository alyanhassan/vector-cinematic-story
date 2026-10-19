import { createFileRoute } from "@tanstack/react-router";

import { Architecture } from "@/components/vector/Architecture";
import { ASSETS } from "@/components/vector/assets";
import { COPY, META } from "@/components/vector/content";
import { Footer } from "@/components/vector/Footer";
import { Hero } from "@/components/vector/Hero";
import { Lookbook } from "@/components/vector/Lookbook";
import { Manifesto } from "@/components/vector/Manifesto";
import { Material } from "@/components/vector/Material";
import { MotionSection } from "@/components/vector/Motion";
import { Nav } from "@/components/vector/Nav";
import { Night } from "@/components/vector/Night";
import { Order } from "@/components/vector/Order";
import { Product } from "@/components/vector/Product";
import { SmoothScroll } from "@/components/vector/SmoothScroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: META.title },
      { name: "description", content: META.description },
      { property: "og:title", content: META.title },
      { property: "og:description", content: META.description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: META.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: META.ogImage },
    ],
    links: [{ rel: "preload", as: "image", href: ASSETS.hero, fetchPriority: "high" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="label-tech sr-only z-[80] bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {COPY.skip}
      </a>
      <SmoothScroll />
      <Nav />
      <main id="main" className="relative z-10 bg-background text-foreground">
        <Hero />
        <Manifesto />
        <Product />
        <Material />
        <Architecture />
        <Night />
        <MotionSection />
        <Lookbook />
        <Order />
      </main>
      <Footer />
    </>
  );
}
