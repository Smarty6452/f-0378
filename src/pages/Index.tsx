
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/portfolio/HeroSection";
import JourneyPath from "@/components/portfolio/JourneyPath";
import SkillsTree from "@/components/portfolio/SkillsTree";
import ProjectsShowcase from "@/components/portfolio/ProjectsShowcase";
import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";
import NavControls from "@/components/portfolio/NavControls";
import { Flame, Star } from "lucide-react";

// Define the sections/levels of the portfolio journey
type Section = "hero" | "journey" | "skills" | "projects" | "about" | "contact";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>("hero");
  const [unlocked, setUnlocked] = useState<Section[]>(["hero"]);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    
    // Generate background stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // Size between 1 and 3
    }));
    setStars(newStars);

    return () => clearTimeout(timer);
  }, []);

  // Easter egg function
  const handleEasterEgg = () => {
    toast({
      title: "Easter Egg Found! 🚀",
      description: "You've unlocked a hidden animation!",
      variant: "default",
    });

    // Add any special animation or effect here
    const rocketEl = document.createElement("div");
    rocketEl.innerHTML = `<div class="rocket-animation"><span>🚀</span></div>`;
    document.body.appendChild(rocketEl);

    setTimeout(() => {
      document.body.removeChild(rocketEl);
    }, 3000);
  };

  // Function to unlock next section
  const unlockSection = (section: Section) => {
    if (!unlocked.includes(section)) {
      setUnlocked([...unlocked, section]);
      toast({
        title: "New Level Unlocked! 🎮",
        description: `You've unlocked the ${section.charAt(0).toUpperCase() + section.slice(1)} section!`,
        variant: "default",
      });
    }
    setCurrentSection(section);
  };

  // Handle navigation
  const navigate = (section: Section) => {
    if (unlocked.includes(section) || section === "hero") {
      setCurrentSection(section);
    } else {
      toast({
        title: "Level Locked! 🔒",
        description: "Complete the current level to unlock this section.",
        variant: "destructive",
      });
    }
  };

  if (!loaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-black animated-bg">
        <div className="text-yellow-400 flex flex-col items-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
              filter: ['drop-shadow(0 0 8px rgba(255,204,0,0.3))', 'drop-shadow(0 0 15px rgba(255,204,0,0.5))', 'drop-shadow(0 0 8px rgba(255,204,0,0.3))']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Flame className="w-16 h-16 mb-4" />
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold gradient-text mb-3"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading Rohit's Adventure...
          </motion.h1>
          <motion.div 
            className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1A1F2C] to-[#262A38] min-h-screen text-white overflow-hidden" ref={containerRef}>
      {/* Background stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white opacity-70 z-0"
          style={{ 
            left: `${star.x}%`, 
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Top navigation controls */}
      <NavControls 
        currentSection={currentSection} 
        unlocked={unlocked} 
        onNavigate={navigate} 
      />
      
      {/* Main content area with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20 
          }}
          className="container mx-auto p-4 pt-20 relative z-10"
        >
          {currentSection === "hero" && (
            <HeroSection 
              onContinue={() => unlockSection("journey")} 
              onEasterEgg={handleEasterEgg} 
            />
          )}
          
          {currentSection === "journey" && (
            <JourneyPath 
              onComplete={() => unlockSection("skills")} 
            />
          )}
          
          {currentSection === "skills" && (
            <SkillsTree 
              onComplete={() => unlockSection("projects")} 
            />
          )}
          
          {currentSection === "projects" && (
            <ProjectsShowcase 
              onComplete={() => unlockSection("about")} 
            />
          )}
          
          {currentSection === "about" && (
            <AboutSection 
              onComplete={() => unlockSection("contact")} 
            />
          )}
          
          {currentSection === "contact" && (
            <ContactSection />
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default Index;
