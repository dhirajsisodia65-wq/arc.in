/**
 * Logo Loop - smooth, endless row of company logos (pauses on hover).
 *
 * HOW TO USE
 * 1. Put logo images in the /public/partners folder (png / svg / webp).
 * 2. Add one line per company below.
 * The section stays hidden until you add at least one real company.
 */
const PARTNERS = [
  // { name: "Company Name", logo: "/partners/company.png" },
];

export default function HiringPartners() {
  if (!PARTNERS.length) return null;

  // repeat so the loop is always wider than the screen
  const row = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  const loop = [...row, ...row];

  return (
    <section id="placements" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#3A36DB]">Placements</p>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Where Our Students Work</h2>
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee items-center motion-reduce:animate-none hover:[animation-play-state:paused]">
            {loop.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="mx-6 flex h-16 w-32 shrink-0 items-center justify-center sm:mx-10 sm:w-40"
                aria-hidden={i >= PARTNERS.length || undefined}
              >
                <img
                  src={p.logo}
                  alt={i < PARTNERS.length ? p.name : ""}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
