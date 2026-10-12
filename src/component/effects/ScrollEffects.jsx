import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

/**
 * - Thin progress bar at the very top that fills while scrolling
 * - Adds class "is-scrolled" on <html> (navbar gets a shadow, see index.css)
 * - Back-to-top button after scrolling down
 */
export default function ScrollEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      document.documentElement.classList.toggle("is-scrolled", y > 10);
      setShowTop(y > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("is-scrolled");
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[10000] h-[3px] w-full origin-left bg-gradient-to-r from-[#0C0950] via-[#3A36DB] to-[#5B7CFF]"
        style={{ scaleX }}
      />
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ y: -3 }}
            className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#0C0950] text-white shadow-lg hover:bg-[#3A36DB] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
