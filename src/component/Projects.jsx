import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SpotlightCard from "./effects/SpotlightCard";

/**
 * Sample (demo) projects - replace with your students' real work.
 * Copy one object to add a new project.
 */
const PROJECTS = [
  {
    id: 1,
    title: "Student Result Portal",
    category: "Web Development",
    icon: "🎓",
    gradient: "from-[#0C0950] to-[#3A36DB]",
    tech: ["React", "Node.js", "MySQL"],
    description: "Students enter their roll number and instantly see marks, grade and a printable result card.",
    features: ["Roll number search", "Subject-wise marks & grade", "Print / download result card", "Admin panel to upload marks"],
  },
  {
    id: 2,
    title: "Restaurant Landing Page",
    category: "Web Design",
    icon: "🍽️",
    gradient: "from-orange-500 to-rose-500",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "A fully responsive restaurant website with animated menu, gallery and table-booking form.",
    features: ["Mobile-first responsive layout", "Animated menu tabs", "Photo gallery with lightbox", "Table booking form"],
  },
  {
    id: 3,
    title: "E-commerce Store",
    category: "Web Development",
    icon: "🛒",
    gradient: "from-emerald-500 to-teal-600",
    tech: ["React", "Tailwind", "Node.js"],
    description: "Online shop with product filters, cart, wishlist and a smooth checkout flow.",
    features: ["Product search & filters", "Cart and wishlist", "Order summary page", "Responsive for all screens"],
  },
  {
    id: 4,
    title: "Library Management System",
    category: "Python",
    icon: "📚",
    gradient: "from-sky-500 to-indigo-600",
    tech: ["Python", "SQLite", "Tkinter"],
    description: "Desktop app to manage books, members, issue/return dates and late fines.",
    features: ["Add / search books", "Issue & return tracking", "Automatic fine calculation", "Member records"],
  },
  {
    id: 5,
    title: "Expense Tracker",
    category: "Python",
    icon: "💰",
    gradient: "from-violet-500 to-fuchsia-600",
    tech: ["Python", "Pandas", "Matplotlib"],
    description: "Track daily spending and see monthly charts and category-wise reports.",
    features: ["Daily expense entry", "Category-wise charts", "Monthly summary", "Export to Excel"],
  },
  {
    id: 6,
    title: "GST Billing & Accounts",
    category: "Accounting",
    icon: "🧾",
    gradient: "from-amber-500 to-orange-600",
    tech: ["Tally Prime", "Advanced Excel"],
    description: "Complete accounting setup for a small shop: ledgers, GST invoices and monthly reports.",
    features: ["Company & ledger setup", "GST sales/purchase invoices", "Trial balance & P&L", "Excel MIS dashboard"],
  },
  {
    id: 7,
    title: "Brand Identity Pack",
    category: "Graphic Design",
    icon: "🎨",
    gradient: "from-pink-500 to-purple-600",
    tech: ["Photoshop", "Illustrator", "CorelDRAW"],
    description: "Logo, visiting card, letterhead and social media kit designed for a local business.",
    features: ["Logo with variations", "Visiting card & letterhead", "Social media templates", "Print-ready files"],
  },
  {
    id: 8,
    title: "Social Media Campaign",
    category: "Digital Marketing",
    icon: "📣",
    gradient: "from-cyan-500 to-blue-600",
    tech: ["SEO", "Meta Ads", "Analytics"],
    description: "30-day content and ad plan for a small brand with reach and lead tracking.",
    features: ["Content calendar", "Ad creatives & targeting", "SEO keyword plan", "Weekly performance report"],
  },
];

const Thumb = ({ project, large = false }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} ${large ? "h-56 sm:h-64" : "h-44"}`}>
    {/* browser window mock */}
    <div className="absolute inset-x-5 top-5 bottom-0 rounded-t-xl bg-white/95 shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-gray-100 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
        <span className="ml-3 h-2 flex-1 rounded bg-gray-100" />
      </div>
      <div className="space-y-2 p-4">
        <div className="h-3 w-2/3 rounded bg-gray-200" />
        <div className="h-2 w-full rounded bg-gray-100" />
        <div className="h-2 w-5/6 rounded bg-gray-100" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="h-10 rounded bg-gray-100" />
          <div className="h-10 rounded bg-gray-100" />
          <div className="h-10 rounded bg-gray-100" />
        </div>
      </div>
    </div>
    <div className="absolute right-4 top-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-lg">
      {project.icon}
    </div>
  </div>
);

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => ["All", ...new Set(PROJECTS.map((p) => p.category))], []);
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F6F8FF] to-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <Helmet>
        <title>Student Projects | ARC Computer Institute</title>
        <meta
          name="description"
          content="See the kind of real projects ARC Computer Institute students build: websites, Python apps, accounting setups, designs and marketing campaigns."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#3A36DB]">Our Projects</p>
          <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Learn By{" "}
            <span className="bg-gradient-to-r from-[#0C0950] to-[#3A36DB] bg-clip-text text-transparent">
              Building Real Projects
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            At ARC you do not just learn theory. Every course ends with hands-on projects like these.
          </p>
        </motion.div>

        {/* filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                filter === c
                  ? "bg-[#0C0950] text-white shadow-md"
                  : "bg-white text-gray-700 shadow-sm ring-1 ring-gray-200 hover:ring-[#3A36DB]/40 hover:text-[#0C0950]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <SpotlightCard className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <button type="button" onClick={() => setSelected(p)} className="block h-full w-full text-left">
                    <div className="glare-hover">
                      <Thumb project={p} />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#3A36DB]">{p.category}</span>
                      <h3 className="mt-1 text-lg font-bold text-gray-900">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{p.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className="rounded-full bg-[#F6F8FF] px-2.5 py-1 text-xs font-medium text-[#0C0950]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="mt-4 inline-block text-sm font-semibold text-[#3A36DB]">View demo →</span>
                    </div>
                  </button>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#0C0950] to-[#1d1a8f] p-8 text-center text-white md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Want to build projects like these?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">Join a course and start your first project in the very first month.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/courses" className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#0C0950] transition hover:shadow-lg">
              Explore Courses
            </Link>
            <Link to="/contactSection" className="rounded-lg border border-white/60 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* details popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[10001] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Thumb project={selected} large />
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl text-gray-700 shadow hover:bg-white"
                >
                  ×
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#3A36DB]">{selected.category}</span>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{selected.title}</h3>
                <p className="mt-3 text-gray-600">{selected.description}</p>

                <h4 className="mt-6 text-sm font-semibold text-gray-900">What this project includes</h4>
                <ul className="mt-3 space-y-2">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 text-[#3A36DB]">✓</span> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {selected.tech.map((t) => (
                    <span key={t} className="rounded-full bg-[#F6F8FF] px-3 py-1 text-xs font-medium text-[#0C0950]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/courses" className="rounded-lg bg-[#0C0950] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3A36DB]">
                    See related courses
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
                <p className="mt-5 text-xs text-gray-400">Sample project shown for demo purposes.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
