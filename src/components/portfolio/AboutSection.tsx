import { motion } from "framer-motion";
import { GraduationCap, Award, Users, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Frontend-focused Full-Stack Developer with experience in enterprise environments, thriving in Agile settings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" /> Education
            </h3>
            <div className="space-y-4 pl-7">
              <div className="border-l-2 border-primary/30 pl-4">
                <p className="font-medium">Post Graduate Diploma – Web Development</p>
                <p className="text-sm text-muted-foreground">Conestoga College, Kitchener, ON · 2024–Present · GPA 3.77</p>
              </div>
              <div className="border-l-2 border-border pl-4">
                <p className="font-medium">B.Sc. Computer Engineering</p>
                <p className="text-sm text-muted-foreground">VIIT College, SPPU University, India · 2020–2023 · CGPA 9.13</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" /> Highlights
            </h3>
            <div className="space-y-3 pl-7">
              {[
                { icon: Users, text: "GDSC Executive Lead — mentored 50+ students in web dev workshops" },
                { icon: Globe, text: "3+ years building production web apps across 4 companies" },
                { icon: Award, text: "HackerRank certified in CSS & Java" },
                { icon: Award, text: "Published ML research paper on Human Fall Detection" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
