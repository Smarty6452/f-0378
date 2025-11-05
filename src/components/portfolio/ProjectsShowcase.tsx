"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  desc: string;
  img: string;
  demo?: string;
  code?: string;
  stack: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    title: "DriveTest App",
    desc: "Full-stack driver-booking system with role-based auth.",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1740&auto=format&fit=crop",
    demo: "https://drivingtestapp2-0.onrender.com/login",
    code: "https://github.com/Smarty6452/drivingtestapp",
    stack: ["Node.js", "MongoDB", "Express"],
    featured: true,
  },
  {
    id: "2",
    title: "ML Fall Detection",
    desc: "Real-time fall detection using Python ML models.",
    img: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600",
    demo: "https://ijritcc.org/index.php/ijritcc/article/view/8638",
    stack: ["Python", "ML", "OpenCV"],
    featured: true,
  },
  {
    id: "3",
    title: "WordPlay Utility",
    desc: "React text-transform tool with clean UI.",
    img: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=600",
    demo: "https://word-play-utility.netlify.app/",
    code: "https://github.com/Smarty6452/Word-Play",
    stack: ["React", "Tailwind"],
  },
  {
    id: "4",
    title: "AuthZ – MERN Auth",
    desc: "Secure JWT + role-based auth system.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
    code: "https://github.com/Smarty6452/AuthZ_MERN",
    stack: ["MERN", "JWT"],
  },
  {
    id: "5",
    title: "SkyCar Rental",
    desc: "Car-rental UI with payment integration.",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600",
    demo: "https://skycarproject.netlify.app/",
    code: "https://github.com/Smarty6452/skycar",
    stack: ["React", "Ant Design"],
  },
  {
    id: "6",
    title: "CRM Dashboard",
    desc: "Sales & customer analytics dashboard.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    demo: "https://crmsales.netlify.app/",
    code: "https://github.com/Smarty6452/crm",
    stack: ["React", "Chart.js"],
  },
];

export default function ProjectsShowcase({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const open = (p: Project) => {
    setSelected(p);
    setViewed((v) => new Set(v).add(p.id));
  };

  return (
    <section id="projects" className="py-20 bg-black/20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-400 mb-2">Projects</h2>
          <p className="text-gray-400">Click a card to see details</p>
          <Button variant="ghost" onClick={onComplete} className="mt-4 text-yellow-400">
            Skip
          </Button>
        </motion.div>

        {/* Featured – 2 cards, perfectly centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 justify-items-center">
          {projects
            .filter((p) => p.featured)
            .map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={open} />
            ))}
        </div>

        {/* Others – 3-column, centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {projects
            .filter((p) => !p.featured)
            .map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 2} onOpen={open} />
            ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gray-900 border border-blue-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img src={selected.img} alt={selected.title} className="w-full h-56 object-cover rounded-t-xl" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50"
                    onClick={() => setSelected(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selected.title}</h3>
                  <p className="text-gray-300 mb-4">{selected.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selected.stack.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-blue-900/50 text-blue-300">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {selected.demo && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open(selected.demo, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" /> Live
                      </Button>
                    )}
                    {selected.code && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-600 text-blue-400 hover:bg-blue-900/30"
                        onClick={() => window.open(selected.code, "_blank")}
                      >
                        <Github className="w-4 h-4 mr-1" /> Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unlock button */}
        {viewed.size >= 3 && (
          <motion.div className="text-center mt-12">
            <Button size="lg" onClick={onComplete} className="bg-blue-600 hover:bg-blue-700">
              Continue
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ---------- Card ---------- */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="w-full max-w-sm"
    >
      <Card
        className="bg-gray-900/50 border border-gray-800 cursor-pointer overflow-hidden h-full flex flex-col"
        onClick={() => onOpen(project)}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {project.featured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-black text-xs">Featured</Badge>
          )}
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">{project.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-sm text-gray-400 line-clamp-2">{project.desc}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {project.stack.slice(0, 2).map((t) => (
              <Badge key={t} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                {t}
              </Badge>
            ))}
            {project.stack.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                +{project.stack.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button variant="link" className="text-blue-400 p-0 text-sm">
            Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}