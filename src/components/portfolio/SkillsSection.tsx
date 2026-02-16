import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Ant Design"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "MongoDB", "SQL", "Python", "ASP.NET"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "Nginx", "Figma", "Azure DevOps", "Render", "VPS Deployment"],
  },
  {
    title: "AI & Other",
    skills: ["Groq LLaMA 3", "Socket.IO", "Stripe API", "JWT Auth", "SEO", "Agile/Scrum", "CMS"],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Skills</h2>
          <p className="text-muted-foreground">Technologies I work with daily.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-primary mb-4 text-sm uppercase tracking-wider">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs rounded-md bg-muted text-muted-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
