"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * useCountUp — Animates a number from 0 to `end` when the ref element
 * enters the viewport. Runs once per mount.
 *
 * @example
 * const { ref, count } = useCountUp({ end: 12500, duration: 1800 });
 * return <span ref={ref}>{count.toLocaleString("en-IN")}</span>;
 */
export function useCountUp({
  end,
  duration = 1600,
  start = 0,
}: {
  end: number;
  duration?: number;
  start?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(start);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const range = end - start;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + range * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, end, start, duration]);

  return { ref, count };
}
