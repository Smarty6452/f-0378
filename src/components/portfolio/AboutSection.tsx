import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

const AboutSection = () => {
  const education = [
    { degree: "Postgraduate Diploma in Web Development", school: "Conestoga College", location: "Kitchener, ON", period: "2024 - 2025", gpa: "3.77/4.0" },
    { degree: "B.Sc. Computer Engineering", school: "VIIT College, SPPU", location: "Pune, India", period: "2019 - 2023", gpa: "9.3/10" },
  ];

  const volunteering = [
    { role: "GDSC Executive Lead", org: "Conestoga College", desc: "Led 5+ tech events, 100+ students" },
    { role: "Mentor", org: "Conestoga College", desc: "Mentored 50+ students, boosted engagement 40%" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-950" id="about">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4 text-blue-400"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          A passionate developer turning ideas into reality with clean code and modern tech.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-blue-900/20 border-blue-700 backdrop-blur">
            <Card className="p-6 bg-blue">
              <h3 className="text-xl font-bold flex items-center gap-2 text-blue-400 mb-4">
                <GraduationCap /> Education
              </h3>
              {education.map((edu, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-white">{edu.degree}</h4>
                  <p className="text-sm text-gray-300">{edu.school} • {edu.location}</p>
                  <p className="text-xs text-blue-400">{edu.period} • GPA: {edu.gpa}</p>
                </div>
              ))}
            </Card>
          </Card>

          <Card className="bg-red-900/20 border-red-700 backdrop-blur">
            <Card className="p-6 bg-red">
              <h3 className="text-xl font-bold flex items-center gap-2 text-red-400 mb-4">
                <Award /> Volunteering
              </h3>
              {volunteering.map((vol, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-white">{vol.role}</h4>
                  <p className="text-sm text-gray-300">{vol.org}</p>
                  <p className="text-xs text-gray-400">{vol.desc}</p>
                </div>
              ))}
            </Card>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;