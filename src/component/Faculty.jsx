import { motion } from "framer-motion";
import SpotlightCard from "./effects/SpotlightCard";

/**
 * Add more teachers by copying one object below.
 * Put the photo inside the /public folder and write its name in `photo`.
 */
const FACULTY = [
  {
    name: "Anil Upadhyay",
    role: "Founder, ARC Computer Institute",
    photo: "/Anil_sir.jpeg",
    experience: "Teaching since 2010",
    bio: "Founded ARC with a simple aim: make quality computer education accessible to everyone.",
  },
  // {
  //   name: "Teacher Name",
  //   role: "Faculty - Graphic Design",
  //   photo: "/teacher1.jpg",
  //   experience: "8+ years experience",
  //   bio: "Short one-line introduction.",
  // },
];

export default function Faculty() {
  return (
    <section id="faculty" className="bg-gray-50 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#3A36DB]">Our Mentors</p>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Learn From{" "}
            <span className="bg-gradient-to-r from-[#0C0950] to-[#3A36DB] bg-clip-text text-transparent">
              Experienced Faculty
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Practical, hands-on teaching by people who care about your career.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {FACULTY.map((t, i) => (
            <motion.div
              key={t.name}
              className="w-full max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-shadow hover:shadow-xl">
                <div className="glare-hover aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={t.photo}
                    alt={`${t.name}, ${t.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#3A36DB]">{t.role}</p>
                  {t.experience && (
                    <span className="mt-3 inline-block rounded-full bg-[#F6F8FF] px-3 py-1 text-xs font-medium text-[#0C0950]">
                      {t.experience}
                    </span>
                  )}
                  {t.bio && <p className="mt-3 text-sm leading-relaxed text-gray-600">{t.bio}</p>}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
