import { useEffect, useRef } from "react";

/**
 * DotGrid - subtle interactive dot background (canvas, no dependencies).
 * Dots near the mouse grow and shift from navy to indigo.
 * Static on touch devices and when the user prefers reduced motion.
 */
const BASE = [12, 9, 80]; // #0C0950
const ACTIVE = [58, 54, 219]; // #3A36DB

export default function DotGrid({
  dotSize = 2.4,
  gap = 28,
  proximity = 150,
  baseAlpha = 0.14,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / gap) + 1;
      const rows = Math.floor(height / gap) + 1;
      const offX = (width - (cols - 1) * gap) / 2;
      const offY = (height - (rows - 1) * gap) / 2;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: offX + c * gap, y: offY + r * gap });
        }
      }
      draw();
    };

    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, width, height);
      const r0 = dotSize / 2;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = dist < proximity ? 1 - dist / proximity : 0;
        const e = t * t; // ease
        const rad = r0 * (1 + 1.4 * e);
        const alpha = baseAlpha + 0.65 * e;
        const R = Math.round(BASE[0] + (ACTIVE[0] - BASE[0]) * e);
        const G = Math.round(BASE[1] + (ACTIVE[1] - BASE[1]) * e);
        const B = Math.round(BASE[2] + (ACTIVE[2] - BASE[2]) * e);
        ctx.fillStyle = `rgba(${R},${G},${B},${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      schedule();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      schedule();
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(parent);
    if (!reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dotSize, gap, proximity, baseAlpha]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)] ${className}`}
    />
  );
}
