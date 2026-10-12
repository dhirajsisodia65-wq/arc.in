import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Timeline } from "../component/ui/timeline";

const Tick = () => <span className="mt-0.5 text-[#3A36DB]">✔</span>;

const WHY = [
  ["Industry-Relevant Curriculum", "Designed to match current job market demands."],
  ["Innovative Teaching Methods", "Blending traditional instruction with modern e-learning tools."],
  ["Affordable for All", "Education within reach for students from all backgrounds."],
  ["Certified & Recognized", "Supported by national-level certifications and government initiatives."],
  ["Holistic Development", "Focus on technical as well as personal growth."],
];

const COURSES = [
  ["Basic Computer", "basic-computer"],
  ["Graphic Designing", "graphic-designing"],
  ["Web Designing", "web-designing"],
  ["Web Development (Full Stack)", "web-development"],
  ["Digital Marketing", "digital-marketing"],
  ["Python Programming", "python"],
  ["Tally Prime", "tally-prime"],
  ["Advanced Excel", "advanced-excel"],
  ["CCC (Government Certified)", "ccc"],
];

export function InstituteTimeline() {
  const data = [
    {
      title: "Our Mission & Vision",
      content: (
        <div className="space-y-4 text-sm text-gray-600 md:text-base">
          <div>
            <h4 className="mb-1 font-semibold text-gray-900">Our Mission</h4>
            <p>
              Founded by visionary educator <strong className="text-gray-900">Anil Upadhyay Sir</strong>, ARC Computer
              Institute was established with a clear mission: to make{" "}
              <strong className="text-gray-900">high-quality computer education accessible, affordable, and career-focused</strong>{" "}
              for every learner, regardless of background.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-gray-900">Why Choose ARC?</h4>
            <ul className="space-y-2">
              {WHY.map(([t, d]) => (
                <li key={t} className="flex items-start gap-2">
                  <Tick />
                  <span><strong className="text-gray-900">{t}:</strong> {d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-1 font-semibold text-gray-900">Our Vision</h4>
            <p>
              We believe education is the foundation of opportunity. At ARC, we ensure that{" "}
              <strong className="text-gray-900">no student is left behind in the digital revolution</strong>, guiding
              learners toward a confident and successful future.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Director's Message",
      content: (
        <div className="text-sm text-gray-600 md:text-base">
          <div className="mb-4 flex items-center gap-4">
            <img
              src="/Anil_sir.jpeg"
              alt="Anil Upadhyay Sir"
              className="h-16 w-16 rounded-full object-cover object-top shadow-md ring-2 ring-[#3A36DB]/20"
              loading="lazy"
            />
            <div>
              <p className="font-semibold text-gray-900">Anil Upadhyay Sir</p>
              <p className="text-xs text-gray-500 md:text-sm">Founder & Director, ARC Computer Institute</p>
            </div>
          </div>
          <div className="space-y-3">
            <p>Dear Students, welcome to <strong className="text-gray-900">ARC Computer Institute</strong> - a place where learning meets opportunity.</p>
            <p>In today's digital age, <strong className="text-gray-900">computer literacy is essential</strong> for education, careers, and entrepreneurship.</p>
            <p>Through <strong className="text-gray-900">practical learning and an industry-aligned curriculum</strong>, we prepare every student to build real skills and a confident future.</p>
            <p>At ARC, you are not just a student - you are part of a learning community.</p>
            <p className="pt-1">Warm regards,<br /><strong className="text-gray-900">Anil Upadhyay Sir</strong></p>
          </div>
        </div>
      ),
    },
    {
      title: "Courses Offered",
      content: (
        <div className="text-sm text-gray-600 md:text-base">
          <p className="mb-4">
            We offer <strong className="text-gray-900">industry-relevant certified computer courses</strong> designed for
            students, professionals, and job seekers.
          </p>
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {COURSES.map(([name, slug]) => (
              <li key={slug}>
                <Link
                  to={`/courses/${slug}`}
                  className="group flex items-center gap-2 rounded-md py-1 transition-colors hover:text-[#3A36DB]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3A36DB]" />
                  <span>{name}</span>
                  <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Certifications & Recognition",
      content: (
        <div className="text-sm text-gray-600 md:text-base">
          <p className="mb-4">ARC Computer Institute is proudly recognized by national-level authorities.</p>
          <ul className="space-y-2">
            {[
              "ISO 9001:2015 Certified",
              "Registered under the Ministry of Corporate Affairs (Govt. of India)",
              "NITI Aayog (Darpan)",
              "Ministry of Education (Vidyanjali platform)",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2"><Tick /> <span>{t}</span></li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "ARC Computer Institute",
    url: "https://www.arcinstitute.in",
    foundingDate: "2010",
    founder: { "@type": "Person", name: "Anil Upadhyay" },
    description: "ISO 9001:2015 certified computer institute in Delhi offering industry-relevant certified courses.",
  };

  return (
    <section className="w-full bg-white py-12" aria-labelledby="timeline-heading">
      <Helmet>
        <title>About Us | ARC Computer Institute</title>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="mx-auto max-w-7xl px-4">
        <h1 id="timeline-heading" className="sr-only">About ARC Computer Institute</h1>
        <Timeline data={data} />
      </div>
    </section>
  );
}
