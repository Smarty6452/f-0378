"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, X } from "lucide-react";
import projectFable from "@/assets/project-fable.jpg";
import projectSmartyArt from "@/assets/project-smartyart.jpg";
import projectXDevVerse from "@/assets/project-xdevverse.jpg";
import projectDriveTest from "@/assets/project-drivetest.jpg";

interface Project {
  id: string;
  title: string;
  desc: string;
  longDesc?: string;
  img: string;
  demo?: string;
  code?: string;
  stack: string[];
  featured?: boolean;
  year: string;
}

const projects: Project[] = [
  {
    id: "fable",
    title: "Fable (Boost) – AI Speech Therapy",
    desc: "AI-powered speech therapy platform with real-time pronunciation feedback (<100ms latency).",
    longDesc: "Built a public-facing web platform delivering real-time pronunciation feedback using streaming AI services. Designed reusable component architecture including onboarding workflows, notification systems, and analytics dashboards. Integrated REST APIs with Express.js and MongoDB Atlas for structured session tracking.",
    img: projectFable,
    demo: "https://fable-frontend-187f.onrender.com/",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Express.js", "MongoDB Atlas"],
    featured: true,
    year: "2026",
  },
  {
    id: "smartyart",
    title: "SmartyArt – E-Commerce Platform",
    desc: "Full-stack art marketplace with Stripe payments, Dockerized and deployed to VPS.",
    longDesc: "Built complete React + TypeScript frontend and Node.js/Express backend. Integrated Stripe payments, secure checkout, and MongoDB product/order system. Dockerized app and deployed to VPS with Nginx reverse proxy.",
    img: projectSmartyArt,
    demo: "https://smartyart03.xdevverse.com/",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Stripe", "Docker", "Nginx"],
    featured: true,
    year: "2025–2026",
  },
  {
    id: "xdevverse",
    title: "XDevVerse – Hackathon Platform",
    desc: "Full-stack platform with real-time features, AI judging, and team collaboration.",
    longDesc: "Created full-stack platform with real-time features (Socket.IO) and notifications. Integrated Groq LLaMA 3 AI for idea validation and automated judging. Optimized React components and scalable backend APIs.",
    img: projectXDevVerse,
    demo: "https://www.xdevverse.com",
    stack: ["React", "Node.js", "Socket.IO", "Groq LLaMA 3", "MongoDB"],
    featured: true,
    year: "2025",
  },
  {
    id: "drivetest",
    title: "Driving Test Preparation App",
    desc: "Full-stack app with bcrypt auth, role-based access, and real-time notifications.",
    img: projectDriveTest,
    demo: "https://drivingtestapp2-0.onrender.com/login",
    stack: ["Node.js", "MongoDB", "Express", "JavaScript"],
    year: "2025",
  },
  {
    id: "authz",
    title: "AuthZ – MERN Authentication",
    desc: "Secure JWT + role-based access control authentication system.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop",
    code: "https://github.com/Smarty6452/AuthZ_MERN",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    year: "2024",
  },
  {
    id: "ml-fall",
    title: "ML Human Fall Detection",
    desc: "Published research paper on ML classification for automated fall detection.",
    img: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&auto=format&fit=crop",
    demo: "https://ijritcc.org/index.php/ijritcc/article/view/8638",
    stack: ["Python", "Machine Learning", "OpenCV"],
    year: "2023",
  },
  {
    id: "wordplay",
    title: "WordPlay Utility",
    desc: "React text transformation tool with clean UI.",
    img: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=600&auto=format&fit=crop",
    demo: "https://word-play-utility.netlify.app/",
    code: "https://github.com/Smarty6452/Word-Play",
    stack: ["React", "Tailwind"],
    year: "2023",
  },
  {
    id: "skycar",
    title: "SkyCar Rental",
    desc: "Car rental UI with payment integration built during internship.",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop",
    demo: "https://skycarproject.netlify.app/",
    code: "https://github.com/Smarty6452/skycar",
    stack: ["React", "Ant Design"],
    year: "2022",
  },
  {
    id: "gaugero",
    title: "Gauge.ro Water Purifier",
    desc: "Corporate website for water purifier company.",
    img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop",
    demo: "https://gaugerowebiste.netlify.app/",
    code: "https://github.com/Smarty6452/gauge",
    stack: ["React", "Tailwind"],
    year: "2023",
  },
  {
    id: "crm",
    title: "CRM Sales Dashboard",
    desc: "Sales & customer analytics dashboard.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
    demo: "https://crmsales.netlify.app/",
    code: "https://github.com/Smarty6452/crm",
    stack: ["React", "Chart.js"],
    year: "2023",
  },
];

export default function ProjectsShowcase() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Projects</h2>
          <p className="text-muted-foreground">Real-world applications I've built and shipped.</p>
        </motion.div>

        {/* Featured */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelected(p)}
              className="cursor-pointer group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px]">Featured</Badge>
                <span className="absolute top-3 right-3 text-[10px] bg-background/80 backdrop-blur px-2 py-0.5 rounded text-muted-foreground">{p.year}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 text-sm">{p.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.stack.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded bg-muted text-muted-foreground">{t}</span>
                  ))}
                  {p.stack.length > 3 && <span className="px-2 py-0.5 text-[10px] rounded bg-muted text-muted-foreground">+{p.stack.length - 3}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects */}
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">More Projects</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {others.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              onClick={() => setSelected(p)}
              className="cursor-pointer group rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <h4 className="font-medium text-foreground text-xs mb-1">{p.title}</h4>
                <p className="text-[10px] text-muted-foreground line-clamp-1">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore more */}
        <div className="text-center">
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/Smarty6452" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" /> Explore More on GitHub
            </a>
          </Button>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img src={selected.img} alt={selected.title} className="w-full h-56 object-cover rounded-t-xl" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/50 backdrop-blur hover:bg-background/80"
                    onClick={() => setSelected(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-foreground">{selected.title}</h3>
                    <span className="text-xs text-muted-foreground">{selected.year}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">{selected.longDesc || selected.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {selected.stack.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {selected.demo && (
                      <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => window.open(selected.demo, "_blank")}>
                        <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
                      </Button>
                    )}
                    {selected.code && (
                      <Button size="sm" variant="outline" onClick={() => window.open(selected.code, "_blank")}>
                        <Github className="w-4 h-4 mr-1" /> Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
