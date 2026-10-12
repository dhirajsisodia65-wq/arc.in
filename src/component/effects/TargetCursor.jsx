import { useEffect, useRef } from "react";

/**
 * TargetCursor
 * - Normal mouse cursor stays as it is.
 * - On a WORD (or emoji) the frame hugs just that word.
 * - In the middle/empty part of a text block it hugs the whole LINE.
 * - On photos, buttons, links, icons it hugs the whole element.
 * - Over empty areas the frame is hidden. Desktop (mouse) only.
 */
const TEXT_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6", "P", "LI", "LABEL"]);
const SELECTOR =
  "img, video, svg, a, button, input, textarea, select, h1, h2, h3, h4, h5, h6, p, li, label, [role='button'], .cursor-target";
const TRANSITION =
  "transform 520ms cubic-bezier(.16,1,.3,1), width 520ms cubic-bezier(.16,1,.3,1), height 520ms cubic-bezier(.16,1,.3,1), opacity 300ms ease";

const isSpace = (ch) => /\s/.test(ch);

const caretAt = (x, y) => {
  if (document.caretPositionFromPoint) {
    const p = document.caretPositionFromPoint(x, y);
    if (p && p.offsetNode) return { node: p.offsetNode, offset: p.offset };
  }
  if (document.caretRangeFromPoint) {
    const r = document.caretRangeFromPoint(x, y);
    if (r) return { node: r.startContainer, offset: r.startOffset };
  }
  return null;
};

// Rect of the single word (or emoji) under the pointer, else null
const findWordRect = (x, y, stack) => {
  const c = caretAt(x, y);
  if (!c || !c.node || c.node.nodeType !== 3) return null;
  const text = c.node.data;
  let i = c.offset;
  if (i >= text.length || isSpace(text[i])) i -= 1;
  if (i < 0 || isSpace(text[i])) return null;

  let s = i;
  let e = i + 1;
  while (s > 0 && !isSpace(text[s - 1])) s--;
  while (e < text.length && !isSpace(text[e])) e++;

  const parent = c.node.parentElement;
  if (!parent) return null;
  // text must really be under the pointer (not hidden behind another layer)
  if (!stack.slice(0, 3).some((el) => el === parent || parent.contains(el))) return null;
  if (getComputedStyle(parent).opacity === "0") return null;

  const range = document.createRange();
  range.setStart(c.node, s);
  range.setEnd(c.node, e);
  const r = range.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return null;
  const tol = 2;
  if (x < r.left - tol || x > r.right + tol || y < r.top - tol || y > r.bottom + tol) return null;
  return r;
};

// Rect of the full text line at height y inside a text element
const getLineRect = (el, y) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0);
  if (!rects.length) return el.getBoundingClientRect();

  let line = rects.filter((r) => y >= r.top - 2 && y <= r.bottom + 2);
  if (!line.length) {
    let nearest = rects[0];
    let min = Infinity;
    for (const r of rects) {
      const d = Math.min(Math.abs(y - r.top), Math.abs(y - r.bottom));
      if (d < min) { min = d; nearest = r; }
    }
    line = rects.filter((r) => Math.abs(r.top - nearest.top) < 4);
  }
  const left = Math.min(...line.map((r) => r.left));
  const right = Math.max(...line.map((r) => r.right));
  const top = Math.min(...line.map((r) => r.top));
  const bottom = Math.max(...line.map((r) => r.bottom));
  return { left, top, width: right - left, height: bottom - top };
};

export default function TargetCursor() {
  const frameRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const canFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canFinePointer) return;

    const frame = frameRef.current;
    const inner = innerRef.current;
    let visible = false;
    let pos = { x: -100, y: -100 };
    let raf = 0;

    const setBox = (x, y, w, h) => {
      frame.style.transform = `translate(${x}px, ${y}px)`;
      frame.style.width = `${w}px`;
      frame.style.height = `${h}px`;
    };

    const hide = () => {
      visible = false;
      frame.style.opacity = "0";
    };

    const show = (r, pad) => {
      if (!visible) {
        // pop out from the pointer, then grow to the target
        frame.style.transition = "none";
        setBox(pos.x - 8, pos.y - 8, 16, 16);
        void frame.offsetWidth;
        frame.style.transition = TRANSITION;
        visible = true;
      }
      frame.style.opacity = "1";
      setBox(r.left - pad, r.top - pad, r.width + pad * 2, r.height + pad * 2);
    };

    const update = () => {
      raf = 0;
      const { x, y } = pos;
      const stack = document.elementsFromPoint(x, y).slice(0, 5);

      // 1) a single word / emoji
      const word = findWordRect(x, y, stack);
      if (word) return show(word, 4);

      // 2) whole line of text, or the whole element (photo, button, icon...)
      for (const el of stack) {
        const box = el.getBoundingClientRect();
        if (box.width >= window.innerWidth * 0.95 && box.height >= window.innerHeight * 0.8) break;
        if (el.matches(SELECTOR)) {
          const rect = TEXT_TAGS.has(el.tagName) ? getLineRect(el, y) : box;
          return show(rect, 6);
        }
      }
      hide();
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onMove = (e) => { pos = { x: e.clientX, y: e.clientY }; schedule(); };
    const onDown = () => { inner.style.transform = "scale(0.92)"; };
    const onUp = () => { inner.style.transform = "scale(1)"; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", hide);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  const line = "2.5px solid #fff"; // white + difference blend = black on light, light on dark
  const corner = "tc-corner absolute h-2.5 w-2.5";

  return (
    <>
      <style>{`
        @keyframes tc-breathe {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--dx), var(--dy)); }
        }
        .tc-corner { animation: tc-breathe 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .tc-corner { animation: none; } }
      `}</style>
      <div
        ref={frameRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden opacity-0 mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ width: 16, height: 16, transition: TRANSITION }}
      >
        <div ref={innerRef} className="relative h-full w-full" style={{ transition: "transform 300ms ease-out" }}>
          <span className={`${corner} left-0 top-0`} style={{ borderTop: line, borderLeft: line, "--dx": "-3px", "--dy": "-3px" }} />
          <span className={`${corner} right-0 top-0`} style={{ borderTop: line, borderRight: line, "--dx": "3px", "--dy": "-3px" }} />
          <span className={`${corner} bottom-0 left-0`} style={{ borderBottom: line, borderLeft: line, "--dx": "-3px", "--dy": "3px" }} />
          <span className={`${corner} bottom-0 right-0`} style={{ borderBottom: line, borderRight: line, "--dx": "3px", "--dy": "3px" }} />
        </div>
      </div>
    </>
  );
}
