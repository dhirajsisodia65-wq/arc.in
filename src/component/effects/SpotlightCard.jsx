import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * SpotlightCard - a soft light follows the cursor over the card (desktop hover only).
 * Accepts all motion.div props (variants, whileHover, itemScope ...).
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(58, 54, 219, 0.14)",
  ...rest
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative ${className}`}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
