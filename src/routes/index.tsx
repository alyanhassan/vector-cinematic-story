import { createFileRoute } from "@tanstack/react-router";

import { Architecture } from "@/components/vector/Architecture";
import { Closing } from "@/components/vector/Closing";
import { Hero } from "@/components/vector/Hero";
import { Lookbook } from "@/components/vector/Lookbook";
import { Manifesto } from "@/components/vector/Manifesto";
import { Material } from "@/components/vector/Material";
import { MotionSection } from "@/components/vector/Motion";
import { Nav } from "@/components/vector/Nav";
import { Night } from "@/components/vector/Night";
import { Product } from "@/components/vector/Product";

const TITLE = "VECTOR / 01 — Move Different. System 001";
const DESCRIPTION =
  "VECTOR / 01 is an experimental performance-streetwear label. System 001: the Vector Runner — engineered silhouette, sculpted sole, adaptive upper.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Manifesto />
      <Product />
      <Material />
      <Architecture />
      <Night />
      <MotionSection />
      <Lookbook />
      <Closing />
    </main>
  );
}
