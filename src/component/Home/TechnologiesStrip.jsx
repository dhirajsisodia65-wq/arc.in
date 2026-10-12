import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Clickable, responsive "Technologies We Teach" strip.
 * Each chip opens its course page (/courses/:slug).
 */
const TECHNOLOGIES = [
  { name: "Basic Computer", logo: "💻", slug: "basic-computer" },
  { name: "Graphic Design", logo: "🎨", slug: "graphic-designing" },
  { name: "Web Design", logo: "🌐", slug: "web-designing" },
  { name: "Web Development", logo: "💻", slug: "web-development" },
  { name: "Accounting", logo: "📊", slug: "cca" },
  { name: "Tally Prime", logo: "🧮", slug: "tally-prime" },
  { name: "Busy", logo: "📈", slug: "busy" },
  { name: "Advanced Excel", logo: "📉", slug: "advanced-excel" },
  { name: "Digital Marketing", logo: "📱", slug: "digital-marketing" },
  { name: "Python", logo: "🐍", slug: "python" },
  { name: "CAAD", logo: "🖥️", slug: "caad" },
  { name: "CCA", logo: "🎓", slug: "cca" },
  { name: "ACA", logo: "🏅", slug: "aca" },
  { name: "ADCA", logo: "💾", slug: "adca" },
  { name: "CCC", logo: "🖱️", slug: "ccc" },
];

const TechChip = ({ tech, hidden }) => (
  <Link
    to={`/courses/${tech.slug}`}
    aria-hidden={hidden || undefined}
    tabIndex={hidden ? -1 : undefined}
    aria-label={hidden ? undefined : `${tech.name} course details`}
    className="group/chip mx-1.5 sm:mx-2 inline-flex shrink-0 items-center gap-2 sm:gap-3 rounded-xl border border-gray-100 bg-white px-3.5 py-2 sm:px-6 sm:py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3A36DB]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A36DB]"
  >
    <span className="text-base sm:text-lg" aria-hidden="true">{tech.logo}</span>
    <span className="text-sm sm:text-base font-medium text-gray-700 transition-colors group-hover/chip:text-[#0C0950]">
      {tech.name}
    </span>
    <span
      aria-hidden="true"
      className="hidden sm:inline text-[#3A36DB] opacity-0 -translate-x-1 transition-all duration-200 group-hover/chip:opacity-100 group-hover/chip:translate-x-0"
    >
      →
    </span>
  </Link>
);

const TechnologiesStrip = () => {
  const loop = useMemo(() => [...TECHNOLOGIES, ...TECHNOLOGIES], []);

  return (
    <motion.div
      className="mt-12 sm:mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <h2 className="text-xs sm:text-sm font-medium text-gray-500 text-center">
          Technologies We Teach
        </h2>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Marquee: pauses on hover/touch-hold; scrollable row if motion is reduced */}
      <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-marquee motion-reduce:animate-none whitespace-nowrap hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {loop.map((tech, i) => (
            <TechChip
              key={`${tech.name}-${i}`}
              tech={tech}
              hidden={i >= TECHNOLOGIES.length}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 text-center">
        <Link
          to="/courses"
          className="text-sm font-medium text-[#0C0950] transition-colors hover:text-[#3A36DB]"
        >
          View all courses →
        </Link>
      </div>
    </motion.div>
  );
};

export default TechnologiesStrip;
