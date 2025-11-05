// components/sections/JourneySection.tsx
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const JourneySection = () => {
  const experiences = [
    {
      title: "Security Guard",
      company: "Allied Universal",
      location: "Kitchener, ON",
      period: "Feb 2025 – Present",
      desc: "Full-time role while completing postgraduate studies. Strengthened communication, crisis management, and attention to detail.",
      skills: ["Problem Solving", "Communication", "Customer Service", "Security"],
      current: true,
    },
    {
      title: "Junior Frontend Developer",
      company: "Unmetered Technologies",
      location: "Remote",
      period: "Apr 2024 – Aug 2024",
      desc: "Revamped hotel PMS (Revcatalyst) with custom React components. Replaced 3rd-party UI libs → 20% faster load, 15% better UX.",
      skills: ["React", "Tailwind", "API", "Performance"],
    },
    {
      title: "Frontend Developer Intern",
      company: "Gauge.ro",
      location: "Remote",
      period: "Mar 2023 – Jul 2023",
      desc: "Built responsive dashboards with React + Tailwind. Applied SEO & Lighthouse fixes → +40% organic traffic.",
      skills: ["React", "Tailwind", "SEO", "LMS"],
    },
    {
      title: "ReactJS Intern",
      company: "Cloud4Code",
      location: "Pune, India",
      period: "Jun 2022 – Dec 2022",
      desc: "Developed SkyCar rental app UI using Ant Design. Integrated real-time chat widget.",
      skills: ["React", "Ant Design", "Chatbot", "Trello"],
    },
  ];

  return (
    <section id="journey" className="py-20 px-4 bg-black/95 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-red-900/5 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400">
            My Journey
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            From intern to full-stack developer — every step shaped who I am today.
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative ${i % 2 === 0 ? "pr-0 md:pr-8" : "pl-0 md:pl-8"}`}
            >
              {/* Connector line */}
              {i !== experiences.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-24 bg-gradient-to-b from-blue-500/30 to-red-500/30 hidden md:block" />
              )}

              {/* Card */}
              <Card
                className={`
                  group relative overflow-hidden
                  ${exp.current 
                    ? "bg-gradient-to-br from-blue-900/40 to-red-900/40 border-blue-500/70 shadow-2xl shadow-blue-500/20" 
                    : "bg-gradient-to-br from-gray-900/50 to-black border-gray-700/50"
                  }
                  backdrop-blur-sm p-1 transition-all hover:scale-[1.02] hover:shadow-xl
                `}
              >
                <div className="bg-black/70 rounded-xl p-6 h-full">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-400" />
                        {exp.title}
                        {exp.current && (
                          <span className="ml-2 text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {exp.desc}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`
                          px-3 py-1 text-xs rounded-full transition-all
                          ${exp.current 
                            ? "bg-gradient-to-r from-blue-600/30 to-red-600/30 text-blue-200 border border-blue-500/50" 
                            : "bg-gray-800/50 text-gray-400 border border-gray-600"
                          }
                        `}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm">
            Ready to write the next chapter together?
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;