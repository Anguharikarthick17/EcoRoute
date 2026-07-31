"use client";

import { useState, useEffect } from "react";

/**
 * useMediaQuery — Reactive media query hook
 *
 * Returns `true` when the given CSS media query matches.
 * Safe for SSR (returns `false` during hydration).
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

// ── Preset breakpoint hooks ───────────────────────────────────

/** Returns true on screens narrower than 640px */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 639px)");
}

/** Returns true on screens 640px–1023px */
export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
}

/** Returns true on screens 1024px and wider */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/** Returns true when user prefers reduced motion */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
