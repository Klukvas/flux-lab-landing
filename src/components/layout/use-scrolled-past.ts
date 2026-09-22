"use client";

import { useEffect, useState } from "react";

/** True once the page has scrolled further than `offset` pixels. */
export function useScrolledPast(offset: number): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    function update() {
      setIsPast(window.scrollY > offset);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [offset]);

  return isPast;
}
