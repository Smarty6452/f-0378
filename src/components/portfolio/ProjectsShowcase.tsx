import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, ExternalLink, Code, Bookmark, Flame, Award, BookOpen } from "lucide-react";
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
  featured?: boolean;
}

const ProjectsShowcase = ({ onComplete }: ProjectsShowcaseProps) => {
  const [projects] = useState<Project[]>([
    {
      id: "project-1",
      title: "DriveTest App",
      description: "A full-stack application using Node.js and MongoDB to manage driver data and bookings. Features secure login, role-based access control, and RESTful APIs.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1740&auto=format&fit=crop",
      demoLink: "https://drivingtestapp2-0.onrender.com/login",
      codeLink: "https://github.com/Smarty6452/drivingtestapp",
      techStack: ["Node.js", "Express", "MongoDB", "HTML/CSS", "JavaScript", "RESTful APIs"],
      featured: true
    },
    {
      id: "project-2",
      title: "ML Fall Detection System",
      description: "A machine learning-based human fall detection system differentiating between various activities and fall scenarios in real-time. Published research project.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600",
      demoLink: "https://ijritcc.org/index.php/ijritcc/article/view/8638",
      techStack: ["Python", "Machine Learning", "Data Analysis", "Classification Algorithms"],
      featured: true
    },
    {
      id: "project-3",
      title: "WordPlay Utility App",
      description: "A responsive React application providing text transformation utilities with a clean interface and multiple text manipulation options.",
      image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=600",
      demoLink: "https://word-play-utility.netlify.app/",
      codeLink: "https://github.com/Smarty6452/Word-Play",
      techStack: ["React", "JavaScript", "Bootstrap", "Text Processing"],
    },
    {
      id: "project-4",
      title: "AuthZ - MERN Authentication",
      description: "A secure authentication system using Node.js, Express, React, and JWT encryption with role-based access control for improved security.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
      codeLink: "https://github.com/Smarty6452/AuthZ_MERN",
      techStack: ["MERN Stack", "JWT", "Authentication", "Security", "Role-based Access"],
    },
    {
      id: "project-5",
      title: "SkyCar Rental Project",
      description: "Built dynamic web pages for a car rental application using Ant Design, HTML, and JavaScript. Integrated with payment gateways and backend APIs.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600",
      demoLink: "https://skycarproject.netlify.app/",
      codeLink: "https://github.com/Smarty6452/skycar",
      techStack: ["React","REDUX", "Ant Design", "Payment Integration", "Responsive UI"],
    },
    {
      id: "project-6",
      title: "Gauge Water Purifier",
      description: "A responsive website for a water purifier company featuring product details, testimonials, and contact information with modern design.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
      demoLink: "https://gaugerowebiste.netlify.app/",
      codeLink: "https://github.com/Smarty6452/gauge",
      techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    },
    {
      id: "project-7",
      title: "CRM Sales Dashboard",
      description: "A customer relationship management dashboard with sales tracking, customer data management, and reporting capabilities.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      demoLink: "https://crmsales.netlify.app/",
      codeLink: "https://github.com/Smarty6452/crm",
      techStack: ["React", "Dashboard UI", "Data Visualization", "User Management"],
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

  const allProjectsViewed = viewedProjects.size >= 3;

  return (
    <div className="min-h-[80vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Project Showcase</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore my key projects. <span className="text-yellow-400">Click on each card</span> to learn more!
        </p>
        
        <Button 
          variant="ghost" 
          onClick={onComplete}
          className="mt-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
        >
          Skip this section →
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center text-yellow-400">
          <Flame className="mr-2 h-5 w-5" /> Featured Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full"
            >
              <Card 
                className="h-full bg-gradient-to-br from-black/80 to-red-950/30 border-red-500/30 overflow-hidden cursor-pointer transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-red-500/20"
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
                  <div className="absolute top-2 right-2 z-20">
                    <Badge className="bg-yellow-500/90 text-black font-semibold animate-pulse">
                      <Flame className="mr-1 h-3 w-3" /> Featured
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2 z-20">
                    {viewedProjects.has(project.id) ? (
                      <Badge className="bg-green-500/80">Viewed</Badge>
                    ) : (
                      <Badge className="bg-red-500 animate-pulse">New</Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-gray-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map(tech => (
                      <Badge key={tech} variant="secondary" className="bg-red-900/40 text-red-200 border border-red-500/20">
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
                  <Button variant="link" className="text-yellow-400 p-0 hover:text-yellow-300 group">
                    View Details <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center text-white">
          <BookOpen className="mr-2 h-5 w-5" /> More Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card 
                className="h-full bg-black/40 border-red-500/20 overflow-hidden cursor-pointer transition-all duration-300 hover:border-yellow-500/40 hover:shadow-md hover:shadow-red-500/10"
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
                      <Badge className="bg-green-500/80">Viewed</Badge>
                    ) : (
                      <Badge className="bg-red-500 animate-pulse">New</Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 2).map(tech => (
                      <Badge key={tech} variant="secondary" className="bg-red-900/30 text-red-200">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 2 && (
                      <Badge variant="secondary" className="bg-gray-800/60">
                        +{project.techStack.length - 2} more
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
      </motion.div>

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
              className="bg-gradient-to-br from-[#1A1F2C] to-[#262838] border border-red-500/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                <div className="flex items-center mb-2">
                  {selectedProject.featured && (
                    <Badge className="bg-yellow-500/90 text-black font-semibold mr-2">
                      <Flame className="mr-1 h-3 w-3" /> Featured
                    </Badge>
                  )}
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center">
                    <Code className="mr-2 h-4 w-4" /> Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map(tech => (
                      <Badge key={tech} className="bg-gradient-to-br from-red-900/40 to-red-800/30 text-red-200 border border-red-500/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {selectedProject.demoLink && (
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white group shadow-lg shadow-red-500/20"
                      onClick={() => window.open(selectedProject.demoLink, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  )}
                  
                  {selectedProject.codeLink && (
                    <Button
                      variant="outline"
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 group"
                      onClick={() => window.open(selectedProject.codeLink, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" /> View Code
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {allProjectsViewed && (
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            size="lg" 
            onClick={onComplete}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white group shadow-lg shadow-red-500/20"
          >
            Discover More About Me <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsShowcase;
