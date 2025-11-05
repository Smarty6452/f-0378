import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GraduationCap, Award, Users } from "lucide-react";

const AboutSection = () => {
  const education = [
    {
      degree: "Postgraduate Diploma in Web Development",
      school: "Conestoga College",
      location: "Kitchener, ON",
      period: "2024 - 2025",
      gpa: "3.77/4.0",
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      school: "VIIT College, SPPU University",
      location: "Pune, India",
      period: "2019 - 2023",
      gpa: "9.3/10",
    },
  ];

  const volunteering = [
    {
      role: "Executive Lead, Google Developer Student Club (GDSC)",
      organization: "Conestoga College",
      description: "Led technical workshops on web development and APIs, sharing knowledge with 100+ students. Organized 5+ tech events, increasing student attendance by 30%.",
    },
    {
      role: "Student Engagement Program Mentor",
      organization: "Conestoga College",
      description: "Mentored 50+ students, designing daily activities and enhancing curriculum engagement, resulting in a 40% increase in active participation.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A dedicated software developer with a passion for creating innovative solutions and mentoring others.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-primary">
                <h4 className="font-bold text-lg mb-2">{edu.degree}</h4>
                <p className="text-primary font-medium mb-1">{edu.school}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  {edu.location} • {edu.period}
                </p>
                <p className="text-sm font-medium">GPA: {edu.gpa}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Volunteer Experience
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {volunteering.map((vol, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-accent">
                <h4 className="font-bold text-lg mb-2">{vol.role}</h4>
                <p className="text-primary font-medium mb-3">{vol.organization}</p>
                <p className="text-sm text-muted-foreground">{vol.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
