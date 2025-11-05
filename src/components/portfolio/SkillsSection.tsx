"use client";

import { motion } from "framer-motion";

const core = [
  { name: "React.js", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "MongoDB", level: 75 },
];

const additional = [
  { name: "Tailwind CSS", level: 88 },
  { name: "Git / GitHub", level: 85 },
  { name: "Figma", level: 75 },
  { name: "Python", level: 70 },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="group"
  >
    <div className="flex justify-between mb-1">
      <span className="font-medium text-white group-hover:text-blue-400 transition-colors">
        {name}
      </span>
      <span className="text-blue-400">{level}%</span>
    </div>

    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
      />
    </div>
  </motion.div>
);

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-black/30">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-400 mb-2">Skills</h2>
          <p className="text-gray-400">Core technologies I work with every day.</p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Core */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Core Skills</h3>
            {core.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>

          {/* Additional */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Additional Skills</h3>
            {additional.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}