
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, ExternalLink, Code } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectsShowcaseProps {
  onComplete: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoLink?: string;
  codeLink?: string;
  techStack: string[];
}

const ProjectsShowcase = ({ onComplete }: ProjectsShowcaseProps) => {
  const [projects] = useState<Project[]>([
    {
      id: "project-1",
      title: "Driving Test App",
      description: "A driving app with secure login (bcrypt), role-based access, and a clean UI with Toastify.js notifications.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1740&auto=format&fit=crop",
      demoLink: "https://g-test-login.vercel.app/",
      codeLink: "https://github.com/thecodingrohit/G-test-login",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Toastify.js"]
    },
    {
      id: "project-2",
      title: "Fall Detection System",
      description: "ML-based human fall detection system differentiating between activities and fall scenarios in real-time.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600",
      techStack: ["Python", "Machine Learning", "Data Analysis", "Algorithms"]
    },
    {
      id: "project-3",
      title: "Personal Portfolio",
      description: "A responsive portfolio website showcasing projects and skills using modern web technologies.",
      image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=600",
      techStack: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design"]
    },
    {
      id: "project-4",
      title: "AuthZ - MERN Authentication",
      description: "A secure authentication system using Node.js, Express, React, and JWT encryption with role-based access control.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
      codeLink: "https://github.com/thecodingrohit/authZ",
      techStack: ["MERN Stack", "JWT", "Authentication", "Security"]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewedProjects, setViewedProjects] = useState<Set<string>>(new Set());

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setViewedProjects(prev => new Set(prev).add(project.id));
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  const allProjectsViewed = viewedProjects.size === projects.length;

  return (
    <div className="min-h-[80vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-red-500">Project Showcase</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore my key projects. Click on each card to learn more!
        </p>
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card 
              className="h-full bg-black/40 border-red-500/30 overflow-hidden cursor-pointer transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-red-500/10"
              onClick={() => handleViewProject(project)}
            >
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                </AspectRatio>
                <div className="absolute bottom-2 right-2 z-20">
                  {viewedProjects.has(project.id) ? (
                    <Badge className="bg-yellow-500">Viewed</Badge>
                  ) : (
                    <Badge className="bg-red-500 animate-pulse">New</Badge>
                  )}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-red-900/30 text-red-200">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="secondary" className="bg-gray-800/60">
                      +{project.techStack.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 justify-end">
                <Button variant="link" className="text-yellow-400 p-0">
                  View Details <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProjectDetail}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1A1F2C] border border-red-500/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent"></div>
                </AspectRatio>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-black/40 rounded-full hover:bg-black/60"
                  onClick={closeProjectDetail}
                >
                  ✕
                </Button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map(tech => (
                      <Badge key={tech} className="bg-red-900/30 text-red-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {selectedProject.demoLink && (
                    <Button
                      variant="default"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => window.open(selectedProject.demoLink, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  )}
                  
                  {selectedProject.codeLink && (
                    <Button
                      variant="outline"
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                      onClick={() => window.open(selectedProject.codeLink, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete section button */}
      {allProjectsViewed && (
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            size="lg" 
            onClick={onComplete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Discover More About Me <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsShowcase;
