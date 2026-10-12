import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// Edit these questions/answers any time
const FAQS = [
  {
    q: "Which courses do you offer?",
    a: "We offer Basic Computer, CCC, CCA, ACA, CAAD, ADCA, Graphic Designing, Web Designing, Web Development, Python, Digital Marketing, Tally Prime, Busy and Advanced Excel. Courses run from 1 month to 12 months.",
  },
  {
    q: "What are the course fees?",
    a: "Fees depend on the course you choose. Call or WhatsApp us on 8860448368, or visit the institute, to get the current fee details.",
  },
  {
    q: "What are the batch timings?",
    a: "Batch timings depend on the course and branch. Please call or WhatsApp us on 8860448368, or visit a branch, to confirm the current schedule and available seats.",
  },
  {
    q: "Will I get a certificate after the course?",
    a: "Yes, you receive a certificate from ARC Computer Institute on completing your course. The institute is run by Sandarbhdeep Educational Foundation (SEF), ISO 9001:2015 certified and registered with the Ministry of Corporate Affairs.",
  },
  {
    q: "Do you provide placement support?",
    a: "Yes, we have a placement cell that supports students with job opportunities after their course. Contact us to know about current openings.",
  },
  {
    q: "I am a beginner. Can I join?",
    a: "Absolutely. Basic Computer, CCC and CCA are beginner-friendly, and our trainers guide you step by step with hands-on practice.",
  },
  {
    q: "How can I enroll?",
    a: "WhatsApp us, fill the contact form, visit one of our branches, or call 8860448368. Our team will guide you through the admission.",
  },
  {
    q: "Where is the institute located?",
    a: "Our centre is at A-14 Main Road, Mukund Pur, Delhi - 110042. You can also check all our branches in the Contact section of this website.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#3A36DB]">FAQ</p>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#0C0950] to-[#3A36DB] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Everything you want to know before joining ARC Computer Institute.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                  isOpen ? "border-[#3A36DB]/40 bg-[#F6F8FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#3A36DB]/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0C0950] text-lg leading-none text-white"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 leading-relaxed text-gray-600">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="mb-4 text-gray-600">Still have a question?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/918860448368"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 hover:shadow-md"
            >
              Chat on WhatsApp
            </a>
            <Link
              to="/contactSection"
              className="rounded-lg border-2 border-[#0C0950] px-6 py-2.5 text-sm font-medium text-[#0C0950] transition-all hover:bg-[#0C0950] hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
