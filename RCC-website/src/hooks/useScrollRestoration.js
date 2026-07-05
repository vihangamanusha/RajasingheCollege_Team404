import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const STORAGE_KEY = "rcc_scroll_positions";

/**
 * Saves & restores window scroll position per route path.
 * Positions are stored in sessionStorage so they are cleared
 * when the browser tab is closed.
 */
export function useScrollRestoration() {
  const { pathname } = useLocation();
  // Keep track of the previous path so we can save its position
  // before moving away.
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;

    // --- Save the scroll position of the page we are LEAVING ---
    if (prevPath !== pathname) {
      try {
        const stored = JSON.parse(
          sessionStorage.getItem(STORAGE_KEY) || "{}"
        );
        stored[prevPath] = window.scrollY;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      } catch (_) {
        // ignore storage errors
      }

      // Update the ref to the new path
      prevPathRef.current = pathname;
    }

    // --- Restore the scroll position for the page we are ENTERING ---
    // Use requestAnimationFrame so the new page content has rendered.
    const raf = requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(
          sessionStorage.getItem(STORAGE_KEY) || "{}"
        );
        const savedY = stored[pathname];
        if (typeof savedY === "number") {
          window.scrollTo({ top: savedY, behavior: "instant" });
        } else {
          // No saved position – go to top for fresh pages
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      } catch (_) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);
}
