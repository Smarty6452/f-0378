import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Junior Frontend Developer",
    company: "Unmetered Technologies",
    location: "Remote, India",
    period: "Apr 2024 – Aug 2024",
    points: [
      "Enhanced Revcatalyst PMS UI with HTML, CSS, and JavaScript — 20% engagement boost",
      "Replaced third-party libraries with custom solutions (e.g., Toastify notifications)",
      "Integrated APIs with backend teams ensuring seamless functionality",
    ],
    current: true,
  },
  {
    title: "Frontend Developer Intern",
    company: "Gauge.ro",
    location: "Bengaluru, India",
    period: "Mar 2023 – Jul 2023",
    points: [
      "Built interactive React + Tailwind interfaces for LMS and hotel chain",
      "Fixed technical issues improving performance and usability",
      "Contributed to documentation and CMS updates with SQL integrations",
    ],
  },
  {
    title: "ReactJS Intern",
    company: "Cloud4Code",
    location: "Surat, India",
    period: "Jun 2022 – Dec 2022",
    points: [
      "Built dynamic pages for SkyCar using Ant Design and JavaScript",
      "Worked in Agile environment using Trello for team collaboration",
      "Enhanced chatbot UI and integrated payment gateways",
    ],
  },
];

const JourneyPath = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Experience</h2>
          <p className="text-muted-foreground">My professional journey in software development.</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative mb-10 pl-12 md:pl-0 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
              }`}
            >
              {/* Dot */}
              <div className={`absolute top-2 w-3 h-3 rounded-full border-2 border-primary bg-background left-3 md:left-auto ${
                i % 2 === 0 ? "md:-right-1.5" : "md:-left-1.5"
              }`} />

              <div className={`p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow ${
                exp.current ? "border-primary/40" : "border-border"
              }`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {exp.title}
                      {exp.current && (
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Latest</span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{exp.company} · {exp.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" /> {exp.period}
                </div>
                <ul className="space-y-1.5">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyPath;
