/**
 * AuroraBackground - soft animated gradient glow for dark navy sections.
 * Pure CSS (GPU transforms), so it stays light on phones.
 * Put it inside a `relative overflow-hidden` parent; keep content `relative z-10`.
 */
export default function AuroraBackground({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -top-1/3 -left-1/4 h-[70%] w-[60%] rounded-full bg-[#3A36DB]/45 blur-[90px] animate-aurora-1 motion-reduce:animate-none will-change-transform" />
      <div className="absolute -bottom-1/3 right-0 h-[75%] w-[55%] rounded-full bg-[#5B7CFF]/30 blur-[100px] animate-aurora-2 motion-reduce:animate-none will-change-transform" />
      <div className="absolute top-1/4 left-1/3 h-[55%] w-[40%] rounded-full bg-[#7C5CFF]/25 blur-[90px] animate-aurora-3 motion-reduce:animate-none will-change-transform" />
    </div>
  );
}
