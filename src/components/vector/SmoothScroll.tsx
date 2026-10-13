import { useEffect } from "react";

import { setLenis } from "./scroll";

/** Creates the Lenis instance once on the client. Disabled for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let destroyed = false;
    let cleanup = () => {};
    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
      setLenis(lenis);
      cleanup = () => {
        lenis.destroy();
        setLenis(null);
      };
    });
    return () => {
      destroyed = true;
      cleanup();
    };
  }, []);
  return null;
}
